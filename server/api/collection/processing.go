package collection

import (
	"net/http"
	"projects/server/api/helpers"
	. "projects/server/util"
)

func processGetListing(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}
func processPostListing(w http.ResponseWriter, r *http.Request) {
	// TODO: HERE
	contentslength := r.ContentLength
	body := make([]byte, contentslength)
	r.Body.Read(body)
	Log(body)
	helpers.ServerOK(w, r)
}

func processUpdateListing(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}

func processDeleteListing(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}
