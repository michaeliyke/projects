package helpers

import (
	"net/http"
	. "projects/server/util"
	"strings"
)

func HTTPNotImplemented(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT IMPLEMENTED", http.StatusNotImplemented)
	ReportWarning("NOT IMPLEMENTED " + Url(r))
}

func HTTPNotFound(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "404 NOT FOUND", http.StatusNotFound)
	ReportWarning("404 NOT FOUND " + Url(r))
}

func HTTPNotAllowed(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT ALLOWED", http.StatusMethodNotAllowed)
	ReportError("NOT ALLOWED " + Url(r))
}

func HTTPUnauthorized(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "NOT AUTHORIZED", http.StatusUnauthorized)
	ReportError("NOT AUTHORIZED " + Url(r))
}

func HTTPError(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "INTERNAL SERVER ERROR", http.StatusInternalServerError)
	ReportError("INTERNAL SERVER ERROR" + Url(r))
}

func HTTPUnknown(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "UNKNOWN REQUEST", http.StatusNotFound)
	ReportWarning("UNKNOWN REQUEST " + Url(r))
}

func HTTPOk(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	ReportInfo("SUCCESS " + Url(r))
}

func HTTPTextResponse(w http.ResponseWriter, r *http.Request, text string) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(text))
	ReportInfo("SUCCESS " + Url(r))
}

func HTTPJsonResponse(w http.ResponseWriter, r *http.Request, json string) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))
	ReportInfo("SUCCESS " + Url(r))
}

func ServeNotFound(w http.ResponseWriter, r *http.Request) {
	RedirectTo("/notfound/", w, r)
	ReportWarning("NOT FOUND " + r.URL.Path)
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
		HTTPNotAllowed(w, r)
	}
}
