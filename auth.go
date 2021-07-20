package main

import (
	"net/http"
	"time"

	. "github.com/michaeliyke/Golang/log"
)

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
	user, err := GetByEmail(r.PostFormValue("email"))
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
				cookie := http.Cookie{
					Name:     "_session_",
					Value:    session.Uuid,
					HttpOnly: true,
					/*
						HttpOnly - allow access to http and https protocols and non else
						So, only http clients can access the cookie, AJAX can't
					*/
				}
				http.SetCookie(w, &cookie) // adds the cookie to the reponse header
				http.Redirect(w, r, "/", http.StatusFound)
			}
		} else {
			http.Redirect(w, r, "/login", http.StatusUnauthorized)
		}
	}
}

// logs a user out by revoking their session
func Logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("_session_")
	if err != http.ErrNoCookie {
		Log("failed to get cookie: ", err)
		session := Session_{Uuid: cookie.Value}
		session.DeleteByUUID()
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func (user *User) Verify() {
}
