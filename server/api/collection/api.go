package collection

import (
	"net/http"
	. "projects/server/util"
)

func Api(w http.ResponseWriter, r *http.Request) {
	var handler HandlerFunc
	path := StrReplace(r.URL.Path, "/api/collection", "")
	switch endpoint := AddTrailingSlash(path); {
	case endpoint == "/":
		// handler = root
	case endpoint == "/listing/":
		handler = listingHandler
	case endpoint == "/listings/":
		// handler = listingsHandler
	default:
		// handler = notImplemented
	}

	handler(w, r)

}
