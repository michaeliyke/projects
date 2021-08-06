package main

import (
	"net/http"
	"strings"
)

type UserMiddleware struct{}

func (user *UserMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//
}

type m map[string]func(w http.ResponseWriter, r *http.Request)

// routes all requests: POST, GET, PATCH, PUT, DELETE, HEAD, OPTIONS, etc
// To matching handlers.
// Not implemented header is issued if no match is found
func Multiplex(routes m, route string, w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, route)
	var routed bool
	for method, handler := range routes {
		if strings.ToUpper(method) == r.Method {
			handler(w, r)
			routed = true
		}
	}
	if routed == false {
		// Prepare for Not Implemented response Ssituation
		if r.Method == "GET" {
			// Route to not found page
			RedirectTo("/notfound/", w, r)
			return
		}
		Note(r)
		http.Error(w, "DISALLOWED", http.StatusMethodNotAllowed)
	}
}

func Index(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeIndex}
	Multiplex(mult, "/", w, r)
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": Serve404}
	Multiplex(mult, "/notfound/", w, r)
}

func LogOut(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeLogout}
	Multiplex(mult, "/account/logout/", w, r)
}

func ErrPG(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeErrPg}
	Multiplex(mult, "/errpg/", w, r)
}

func ContactUs(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeContactUs}
	Multiplex(mult, "/contact-us/", w, r)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeSignUp, "POST": EndPointUserCreate}
	Multiplex(mult, "/account/signup/", w, r)
}

func LogIn(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeLogin, "POST": EndPointUserAuth}
	Multiplex(mult, "/account/login/", w, r)
}

func AccountUpdate(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeUpdateProfile, "POST": EndPointUpdateProfile}
	Multiplex(mult, "/account/preferences/", w, r)
}

func Feedback(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeFeedback, "POST": EndPointProcessFeedback}
	Multiplex(mult, "/user/feedback/", w, r)
}

func Comments(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeComments, "POST": EndPointProcessComment}
	Multiplex(mult, "/user/comments/", w, r)
}

func Chat(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeChat, "POST": EndPointProcessChat}
	Multiplex(mult, "/client/chat/", w, r)
}

func ManageRecords(w http.ResponseWriter, r *http.Request) {
	mult := m{"GET": ServeManageRecords}
	Multiplex(mult, "/app/manage/", w, r)
}
