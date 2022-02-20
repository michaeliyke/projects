package user

import (
	"net/http"
	"projects/server/api/helpers"
	"projects/server/middleware"
)

func notImplemented(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// ReportError(r)
		// http.Error(w, "DISALLOWED", http.StatusMethodNotAllowed)
		return
	}
	helpers.HTTPNotImplemented(w, r)
}

func root(w http.ResponseWriter, r *http.Request) {
	helpers.HTTPOk(w, r)
}

func login(w http.ResponseWriter, r *http.Request) {
	mult := helpers.M{
		"POST": middleware.ProcessUserAuth,
	}
	helpers.Multiplex(mult, "/api/account/login/", w, r)
}

func signup(w http.ResponseWriter, r *http.Request) {
	mult := helpers.M{
		"POST": middleware.ProcessSignUp,
	}
	helpers.Multiplex(mult, "/api/account/signup/", w, r)
}
