package user

import (
	"net/http"
	. "projects/server/util"
)

// /api/user/*
// /api/account/*

func Api(w http.ResponseWriter, r *http.Request) {
	var handler HandlerFunc
	path := StrReplace(r.URL.Path, "/api/account", "")
	switch endpoint := AddTrailingSlash(path); {
	case endpoint == "/":
		handler = HTTPNotAllowed
	case endpoint == "/login/":
		handler = authWrapper
	case endpoint == "/signup/":
		handler = signupWrapper
	case endpoint == "/update/":
		handler = updateWrapper
	case endpoint == "/feedback/":
		handler = HTTPNotImplemented
	case endpoint == "/comments/":
		handler = HTTPNotImplemented
	default:
		handler = HTTPNotImplemented
	}
	handler(w, r)
}

func CommentApi(w http.ResponseWriter, r *http.Request) {}
