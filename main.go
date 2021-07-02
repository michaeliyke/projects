package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/sources/", http.FileServer(http.Dir("")))
	mux.HandleFunc("/", serve)
	server := &http.Server{
		Handler: mux,
		Addr:    "0.0.0.0:80",
	}
	fmt.Println("server running..")
	server.ListenAndServe()
}

func serve(w http.ResponseWriter, r *http.Request) {
	temp := template.Must(template.ParseFiles("index.html"))
	temp.Execute(w, "")
}
