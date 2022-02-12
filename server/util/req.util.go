package util

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"net/url"
)

func ErrorMessage(w http.ResponseWriter, r *http.Request, message string) {
	query := Queries(r)
	query.Add("m", message)
	url := Sprintf("/errpg?%v", query.Encode())
	http.Redirect(w, r, url, http.StatusFound)
}

func InfoMessage(w http.ResponseWriter, r *http.Request, message string) {
	ErrorMessage(w, r, message)
}

func GetIpAddress(r *http.Request) string {
	IPAddress := r.Header.Get("X-Real-Ip")
	if IPAddress == "" {
		IPAddress = r.Header.Get("X-Forwarded-For")
	}
	if IPAddress == "" {
		IPAddress = r.RemoteAddr
	}
	return IPAddress
}

func FromRequest(req *http.Request) (net.IP, error) {
	ip, _, err := net.SplitHostPort(req.RemoteAddr)
	if err != nil {
		err = errors.New(Sprintf("userip: %q is not IP:port", req.RemoteAddr))
		return nil, err
	}

	userIP := net.ParseIP(ip)
	if userIP == nil {
		return nil, fmt.Errorf("userip: %q is not IP:port", req.RemoteAddr)
	}
	return userIP, nil
}

type key int

const userIPKey key = 0

// NewContext returns a new Context carrying userIP.
func NewContext(ctx context.Context, userIP net.IP) context.Context {
	return context.WithValue(ctx, userIPKey, userIP)
}

// FromContext extracts the user IP address from ctx, if present.
func FromContext(ctx context.Context) (net.IP, bool) {
	// ctx.Value returns nil if ctx has no value for the key;
	// the net.IP type assertion returns ok=false for nil.
	userIP, ok := ctx.Value(userIPKey).(net.IP)
	return userIP, ok
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
	if ContainsSub(r.URL.Path, ".js", ".css", ".jpg", ".png", ".ico") {
		http.Error(w, "Whoops: NOT FOUND", http.StatusNotFound)
		return
	}
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

// RedirectTo pushes a traffic on a path to another at run time.
//
// It saves the orginal path in the query string as ref.
//
// Route is expected to be a simple path string for now.
func RedirectTo(route string, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, route, http.StatusFound)
}

// RedirectWithReferer forwards a request with referer to another path.
// The orginal referer is saved in the query string
func RedirectWithReferer(route string, w http.ResponseWriter, r *http.Request) {
	query := AddQuery("ref", r.URL.Path, Queries(r))
	u := Sprintf("%v?%v", route, query.Encode())
	http.Redirect(w, r, u, http.StatusFound)
}

// RedirectToReferer continues with a a route previously droped for
// authentication or simply goes to home page if there isn't one
//
// It exracts and decodes the ref route from ref query param
func RedirectToReferer(w http.ResponseWriter, r *http.Request) {
	referred, referer := Referred(r)
	if referred {
		http.Redirect(w, r, referer, http.StatusFound)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func GetReferer(r *http.Request) (ref string) {
	ref = Queries(r).Get("ref")
	return ref
}

func ClearReferer(r *http.Request) {
	r.URL.Query().Del("ref")
}

// Referred reports if there's a referer either in the form or in the url
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

// Queries retrieves the items in the query string - 0 depth only
// Returns url.Values map, call its .Encode() method to get it as string
// Hidden form input with name referer will take priority if it's not empty
func Queries(r *http.Request) (params url.Values) {
	// Retrieve the ref from form if available else proceed below
	query := r.PostFormValue("query")
	if query != "" {
		params, _ = url.ParseQuery(query)
		if params != nil {
			return params
		}
	}
	params = url.Values{}
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
	return Queries(r).Get(k)
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

// EncodeString will return the url encoded version of a string
func EncodeString(s string) string {
	return url.QueryEscape(s)
}

// DecodeString reverses a url encoded string to normal text
func DecodeString(s string) (string, error) {
	return url.QueryUnescape(s)
}
