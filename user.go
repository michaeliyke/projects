package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"path"
	"strconv"
	"time"

	"github.com/lib/pq"
)

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
		return errors.New("user not found")
	}
	if user.Password != Encrypt(r.FormValue("password")) {
		return errors.New("incorrect password")
	}
	session, err := user.CreateSession()
	if err != nil {
		Log("Error creating session: ", err)
		return errors.New("cannot create session")
	}
	// create a session cookie by defult. It is deleted once browser closes
	SetCookie(w, config.AuthCookieName, session.Uuid, session.User.KeepLogged)
	return
}

// Performs user logout chores
func (user *User) Logout(w http.ResponseWriter, r *http.Request) (err error) {
	return UserLogout(w, r)
}

// Effects user logout
func UserLogout(w http.ResponseWriter, r *http.Request) (err error) {
	cookie, err := GetCookie(r, config.AuthCookieName)
	if err == nil {
		session := Session_{Uuid: cookie.Value}
		session.DeleteByUUID()
		UnsetCookie(w, config.AuthCookieName)

	}
	return
}

// Perfom account creation chores
func (user *User) CreateAcount(w http.ResponseWriter, r *http.Request) (err error) {
	// check if user exists using temporary data
	err = user.GetByEmail()
	// err is either ErrNoRows or nil if user already exists
	if err == nil {
		err = errors.New("user already exists")
		return
	}
	err = user.Create()
	if err != nil {
		// Log("Error creating user account: ", err)
		return errors.New("cannot create user")
	}
	return // user has been created successfully
}

// Performs account update chores
func (user *User) UpdateAccount(w http.ResponseWriter, r *http.Request) (err error) {
	return
}

// Fetches user with the given id from the database
func (u *User) Fetch(id int) (err error) {
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
		user = User{}
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
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("could not retrieve user")
		return errors.New("could not retrieve user")
	}
	ouput, err := json.MarshalIndent(&u, "", "  ")
	if err != nil {
		Log("could not create output json")
		return errors.New("could not create output json")
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(ouput)
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
		return errors.New("could not create user")
	}
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user update
func UserPUT(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return errors.New("user does not exist")
	}
	leng := r.ContentLength
	body := make([]byte, leng)
	r.Body.Read(body)
	json.Unmarshal(body, &u)
	err = u.Update()
	if err != nil {
		Log("could not update user")
		return errors.New("could not update user")
	}
	Log("user update successful!")
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user delete
func UserDELETE(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return errors.New("user does not exist")
	}
	err = u.Delete()
	if err != nil {
		return errors.New("could not delete user")
	}
	Log("user deleted")
	w.WriteHeader(http.StatusOK)
	return
}
