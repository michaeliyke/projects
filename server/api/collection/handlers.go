package collection

import (
	"net/http"
	"projects/server/api/helpers"
)

func notImplemented(w http.ResponseWriter, r *http.Request) {
	helpers.ServerNotImplemented(w, r)
}

func root(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}

func listingHandler(w http.ResponseWriter, r *http.Request) {
	mult := helpers.M{
		"GET":    processGetListing,
		"POST":   processPostListing,
		"PUT":    processUpdateListing,
		"DELETE": processDeleteListing,
	}
	helpers.Multiplex(mult, "/api/collection/listing/", w, r)
}

func listingsHandler(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}

func tempHandler(w http.ResponseWriter, r *http.Request) {
	helpers.ServerOK(w, r)
}
