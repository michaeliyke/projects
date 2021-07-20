package main

import (
	"net/http"
)

type UserMiddleware struct{}

func (user *UserMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//
}
