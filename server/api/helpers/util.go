package helpers

import (
	"net/http"
	. "projects/server/util"
	"strings"
)

/*  */

func ServerNotImplemented(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "NOT IMPLEMENTED", http.StatusNotImplemented)
	return
}

func ServeNotFound(w http.ResponseWriter, r *http.Request) (t Reporter) {
	RedirectTo("/notfound/", w, r)
	return ReportWarning(r)
}

func ServerNotFound(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "NOT FOUND", http.StatusNotFound)
	return ReportWarning(r)
}

func ServerNotAllowed(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "NOT ALLOWED", http.StatusMethodNotAllowed)
	return
}

func ServerUnauthorized(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "NOT AUTHORIZED", http.StatusUnauthorized)
	return
}

func SeverError(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "INTERNAL SERVER ERROR", http.StatusInternalServerError)
	return
}

func ServerUnknown(w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Error(w, "UNKNOWN REQUEST", http.StatusNotFound)
	return
}

func ServerOK(w http.ResponseWriter, r *http.Request) (t Reporter) {
	w.WriteHeader(http.StatusOK)
	return
}

func ServerTextResponse(w http.ResponseWriter, r *http.Request, text string) (t Reporter) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(text))
	return
}

func ServerJsonResponse(w http.ResponseWriter, r *http.Request, json string) (t Reporter) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))
	return
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
type M map[string]func(w http.ResponseWriter, r *http.Request) Reporter

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
		ServerNotAllowed(w, r)
	}
}
