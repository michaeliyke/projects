package main

import (
	"strings"

	. "github.com/michaeliyke/Golang/log"
)

func main() {
	s := []string{
		"general.layout", "head", "footer",
		"catalog.nav", "silent.nav", "main.nav",
	}

	t := strings.Join(s, " ")

	str := "a space-separated string"
	str = strings.Replace(str, " ", ",", 1)
	Println(str)
	Log(strings.Replace(t, "general", "index", 1))
}
