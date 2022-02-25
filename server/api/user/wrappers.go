package user

import "net/http"

func authWrapper(w http.ResponseWriter, r *http.Request) {
	Auth(w, r)
	// reply to the http network
	// close the connection
}

func signupWrapper(w http.ResponseWriter, r *http.Request) {
	Auth(w, r)
	// reply to the http network
	// close the connection
}

func updateWrapper(w http.ResponseWriter, r *http.Request) {
	Auth(w, r)
	// reply to the http network
	// close the connection
}

func deleteWrapper(w http.ResponseWriter, r *http.Request) {
	Auth(w, r)
	// reply to the http network
	// close the connection
}
