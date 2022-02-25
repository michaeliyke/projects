package middleware

import (
	"net/http"
	"projects/server/api/chat"
	"projects/server/api/user"
	. "projects/server/util"
)

func authWrapper(w http.ResponseWriter, r *http.Request) {
	res := user.Auth(w, r)
	if res.Error != nil {
		ReportError(res.String)
		return
	}
	if res.Ok {
		RedirectToReferer(w, r)
	}
}

func signupWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Signup(w, r)
	if res.Error != nil {
		DisplayError(w, r, res.String)
		return
	}
	if res.Ok {
		RedirectToReferer(w, r)
	}
}

func commentsWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Comments(w, r)
	if res.Error != nil {
		DisplayError(w, r, res.String)
		return
	}
	if res.Ok {
		RedirectTo("/user/comments/", w, r)
	}
}

func updateWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Update(w, r)
	if res.Error != nil {
		DisplayError(w, r, res.String)
		return
	}
	if res.Ok {
		RedirectTo("/user/comments/", w, r)
		return
	}
}

func logoutWrapper(w http.ResponseWriter, r *http.Request) {
	res := user.Logout(w, r)
	if res.Error != nil {
		ReportError(res.String)
	}
	if res.Ok == false {
		ReportError("User logout failed undetected")
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func feedbackWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Feedback(w, r)
	if res.Error != nil {
		DisplayError(w, r, res.String)
		return
	}
	if res.Ok {
		InfoMessage(w, r, "Thanks for your feedback. Our response is on its way!")
	}
}

func chatWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = chat.Chat(w, r)
	if res.Error != nil {
		return
	}
}

func helpWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Help(w, r)
	if res.Error != nil {
		DisplayError(w, r, res.String)
		return
	}
	if res.Ok {
		InfoMessage(w, r, "Thank you for contacting us. Our response is on its way")
	}
}

func profileWrapper(w http.ResponseWriter, r *http.Request) {
	var res APIResponse = user.Profile(w, r)
	if res.Error != nil {
		return
	}
}
