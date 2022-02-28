package common

import (
	"encoding/json"
	"projects/server/util/reporting"
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

func StrToUpperCase(s string) string {
	return strings.ToUpper(s)
}

func StrToLowerCase(s string) string {
	return strings.ToLower(s)
}

func StrToTitleCase(s string) string {
	return strings.ToTitle(s)
}

// String_2_Int converts a string to a number (base 10)
func String_2_Int(s string) (num int, err error) {
	return strconv.Atoi(s)
}

// Int_2_String converts an integer (base 10) to a string
func Int_2_String(num int) (s string) {
	return strconv.Itoa(num)
}

func Unmarshal(data []byte, structure interface{}) error {
	return json.Unmarshal(data, structure)
}

func MarshalKeep(x interface{}) ([]byte, error) {
	return json.Marshal(x)
}

func Marshal(x interface{}) (s string, err error) {
	b, err := json.Marshal(x)
	s = string(b)
	return
}

func MarshalIndent(x interface{}, prefix string, indent string) (s string, err error) {
	b, err := json.MarshalIndent(x, prefix, indent)
	s = string(b)
	return
}

func MarshalIndentKeep(x interface{}, prefix string, indent string) ([]byte, error) {
	return json.MarshalIndent(x, prefix, indent)
}

func MarshalDebug(arguments ...interface{}) (marshalled []string) {
	for _, datum := range arguments {
		json_, err := json.MarshalIndent(datum, "", "  ")
		if err != nil {
			reporting.Fatal(err)
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
//
// Returns the orignal string with the last char removed
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

// FirstChar returns the first character of a string
//
// Returns is a single character string
func FirstChar(s string) string {
	if len(s) < 1 {
		return s
	}
	return string(s[0])
}

// Checks if a string starts with a given prefix
func StartsWith(str, prefix string) bool {
	return strings.HasPrefix(str, prefix)
}

// Checks if a string starts with a given prefix
func HasPrefix(str, prefix string) bool {
	return strings.HasPrefix(str, prefix)
}

// Checks if a string end with a given suffix
func EndsWith(str, suffix string) bool {
	return strings.HasSuffix(str, suffix)
}

// HasSuffix if a string end with a given suffix
func HasSuffix(str, suffix string) bool {
	return EndsWith(str, suffix)
}

// HasSubstring checks if a given substring is present in s
func HasSubstring(s, substring string) bool {
	return ContainsSub(s, substring)
}

// Replaces every occurence of char found in s with repl
func StrReplaceAny(s, chars, repl string) string {
	for _, ch := range StrSplit(chars, "") {
		s = strings.ReplaceAll(s, ch, repl)
	}
	return s
}

// Replaces every occurence of char found in s with repl
func StrReplace(s, old, new string) string {
	return strings.Replace(s, old, new, -1)
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

// StrParts splits throught a string by a given characte and return the parts
func StrParts(str string, ch string) []string {
	return strings.FieldsFunc(strings.TrimSpace(str), func(c rune) bool {
		return string(c) == ch
	})
}

func Trim(s string) string {
	return strings.TrimSpace(s)
}

// Strplit splits throught a string by a given character and returns the parts
func StrSplit(str, ch string) []string {
	return StrParts(str, ch)
}

// StrJoin joins a string slice together separated by separator
func StrJoin(s []string, separator string) string {
	return strings.Join(s, separator)
}

// StripChars removes each of the runes chars from s and returns what is left
func StripChars(s string, chars ...string) string {
	for _, ch := range chars {
		s = StripChar(s, ch)
	}
	return s
}

// ContainsSub checks if any of a given set of substrings is present in s.
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
