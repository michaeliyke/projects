package user

import (
	"net/http"
	. "projects/server/util"
	"projects/server/util/reason"
	"projects/server/util/responses/comment"
	"projects/server/util/responses/help"

	"projects/server/util/responses/feedback"
	"projects/server/util/session"
	. "projects/server/util/session"
	. "projects/server/util/validation"

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
		return res.ReportError(err, reason.InvalidField)
	}
	comment := comment.New(body)
	session, err := session.Session(w, r)
	if err != nil {
		return res.ReportError(err, reason.SessionRetrieveFail)
	}
	comment.UserUuid = session.UserUuid
	err = comment.Post()
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
	fullName := form.POST("fullname", true)
	err = ValidateFullName(fullName)
	if err != nil {
		return res.ReportError(err, reason.InvalidName)
	}

	body := form.POST("body", true)
	err = ValidateMessage(body)
	if err != nil {
		return res.ReportError(err, reason.InvalidField)
	}

	h := help.New(body)
	session, err := Session(w, r)
	if err != nil {
		return res.ReportError(err, reason.SessionRetrieveFail)
	}

	h.Name = fullName
	h.Email = email
	h.UserUuid = session.UserUuid
	err = h.Post()

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
		return res.ReportError(err, reason.SessionRetrieveFail)
	}

	feedback := feedback.New(body)
	feedback.UserUuid = session.UserUuid
	feedback.Rating = rating

	err = feedback.Post()
	if err != nil {
		return res.ReportError(err, reason.FeedbackCreateFail)
	}

	return res.ResponseOk([]byte(nil))
}

func Profile(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	return Update(w, r)
}
