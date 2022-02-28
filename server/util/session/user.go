package session

import (
	"encoding/json"
	"net/http"
	"path"
	"projects/server/util/common"
	. "projects/server/util/config"
	. "projects/server/util/reporting"
	"time"

	"github.com/lib/pq"
)

type IUser interface {
	Create() (err error)
	Fetch(id int) error
	Update() (err error)
	Delete() (err error)
	Authenticate(w http.ResponseWriter, r *http.Request) error
	CreateAcount(w http.ResponseWriter, r *http.Request) error
	UpdateAccount(w http.ResponseWriter, r *http.Request) error
}

type User struct {
	// The User Struct
	Id         int       `json:"id"`
	Email      string    `json:"email" validate:"required,email,lte=4,gte=254"`
	Name       string    `json:"name" validate:"required"`
	Uuid       string    `json:"uuid" validate:"required"`
	Password   string    `json:"password" validate:"required"`
	KeepLogged bool      `json:"keep_login"`
	Privileges []string  `json:"privileges"`
	CreatedAt  time.Time `json:"created_at"`
}

// Performs user authentication chores
func (user *User) Authenticate(w http.ResponseWriter, r *http.Request) (err error) {
	err = user.GetByEmail()
	if err != nil {
		return NewError("user not found")
	}
	if user.Password != common.Encrypt(r.FormValue("password")) {
		return NewError("incorrect password")
	}
	session, err := user.CreateSession()
	if err != nil {
		Log("Error creating session: ", err)
		return NewError("cannot create session")
	}
	// create a session cookie by defult. It is deleted once browser closes
	SetCookie(w, Config.AuthCookieName, session.Uuid, session.User.KeepLogged)
	return
}

// Performs user logout chores
func (user *User) Logout(w http.ResponseWriter, r *http.Request) (err error) {
	return AcctLogout(w, r)
}

// Effects user logout
func AcctLogout(w http.ResponseWriter, r *http.Request) (err error) {
	cookie, err := GetCookie(r, Config.AuthCookieName)
	if err == nil {
		session := U_session{Uuid: cookie.Value}
		session.DeleteByUUID()
		UnsetCookie(w, Config.AuthCookieName)
	}
	return
}

// Perfom account creation chores
func (user *User) CreateAcount(w http.ResponseWriter, r *http.Request) (err error) {
	// check if user exists using temporary data
	err = user.GetByEmail()
	// err is either ErrNoRows or nil if user already exists
	if err == nil {
		err = NewError("user already exists")
		return
	}
	err = user.Create()
	if err != nil {
		// Log("Error creating user account: ", err)
		return NewError("cannot create user")
	}
	return // user has been created successfully
}

// Performs account update chores
func (user *User) UpdateAccount(w http.ResponseWriter, r *http.Request) (err error) {
	return
}

// Fetches user with the given id from the database
func (user *User) Fetch(id int) (err error) {
	err = Db.QueryRow(`
		SELECT id, email, name, uuid, password, privileges, created_at
		FROM users WHERE id = $1
	`, id,
	).Scan(
		&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		pq.Array(&user.Privileges), &user.CreatedAt,
	)
	return
}

// Creates a new user in the database
func (user *User) Create() (err error) {
	stmt, err := Db.Prepare(
		`INSERT INTO users (email, name, uuid, password, privileges, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, email, name, uuid, password, privileges, created_at`,
	)
	if err != nil {
		return
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&user.Email, &user.Name, &user.Uuid, &user.Password, pq.Array(&user.Privileges),
		time.Now(),
	).Scan(
		&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		pq.Array(&user.Privileges), &user.CreatedAt,
	)
	return
}

// Updates a user's information in the database
func (user *User) Update() (err error) {
	_, err = Db.Exec(
		`UPDATE users SET email = $2, name = $3, uuid = $4, password = $5, 
		privileges = $6, created_at = $7 WHERE id = $1`,
		user.Id, user.Email, user.Name, user.Uuid, user.Password, pq.Array(user.Privileges),
		time.Now(),
	)
	return
}

// Deletes a user from the database
func (user *User) Delete() (err error) {
	_, err = Db.Exec(`DELETE FROM users WHERE id = $1`, user.Id)
	return
}

// Fetch all users in the database
func Users() (users []User, err error) {
	rows, err := Db.Query(
		`SELECT id, email, name, uuid, password, privileges, created_at 
		FROM users`,
	)
	if err != nil {
		return
	}
	for rows.Next() {
		user := User{}
		err = rows.Scan(
			&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
			pq.Array(&user.Privileges), &user.CreatedAt,
		)
		if err != nil {
			return
		}
		users = append(users, user)
	}
	rows.Close()
	return
}

// Gets a user from the database by their email address
func (user *User) GetByEmail() (err error) {
	stmt, err := Db.Prepare(
		`SELECT id, email, name, uuid, password, privileges, created_at
			FROM users WHERE email = $1`,
	)
	if err != nil {
		return
	}
	err = stmt.QueryRow(user.Email).Scan(
		&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		pq.Array(&user.Privileges), &user.CreatedAt,
	)
	return // err is nil or ErrNoRows
}

// Gets a user from the database by their uuid
func (user *User) GetByUUID() (err error) {
	err = Db.QueryRow(
		`SELECT id, email, name, uuid, password, privileges, created_at
			FROM users WHERE uuid = $1`, user.Uuid,
	).Scan(&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		pq.Array(&user.Privileges), &user.CreatedAt,
	)
	return
}

// Effects user fetch
func UserGET(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	// id, err := st rconv.Atoi(path.Base(r.URL.Path))
	id, err := common.String_2_Int(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return NewError("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("could not retrieve user")
		return NewError("could not retrieve user")
	}
	// ouput, err := json.MarshalIndent(&u, "", "  ")
	output, err := common.MarshalIndentKeep(&u, "", " ")
	if err != nil {
		Log("could not create output json")
		return NewError("could not create output json")
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
	return
}

// Effects user create
func UserPOST(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	leng := r.ContentLength
	body := make([]byte, leng)
	r.Body.Read(body)
	json.Unmarshal(body, &u)
	err = u.Create()
	if err != nil {
		Log("could not create user")
		return NewError("could not create user")
	}
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user update
func UserPUT(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := common.String_2_Int(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return NewError("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return NewError("user does not exist")
	}
	leng := r.ContentLength
	body := make([]byte, leng)
	r.Body.Read(body)
	json.Unmarshal(body, &u)
	err = u.Update()
	if err != nil {
		Log("could not update user")
		return NewError("could not update user")
	}
	Log("user update successful!")
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user delete
func UserDELETE(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := common.String_2_Int(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return NewError("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return NewError("user does not exist")
	}
	err = u.Delete()
	if err != nil {
		return NewError("could not delete user")
	}
	Log("user deleted")
	w.WriteHeader(http.StatusOK)
	return
}
