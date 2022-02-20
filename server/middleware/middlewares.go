package middleware

import (
	"net/http"
	. "projects/server/api/helpers"
	. "projects/server/util"
)

var Mt MT = CreateMult()
var Mt2 MT

func init() {
	Mt.AddAll(
		MT{
			"/account/login/":      {"GET": ServeLogin},
			"/account/":            {"GET": RedirectToNotFound},
			"/account/signup/":     {"GET": ServeSignUp},
			"/account/logout/":     {"GET": ServeLogout},
			"/account/update/":     {"GET": ServeUpdateProfile},
			"/user/comments/":      {"GET": ServeComments},
			"/user/feedback/":      {"GET": ServeFeedback},
			"/user/chat/":          {"GET": ServeChat},
			"/":                    {"GET": ServeIndex},
			"/notfound/":           {"GET": Serve404},
			"/errpg/":              {"GET": ServeErrPg},
			"/help/":               {"GET": ServeHelp},
			"/t/":                  {"GET": ServeT},
			"/collections/manage/": {"GET": ServeManageRecords},
		},
	)

	Mt2 = CreateMult(
		MT{
			"/signup/":   {},
			"/login/":    {},
			"/logout/":   {},
			"/account/":  {},
			"/comments/": {},
		},
	)
	Mt2.Map(func(s string, m M) M {
		if s == "/comments/" {
			s = "/user/comments/"
		} else {
			s = "/account" + s
		}
		m["GET"] = HandlerFunc(RouteTo(s))
		return m
	})
}

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

func GeneralServeMux(w http.ResponseWriter, r *http.Request) (sh HandlerFunc) {
	// sh means serveHandler
	var m M
	path := Path(r)
	if Mt.Has(path) {
		m = Mt.Get(path)
		sh = m[r.Method]
	}
	if sh == nil {
		sh = RedirectToNotFound
	}
	return
}
