package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"path"
	"strconv"
	"time"

	. "github.com/michaeliyke/Golang/log"
)

type User struct {
	Id         int       `json:"id"`
	Email      string    `json:"email"`
	Name       string    `json:"name"`
	Uuid       string    `json:"uuid"`
	Password   string    `json:"password"`
	Privileges []string  `json:"privileges"`
	CreatedAt  time.Time `json:"created_at"`
}

// fetch all users
func Users() (users []User, err error) {
	rows, err := Db.Query(
		`SELECT id, email, name, uuid, password, privileges, created_at FROM users`,
	)
	if err != nil {
		return
	}
	for rows.Next() {
		user = User{}
		err = rows.Scan(
			&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
			&user.Privileges, &user.CreatedAt,
		)
		if err != nil {
			return
		}
		users = append(users, user)
	}
	rows.Close()
	return
}

// gets user by email address
func GetByEmail(email string) (user User, err error) {
	user = User{}
	err = Db.QueryRow(
		`SELECT id, email, name, uuid, password, privileges, created_at
		FROM users WHERE email = $1`, email,
	).Scan(&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		&user.Privileges, &user.CreatedAt,
	)
	return
}

// gets user by uuid
func GetByUUID(uuid string) (user User, err error) {
	err = Db.QueryRow(
		`SELECT id, email, name, uuid, password, privileges, created_at
		FROM users WHERE uuid = $1`, uuid,
	).Scan(&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		&user.Privileges, &user.CreatedAt,
	)
	return
}

// Facilitates fetch of a given user or user id
func UserGET(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = Fetch(id)
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

// facilitates create of a given user
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

// facilitates update a givenn user
func UserPUT(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = Fetch(id)
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

// facilitates delete of a given user
func UserDELETE(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = Fetch(id)
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

// fetches user with the given id
func Fetch(id int) (err error) {
	err = Db.QueryRow(`
		SELECT id, email, name, uuid, password, privileges, created_at
		FROM users WHERE id = $1
	`, id,
	).Scan(
		&user.Id, &user.Email, &user.Name, &user.Uuid, &user.Password,
		&user.Privileges, &user.CreatedAt,
	)
	return
}

// cretes a new user
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
		&user.Email, &user.Name, user.Uuid, &user.Password, &user.Privileges,
		time.Now(),
	).Scan(
		&user.Id, &user.Email, &user.Name, user.Uuid, &user.Password,
		&user.Privileges, &user.CreatedAt,
	)
	return
}

// updates a user's information
func (user *User) Update() (err error) {
	_, err = Db.Exec(
		`UPDATE users SET email = $2, name = $3, uuid = $4, password = $5, 
		privileges = $6, created_at = $7 WHERE id = $1`,
		user.Id, user.Email, user.Name, user.Uuid, user.Password, user.Privileges,
		time.Now(),
	)
	return
}

// deletes a user
func (user *User) Delete() (err error) {
	_, err = Db.Exec(`DELETE FROM users WHERE id = $1`, user.Id)
	return
}
