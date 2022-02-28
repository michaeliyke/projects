package feedback

import (
	"projects/server/util/common"
	. "projects/server/util/config"
	. "projects/server/util/reporting"
	"projects/server/util/validation"
	"time"
)

//
// HelpStruct The struct for handling help information from the help page
//
// This creates and broadcasts a help message to subscribing dbs and mail
type U_feedback struct {
	Id        int       `json:"id"`
	UserUuid  string    `json:"user_uuid"`
	Uuid      string    `json:"uuid"`
	Rating    int       `json:"rating"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

// feedback contructor
//
// sets the Body, Uuid, and CreatedAt fields
func New(body string) *U_feedback {
	return &U_feedback{
		Uuid:      common.CreateUuid(),
		Body:      validation.EscapeHtml(body),
		CreatedAt: time.Now(),
	}
}

// Save to all subscribbing dbs database
func (feedback *U_feedback) Post() (err error) {
	// save to the main feedback table
	stmt, err := Db.Prepare(
		`INSERT INTO feedbacks(user_uuid, uuid, rating, body, created_at) 
		VALUES($1, $2, $3, $4, $5) RETURNING id`,
	)
	if err != nil {
		return NewError("cannot prepare query")
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&feedback.UserUuid, &feedback.Uuid, feedback.Rating,
		&feedback.Body, &feedback.CreatedAt,
	).Scan(&feedback.Id)
	return
}

// Fetch all comments
func FetchAll() (feedbacks []U_feedback, err error) {
	query := `SELECT id, user_uuid, uuid, body, rating created_at 
		FROM feedbacks ORDER BY created_at DESC`
	rows, err := Db.Query(query)
	if err != nil {
		return
	}
	for rows.Next() {
		f := U_feedback{}
		err = rows.Scan(&f.Id, &f.UserUuid, &f.Uuid, &f.Body, &f.CreatedAt)
		if err != nil {
			return
		}
		feedbacks = append(feedbacks, f)
	}
	rows.Close()
	return
}
