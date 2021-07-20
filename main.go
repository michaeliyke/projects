package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

func main() {
	var mux *http.ServeMux = http.NewServeMux()
	files := http.FileServer(http.Dir(config.Static))
	mux.Handle("/sources/", http.StripPrefix("/sources/", files))
	mux.HandleFunc("/", ServeIndex) // 01

	mux.HandleFunc("/account/signup/", ServeSignUp) // 02
	mux.HandleFunc("/account/login/", ServeLogin)   // 03
	mux.HandleFunc("/account/preferences/", ServeUserPreferences)
	mux.HandleFunc("/user/", UserHandler(&User{})) // POST

	mux.HandleFunc("/jadj", Serve)

	mux.HandleFunc("/app/feedback/", ServeFeedback)
	mux.HandleFunc("/app/comments/", ServeComments)
	mux.HandleFunc("/client/chat/", ServeChat)

	mux.HandleFunc("/app/manage/", ServeManageRecords)

	if port == "" || port == "5000" {
		Log("$PORT var not set. ..")
		Log("Deafulting to :80")
		Log("-----------------------")
		port = "80"
	} else {
		Log("$PORT value: " + port)
	}

	server := &http.Server{
		Handler: mux,
		Addr:    "0.0.0.0:" + port,
	}
	Println("server running..")
	server.ListenAndServe()
}
