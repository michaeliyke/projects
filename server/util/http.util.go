package util

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/cookiejar"
	"net/url"
)

type RequestFields struct {
	http.ResponseWriter
	*http.Request
}

func Form(w http.ResponseWriter, r *http.Request) RequestFields {
	return RequestFields{w, r}
}

func (f RequestFields) SERVER(name string) (value string) {
	return
}

func (f RequestFields) POST(name string, options ...interface{}) string {
	trim, _ := options[0].(bool) // options[0] true puts trim space on
	if trim == true {
		return Trim(f.PostFormValue(name))
	}
	return f.PostFormValue(name)
}

func (f RequestFields) GET(name string) (value string) {
	return
}

// Aliase of http.Handler
type Handler http.Handler

// Alias of http.HandlerFunc
type HandlerFunc http.HandlerFunc

func DisplayError(w http.ResponseWriter, r *http.Request, message string) {
	query := Queries(r)
	query.Add("m", message)
	url := Sprintf("/errpg?%v", query.Encode())
	http.Redirect(w, r, url, http.StatusFound)
}

func InfoMessage(w http.ResponseWriter, r *http.Request, message string) {
	DisplayError(w, r, message)
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

// Return the full path string
func Path(r *http.Request) string {
	return r.URL.Path
}

// Return the full url string
func Url(r *http.Request) string {
	return r.URL.String()
}

// PathRoot get the root of a URL path
func PathRoot(path string) string {
	for FirstChar(path) == "/" {
		path = RemoveFirstChar(path)
	}
	return "/" + StrParts(path, "/")[0] + "/"
}

// GetPathRoot get the root of a URL path
func GetPathRoot(path string) string {
	return PathRoot(path)
}

// PopSlashes removes all trailing slashe on a path and ensures only one leading slash
func PopSlashes(path string) string {
	return RemoveLastChar(CorrectPathSlashes(path))
}

// AppendSlash adds a trailing slash on a path and ensures only one leading slash
func AppendSlash(path string) string {
	return CorrectPathSlashes(path)
}

// AddTrailingSlash adds a trailing slash on a path and ensures only one leading slash
func AddTrailingSlash(path string) string {
	return AppendSlash(path)
}

// RemoveTrailingSlash removes the trailing slash on a path and ensures the leading one
func RemoveTrailingSlashes(path string) string {
	return PopSlashes((path))
}

// compares the request path with the manually provided path
// If compare proves false Redirect to /notfound/
func CheckRoute(w http.ResponseWriter, r *http.Request, path string) bool {
	if ContainsSub(r.URL.Path, ".js", ".css", ".jpg", ".png", ".ico") {
		http.Error(w, "Whoops: NOT FOUND", http.StatusNotFound)
		return false
	}
	var path1, path2 string
	if len(path) > 0 {
		path1 = path + "/" // path1 is the path variable with leading '/'
		path2 = path       // path2 is the path variable without leading '/'
		if LastChar(path) == "/" {
			path1 = RemoveLastChar(path1)
			path2 = RemoveLastChar(path)
		}
	}

	if Path(r) != path1 && Path(r) != path2 {
		return false
	}
	return true
}

// RedirectTo pushes a traffic on a path to another at run time.
//
// It saves the orginal path in the query string as ref.
//
// Route is expected to be a simple path string for now.
func RedirectTo(route string, w http.ResponseWriter, r *http.Request) (t Reporter) {
	http.Redirect(w, r, route, http.StatusFound)
	return
}

func RedirectToNotFound(w http.ResponseWriter, r *http.Request) {
	RedirectTo("/notfound/", w, r)
	ReportWarning(r)
}

// RedirectWithReferer forwards a request with referer to another path.
// The orginal referer is saved in the query string
func RedirectWithReferer(route string, w http.ResponseWriter, r *http.Request) (t Reporter) {
	// query := AddQuery("ref", r.URL.Path, Queries(r))
	// u := Sprintf("%v?%v", route, query.Encode())
	u := route
	http.Redirect(w, r, u, http.StatusFound)
	return
}

// RedirectToReferer continues with a a route previously droped for
// authentication or simply goes to home page if there isn't one
//
// It exracts and decodes the ref route from ref query param
func RedirectToReferer(w http.ResponseWriter, r *http.Request) (t Reporter) {
	referred, referer := Referred(r)
	if referred {
		http.Redirect(w, r, referer, http.StatusFound)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
	return
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

// CorrectPathSlashes ensures a path starts and ends with a slash
//
// It also replace backslashes and removes excess forward slashes
func CorrectPathSlashes(path string) string {
	path = StrReplace(path, "\\", "/")
	for FirstChar(path) == "/" {
		path = RemoveFirstChar(path)
	}
	for LastChar(path) == "/" {
		path = RemoveLastChar(path)
	}
	path = AddLastChar(AddFirstChar(StrJoin(StrParts(path, "/"), "/"), "/"), "/")
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

// RouteTo reroutes a path to another
//
// Returns http.HandlerFunc
func RouteTo(route string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, IncludeURIParts(route, r), http.StatusFound)
	}
}

type CstmClient struct {
	*http.Client
	response *http.Response
	request  *http.Request
}

func (c *CstmClient) CheckRedirect(req *http.Request, via *http.Request) error {
	err := Report("Here we go")
	return err
}

func (c *CstmClient) Get(url string) (res *http.Response, err error) {
	res, err = c.Get(url)
	c.response = res
	defer res.Body.Close()
	return
}

func (c *CstmClient) Body() (string, error) {
	body, err := ioutil.ReadAll(c.response.Body)
	return string(body), err
}

func (c *CstmClient) Bytes() ([]byte, error) {
	return ioutil.ReadAll(c.response.Body)
}

func Client(r *http.Request) (client *CstmClient, err error) {
	client = &CstmClient{}
	jar, err := cookiejar.New(nil)
	client.Jar = jar

	return
}

// Manage all things login here
/*
	client := &http.Client{
		CheckRedirect: redirectPolicyFunc,
	}
	resp, err := client.Get("http://example.com")
	defer resp.Body.Close()
	resp, err := http.Get("http://webcode.me")
	fmt.Println(resp.Status)
	fmt.Println(resp.StatusCode)
	resp, err := http.Get("http://webcode.me")
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body)
*/

/*
	resp, err := http.PostForm("https://httpbin.org/post",
	url.Values{"name": {"John Doe"}, "message": {"Hey!"}})

	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(body))
*/

func (c *CstmClient) Post(uri, jsonData string) (res *http.Response, err error) {
	res, err = c.PostForm(uri, url.Values{})
	c.response = res
	defer res.Body.Close()
	return
}
