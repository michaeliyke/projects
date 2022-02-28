package config

import (
	"encoding/json"
	"os"
	"projects/server/util/reporting"
)

type Configurations struct {
	Address        string
	ReadTimeout    int64
	WriteTimeout   int64
	Static         string
	AuthCookieName string
}

var Config Configurations
var Port string

func init() {
	LoadConfigs()
}

func LoadConfigs() {
	Port = os.Getenv("PORT")
	file, err := os.Open("config.json")
	if err != nil {
		reporting.Fatal("cannot open config file", err)
	}
	decoder := json.NewDecoder(file)
	Config = Configurations{}
	err = decoder.Decode(&Config)
	if err != nil {
		reporting.Fatal("cannot get configuration from file", err)
	}
}
