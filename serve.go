package main

import (
	"html/template"
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

var files []string = []string{
	"head", "general.header", "silent.nav", "main.nav",
	"catalog.nav", "general.layout", "footer",
}

func UserService(user IUser) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {}
}

func ServeSignUp(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	files := updateTempPaths(files, "general.layout", "signup.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}

func ServeLogin(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	files := updateTempPaths(files, "general.layout", "login.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}
func ServeComments(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	// files := updateTempPaths(files, "general.layout", "comments.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}

func ServeFeedback(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	// files := updateTempPaths(files, "general.layout", "feedback.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}

func ServeChat(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	// files := updateTempPaths(files, "general.layout", "chat.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}
func ServeManageRecords(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	// files := updateTempPaths(files, "general.layout", "records.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}
func ServeUserPreferences(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	// files := updateTempPaths(files, "general.layout", "preferences.layout")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}

func ServeIndex(w http.ResponseWriter, r *http.Request) {
	Log("generating HTML for: ", r.URL.Path)
	files := updateTempPaths(files, "general.layout", "index.layout")
	files = updateTempPaths(files, "general.header", "index.header")
	_, err := Session(w, r) // check if user has a sesion set, retrieve if so
	if err != nil {
		files = append(files, "torsor", "calculator")
		Log("user is not logged in")
		GenerateHTML(w, nil, files...)
	} else {
		files = append(files, "torsor", "calculator")
		Log(" user is logged in")
		GenerateHTML(w, nil, files...)
	}
}

func Serve(w http.ResponseWriter, r *http.Request) {
	temp := template.Must(template.ParseGlob("templates/*.html"))
	temp.ExecuteTemplate(w, "homepage", "")
}
