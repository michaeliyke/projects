package api

import (
	"net/http"
	"projects/server/api/chat"
	"projects/server/api/collection"
	"projects/server/api/comment"
	"projects/server/api/helpers"
	"projects/server/api/user"
	. "projects/server/util"
)

func API(w http.ResponseWriter, r *http.Request) {
	// TODO:
	// Perform login checks here and have a session user
	var Api HandlerFunc

	switch path := StrReplace(r.URL.Path, "/api", ""); PathRoot(path) {
	case "/":
		Api = helpers.HTTPNotAllowed
	case "/chat/":
		Api = chat.Api
	case "/collection/":
		Api = collection.Api
	case "/comment/":
		Api = comment.Api
	case "/user/", "/account/":
		Api = user.Api
	default:
		Api = helpers.HTTPNotImplemented
	}

	if Api == nil {
		ReportError("Invalid path")
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}

	Api(w, r)

}
