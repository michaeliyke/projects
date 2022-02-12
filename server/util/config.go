package util

import (
	"log"
	"os"

	log_ "github.com/michaeliyke/Golang/log"
)

type Configurations struct {
	Address        string
	ReadTimeout    int64
	WriteTimeout   int64
	Static         string
	AuthCookieName string
}

var Config Configurations
var Logger *log.Logger
var Port string
var Log = log_.Log
var Fatal = log_.Fatal
var Sprintf = log_.Sprintf
var Println = log_.Println

func init() {
	LoadConfigs()
	file, err := os.OpenFile(
		"bin/logs/projects.log",
		os.O_CREATE|os.O_WRONLY|os.O_APPEND,
		0666,
	)
	if err != nil {
		Fatal("failed to open log file", err)
	}
	Logger = log.New(
		file,
		"INFO",
		log.Ldate|log.Ltime|log.Lshortfile,
	)
}
