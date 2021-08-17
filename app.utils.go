package main

import (
	"crypto/rand"
	"crypto/sha1"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"unicode"

	log_ "github.com/michaeliyke/Golang/log"
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
var Log = log_.Log
var Fatal = log_.Fatal
var Sprintf = log_.Sprintf
var Println = log_.Println

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

// String_2_Int converts a string to a number (base 10)
func String_2_Int(s string) (num int, err error) {
	return strconv.Atoi(s)
}

// Int_2_String converts an integer (base 10) to a string
func Int_2_String(num int) (s string) {
	return strconv.Itoa(num)
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

// ListTemplates takes a single string s containing all the file names
// It then creates a string array of these file names.
// If there's no default layout file provided, general.layout is included
func ListTemplates(s string) (files []string) {
	fileNames := strings.Split(s, ",")
	layoutAbsent := true
	for _, filefileName := range fileNames {
		if ContainsSub(filefileName, ".layout") {
			layoutAbsent = false
		}
		files = append(files, strings.TrimSpace(filefileName))
	}
	if layoutAbsent {
		fileNames = append(fileNames, "general.layout")
	}
	return files
}

// Replaces every occurence of char found in s with repl
func StrReplaceAny(s string, chars string, repl string) string {
	for _, ch := range strings.Split(chars, "") {
		s = strings.ReplaceAll(s, ch, repl)
	}
	return s
}

// Strips out all occurence of individual chars or group thereof from a string
func StripChars_(s string, chars ...string) string {
	for _, ch := range chars {
		s = strings.ReplaceAll(s, ch, "")
	}
	return s
}

// StripChar removes the specified rune from s and returns what is left
func StripChar(s, ch string) string {
	return strings.Map(func(r rune) rune {
		if strings.IndexRune(ch, r) < 0 {
			return r
		}
		return -1
	}, s)
}

// StripChars removes each of the runes chars from s and returns what is left
func StripChars(s string, chars ...string) string {
	for _, ch := range chars {
		s = StripChar(s, ch)
	}
	return s
}

// ContainsSub checks if any of substrings is present in s.
// ContainsSub(s, "f", "foo", "bar", "baz", ...)
func ContainsSub(s string, chars ...string) (b bool) {
	for _, ch := range chars {
		if strings.Contains(s, ch) {
			b = true
			break
		}
	}
	return b
}

// RemoveNewLines replaces all new lines runes with single spaces
func RemoveNewLines(s string) string {
	re := regexp.MustCompile(`\r?\n`) // \r\n, \n, \r
	return re.ReplaceAllString(s, " ")
}

// RemoveAllSpaces removes all white spaces in a string
func RemoveAllSpaces(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsSpace(r) {
			return -1
		}
		return r
	}, s)
}

// Contains checks if a string is present as an element in an array of strings
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

func GenerateHTML(w http.ResponseWriter, data *Payload, filenames ...string) {
	if data == nil {
		Fatal("valid payload object required")
		return
	}
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
	query := Queries(r)
	query.Add("m", message)
	url := Sprintf("/errpg?%v", query.Encode())
	http.Redirect(w, r, url, http.StatusFound)
}

func InfoMessage(w http.ResponseWriter, r *http.Request, message string) {
	ErrorMessage(w, r, message)
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
