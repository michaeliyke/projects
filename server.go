package main

import (
	"net/http"
)

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
	files := UnloadTemplates(files, []string{
		"catalog.nav", "general.layout",
	})
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
	session, err := Session(w, r)
	// check for and retrieve user session
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged {
		RedirectTo("/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header", "catalog.nav", "general.layout",
	})
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

// Serves the feed back page
func ServeLogin(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
	referer := Queries(r).Encode()
	action := "/account/login/"
	if referer != "" {
		action = Sprintf("/account/login?%v", referer)
	}
	load := InitPayload(&Payload{
		Session: session,
		Referer: referer,
		Action:  action,
	})
	if load.IsLogged {
		RedirectToReferer(w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"general.header", "catalog.nav", "general.layout",
	})
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
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
	if err != nil {
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"catalog.nav", "general.layout",
	})
	files = AddTemplates(files, "comments.layout")
	GenerateHTML(w, &Payload{}, files...)
	return
}

// Serves the feed back page
func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	GetReferer(r)
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
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "feedback.layout")
	GenerateHTML(w, load, files...)
	return
}

// Serves the Help page
func ServeHelp(w http.ResponseWriter, r *http.Request) {
	files := UnloadTemplates(files, []string{"catalog.nav", "general.layout"})
	files = AddTemplates(files, "help.layout")
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
		RedirectTo("/login/", w, r)
		return
	}
	load := InitPayload(&Payload{Session: session})
	if load.IsLogged != true {
		RedirectTo("/login/", w, r)
		return
	}
	files := UnloadTemplates(files, []string{
		"catalog.nav", "general.layout",
	})
	files = AddTemplates(files, "chat.layout")
	GenerateHTML(w, load, files...)
	return
}

// Serves the records management page.
// This page is for managing saved budget entries
func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
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
	files = AddTemplates(files, "managerecords.layout")
	GenerateHTML(w, load, files...)
	return
}

// serves the profile update page
func ServeUpdateProfile(w http.ResponseWriter, r *http.Request) {
	session, err := Session(w, r)
	// check if user has a sesion set, retrieve if so
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
	GetReferer(r)
	// additional files
	files := AddTemplates(
		files, "index.layout", "index.header", "torsor", "calculator",
	)
	// Remove unneeded files
	files = UnloadTemplates(files, []string{
		"general.layout", "general.header",
	})
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
