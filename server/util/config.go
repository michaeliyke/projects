package util

import (
	"encoding/json"
	"log"
	"os"
)

var Config Configurations
var Port string

type Configurations struct {
	Address        string
	ReadTimeout    int64
	WriteTimeout   int64
	Static         string
	AuthCookieName string
}

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

func LoadConfigs() {
	Port = os.Getenv("PORT")
	file, err := os.Open("config.json")
	if err != nil {
		Fatal("cannot open config file", err)
	}
	decoder := json.NewDecoder(file)
	Config = Configurations{}
	err = decoder.Decode(&Config)
	if err != nil {
		Fatal("cannot get configuration from file", err)
	}
}
