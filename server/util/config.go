package util

import (
	"log"
	"os"
)

var Config Configurations
var Port string

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
