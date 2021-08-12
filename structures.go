package main

import (
	"time"
)

//
// ErrorStruct This is for use in handling errors internally.
//
// It produces the same result as errors.New()
type ErrorStruct struct {
	message string
}

func (err *ErrorStruct) Error() string {
	return err.message
}

func NewError(message string) error {
	return &ErrorStruct{message}
}

func Error(message string) error {
	return NewError(message)
}

//
// HelpStruct The struct for handling help information from the help page
//
// This creates and broadcasts a help message to subscribing dbs and mail
type HELPStruct struct {
	Id        int       `json:"id" validate:"isDefault"`
	Name      string    `json:"name" validate:"required"`
	Email     string    `json:"email" validate:"required,email"`
	Uuid      string    `json:"uuid" validate:"omitempty,uuid"`
	Message   string    `json:"message" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
}

// Save to all subscribbing dbs database
func (help *HELPStruct) Save() (err error) {
	// save to the main help table
	stmt, err := Db.Prepare(
		`INSERT INTO help(name, email, uuid, message, created_at) 
		VALUES($1, $2, $3, $4, $5) RETURNING id`,
	)
	if err != nil {
		return NewError("cannot prepare query")
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&help.Name, &help.Email, &help.Uuid, help.Message, &help.CreatedAt,
	).Scan(&help.Id)

	// save to other tables
	return
}

// notify all subscribing emails about the help raised
func (help *HELPStruct) NotifyAll() (err error) {
	return
}

// Help broadcast router.
//
// Responsible for making various calls and returning responses
func (help *HELPStruct) Broadcast() (err error) {
	// Save to the database
	err = help.Save()
	if err != nil {
		return
	}
	// Send mail to all subscribers
	// err = help.NotifyAll()
	return
}

//SendHelp is a single place to trigger the help process
//
// Simply provide it with the pointer to a *HelpStruct object and
//  listen for response.
//
// Return error message if failed or nil if succeessful
func SendHelp(help *HELPStruct) (err error) {
	return help.Broadcast()
}