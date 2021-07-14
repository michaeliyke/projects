package main

import (
	"html/template"
	"net/http"
	"os"

	. "github.com/michaeliyke/Golang/log"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/sources/", http.FileServer(http.Dir("")))
	mux.HandleFunc("/", serve)
	var port string = os.Getenv("PORT")
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

func serve(w http.ResponseWriter, r *http.Request) {
	temp := template.Must(template.ParseGlob("templates/*.html"))
	temp.ExecuteTemplate(w, "homepage", "")
}
