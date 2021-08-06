package main

import (
	"crypto/rand"
	"crypto/sha1"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

	. "github.com/michaeliyke/Golang/log"
)

type Configurations struct {
	Address        string
	ReadTimeout    int64
	WriteTimeout   int64
	Static         string
	AuthCookieName string
}

var config Configurations
var logger *log.Logger
var port string

func init() {
	LoadConfigs()
	file, err := os.OpenFile(
		"projects.log",
		os.O_CREATE|os.O_WRONLY|os.O_APPEND,
		0666,
	)
	if err != nil {
		Fatal("failed to open log file", err)
	}
	logger = log.New(
		file,
		"INFO",
		log.Ldate|log.Ltime|log.Lshortfile,
	)
}

func Note(r *http.Request) {
	Log(GetIpAddress(r))
}

func Marshal(arguments ...interface{}) (marshalled []string) {
	for _, datum := range arguments {
		json_, err := json.MarshalIndent(datum, "", "  ")
		if err != nil {
			Fatal(err)
			return
		}
		marshalled = append(marshalled, string(json_))
	}
	return
}

func CreateUuid() (uuid string) {
	u := new([16]byte)
	_, err := rand.Read(u[:])
	if err != nil {
		Fatal("cannot generate UUID" + Sprintf("%v", err))
	}
	// 0x40 is reserved variant from RFC 4122
	u[8] = (u[8] | 0x40) & 0x70
	// set the four most significant bits (bits 12 through 15) of the
	// time_hi_and_version field to the 4-bit version number
	u[6] = (u[6] & 0xF) | (0x4 << 4)
	uuid = Sprintf("%x-%x-%x-%x-%x", u[0:4], u[4:6], u[6:8], u[8:10], u[10:])
	return
}

// hashes plain text with SHA-1
func Encrypt(text string) (cryptext string) {
	cryptext = Sprintf("%x", sha1.Sum([]byte(text)))
	return
}

// Replace the first occurence of old with new_ in a list of file names
func updateTempPaths(files []string, old string, new_ string) (x []string) {
	x = strings.Split(
		strings.Replace(strings.Join(files, " "), old, new_, 1), " ",
	)
	return
}

func AddTemplates(files []string, others ...string) []string {
	return append(files, others...)
}

func Contains(array []string, s string) (present bool) {
	for _, element := range array {
		if element == s {
			present = true
			break
		}
	}
	return
}

func UnloadTemplates(files, junks []string) []string {
	var files_ []string
	for _, file := range files {
		if Contains(junks, file) == false {
			files_ = append(files_, file)
		}
	}
	return files_
}

func GenerateHTML(w http.ResponseWriter, data interface{}, filenames ...string) {
	var files []string
	for _, filename := range filenames {
		files = append(files, Sprintf("templates/%s.html", filename))
	}
	templates := template.Must(template.ParseFiles(files...))
	templates.ExecuteTemplate(w, "layout", data) //'layout' is the entry template
}

func ParseTemplateFiles(filenames ...string) (t *template.Template) {
	var files []string
	temp := template.New("layout") // 'layout' is the entry template
	for _, filename := range filenames {
		files = append(files, Sprintf("templates/%s.html", filename))
	}
	t = template.Must(temp.ParseFiles(files...))
	return
}

func ErrorMessage(w http.ResponseWriter, r *http.Request, message string) {
	url := Sprintf("/errpg?m=%v", message)
	http.Redirect(w, r, url, http.StatusFound)
}

func LoadConfigs() {
	port = os.Getenv("PORT")
	file, err := os.Open("config.json")
	if err != nil {
		Fatal("cannot open config file", err)
	}
	decoder := json.NewDecoder(file)
	config = Configurations{}
	err = decoder.Decode(&config)
	if err != nil {
		Fatal("cannot get configuration from file", err)
	}
}

func Warning(args ...interface{}) {
	logger.SetPrefix("WARNING ")
	logger.Println(args...)
}

func Danger(args ...interface{}) {
	logger.SetPrefix("ERROR ")
	logger.Println(args...)
}

func Info(args ...interface{}) {
	logger.SetPrefix("INFO ")
	logger.Println(args...)
}
