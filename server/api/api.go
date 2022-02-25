package api

import (
	"net/http"
	"projects/server/api/chat"
	"projects/server/api/collection"
	"projects/server/api/user"
	"projects/server/auth"
	. "projects/server/util"
)

func API(w http.ResponseWriter, r *http.Request) {
	// TODO:
	// Perform login checks here and have a session user
	var Api HandlerFunc

	switch path := StrReplace(r.URL.Path, "/api", ""); PathRoot(path) {
	case "/":
		Api = HTTPNotAllowed
	case "/chat/":
		Api = chat.Api
	case "/collection/":
		Api = collection.Api
	case "/comment/":
		Api = user.CommentApi
	case "/user/", "/account/":
		Api = user.Api
	default:
		Api = HTTPNotImplemented
	}

	if Api == nil {
		ReportError("Invalid path")
		HTTPNotFound(w, r)
		return
	}

	Api(w, r)

}

// For Rememberance only
func UserHandler(w http.ResponseWriter, r *http.Request, user IUser) {
	var err error
	switch r.Method {
	case "GET":
		Log("GET user")
		err = auth.UserGET(w, r, user)
	case "POST":
		Log("POST handling")
		err = auth.UserPOST(w, r, user)
	case "PUT":
		Log("PUT handling")
		err = auth.UserPUT(w, r, user)
	case "DELETE":
		Log("DELETE handling")
		err = auth.UserDELETE(w, r, user)
	case "DEFAULT":
		Log("DEFAULT handling")
		w.WriteHeader(http.StatusNotImplemented)
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
