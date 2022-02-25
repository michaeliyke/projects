package chat

import (
	"net/http"
	. "projects/server/util"
)

func notImplemented(w http.ResponseWriter, r *http.Request) {
	HTTPNotImplemented(w, r)
}

func root(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}

func listingHandler(w http.ResponseWriter, r *http.Request) {
	/*mult := M{
		"GET":    processGetListing,
		"POST":   processPostListing,
		"PUT":    processUpdateListing,
		"DELETE": processDeleteListing,
	}
	Multiplex(mult, "/api/collection/listing/", w, r)
	*/
}

func listingsHandler(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}

func tempHandler(w http.ResponseWriter, r *http.Request) {
	HTTPOk(w, r)
}
