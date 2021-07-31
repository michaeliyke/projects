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
	// Log("Auth Endpoint Herereer")
	err := r.ParseForm()
	if err != nil {
		// Log("Form parsing failed-----------")
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	// Log("Form parsed ok -----------")
	email, err := ValidateEmail(strings.TrimSpace(r.FormValue("email")))
	if err != nil {
		// Log("Email validation failed --------------------")
		ErrorMessage(w, r, err.Error())
		return
	}
	err = ValidatePassword(r.FormValue("password"))
	if err != nil {
		ErrorMessage(w, r, "invalid password")
		return
	}
	// Log("Email ok------------------")
	keepLogged := r.FormValue("keep-login") == "on"
	user := User{
		Email:      email,
		KeepLogged: keepLogged,
	}
	// Log("User create ok --------------------")
	err = user.Authenticate(w, r)
	if err != nil {
		Log("User Auth failed -------------------- : ", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	Log("Auth ok ------------------")
	Log("User: ", user)
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

// /user/logout/ --> this logs out a user
func EndPointUserLogout(w http.ResponseWriter, r *http.Request) {
	err := Logout(w, r)
	if err != nil {
		Log("error looging user out: ", err)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func EndPointUpdateProfile(w http.ResponseWriter, r *http.Request) {
	// assemble user details from form
	err := r.ParseForm()
	if err != nil {
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	// wILL WORK ON THIS LATER ON
}

// /user/create/  --> this creates a new user
func EndPointUserCreate(w http.ResponseWriter, r *http.Request) {
	// Log("User Create Herererererererererer")
	err := r.ParseForm()
	if err != nil {
		// Log("Form parsing failed ---------------- :", err)
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	// Log("Form ok -----------------------------")
	email, err := ValidateEmail(strings.TrimSpace(r.FormValue("email")))
	if err != nil {
		// Log("Email validation failed -------------------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	// Log("Email ok--------------------- :", email)
	fullName, err := ValidateFullName(strings.TrimSpace(r.FormValue("fullname")))
	if err != nil {
		// Log("Name validation failed------------------ :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	// Log("Name ok-------------------------- :", fullName)
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
	// Log("User create ok---------------------- :", err)
	err = user.CreateAcount(w, r)
	if err != nil {
		// Log("Create Account Failed------------------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	// Log("Create Account ok-------------------------")
	err = user.Authenticate(w, r)
	if err != nil {
		// Log("User Auth Failed----------------------: ", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	// Log("User Autyh ok ---------------")
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

func EndPointUserFeedback(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	email := mail.NewMessage()
	email.SetHeader("To", "admin@example.com")
	email.SetHeader("From", "server@example.com")
	email.SetHeader("Reply-To", "user@email.com")
	email.SetHeader("Subject", "Feedback Message from Projects")
	email.SetBody("text/plain", "Be kind, be generous!")

	// Details for your mailtrap.io account
	username := "mike"
	password := "micky"
	err = mail.NewDialer(
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
