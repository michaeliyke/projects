package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

// head, general.header, silent.nav, main.nav,catalog.nav, general.layout,
// footer
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
	// Log("ROUTES: ", "path1: ", path1, "path2: ", path2)
	if path1 != r.URL.Path && path2 != r.URL.Path {
		http.Redirect(w, r, "/notfound/", http.StatusFound)
	}
	return
}

// Serves the 404 page
func Serve404(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "errpg.layout")
	var load *Payload = InitPayload(&Payload{
		ErrorMessage: r.URL.Query().Get("m"),
	})
	GenerateHTML(w, load, files...)
	return
}

// ServeS the ErrPg page
func ServeErrPg(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "errpg.layout", "head")
	m := r.URL.Query().Get("m")
	if m == "" {
		// Log("Message is empty")
		m = "NOO ERRORS FOUND"
	}
	// Log(files)
	var load *Payload = InitPayload(&Payload{
		ErrorMessage: r.URL.Query().Get("m"),
	})
	GenerateHTML(w, load, files...)
	return
}

// Serves the signup page
func ServeSignUp(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check for and retrieve user session
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header",
		"catalog.nav", "general.layout"})
	files = AddTemplates(files, "signup.layout")
	if err != nil {
		// Log(err)
		GenerateHTML(w, &Payload{}, files...)
	} else {
		// Log(Marshal(load))
		GenerateHTML(w, load, files...)
	}
	return
}

// Serves the login page
func ServeLogin(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header",
		"catalog.nav", "general.layout"})
	files = AddTemplates(files, "login.layout")
	if err != nil {
		// Log(err)
		GenerateHTML(w, &Payload{}, files...)
	} else {
		GenerateHTML(w, load, files...)
	}
	return
}

// Serves the logout page if any
func ServeLogout(w http.ResponseWriter, r *http.Request) {
	_ = UserLogout(w, r)
	http.Redirect(w, r, "/", http.StatusFound)
}

// Serves the comments page
func ServeComments(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "comments.layout")
	GenerateHTML(w, &Payload{}, files...)
	return
}

// Serves the feed back page
func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "feedback.layout")
	GenerateHTML(w, load, files...)
	return
}

// Serves the Help page
func ServeHelp(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "help.layout")
	session, _ := Session(w, r) // check if user has a sesion set, retrieve if so
	load := InitPayload(&Payload{Session: session})
	GenerateHTML(w, load, files...)
	return
}

// Serves the chat page.
// The default room is Contact us.
// With updates, we may add room for active clients
func ServeChat(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "chat.layout")
	GenerateHTML(w, load, files...)

	return
}

// Serves the records management page.
// This page is for managing saved budget entries
func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "manage-records.layout")
	GenerateHTML(w, load, files...)
	return
}

// serves the profile update page
func ServeUpdateProfile(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "prefences.layout")
	GenerateHTML(w, load, files...)
	return
}

// serves the index/home page
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
	load := InitPayload(&Payload{
		Session: session,
	})
	if err != nil {
		Log(err)
		GenerateHTML(w, load, files...)
		return
	}
	GenerateHTML(w, load, files...)
	return
}
