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

	// Set up routing using Router
	Routes.Route(mux)

	//set up route aliases using RRouter
	RRoutes.Reroute(mux)

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
