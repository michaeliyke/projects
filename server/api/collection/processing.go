package collection

import (
	"net/http"
	. "projects/server/util"
)

func processGetListing(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}

func processPostListing(w http.ResponseWriter, r *http.Request) {
	contentslength := r.ContentLength
	body := make([]byte, contentslength)
	var l *listing = &listing{Collections: []string{"all"}}
	r.Body.Read(body)
	err := Unmarshal(body, &l)
	if err != nil {
		HTTPError(w, r)
	}
	err = l.post()
	if err != nil {
		HTTPError(w, r)
		Report("cannot create listing")
	}
	txt, _ := MarshalIndent(l, "", " ")
	Log(txt)
	HTTPJsonResponse(w, r, txt)
	// return helpers.ServerOK(w, r)
}

func processUpdateListing(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}

func processDeleteListing(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}
