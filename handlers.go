package main

import (
	"net/http"
	"strings"
	"time"

	"github.com/go-mail/mail"
	. "github.com/michaeliyke/Golang/log"
)

// /user/auth/  --> this authenticates a user
func EndPointUserAuth(w http.ResponseWriter, r *http.Request) {
	// requester := r.RequestURI
	err := r.ParseForm()
	if err != nil {
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	email, err := ValidateEmail(strings.TrimSpace(r.FormValue("email")))
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	password := Encrypt(r.FormValue("password"))
	keepLogged := r.FormValue("keep-login") == "on"
	user := User{
		Email:      email,
		Password:   password,
		KeepLogged: keepLogged,
	}
	err = user.Authenticate(w, r)
	if err != nil {
		http.Redirect(w, r, "/user/auth/", http.StatusFound)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

func ServeUpdatePreferences(w http.ResponseWriter, r *http.Request) {}

// /user/create/  --> this creates a new user
func EndPointUserCreate(w http.ResponseWriter, r *http.Request) {
	// requester := r.RequestURI
	email, err := ValidateEmail(strings.TrimSpace(r.FormValue("email")))
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	fullName, err := ValidateFullName(strings.TrimSpace(r.FormValue("fullname")))
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	password := Encrypt(r.FormValue("password"))
	var privileges []string = []string{"user"}
	if email == "ymichaelc@gmail.com" {
		privileges = []string{"user", "admin", "owner"}
	}
	user := User{
		Name:       fullName,
		Uuid:       CreateUuid(),
		Email:      email,
		Password:   password,
		Privileges: privileges,
		CreatedAt:  time.Now(),
	}
	err = user.CreateAcount(w, r)
	if err != nil {
		if err.Error() == "user already exists" {
			http.Redirect(w, r, "/user/auth/", http.StatusFound)
			return
		}
		http.Redirect(w, r, "/user/create/", http.StatusFound)
		return
	}
	err = user.Authenticate(w, r)
	if err != nil {
		http.Redirect(w, r, "/user/auth/", http.StatusFound)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

func EndPointUserFeedback(w http.ResponseWriter, r *http.Request) {
	email := mail.NewMessage()
	email.SetHeader("To", "admin@example.com")
	email.SetHeader("From", "server@example.com")
	email.SetHeader("Reply-To", "user@email.com")
	email.SetHeader("Subject", "Feedback Message from Projects")
	email.SetBody("text/plain", "Be kind, be generous!")

	// Details for your mailtrap.io account
	username := "mike"
	password := "micky"
	err := mail.NewDialer(
		"smtp.mailtrap.io", 25, username, password,
	).DialAndSend(email)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	return
}

// general handler for the multiplexer
func UserHandler(w http.ResponseWriter, r *http.Request, user IUser) {
	var err error
	switch r.Method {
	case "GET":
		Log("GET user")
		err = UserGET(w, r, user)
	case "POST":
		Log("POST handling")
		err = UserPOST(w, r, user)
	case "PUT":
		Log("PUT handling")
		err = UserPUT(w, r, user)
	case "DELETE":
		Log("DELETE handling")
		err = UserDELETE(w, r, user)
	case "DEFAULT":
		Log("DEFAULT handling")
		w.WriteHeader(http.StatusNotImplemented)
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
