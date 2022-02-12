package api

import (
	"net/http"
	"strings"
)

type UserMiddleware struct{}

func (user *UserMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//
}

// The M type specifies request methods and their handlers for an endpoint.
//
// It's a map of request methods to their respecive handlers on an endpoint,
// one for each.
//
// Only specified entries are considerd to be allowed.
// Request whose entries are not present are treated as error
type M map[string]func(w http.ResponseWriter, r *http.Request)

// Routes all /api/ requests: POST, GET, PATCH, PUT, DELETE, HEAD, OPTIONS, etc
// to matching handlers.
//
// All requests on a /api/ route are disallowed by default unless there's a
// matching implementation.
//
// If a handler is not found for a request, not implemented header is issued.
func APIMultiplex(routes M, route string, w http.ResponseWriter, r *http.Request) {
	// checkRoute(w, r, route)
	var routed bool
	for method, handler := range routes {
		if strings.ToUpper(method) == r.Method {
			handler(w, r)
			routed = true
		}
	}
	if routed == false {
		// Prepare for Not Implemented response situations
		// Note(r)
		http.Error(w, "NOT IMPLEMENTED", http.StatusNotImplemented)
	}
}
