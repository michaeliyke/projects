package util

import (
	"encoding/json"
	"os"
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

// String_2_Int converts a string to a number (base 10)
func String_2_Int(s string) (num int, err error) {
	return strconv.Atoi(s)
}

// Int_2_String converts an integer (base 10) to a string
func Int_2_String(num int) (s string) {
	return strconv.Itoa(num)
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

// LastChar gets the last character of a string
//
// Returns a single character string
func LastChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return string(s[len(s)-1])
}

// RemoveLastChar removes the last character on a string
func RemoveLastChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return s[:len(s)-1]
}

// AddLastChar adds a string character to the end of a string
//
// Returns the modified string
func AddLastChar(s, ch string) string {
	return s + ch
}

// FirstChar returns the first character of a string
//
// Returns is a single character string
func FirstChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return string(s[0])
}

// RemoveFirstChar removes the first character in a string
func RemoveFirstChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return s[1:]
}

// AddFirstChar adds a string character to the start of a string
//
// Returns the modified string
func AddFirstChar(s, ch string) string {
	return ch + s
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

// Contains checks if a strings is present in a list of strings.
//
// Checks for full string presence in a list of strings
func Contains(array []string, s string) (present bool) {
	for _, element := range array {
		if element == s {
			present = true
			break
		}
	}
	return
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

func Warning(args ...interface{}) {
	Logger.SetPrefix("WARNING ")
	Logger.Println(args...)
}

func Danger(args ...interface{}) {
	Logger.SetPrefix("ERROR ")
	Logger.Println(args...)
}

func Info(args ...interface{}) {
	Logger.SetPrefix("INFO ")
	Logger.Println(args...)
}
