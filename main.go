package main

import (
	"net/http"

	. "github.com/michaeliyke/Golang/log"
)

func main() {
	var mux *http.ServeMux = http.NewServeMux()
	files := http.FileServer(http.Dir(config.Static))
	mux.Handle("/sources/", http.StripPrefix("/sources/", files))
	mux.Handle("/favicon.ico", http.StripPrefix("/sources/", files))

	// Serving pages
	mux.HandleFunc("/", ServeIndex)                 // 01
	mux.HandleFunc("/notfound/", Serve404)          // 001 404
	mux.HandleFunc("/account/signup/", ServeSignUp) // 02
	mux.HandleFunc("/account/login/", ServeLogin)   // 03
	mux.HandleFunc("/account/preferences/", ServeUpdateProfile)
	mux.HandleFunc("/errpg/", ServeErrPg) // 001 Error page
	mux.HandleFunc("/app/feedback", ServeFeedback)
	mux.HandleFunc("/app/comments", ServeComments)
	mux.HandleFunc("/client/chat", ServeChat)
	mux.HandleFunc("/app/manage", ServeManageRecords)

	//Aliases (GET)
	mux.HandleFunc("/signup/", RouteTo("/account/signup/"))
	mux.HandleFunc("/login/", RouteTo("/account/login/"))
	mux.HandleFunc("/account/", RouteTo("/account/login/"))

	// POST, PUT
	mux.HandleFunc("/user/create/", EndPointUserCreate)         // POST
	mux.HandleFunc("/user/auth/", EndPointUserAuth)             // POST
	mux.HandleFunc("/user/preferences/", EndPointUpdateProfile) // POST
	mux.HandleFunc("/user/feedback/", EndPointUserFeedback)     // POST

	if port == "" || port == "5000" {
		Log("$PORT var not set. ..")
		Log("Deafulting to :80")
		Log("-----------------------")
		port = "80"
	} else {
		Log("$PORT value: " + port)
	}

	server := &http.Server{
		Handler:        mux,
		Addr:           "0.0.0.0:" + port,
		MaxHeaderBytes: 1 << 20, //2^20 --> 1048576
	}
	Println("server running..")
	server.ListenAndServe()
}
