package middleware

import (
	"net/http"
	"projects/server/api/helpers"
	. "projects/server/util"
)

type ServeMuxFunc func(w http.ResponseWriter, r *http.Request) HandlerFunc

type ServeMux struct {
	*http.ServeMux
}

func NewServeMux() *ServeMux {
	mux := http.NewServeMux()
	s := &ServeMux{mux}
	return s
}

func (s *ServeMux) RouteTo(pattern string) {}

// Run the function to determine the status of operation.
//
// A handler is returned if static page is served, and nil if not.
//
// If it returns nil, then execution redirects to api handlers
func (s *ServeMux) Delegate(pattern string, cb ServeMuxFunc, serveStatic bool) {
	var server HandlerFunc
	server = func(w http.ResponseWriter, r *http.Request) {
		var serveHandler HandlerFunc
		if serveStatic { // Should a static page be served
			serveHandler = cb(w, r)
			if serveHandler != nil && r.Method == "GET" {
				serveHandler(w, r)
				return
			}
			// Either the method is not GET or path  faile to match
			RedirectToNotFound(w, r)
			return
		}
		RedirectTo("/api/"+pattern, w, r)
	}
	s.HandleFunc(pattern, server)
}

// RouteTo reroutes a path to another
//
// Returns http.HandlerFunc
func RouteTo(route string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, IncludeURIParts(route, r), http.StatusFound)
	}
}

func AccountServeMux(w http.ResponseWriter, r *http.Request) (sh HandlerFunc) {
	// sh means serveHandler
	switch path := StrReplace(r.URL.Path, "/account", ""); PathRoot(path) {
	case "/":
		sh = RedirectToNotFound
	case "/signup/":
		sh = ServeSignUp
	case "/login/":
		sh = ServeLogin
	case "/logout/":
		sh = ServeLogout
	case "/update/":
		sh = ServeUpdateProfile
	case "/user/":
		switch path := StrReplace(r.URL.Path, "/user", ""); PathRoot(path) {
		case "/comments/":
			sh = ServeComments
		case "/feedback/":
			sh = ServeFeedback
		case "/chat/":
			sh = ServeChat
		}
	default:
		sh = helpers.HTTPNotImplemented
	}
	return
}

// Signup router - /account/signup/
func GeneralServeMux(w http.ResponseWriter, r *http.Request) (sh HandlerFunc) {
	// sh means serveHandler
	switch PathRoot(r.URL.Path) {
	case "/":
		sh = ServeIndex
	case "/notfound/":
		sh = Serve404
	case "/errpg/":
		sh = ServeErrPg
	case "/help/":
		sh = ServeHelp
	case "/t/":
		sh = ServeT
	case "/collections/":
		switch path := StrReplace(r.URL.Path, "/collections", ""); PathRoot(path) {
		case "/manage/":
			sh = ServeManageRecords
		}
	default:
		sh = RedirectToNotFound
	}
	return
}
