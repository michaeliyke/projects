package auth

import (
	"net/http"
	. "projects/server/util"
	"time"

	"github.com/lib/pq"
)

type Session_ struct {
	Id         int       `json:"id"`
	Uuid       string    `json:"uuid"`
	UserId     int       `json:"user_id"`
	UserUuid   string    `json:"user_uuid"`
	KeepLogged bool      `json:"keep_login"`
	CreatedAt  time.Time `json:"created_at"`
	User       User      `json:"user"`
}

func GetCookie(r *http.Request, name string) (cookie *http.Cookie, err error) {
	cookie, err = r.Cookie(name)
	if err == http.ErrNoCookie {
		err = NewError(Sprintf("cookie '%v' could not be found.", name))
		return
	}
	if err != nil {
		err = NewError("cookie not found")
		return
	}
	// Log("Found token: ", cookie)
	return
}

func SetCookie(w http.ResponseWriter, n string, v string, keepLogged bool) {
	cookie := http.Cookie{
		Name:     n,
		Value:    v,
		HttpOnly: true,
		Path:     "/",
		// HttpOnly - allow access to http and https protocols and non else
		// So, only http clients can access the cookie, AJAX can't
	}
	if keepLogged {
		cookie.MaxAge = 1 * 60 * 60 * 24 * 30
	}
	// add the cookie to the reponse header
	http.SetCookie(w, &cookie)
}

func UnsetCookie(w http.ResponseWriter, n string) (cookie *http.Cookie, err error) {
	// For logging out: MaxAge: -1
	cookie = &http.Cookie{
		Name:     n,
		Value:    "expired",
		HttpOnly: true,
		Path:     "/",
		MaxAge:   -1,
	}
	http.SetCookie(w, cookie)
	return
}

// creates a new session
func (user *User) CreateSession() (session Session_, err error) {
	if !(user.Id > 0 && len(user.Uuid) > 10) {
		err = NewError("incorrect user information")
		return
	}
	stmt, err := Db.Prepare(
		`INSERT INTO sessions( user_id, user_uuid, uuid, keep_login, created_at)
		VALUES($1, $2, $3, $4, $5)
		RETURNING id, user_id, user_uuid, uuid, keep_login, created_at`,
	)
	if err != nil {
		return
	}
	err = stmt.QueryRow(
		user.Id, user.Uuid, CreateUuid(), user.KeepLogged, time.Now(),
	).Scan(
		&session.Id, &session.UserId, &session.UserUuid, &session.Uuid,
		&session.KeepLogged, &session.CreatedAt,
	)
	session.User = *user
	stmt.Close()
	return
}

func Session(w http.ResponseWriter, r *http.Request) (session Session_, err error) {
	cookie, err := GetCookie(r, Config.AuthCookieName)
	if err != nil {
		return
	}
	if err = ValidateUuid(cookie.Value); err != nil {
		return
	}
	session.Uuid = cookie.Value
	ok, err := session.Check()
	if err != nil {
		// Log(err)
		err = NewError("session not found")
		return
	}
	if ok == false {
		err = NewError("invalid sessions")
		return
	}
	return
}

// retrieves a user's session from database
func (user *User) Session() (session Session_, err error) {
	err = Db.QueryRow(
		`SELECT s.id, s.uuid, s.keep_login, s.created_at,
		s.user_id, s.user_uuid,
		 u.id, u.name, u.email, u.uuid, u.password, u.privileges
		FROM sessions AS s JOIN users AS u ON s.user_uuid = u.uuid
		WHERE s.user_uuid = $1
		`, user.Uuid,
	).Scan(
		&session.Id, &session.Uuid, &session.KeepLogged, &session.CreatedAt,
		&session.UserId, &session.UserUuid,
		&session.User.Id, &session.User.Name, &session.User.Email,
		&session.User.Uuid, &session.User.Password, &session.User.Privileges,
	)
	user.Id = session.User.Id
	user.Name = session.User.Name
	user.Email = session.User.Email
	user.Uuid = session.User.Uuid
	user.Password = session.User.Password
	user.Privileges = session.User.Privileges
	return
}

// check is session is valid in the database
func (session *Session_) Check() (valid bool, err error) {
	err = session.Retrieve()
	return err == nil, err
}

// retrieves a user's session from database
func (session *Session_) Retrieve() (err error) {
	err = Db.QueryRow(
		`SELECT s.id, s.uuid, s.keep_login, s.created_at, 
			s.user_id, s.user_uuid,
			u.id, u.name, u.email, u.uuid, u.password, u.privileges
		FROM sessions AS s JOIN users AS u ON s.user_uuid = u.uuid
		WHERE s.uuid = $1`, session.Uuid,
	).Scan(
		&session.Id, &session.Uuid, &session.KeepLogged, &session.CreatedAt,
		&session.UserId, &session.UserUuid,
		&session.User.Id, &session.User.Name, &session.User.Email,
		&session.User.Uuid, &session.User.Password,
		pq.Array(&session.User.Privileges),
	)
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

// deletes all session entries in the database
// this means everyone has been logged out
func DeleteAllSessions() (err error) {
	err = ClearTable("sessions")
	return
}
