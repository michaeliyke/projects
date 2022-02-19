package user

import (
	"net/http"
	"projects/server/api/helpers"
	"time"
)

func notImplemented(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// ReportError(r)
		// http.Error(w, "DISALLOWED", http.StatusMethodNotAllowed)
		return
	}
	helpers.HTTPNotImplemented(w, r)
}

func root(w http.ResponseWriter, r *http.Request) {
	helpers.HTTPOk(w, r)
}

func login(w http.ResponseWriter, r *http.Request) {
	mult := helpers.M{
		"POST": processPostListing,
	}
	helpers.Multiplex(mult, "/api/collection/listing/", w, r)
}

func signup(w http.ResponseWriter, r *http.Request) {
	helpers.HTTPOk(w, r)
}

// Create user account
func CreateUserAccount(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		Log("cannot parse form", err)
		http.Redirect(w, r, "/signup", http.StatusBadRequest)
	} else {
		user := User{
			Email:      r.PostFormValue("email"),
			Name:       r.PostFormValue("full-name"),
			Uuid:       CreateUuid(),
			Password:   r.PostFormValue("password"),
			Privileges: []string{"user"},
			CreatedAt:  time.Now(),
		}
		err = user.Create()
		if err != nil {
			Log("cannot create user: ", err)
			http.Redirect(w, r, "/signup", http.StatusInternalServerError)
		} else {
			http.Redirect(w, r, "/login", http.StatusFound)
		}
	}
}

// authenticates a user in and creates cookie named __session_ for persistence
func Authenticate(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	var user User = User{Email: r.PostFormValue("email")}
	err := user.GetByEmail()
	if err != nil {
		Log("cannot find user", err)
		http.Redirect(w, r, "/login", http.StatusNotFound)
	} else {
		if user.Password == Encrypt(r.PostFormValue("password")) {
			session, err := user.CreateSession()
			if err != nil {
				Log("cannot create session", err)
				http.Redirect(w, r, "/login", http.StatusInternalServerError)
			} else {
				SetCookie(w, Config.AuthCookieName, session.Uuid, true)
				http.Redirect(w, r, "/", http.StatusFound)
			}
		} else {
			http.Redirect(w, r, "/login", http.StatusUnauthorized)
		}
	}
}

// logs a user out by revoking their session
func Logout(w http.ResponseWriter, r *http.Request) (err error) {
	cookie, err := r.Cookie("_session_")
	if err != http.ErrNoCookie {
		Log("failed to get cookie: ", err)
		session := Session_{Uuid: cookie.Value}
		session.DeleteByUUID()
	}
	return
}

func (user *User) Verify() {
}
