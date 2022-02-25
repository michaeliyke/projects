package util

import (
	"net/http"
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
