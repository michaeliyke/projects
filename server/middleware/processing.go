package middleware

import (
	"net/http"
	. "projects/server/auth"
	. "projects/server/util"
	"strings"
	"time"
)

// Processes user login - /account/login/
func ProcessUserAuth(w http.ResponseWriter, r *http.Request) {
	email := strings.TrimSpace(r.PostFormValue("email"))
	err := ValidateEmail(email)
	if err != nil {
		ReportError(err.Error())
		return
	}
	err = ValidatePassword(r.PostFormValue("password"))
	if err != nil {
		ReportError(err.Error())
		return
	}
	keepLogged := r.PostFormValue("keep-login") == "on"
	user := User{
		Email:      email,
		KeepLogged: keepLogged,
	}
	err = user.Authenticate(w, r)
	if err != nil {
		ReportError(err.Error())
		return
	}
	RedirectToReferer(w, r)
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
	email := strings.TrimSpace(r.PostFormValue("email"))
	err = ValidateEmail(email)
	if err != nil {
		Log("Email validation failed ------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	fullName := strings.TrimSpace(r.PostFormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		Log("Name validation failed--------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}
	body := strings.TrimSpace(r.PostFormValue("body"))
	err = ValidateMessage(body)
	if err != nil {
		Log("message validation failed--------- :", err)
		ErrorMessage(w, r, err.Error())
		return
	}

	session, _ := Session(w, r)

	help := &HELPStruct{
		Name:      fullName,
		Email:     email,
		UserUuid:  session.UserUuid,
		Uuid:      CreateUuid(),
		Body:      EscapeHtml(body),
		CreatedAt: time.Now(),
	}

	err = SendHelp(help)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}

	s := "Thank you for contacting us. Our response is on its way"
	InfoMessage(w, r, s)
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
func ProcessComments(w http.ResponseWriter, r *http.Request) {
	body := strings.TrimSpace(r.PostFormValue("body"))
	err := ValidateMessage(body)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	session, err := Session(w, r)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	comment := &CommentStruct{
		UserUuid:  session.UserUuid,
		Uuid:      CreateUuid(),
		Body:      body,
		CreatedAt: time.Now(),
	}
	err = SendComment(comment)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	RedirectTo("/user/comments/", w, r)
	return
}

// Processes chat - /client/chat/
func ProcessChat(w http.ResponseWriter, r *http.Request) {}

// Processes signup - /account/signup/
func ProcessSignUp(w http.ResponseWriter, r *http.Request) {
	email := strings.TrimSpace(r.PostFormValue("email"))
	err := ValidateEmail(email)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	fullName := strings.TrimSpace(r.PostFormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	err = ValidatePassword(r.PostFormValue("password"))
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	password := Encrypt(r.PostFormValue("password"))
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
		ErrorMessage(w, r, err.Error())
		return
	}
	err = user.Authenticate(w, r)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	RedirectToReferer(w, r)
	return
}

// Processes feedback - /user/feedback/
func ProcessFeedback(w http.ResponseWriter, r *http.Request) {
	rating, err := String_2_Int(r.PostFormValue("rating"))
	if err != nil {
		ErrorMessage(w, r, "Invalid rating")
		return
	}
	err = ValidateRating(rating)
	if err != nil {
		ErrorMessage(w, r, "Invaid rating")
		return
	}
	body := strings.TrimSpace(r.PostFormValue("body"))
	err = ValidateMessage(body)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	session, err := Session(w, r)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	feedback := &FeedbackStruct{
		UserUuid:  session.UserUuid,
		Uuid:      CreateUuid(),
		Rating:    rating,
		Body:      body,
		CreatedAt: time.Now(),
	}
	err = SendFeedback(feedback)
	if err != nil {
		ErrorMessage(w, r, err.Error())
		return
	}
	s := "Thanks for your feedback. Our response is on its way!"
	InfoMessage(w, r, s)
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
