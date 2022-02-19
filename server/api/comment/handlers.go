package comment

import (
	"net/http"
	"projects/server/api/helpers"
)

func listingHandler(w http.ResponseWriter, r *http.Request) {
	mult := helpers.M{
		"GET":    processGetListing,
		"POST":   processPostListing,
		"PUT":    processUpdateListing,
		"DELETE": processDeleteListing,
	}
	helpers.Multiplex(mult, "/api/collection/listing/", w, r)
}
