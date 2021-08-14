package main

import (
	"net/http"
	"strings"
)

type UserMiddleware struct{}

func (user *UserMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//
}

// The M type specifies request methods and their handlers for an endpoint.
//
// It's a map of request methods to their respecive handlers on an endpoint,
// one for each.
//
// Only specified entries are considerd to be allowed.
// Request whose entries are not present are treated as error
type M map[string]func(w http.ResponseWriter, r *http.Request)

// Routes all requests: POST, GET, PATCH, PUT, DELETE, HEAD, OPTIONS, etc
// to matching handlers.
// All requests on a route are disallowed by default except its a GET.
// If it's a GET and no handler is found, it's directed to 404.
// For others, if handler is not found, disallowed header is issued
func Multiplex(routes M, route string, w http.ResponseWriter, r *http.Request) {
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

// RouteTo reroutes a path to another
//
// Returns http.HandlerFunc
func RouteTo(route string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, IncludeURIParts(route, r), http.StatusFound)
	}
}

// Index router - "/"
func Index(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeIndex}
	Multiplex(mult, "/", w, r)
}

// 404 router - "/notfound/"
func NotFound(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": Serve404}
	Multiplex(mult, "/notfound/", w, r)
}

// Logout router - /account/logout/
func LogOut(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeLogout}
	Multiplex(mult, "/account/logout/", w, r)
}

// Error page router - /errpg/
func ErrPG(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeErrPg}
	Multiplex(mult, "/errpg/", w, r)
}

// Help router - /help/
func Help(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeHelp, "POST": ProcessHelp}
	Multiplex(mult, "/help/", w, r)
}

// Signup router - /account/signup/
func SignUp(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeSignUp, "POST": ProcessSignUp}
	Multiplex(mult, "/account/signup/", w, r)
}

// Login router - /account/login/
func LogIn(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeLogin, "POST": ProcessUserAuth}
	Multiplex(mult, "/account/login/", w, r)
}

// Account update router - /account/update/
func AccountUpdate(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeUpdateProfile, "POST": ProcessAccountUpdate}
	Multiplex(mult, "/account/update/", w, r)
}

// Feed back router - /user/feedback/
func Feedback(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeFeedback, "POST": ProcessFeedback}
	Multiplex(mult, "/user/feedback/", w, r)
}

// Comments router - /comments/
func Comments(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeComments, "POST": ProcessComments}
	Multiplex(mult, "/user/comments/", w, r)
}

// Chat router - /client/chat/
func Chat(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeChat, "POST": ProcessChat}
	Multiplex(mult, "/client/chat/", w, r)
}

// Record management router - /app/manage/
func ManageRecords(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeManageRecords}
	Multiplex(mult, "/app/manage/", w, r)
}

// Record management router - /app/manage/
func T(w http.ResponseWriter, r *http.Request) {
	mult := M{"GET": ServeT}
	Multiplex(mult, "/t/", w, r)
}
