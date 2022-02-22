package util

import (
	"compress/zlib"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httputil"
)

type IPayload interface {
	init()
	SetAuthorizations()
	GetAuthorization() string
	GetAuthorizations() []string
	GetPrivileges() []string
	GetPrivilege() string
}

type IUser interface {
	Create() (err error)
	Fetch(id int) error
	Update() (err error)
	Delete() (err error)
	Authenticate(w http.ResponseWriter, r *http.Request) error
	CreateAcount(w http.ResponseWriter, r *http.Request) error
	UpdateAccount(w http.ResponseWriter, r *http.Request) error
}

type IEmpty interface{}

type Configurations struct {
	Address        string
	ReadTimeout    int64
	WriteTimeout   int64
	Static         string
	AuthCookieName string
}

type ServeMux struct {
	*http.ServeMux
}

func NewServeMux() (s *ServeMux) {
	mux := http.NewServeMux()
	s = &ServeMux{mux}
	return
}

func (s *ServeMux) RouteTo(pattern string) {}

// Dump the request information for inspection
func (s *ServeMux) DumpRequest(r *http.Request) {
	output, err := httputil.DumpRequest(r, true)
	if err != nil {
		ReportError("Error dumping Request: " + err.Error())
		return
	}
	Println(output)
}

func (s *ServeMux) DumpRequestOut(r *http.Request) {
	output, err := httputil.DumpRequestOut(r, true)
	if err != nil {
		ReportError("Error dumping Request out: " + err.Error())
		return
	}
	Println(output)
}

func (s *ServeMux) DumpResponse(w *http.Response) {
	output, err := httputil.DumpResponse(w, true)
	if err != nil {
		ReportError("Error dumping Response: " + err.Error())
		return
	}
	Println(output)
}

func (s *ServeMux) ReadBody(r *http.Request) {
	base64decoder := base64.NewDecoder(base64.StdEncoding, r.Body)
	gz, err := zlib.NewReader(base64decoder)
	if err != nil {
		return
	}

	defer gz.Close()
	decoder := json.NewDecoder(gz)
	var t json.Decoder
	err = decoder.Decode(&t)
	if err != nil {
		return
	}
	r.Body.Close()
}

// Resource path
type _path_ = string

// The Route type specifies request methods and their handlers for an endpoint.
//
// It's a map of request methods to their respecive handlers on an endpoint,
// one for each.
//
// Only specified entries are considerd to be allowed.
// Request whose entries are not present are treated as error
type Router map[_path_]HandlerFunc
type RRouter map[_path_]_path_

func (rr RRouter) Has(path _path_) (exists bool) {
	_, exists = rr[path]
	return
}

func (rr RRouter) Get(path _path_) (p _path_) {
	if rr.Has(path + "/") {
		p, _ = rr[path+"/"]
	}
	if rr.Has(path) {
		p, _ = rr[path]
		return
	}
	return
}

func (rr RRouter) Reroute(mux *ServeMux) RRouter {
	rr.ForEach(func(oldRoute, newRoute _path_) {
		mux.HandleFunc(oldRoute, rr.Route)
	})
	return rr
}

func (rr RRouter) Route(w http.ResponseWriter, r *http.Request) {
	newRoute := rr.Get(r.URL.Path)
	RedirectTo(newRoute, w, r)
}

func (rr RRouter) ForEach(fn func(_path_, _path_)) RRouter {
	for path, newRoute := range rr {
		fn(path, newRoute)
	}
	return rr
}

func (r Router) Has(path _path_) (exists bool) {
	_, exists = r[path]
	return
}

func (r Router) Get(path string) (m HandlerFunc) {
	if r.Has(path + "/") {
		m, _ = r[path+"/"]
	}
	if r.Has(path) {
		m, _ = r[path]
		return
	}
	return
}

func (r Router) ForEach(fn func(_path_, HandlerFunc)) Router {
	for path, handle := range r {
		fn(path, handle)
	}
	return r
}

func (r Router) Probe() {
	Println(r)
}

func (r Router) Print(path string) {
	if fn, exists := r[path]; exists {
		Println(path, ": ", fn)
		return
	}
	Println(path, " - Does not exist!")
}

func NewRoutes(routes Router) Router {
	return routes
}

func NewRRoutes(routes RRouter) RRouter {
	return routes
}

// Routes all /api/ requests: POST, GET, PATCH, PUT, DELETE, HEAD, OPTIONS, RENAME
// to matching handlers.
//
// Requests are disallowed by default unless there's a matching implementation.
//
// If a handler is not found for a request, not allowed header is issued.
func Multiplex(routes Router, route _path_, w http.ResponseWriter, r *http.Request) {
	for method, handler := range routes {
		if StrToUpperCase(method) == r.Method {
			if CheckRoute(w, r, route) {
				handler(w, r)
				return
			}
		}
	}
}
