package util

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

type BROADCAST interface {
	Save() error
	NotifyAll() error
	Broadcast() error
}

//
// HelpStruct The struct for handling help information from the help page
//
// This creates and broadcasts a help message to subscribing dbs and mail
type HELPStruct struct {
	BROADCAST
	Id        int       `json:"id" validate:"isDefault"`
	Name      string    `json:"name" validate:"required"`
	Email     string    `json:"email" validate:"required,email"`
	UserUuid  string    `json:"user_uuid" validate:"omitempty,uuid"`
	Uuid      string    `json:"uuid" validate:"omitempty,uuid"`
	Body      string    `json:"body" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
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

// Save to all subscribbing dbs database
func (help *HELPStruct) Save() (err error) {
	// save to the main help table
	stmt, err := Db.Prepare(
		`INSERT INTO help(name, email, user_uuid, uuid, body, created_at) 
		VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
	)
	if err != nil {
		return NewError("cannot prepare query")
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&help.Name, &help.Email, &help.UserUuid, &help.Uuid, help.Body,
		&help.CreatedAt,
	).Scan(&help.Id)

	// save to other tables
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

// notify all subscribing emails about the help raised
func NotifyAll(broadcast BROADCAST) (err error) {
	return
}

//
// HelpStruct The struct for handling help information from the help page
//
// This creates and broadcasts a help message to subscribing dbs and mail
type FeedbackStruct struct {
	BROADCAST
	Id        int       `json:"id"`
	UserUuid  string    `json:"user_uuid"`
	Uuid      string    `json:"uuid"`
	Rating    int       `json:"rating"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

// Save to all subscribbing dbs database
func (feedback *FeedbackStruct) Save() (err error) {
	// save to the main feedback table
	stmt, err := Db.Prepare(
		`INSERT INTO feedbacks(user_uuid, uuid, rating, body, created_at) 
		VALUES($1, $2, $3, $4, $5) RETURNING id`,
	)
	if err != nil {
		Log(err)
		return NewError("cannot prepare query")
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&feedback.UserUuid, &feedback.Uuid, feedback.Rating,
		&feedback.Body, &feedback.CreatedAt,
	).Scan(&feedback.Id)
	return
}

func (feedback *FeedbackStruct) Broadcast() (err error) {
	// Save to the database
	err = feedback.Save()
	if err != nil {
		return
	}
	// Send mail to all subscribers
	// err = help.NotifyAll()
	return
}

//SendHe*lp is a single place to trigger the help process
//
// Simply provide it with the pointer to a *HelpStruct object and
//  listen for response.
//
// Return error message if failed or nil if succeessful
func SendFeedback(feedback *FeedbackStruct) (err error) {
	return feedback.Broadcast()
}

type CommentStruct struct {
	Id        int       `json:"id"`
	UserUuid  string    `json:"user_uuid"`
	Uuid      string    `json:"uuid"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

// Save to all subscribbing dbs database
func (comment *CommentStruct) Save() (err error) {
	// save to the main feedback table
	stmt, err := Db.Prepare(
		`INSERT INTO comments(user_uuid, uuid, body, created_at) 
		VALUES($1, $2, $3, $4) RETURNING id`,
	)
	if err != nil {
		return NewError("cannot prepare query")
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&comment.UserUuid, &comment.Uuid, &comment.Body, &comment.CreatedAt,
	).Scan(&comment.Id)
	return
}

func (comment *CommentStruct) Broadcast() (err error) {
	// Save to the database
	err = comment.Save()
	if err != nil {
		return
	}
	// Send mail to all subscribers
	// err = help.NotifyAll()
	return
}

//SendHe*lp is a single place to trigger the help process
//
// Simply provide it with the pointer to a *HelpStruct object and
//  listen for response.
//
// Return error message if failed or nil if succeessful
func SendComment(comment *CommentStruct) (err error) {
	return comment.Broadcast()
}

func GetComments() (comments []CommentStruct, err error) {
	query := `SELECT id, user_uuid, uuid, body, created_at FROM comments
		ORDER BY created_at DESC`
	rows, err := Db.Query(query)
	if err != nil {
		return
	}
	for rows.Next() {
		comment := CommentStruct{}
		err = rows.Scan(&comment.Id, &comment.UserUuid, &comment.Uuid,
			&comment.Body, &comment.CreatedAt,
		)
		if err != nil {
			return
		}
		comments = append(comments, comment)
	}
	rows.Close()
	return
}
