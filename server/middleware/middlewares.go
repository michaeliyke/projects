package middleware

import (
	"compress/zlib"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httputil"
	. "projects/server/util"
)

type ServeMuxFunc func(w http.ResponseWriter, r *http.Request) HandlerFunc

type ServeMux struct {
	*http.ServeMux
}

func NewServeMux() *ServeMux {
	mux := http.NewServeMux()
	s := &ServeMux{mux}
	return s
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

// Run the function to determine the status of operation.
//
// A handler is returned if static page is served, and nil if not.
//
// If it returns nil, then execution redirects to api handlers
func (s *ServeMux) Delegate(pattern string, cb ServeMuxFunc, serveStatic bool) {
	var server HandlerFunc
	server = func(w http.ResponseWriter, r *http.Request) {
		var serveHandler HandlerFunc
		if serveStatic { // Should a static page be served
			serveHandler = cb(w, r)
			if serveHandler != nil && r.Method == "GET" {
				serveHandler(w, r)
				return
			}
			// Either the method is not GET or path  faile to match
			RedirectToNotFound(w, r)
			return
		}
		RedirectTo("/api/"+pattern, w, r)
	}
	s.HandleFunc(pattern, server)
}

func GeneralServeMux(w http.ResponseWriter, r *http.Request) (sh HandlerFunc) {
	// sh means serveHandler
	var m M
	path := Path(r)
	if Mt.Has(path) {
		m = Mt.Get(path)
		sh = m[r.Method]
	}
	if sh == nil {
		sh = RedirectToNotFound
	}
	return
}

func Login(w http.ResponseWriter, r *http.Request) {
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

	return ServeLogin
}
func Signup() {}
