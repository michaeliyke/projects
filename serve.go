package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

var files []string = []string{
	"head", "general.header", "silent.nav", "main.nav",
	"catalog.nav", "general.layout", "footer",
}

// RedirectTo() pushes a traffic on a path to another at run time
func RedirectTo(route string, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, route, http.StatusFound)
}

// RouteTo() reroutes a path to another
// Returns http.HandlerFunc
func RouteTo(route string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, route, http.StatusFound)
	}
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
	Log("ROUTES: ", "path1: ", path1, "path2: ", path2)
	if path1 != r.URL.Path && path2 != r.URL.Path {
		http.Redirect(w, r, "/notfound/", http.StatusFound)
	}
	return
}

func Serve404(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "errpg.layout")
	var pipeline Pipeline = Pipeline{
		ErrorMessage: r.URL.Query().Get("m"),
	}
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeErrPg(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "errpg.layout", "head")
	m := r.URL.Query().Get("m")
	if m == "" {
		Log("Message is empty")
		m = "NOO ERRORS FOUND"
	}
	Log(files)
	var pipeline Pipeline = Pipeline{
		ErrorMessage: r.URL.Query().Get("m"),
	}
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeSignUp(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check for and retrieve user session
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header",
		"catalog.nav", "general.layout"})
	files = AddTemplates(files, "signup.layout")
	if err != nil {
		Log(err)
		GenerateHTML(w, nil, files...)
	} else {
		Log(Marshal(pipeline))
		GenerateHTML(w, pipeline, files...)
	}
	return
}

func ServeLogin(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header",
		"catalog.nav", "general.layout"})
	files = AddTemplates(files, "login.layout")
	if err != nil {
		Log(err)
		GenerateHTML(w, nil, files...)
	} else {
		GenerateHTML(w, pipeline, files...)
	}
	return
}

func ServeLogout(w http.ResponseWriter, r *http.Request) {
	_ = UserLogout(w, r)
	http.Redirect(w, r, "/", http.StatusFound)
}

func ServeComments(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "comments.layout")
	GenerateHTML(w, nil, files...)
	return
}

type AccessGuard struct {
	Session_
}

var Guard AccessGuard

// Challenge an unauthroized user for access rights.
// checks if user has access, routes to respective auth screen if not
// if allow is true, user has access, if false auth is presented
// challenge page is set explicitely to avoid repetition
func (guard *AccessGuard) Challenge(allow bool, auth_pg string, w http.ResponseWriter, r *http.Request) {
	if allow {
		return
	}
	RedirectTo(auth_pg, w, r)
}

// Report if user has access to the current information set.
// Return the calling object and a pass bool
func (guard *AccessGuard) CheckPass() (allow bool) {
	return
}

func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "feedback.layout")
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeContactUs(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "contact.layout")
	Log("Files: ", files)
	// Guard.CheckPass()
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		GenerateHTML(w, nil, files...)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeChat(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "chat.layout")
	GenerateHTML(w, pipeline, files...)

	return
}

func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "manage-records.layout")
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeUpdateProfile(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	pipeline := InitPipelineVars(Pipeline{Session: session})
	if pipeline.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "prefences.layout")
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeIndex(w http.ResponseWriter, r *http.Request) {
	// additional files
	files := AddTemplates(
		files, "index.layout", "index.header", "torsor", "calculator",
	)

	// Remove unneeded files
	files = UnloadTemplates(files, []string{
		"general.layout", "general.header",
	})

	session, err := Session(w, r) // check for and retrieve user session
	if err != nil {
		Log("cannot retrieve login sesion: ", err)
		GenerateHTML(w, nil, files...)
		return
	}

	pipeline := InitPipelineVars(Pipeline{
		Session: session,
	})
	GenerateHTML(w, pipeline, files...)
	return
}
