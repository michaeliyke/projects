package main

import (
	"net/http"
	"projects/server/api"
	. "projects/server/middleware"
	. "projects/server/util"
)

func main() {
	var mux *http.ServeMux = http.NewServeMux()
	files := http.FileServer(http.Dir(Config.Static))
	mux.Handle("/sources/", http.StripPrefix("/sources/", files))
	mux.Handle("/favicon.ico", http.StripPrefix("/", files))

	//Aliases (GET)
	mux.HandleFunc("/signup/", RouteTo("/account/signup/"))
	mux.HandleFunc("/login/", RouteTo("/account/login/"))
	mux.HandleFunc("/logout/", RouteTo("/account/logout/"))
	mux.HandleFunc("/account/", RouteTo("/account/login/"))
	mux.HandleFunc("/comments/", RouteTo("/user/comments/"))

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
	mux.HandleFunc("/t/", T)

	// API manager
	mux.HandleFunc("/api/", api.API)

	if Port == "" || Port == "5000" {
		Log("$PORT var not set. ..")
		Log("Deafulting to :80")
		Log("-----------------------")
		Port = "80"
	} else {
		Log("$PORT value: " + Port)
	}

	server := &http.Server{
		Handler:        mux,
		Addr:           "0.0.0.0:" + Port,
		MaxHeaderBytes: 1 << 20, //2^20 --> 1048576
	}
	Println("server running..")
	server.ListenAndServe()
}
