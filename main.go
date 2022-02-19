package main

import (
	"net/http"
	"projects/server/api"
	. "projects/server/middleware"
	. "projects/server/util"
)

func main() {
	var mux *ServeMux = NewServeMux()
	files := http.FileServer(http.Dir(Config.Static))
	mux.Handle("/sources/", http.StripPrefix("/sources/", files))
	mux.Handle("/favicon.ico", http.StripPrefix("/", files))

	// POST, PUT, GET, PATCH, OPTIONS, HEAD, DELETE, RENAME
	mux.Delegate("/notfound/", GeneralServeMux, true)
	mux.Delegate("/errpg/", GeneralServeMux, true)
	mux.Delegate("/", GeneralServeMux, true)
	mux.Delegate("/help/", GeneralServeMux, true)
	mux.Delegate("/collections/manage/", GeneralServeMux, true)
	mux.Delegate("/t/", GeneralServeMux, true)
	mux.Delegate("/account/", AccountServeMux, true)
	mux.Delegate("/user/", AccountServeMux, true)

	//Aliases (GET)
	mux.HandleFunc("/signup/", RouteTo("/account/signup/"))
	mux.HandleFunc("/login/", RouteTo("/account/login/"))
	mux.HandleFunc("/logout/", RouteTo("/account/logout/"))
	mux.HandleFunc("/account/", RouteTo("/account/login/"))
	mux.HandleFunc("/comments/", RouteTo("/user/comments/"))

	// API manager
	mux.HandleFunc("/api/", api.API)

	if Port == "" || Port == "5000" {
		Log("$PORT var not set. ..")
		Log("Defaulting to :80")
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
