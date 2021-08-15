package main

import (
	"net/http"
)

// Serves the 404 page
func Serve404(w http.ResponseWriter, r *http.Request) {
	// Serve404 Serves the 404 page
	s := "head, general.header, silent.nav, main.nav, footer, errpg.layout"
	files := ListTemplates(s)
	var load *Payload = InitPayload(&Payload{
		ErrorMessage: r.URL.Query().Get("m"),
	})
	GenerateHTML(w, load, files...)
	return
}

// ServeS the ErrPg page
func ServeErrPg(w http.ResponseWriter, r *http.Request) {
	s := "general.header, silent.nav, main.nav, footer, errpg.layout, head"
	files := ListTemplates(s)
	m := r.URL.Query().Get("m")
	if m == "" {
		// Log("Message is empty")
		m = "NOO ERRORS FOUND"
	}
	// Log(files)
	var load *Payload = InitPayload(&Payload{
		ErrorMessage: m,
	})
	GenerateHTML(w, load, files...)
	return
}

// ServeS the ErrPg page
func ServeT(w http.ResponseWriter, r *http.Request) {
	files := ListTemplates("t.layout, head, silent.nav, main.nav")
	m := "This is some error message"
	var load *Payload = InitPayload(&Payload{
		ErrorMessage: m,
	})
	GenerateHTML(w, load, files...)
	return
}

// Serves the signup page
func ServeSignUp(w http.ResponseWriter, r *http.Request) {
	session, _ := Session(w, r)
	query := Queries(r)
	load := InitPayload(&Payload{
		Session: session,
		Query:   query.Encode(),
		Referer: query.Get("ref"),
	})
	if load.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := ListTemplates("head, silent.nav, main.nav, footer, signup.layout")
	GenerateHTML(w, load, files...)
	return
}

// Serves the feed back page
func ServeLogin(w http.ResponseWriter, r *http.Request) {
	session, _ := Session(w, r)
	query := Queries(r)
	load := InitPayload(&Payload{
		Session: session,
		Query:   query.Encode(),
		Referer: query.Get("ref"),
	})
	if load.IsLogged {
		RedirectToReferer(w, r)
		return
	}
	files := ListTemplates("head, silent.nav, main.nav, footer, login.layout")
	GenerateHTML(w, load, files...)
	return
}

// Serves the logout page if any
func ServeLogout(w http.ResponseWriter, r *http.Request) {
	_ = UserLogout(w, r)
	http.Redirect(w, r, "/", http.StatusFound)
}

// Serves the comments page
func ServeComments(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectWithReferer("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectWithReferer("/login/", w, r)
		return
	}
	s := "head, general.header, silent.nav, main.nav, footer, comments.layout"
	files := ListTemplates(s)
	GenerateHTML(w, &Payload{}, files...)
	return
}

// Serves the feed back page
func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	// check if user has a sesion set, retrieve if so
	session, err := Session(w, r)
	if err != nil {
		RedirectWithReferer("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectWithReferer("/login/", w, r)
		return
	}
	s := "head, general.header, silent.nav, main.nav, footer, feedback.layout"
	files := ListTemplates(s)
	GenerateHTML(w, load, files...)
	return
}

// Serves the Help page
func ServeHelp(w http.ResponseWriter, r *http.Request) {
	s := "head, general.header, silent.nav, main.nav, footer, help.layout"
	files := ListTemplates(s)
	session, _ := Session(w, r)
	// check if user has a sesion set, retrieve if so
	load := InitPayload(&Payload{Session: session})
	GenerateHTML(w, load, files...)
	return
}

// Serves the chat page.
// The default room is Contact us.
// With updates, we may add room for active clients
func ServeChat(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectWithReferer("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectWithReferer("/login/", w, r)
		return
	}
	s := "head, general.header, silent.nav, main.nav, footer, chat.layout"
	files := ListTemplates(s)
	GenerateHTML(w, load, files...)
	return
}

// Serves the records management page.
// This page is for managing saved budget entries
func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	if err != nil {
		RedirectWithReferer("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectWithReferer("/login/", w, r)
		return
	}
	s := `
	head, general.header, silent.nav, main.nav, footer, manage-records.layout
	`
	files := ListTemplates(s)
	GenerateHTML(w, load, files...)
	return
}

// serves the profile update page
func ServeUpdateProfile(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectWithReferer("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectWithReferer("/login/", w, r)
		return
	}
	s := "head, general.header, silent.nav, main.nav, footer, prefences.layout"
	files := ListTemplates(s)
	GenerateHTML(w, load, files...)
	return
}

// serves the index/home page
func ServeIndex(w http.ResponseWriter, r *http.Request) {
	s := `head, silent.nav, main.nav, catalog.nav, footer, 
	index.layout, index.header, torsor, calculator`
	files := ListTemplates(s)
	session, err := Session(w, r)
	// check for and retrieve user session
	load := InitPayload(&Payload{Session: session})
	if err != nil {
		GenerateHTML(w, load, files...)
		return
	}
	GenerateHTML(w, load, files...)
	return
}
