package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

var files []string = []string{
	"head", "general.header", "silent.nav", "main.nav",
	"catalog.nav", "general.layout", "footer",
}

func RouteTo(route string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, route, http.StatusFound)
	}
}

func CheckRoute(w http.ResponseWriter, r *http.Request, route string) {
	r1 := route
	r2 := ""
	if len(route) > 1 {
		r2 = route[:len(route)-1]
	}

	Log("ROUTES: ", "r1: ", r1, "r2: ", r2)
	path := r.URL.Path
	if r1 != path && r2 != path {
		http.Redirect(w, r, "/notfound", http.StatusFound)
	}
	return
}

func Serve404(w http.ResponseWriter, r *http.Request) {
	files := updateTempPaths(files, "general.layout", "errpg.layout")
	files = UnloadTemplates(files, []string{
		"general.header", "silent.nav",
		"main.nav", "catalog.nav",
	})

	var pipeline Pipeline = Pipeline{
		ErrorMessage: r.URL.Query().Get("m"),
	}
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeErrPg(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/errpg/")
	m := r.URL.Query().Get("m")
	if m == "" {
		Log("Message is empty")
		m = "NOO ERRORS FOUND"
	}
	files := []string{"errpg.layout", "head"}
	Log(files)
	var pipeline Pipeline = Pipeline{
		ErrorMessage: r.URL.Query().Get("m"),
	}
	GenerateHTML(w, pipeline, files...)
	return
}

func ServeSignUp(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/account/signup/")
	session, err := Session(w, r) // check for and retrieve user session
	pipeline := Pipeline{
		Session: session,
	}
	files := updateTempPaths(files, "general.layout", "signup.layout")
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, pipeline, files...)
	}
	return
}

func ServeLogin(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/account/login/")
	files := updateTempPaths(files, "general.layout", "login.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeComments(w http.ResponseWriter, r *http.Request) {
	// files := updateTempPaths(files, "general.layout", "comments.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/app/feedback")
	// files := updateTempPaths(files, "general.layout", "feedback.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeChat(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/client/chat")
	// files := updateTempPaths(files, "general.layout", "chat.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/app/manage")
	// files := updateTempPaths(files, "general.layout", "records.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeUpdateProfile(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/account/preferences/")
	// files := updateTempPaths(files, "general.layout", "preferences.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
	}
	return
}

func ServeIndex(w http.ResponseWriter, r *http.Request) {
	CheckRoute(w, r, "/")
	files := updateTempPaths(files, "general.layout", "index.layout")
	files = updateTempPaths(files, "general.header", "index.header")
	session, err := Session(w, r) // check for and retrieve user session
	if err != nil {
		files = append(files, "torsor", "calculator")
		GenerateHTML(w, nil, files...)
		return
	}
	pipeline := Pipeline{
		Session: session,
	}
	pipeline.SetPrivilege()
	files = append(files, "torsor", "calculator")
	GenerateHTML(w, session, files...)
	return
}
