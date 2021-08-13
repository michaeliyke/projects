package main

import (
	"net/http"
	"net/url"
)

// head, general.header, silent.nav, main.nav,catalog.nav, general.layout,
// footer
var files []string = []string{
	"head", "general.header", "silent.nav", "main.nav",
	"catalog.nav", "general.layout", "footer",
}

// Queries retrieves all the items in the query string - 0 depth only
// Returns url.Values map, call its .Encode() method to get it as string
func Queries(r *http.Request) url.Values {
	params := url.Values{}
	for k, v := range r.URL.Query() {
		if len(v) < 1 {
			params.Add(k, "")
			continue
		}
		params.Add(k, v[0])
	}
	return params
}

// IncludeURIParts add UIR components to a route.
func IncludeURIParts(route string, r *http.Request) string {
	// Include query strings
	queries := Queries(r)
	if len(r.URL.Query()) > 0 {
		route = Sprintf("%v?%v", route, queries.Encode())
	}
	return route
}

// GetQuery get a single query by named key
func GetQuery(k string, r *http.Request) string {
	return r.URL.Query().Get(k)
}

// AddQuery adds a query to the provided query params using the k and the v
//
// if params is "", resulting query becomes k=v where v is escaped.
//
// AddQuery("m", "There is good news!", "...")
//
func AddQuery(k, v string, params url.Values) url.Values {
	params.Add(k, v)
	return params
}

// CreateQuery creates a new single query
// Returns a url.Values type - call its .Encode method to get the string
//
// CreateQuery("m", "This is nice").Encode()
func CreateQuery(k, v string) url.Values {
	return AddQuery(k, v, url.Values{})
}

// RedirectTo pushes a traffic on a path to another at run time
//
// It saves the orginal path in the query string as ref
//
// route is expected to be a simple path string for now
func RedirectTo(route string, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, route, http.StatusFound)
}

// RedirectWithReferer forwards a request with referer to another path.
// The orginal referer is saved in the query string
func RedirectWithReferer(route string, w http.ResponseWriter, r *http.Request) {
	params := AddQuery("ref", r.URL.Path, Queries(r))
	u := Sprintf("%v?%v", route, params.Encode())
	http.Redirect(w, r, u, http.StatusFound)
}

// RedirectToReferer continues with a a route previously droped for
// authentication or simply goes to home page if there isn't one
//
// It exracts and decodes the ref route from ref query param
func RedirectToReferer(w http.ResponseWriter, r *http.Request) {
	referred, referer := Referred(r)
	Log("RedirectToReferer ------------ CALLED!")
	if referred {
		Log("RedirectToRef - Ref: ", referer)
		http.Redirect(w, r, referer, http.StatusFound)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func DumpQuery(r *http.Request) {
	Log(Marshal(r.URL.Query()))
}

func GetReferer(r *http.Request) (ref string) {
	ref = r.URL.Query().Get("ref")
	Log("GetReferer:- ", "REF: ", ref, ", PATH: ", r.URL.Path)
	return ref
}

func ClearReferer(r *http.Request) {
	r.URL.Query().Del("ref")
}

func Referred(r *http.Request) (referred bool, ref string) {
	ref = GetQuery("ref", r)
	if len(ref) > 0 {
		referred = true
	}
	return
}

// CorrectPathSlashes ensures a path starts and ends with slash
//
// /users => /users/
func CorrectPathSlashes(path string) string {
	if FirstChar(path) != "/" {
		path = "/" + path
	}
	if LastChar(path) != "/" {
		path += "/"
	}
	return path
}

// LastChar gets the last character of a string
//
// Returns a single character string
func LastChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return string(s[len(s)-1])
}

// RemoveLastChar removes the last character on a string
func RemoveLastChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return s[:len(s)-1]
}

// AddLastChar adds a string character to the end of a string
//
// Returns the modified string
func AddLastChar(s, ch string) string {
	return s + ch
}

// FirstChar returns the first character of a string
//
// Returns is a single character string
func FirstChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return string(s[0])
}

// RemoveFirstChar removes the first character in a string
func RemoveFirstChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return s[1:]
}

// AddFirstChar adds a string character to the start of a string
//
// Returns the modified string
func AddFirstChar(s, ch string) string {
	return ch + s
}

// PopSlash removes the trailing slash on a path and ensures the leading one
func PopSlash(path string) string {
	if LastChar(path) == "/" {
		path = RemoveLastChar(path)
	}
	if FirstChar(path) != "/" {
		path = AddFirstChar(path, "/")
	}
	return path
}

// compares the request path with the manually provided path
// If compare proves false Redirect to /notfound/
func CheckRoute(w http.ResponseWriter, r *http.Request, path string) {
	path1 := path // path1 is the path variable with leading '/'
	path2 := ""   // path2 is the path variable without leading '/'
	if len(path) > 1 {
		lastChar := string(path[len(path)-1])
		if lastChar == "/" { //if there's a leading '/' in path
			path2 = path[:len(path)-1] // create path2 short of it
		} else { // if there isn't
			path2 = path1 // assign path2 to it, and
			path1 += "/"  // assign path1 to it with a leading '/'
		}
	}
	// Log("ROUTES: ", "path1: ", path1, "path2: ", path2)
	if path1 != r.URL.Path && path2 != r.URL.Path {
		http.Redirect(w, r, "/notfound/", http.StatusFound)
	}
	return
}
