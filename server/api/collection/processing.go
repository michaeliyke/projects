package collection

import (
	"net/http"
	"projects/server/api/helpers"
	. "projects/server/util"
)

func processGetListing(w http.ResponseWriter, r *http.Request) (t Reporter) {
	return helpers.ServerOK(w, r)
}

func processPostListing(w http.ResponseWriter, r *http.Request) (t Reporter) {
	contentslength := r.ContentLength
	body := make([]byte, contentslength)
	var l *listing = &listing{Collections: []string{"all"}}
	r.Body.Read(body)
	err := Unmarshal(body, &l)
	if err != nil {
		return helpers.SeverError(w, r)
	}
	err = l.post()
	if err != nil {
		helpers.SeverError(w, r)
		return Report("cannot create listing")
	}
	txt, _ := MarshalIndent(l, "", " ")
	Log(txt)
	return helpers.ServerJsonResponse(w, r, txt)
	// return helpers.ServerOK(w, r)
}

func processUpdateListing(w http.ResponseWriter, r *http.Request) (t Reporter) {
	return helpers.ServerOK(w, r)
}

func processDeleteListing(w http.ResponseWriter, r *http.Request) (t Reporter) {
	return helpers.ServerOK(w, r)
}
