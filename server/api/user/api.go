package user

import (
	"net/http"
	"projects/server/api/helpers"
	. "projects/server/util"
)

// /api/user/*
// /api/account/*

func Api(w http.ResponseWriter, r *http.Request) {
	var handler HandlerFunc
	path := StrReplace(r.URL.Path, "/api/collection", "")
	switch endpoint := AddTrailingSlash(path); {
	case endpoint == "/":
		handler = helpers.HTTPNotAllowed
	case endpoint == "/login/":
		handler = login
	case endpoint == "/signup/":
		handler = signup
	case endpoint == "/update/":
		handler = signup
	case endpoint == "/feedback/":
		handler = signup
	case endpoint == "/comments/":
		handler = signup
	default:
		handler = notImplemented
	}
	handler(w, r)
}
