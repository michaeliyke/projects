package user

import (
	"net/http"
	. "projects/server/auth"
	. "projects/server/util"
	"projects/server/util/reason"
	"strings"

	"time"
)

func Auth(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	form := Form(w, r)
	email := form.POST("email", true)
	pwd := form.POST("password")
	keepLogged := form.POST("keep-login") == "on"
	err := ValidateEmail(email)
	if err != nil {
		return res.ReportError(err, reason.InvalidEmail)
	}
	err = ValidatePassword(pwd)
	if err != nil {
		return res.ReportError(err, reason.InvalidPassword)
	}

	user := User{
		Email:      email,
		KeepLogged: keepLogged,
	}
	err = user.Authenticate(w, r)
	if err != nil {
		return res.ReportError(err, reason.AuthFail)
	}
	return res.ResponseOk([]byte(nil))
}

func Signup(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	var form RequestFields = Form(w, r)
	email := form.POST("email", true)
	err := ValidateEmail(email)
	if err != nil {
		return res.ReportError(err, reason.InvalidEmail)
	}
	fullName := form.POST("fullname", true)
	err = ValidateFullName(fullName)
	if err != nil {
		return res.ReportError(err, reason.InvalidName)
	}
	err = ValidatePassword(r.PostFormValue("password"))
	if err != nil {
		return res.ReportError(err, reason.InvalidPassword)
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
		return res.ReportError(err, reason.AcctCreateFail)
	}
	err = user.Authenticate(w, r)
	if err != nil {
		return res.ReportError(err, reason.AuthFail)
	}
	return res.ResponseOk([]byte(nil))
}

func delete(w http.ResponseWriter, r *http.Request) {
}

func Logout(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	err := AcctLogout(w, r)
	if err != nil {
		return res.ReportError(err, reason.CookieNotFound)
	}
	return res.ResponseOk([]byte(nil))
}

// Processes comments - /user/comments/
func Comments(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	form := Form(w, r)
	body := form.POST("body")
	err := ValidateMessage(body)
	if err != nil {
		return res.ReportError(err, reason.InvalidMessage)
	}
	session, err := Session(w, r)
	if err != nil {
		return res.ReportError(err, reason.SessionCheckFail)
	}
	comment := &CommentStruct{
		UserUuid:  session.UserUuid,
		Uuid:      CreateUuid(),
		Body:      body,
		CreatedAt: time.Now(),
	}
	err = SendComment(comment)
	if err != nil {
		return res.ReportError(err, reason.CommentCreateFail)
	}
	return res.ResponseOk([]byte(nil))
}

// Processes user help - /help/
func Help(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	var form RequestFields = Form(w, r)
	email := form.POST("email", true)
	err := ValidateEmail(email)
	if err != nil {
		return res.ReportError(err, reason.InvalidEmail)
	}
	fullName := strings.TrimSpace(r.PostFormValue("fullname"))
	err = ValidateFullName(fullName)
	if err != nil {
		return res.ReportError(err, reason.InvalidName)
	}
	body := form.POST("body", true)
	err = ValidateMessage(body)
	if err != nil {
		return res.ReportError(err, reason.InvalidField)
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
		return res.ReportError(err, reason.HelpCreateFail)
	}
	return res.ResponseOk([]byte(nil))
}

// Processes account update - /account/update/
func Update(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	err := r.ParseForm()
	if err != nil {
		return res.ReportError(err, reason.InvalidInfo)
	}
	// wILL WORK ON THIS LATER ON
	return res.ResponseOk([]byte(nil))
}

// Processes feedback - /user/feedback/
func Feedback(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	var form RequestFields = Form(w, r)
	rating, err := String_2_Int(form.POST("rating"))
	if err != nil {
		return res.ReportError(NewError("Rating field must be numeric"), reason.InvalidField)
	}
	err = ValidateRating(rating)
	if err != nil {
		return res.ReportError(NewError("Invalid rating"), reason.InvalidField)
	}
	body := form.POST("body", true)
	err = ValidateMessage(body)
	if err != nil {
		return res.ReportError(err, reason.InvalidField)
	}
	session, err := Session(w, r)
	if err != nil {
		return res.ReportError(err, reason.SessionCheckFail)
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
		return res.ReportError(err, reason.FeedbackCreateFail)
	}
	return res.ResponseOk([]byte(nil))
}

func Profile(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	return Update(w, r)
}
