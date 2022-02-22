package util

import "net/http"

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

// The M type specifies request methods and their handlers for an endpoint.
//
// It's a map of request methods to their respecive handlers on an endpoint,
// one for each.
//
// Only specified entries are considerd to be allowed.
// Request whose entries are not present are treated as error
type M map[string]HandlerFunc
type MT map[string]M

func (mt MT) Has(path string) bool {
	return mt[path] != nil
}

func (mt MT) Push(arg MT) MT {
	for key, value := range arg {
		mt[key] = value
	}
	return mt
}

func (mt MT) Add(path, method string, handler HandlerFunc) MT {
	m := M{}
	m[method] = handler
	mt[path] = m
	return mt
}

func (mt MT) AddAll(args ...MT) MT {
	for _, arg := range args {
		for path, m := range arg {
			mt[path] = m
		}
	}
	return mt
}

func (mt MT) Get(path string) (m M) {
	if mt.Has(path) {
		return mt[path]
	}
	if mt.Has(path + "/") {
		return mt[path+"/"]
	}
	return
}

func (mt MT) ForEach(fn func(string, M)) MT {
	for key, value := range mt {
		fn(key, value)
	}
	return mt
}

func (mt MT) Map(fn func(string, M) M) MT {
	for key, value := range mt {
		mt[key] = fn(key, value)
	}
	return mt
}

func (mt MT) MapSpecial(fn func(string, M) M) MT {
	for key, value := range mt {
		mt[key] = fn(key, value)
	}
	return mt
}

func (mt MT) Probe() {
	Println(mt)
}

func (mt MT) Print(path string) {
	Println(path, ": ", mt[path])
}

func CreateMult(args ...MT) (mt MT) {
	return mt.AddAll(args...)
}

// Routes all /api/ requests: POST, GET, PATCH, PUT, DELETE, HEAD, OPTIONS, RENAME
// to matching handlers.
//
// Requests are disallowed by default unless there's a matching implementation.
//
// If a handler is not found for a request, not allowed header is issued.
func Multiplex(routes M, route string, w http.ResponseWriter, r *http.Request) {
	for method, handler := range routes {
		if StrToUpperCase(method) == r.Method {
			if CheckRoute(w, r, route) {
				handler(w, r)
				return
			}
		}
	}
}
