package helpers

import (
	"net/http"
	"strings"
)

func NotImplemented(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT IMPLEMENTED", http.StatusNotImplemented)
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT FOUND", http.StatusNotFound)
}

func NotAllowed(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT ALLOWED", http.StatusMethodNotAllowed)
}

func ServerUnauthorized(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT AUTHORIZED", http.StatusUnauthorized)
}

func SeverError(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "INTERNAL SERVER ERROR", http.StatusInternalServerError)
}

func ServerUnknown(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "UNKNOWN REQUEST", http.StatusNotFound)
}

func ServerOK(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func ServerTextResponse(w http.ResponseWriter, r *http.Request, text string) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(text))
}

func ServerJsonResponse(w http.ResponseWriter, r *http.Request, json string) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))
}

type ApiFunc func(http.ResponseWriter, *http.Request)

type CollectionHandler func(http.ResponseWriter, *http.Request)

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
// If a handler is not found for a request, not allowed header is issued.
func Multiplex(routes M, route string, w http.ResponseWriter, r *http.Request) {
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
		NotAllowed(w, r)
	}
}
