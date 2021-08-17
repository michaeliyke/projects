package main

import (
	"html"
	"strings"

	"github.com/go-playground/validator/v10"
	// "github.com/google/uuid"
)

var validate *validator.Validate = validator.New()
var v = validate

// ERROR MESSAGES

// Says: invalid input in form
var msgInvalid = "invalid input in form"

// Says: form input too short
var msgTooShort = "form input too short"

// Says: form input too long
var msgTooLong = "form input too long"

// ValidateEmail checks if email is correct format. Returns the error or nil
func ValidateEmail(email string) (err error) {
	if v.Var(email, "required,email,gte=4,lte=255") != nil {
		return NewError("invalid email")
	}
	// _, err = net.LookupMX(host) ----- used to confirm hosT Bdoes exist
	return
}

// ValidatePassword checks that password is ok. Returns error or nil
func ValidatePassword(password string) (err error) {
	if v.Var(password, "required,gte=3,lte=50") != nil {
		return NewError("invalid password")
	}
	return
}

// ValidateUuid checks if UUID is correct. Returns the error or nil
func ValidateUuid(u string) (err error) {
	err = v.Var(u, "required,uuid")
	if err != nil {
		return NewError("invalid uuid")
	}
	/*
		"github.com/google/uuid"
		 _, err = uuid.Parse(u) // Merely repetition
		if err != nil {
			return NewError("invalid uuid")
		} */
	return
}

// ValidateFullName checks that fullname is correc. Returns error or nil
func ValidateFullName(name string) (err error) {
	// Disallow --, and __ in name
	if strings.Contains(name, "--") || strings.Contains(name, "__") {
		return NewError(msgInvalid)
	}
	// Allow single - and _ in name by hiding them at this point
	name = StrReplaceAny(name, "-_", "")
	// screen for aphabets and or numbers only
	err = v.Var(strings.Replace(name, " ", "", -1), "alphanum")
	if err != nil {
		return NewError(msgInvalid)
	}
	if v.Var(name, "required,gte=3") != nil {
		return NewError(msgTooShort)
	}
	if v.Var(name, "lte=50") != nil {
		return NewError(msgTooLong)
	}
	return
}

// Replaces dangerous HTML characters with respective encoding
func EscapeHtml(text string) string {
	return html.EscapeString(text)
}

// Ensure that a rating is a number between where 1 <= rating <= 5
func ValidateRating(rating int) (err error) {
	if !(1 <= rating && rating <= 5) {
		return NewError("Invalid rating")
	}
	return
}

// ValidateMessage checks a text for presence of bad strings forms
func ValidateMessage(text string) (err error) {
	err = v.Var(text, "required")
	if err != nil {
		return NewError("Empty input!")
	}
	// Disallow --, and __ in name
	s := RemoveAllSpaces(text)
	if ContainsSub(s, "--", "__", "..", ".-", "-_", "._") {
		return NewError(msgInvalid)
	}
	// Allow following chars by hiding them at this point
	chars := strings.Split("._-,?;:\"/%#()+=*@!$&'", "")
	s = StripChars(s, chars...)
	// screen for aphabets and or numbers only
	err = v.Var(s, "alphanum")
	if err != nil {
		return NewError("NOT ALPHANUM!!!!!!!!!")
	}
	if v.Var(text, "gte=1") != nil { // use the orginal text here
		return NewError(msgTooShort)
	}
	if v.Var(text, "lte=500") != nil {
		return NewError(msgTooLong)
	}
	return
}
