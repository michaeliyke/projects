package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

// general handler for the multiplexer
func UserHandler(user IUser) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var err error
		switch r.Method {
		case "GET":
			Log("GET user")
			err = UserGET(w, r, user)
		case "POST":
			Log("POST handling")
			err = UserPOST(w, r, user)
		case "PUT":
			Log("PUT handling")
			err = UserPUT(w, r, user)
		case "DELETE":
			Log("DELETE handling")
			err = UserDELETE(w, r, user)
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
}
