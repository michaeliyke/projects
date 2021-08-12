package main

import (
	"net/http"
	"strings"
	"time"

	. "github.com/michaeliyke/Golang/log"
)

// Processes user login - /account/login/
func ProcessUserAuth(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		Log("Form parsing failed----------- :", err)
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	email := strings.TrimSpace(r.FormValue("email"))
	err = ValidateEmail(email)
	if err != nil {
		Log("Email validation failed ------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	err = ValidatePassword(r.FormValue("password"))
	if err != nil {
		Log("password validation failed-------- : ", err)
		ErrorMessage(w, r, "invalid password")
		return
	}
	keepLogged := r.FormValue("keep-login") == "on"
	user := User{
		Email:      email,
		KeepLogged: keepLogged,
	}
	err = user.Authenticate(w, r)
	if err != nil {
		Log("User Auth failed ------------ : ", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

// Processes user help - /help/
func ProcessHelp(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		Log("Form parsing failed----------- :", err)
		ErrorMessage(w, r, "could not parse form")
		return
	}
	email := strings.TrimSpace(r.FormValue("email"))
	err = ValidateEmail(email)
	if err != nil {
		Log("Email validation failed ------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	fullName := strings.TrimSpace(r.FormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		Log("Name validation failed--------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	message := strings.TrimSpace(r.FormValue("message"))
	err = ValidateMessage(message)
	if err != nil {
		Log("message validation failed--------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}

	help := &HELPStruct{
		Name:      fullName,
		Email:     email,
		Uuid:      CreateUuid(),
		Message:   EscapeHtml(message),
		CreatedAt: time.Now(),
	}

	err = SendHelp(help)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}

	InfoMessage(w, r, "Thank you for contacting us. Our reply is on its way")
	return
}

// Processes user logout - /account/logout/
func ProcessUserLogout(w http.ResponseWriter, r *http.Request) {
	err := Logout(w, r)
	if err != nil {
		Log("error looging user out: ", err)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

// Processes account update - /account/update/
func ProcessAccountUpdate(w http.ResponseWriter, r *http.Request) {
	// assemble user details from form
	err := r.ParseForm()
	if err != nil {
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	// wILL WORK ON THIS LATER ON
}

// Processes comments - /user/comments/
func ProcessComments(w http.ResponseWriter, r *http.Request) {}

// Processes chat - /client/chat/
func ProcessChat(w http.ResponseWriter, r *http.Request) {}

// Processes signup - /account/signup/
func ProcessSignUp(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		Log("Form parsing failed ------- :", err)
		ErrorMessage(w, r, "invalid information in form")
		return
	}
	// Log("Form ok -----------------------------")
	email := strings.TrimSpace(r.FormValue("email"))
	err = ValidateEmail(email)
	if err != nil {
		Log("Email validation failed-------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	fullName := strings.TrimSpace(r.FormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		Log("Name validation failed--------- :", err)
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
		Log("Create Account Failed-------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	err = user.Authenticate(w, r)
	if err != nil {
		Log("User Auth Failed------------: ", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

// Processes feedback - /user/feedback/
func ProcessFeedback(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		ErrorMessage(w, r, msgInvalid)
		return
	}
	email := strings.TrimSpace(r.FormValue("email"))
	err = ValidateEmail(email)
	if err != nil {
		Log(err)
		ErrorMessage(w, r, msgInvalid)
		return
	}
	fullName := strings.TrimSpace(r.FormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		Log(err)
		ErrorMessage(w, r, msgInvalid)
		return
	}
	message := strings.TrimSpace(r.FormValue("fullname"))
	err = ValidateMessage(message)
	if err != nil {
		Log(err)
		ErrorMessage(w, r, msgInvalid)
		return
	}
	err = SendHelp(&HELPStruct{Email: email, Name: fullName, Message: message})
	return
}

// A single multipler orginally used. Was faulted for lack of flexibility
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
