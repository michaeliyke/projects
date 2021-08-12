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

	//Aliases (GET)
	mux.HandleFunc("/signup/", RouteTo("/account/signup/"))
	mux.HandleFunc("/login/", RouteTo("/account/login/"))
	mux.HandleFunc("/logout/", RouteTo("/account/logout/"))
	mux.HandleFunc("/account/", RouteTo("/account/login/"))

	// POST, PUT, GET, PATCH, OPTIONS, HEAD, DELETE, RENAME
	mux.HandleFunc("/notfound/", NotFound)     // 001 404
	mux.HandleFunc("/account/logout/", LogOut) // 03
	mux.HandleFunc("/errpg/", ErrPG)           // 001 Error page
	mux.HandleFunc("/user/comments/", Comments)
	mux.HandleFunc("/", Index)                 // 01
	mux.HandleFunc("/account/signup/", SignUp) // 02
	mux.HandleFunc("/help/", Help)
	mux.HandleFunc("/client/chat/", Chat)
	mux.HandleFunc("/account/login/", LogIn) // 03
	mux.HandleFunc("/user/feedback/", Feedback)
	mux.HandleFunc("/account/update/", AccountUpdate)
	mux.HandleFunc("/app/manage/", ManageRecords)

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
