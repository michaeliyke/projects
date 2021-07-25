package main

import (
	"errors"
	"net/http"
	"time"
)

type Session_ struct {
	Id         int       `json:"id"`
	Uuid       string    `json:"uuid"`
	UserId     int       `json:"user_id"`
	UserUuid   string    `json:"user_uuid"`
	KeepLogged bool      `json:"keep_login"`
	CreatedAt  time.Time `json:"created_at"`
}

// creates a new session
func (user *User) CreateSession() (session Session_, err error) {
	stmt, err := Db.Prepare(
		`INSERT INTO sessions (
			uuid, user_id, user_uuid, keep_login, created_at
			) 
		VALUES ($1, $2, $3, $4, $5, $6) 
		RETURNING id, uuid, user_id, user_uuid, keep_login, created_at`,
	)
	if err != nil {
		return
	}
	defer stmt.Close()
	err = Db.QueryRow(
		CreateUuid(), user.Id, user.Uuid, true, user.KeepLogged, time.Now(),
	).Scan(
		&session.Id, &session.Uuid, &session.UserId, &session.UserUuid,
		&session.KeepLogged, &session.CreatedAt,
	)
	return
}

func Session(w http.ResponseWriter, r *http.Request) (session Session_, err error) {
	cookie, err := r.Cookie("_session_")
	if err != nil {
		err = errors.New("error occurred while retreiving cookie")
		return
	}
	session = Session_{
		Uuid: cookie.Value,
	}
	ok, err := session.Check()
	if err != nil {
		err = errors.New("error occurred while checking session")
		return
	}
	if ok == false {
		err = errors.New("invalid sessions")
		return
	}
	return
}

// retrieves a user's session from database
func (user *User) Session() (session Session_, err error) {
	session = Session_{}
	err = Db.QueryRow(
		`SELECT id, uuid, user_id, user_uuid, keep_login, created_at
		FROM sessions WHERE user_uuid = $1
		`, user.Uuid,
	).Scan(
		&session.Id, &session.Uuid, &session.UserId, &session.UserUuid,
		&session.KeepLogged, &session.CreatedAt,
	)
	return
}

// check is session is valid in the database
func (session *Session_) Check() (valid bool, err error) {
	err = Db.QueryRow(
		`SELECT id, uuid, user_id, user_uuid, keep_login, created_at
		FROM sessions WHERE uuid = $1`, session.Uuid,
	).Scan(
		&session.Id, &session.Uuid, &session.UserId, &session.UserUuid,
		&session.KeepLogged, &session.CreatedAt,
	)
	if err != nil {
		valid = false
		return
	}
	if session.Id != 0 {
		valid = true
	}
	return
}

// deletes sessions from database
func (session *Session_) DeleteByUUID() (err error) {
	_, err = Db.Exec("DELETE FROM session WHERE uuid = $1", session.Uuid)
	if err != nil {
		return
	}
	return
}

// gets the user from the session
func (session *Session_) User() (user User, err error) {
	user = User{}
	err = Db.QueryRow(
		`id, email, name, uuid, password, privileges, created_at
		FROM users WHERE uuid = $1`, session.UserUuid,
	).Scan(
		&user.Id, &user.Email, &user.Name, &user.Uuid,
		&user.Password, &user.Privileges, &user.CreatedAt,
	)
	return
}

// deletes all session entries in the database
// this means everyone has been logged out
func DeleteAllSessions() (err error) {
	err = ClearTable("sessions")
	return
}
