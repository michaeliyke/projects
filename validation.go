package main

import (
	"errors"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

// checks if email is correct format
// returns the error or nil
func ValidateEmail(email string) (err error) {
	x := "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
	emailRegex := regexp.MustCompile(x)
	switch {
	case emailRegex.MatchString(email) == false:
		err = errors.New("Invalid email address")
	case len(email) < 4:
		err = errors.New("Email length too short")
	case len(email) > 254:
		err = errors.New("Email length too long")
	}
	// _, err = net.LookupMX(host) ----- used to confirm hosT Bdoes exist
	return
}

func ValidatePassword(password string) (err error) {
	if len(password) < 3 {
		err = errors.New("password istoo short")
	}
	return
}

// check is UUID is correct.
// returns the error or nil
func ValidateUuid(u string) (err error) {
	_, err = uuid.Parse(u)
	return
}

// check that fullname is correct
// returns error is nil
func ValidateFullName(name string) (err error) {
	start := name[0]
	end := name[len(name)-1]
	ln := len(name)
	switch {
	// check name is > 4 and less than 21
	case ln > 100:
		err = errors.New("Name is too long")
	case ln < 5:
		err = errors.New("Name should be at leasT 3 characters long")
		// check name does not begin or end with the -, _,or . characters
	case strings.ContainsAny(".-_", string(start)):
		err = errors.New("Name cannot start with invalid character")
	case strings.ContainsAny(".-_", string(end)):
		err = errors.New("Name cannot end with invalid character")
		// check name does not contain --, __, .., -., .-
	case strings.Contains(name, "--") || strings.Contains(name, "__") ||
		strings.Contains(name, "..") || strings.Contains(name, "-.") ||
		strings.Contains(name, ".-"):
		err = errors.New("Name contains invalid character")
	}
	return
}

func ValidateWord(word string) (err error) {
	return
}
