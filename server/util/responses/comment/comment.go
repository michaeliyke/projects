package comment

import (
	"projects/server/util/common"
	. "projects/server/util/config"
	. "projects/server/util/reporting"
	"projects/server/util/validation"
	"time"
)

type U_comment struct {
	Id        int       `json:"id"`
	UserUuid  string    `json:"user_uuid"`
	Uuid      string    `json:"uuid"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

// comment contructor
//
// sets the Body, Uuid, and CreatedAt fields
func New(body string) *U_comment {
	return &U_comment{
		Uuid:      common.CreateUuid(),
		Body:      validation.EscapeHtml(body),
		CreatedAt: time.Now(),
	}
}

// Post comment to the db
func (comment *U_comment) Post() (err error) {
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

// Fetch all comments
func FetchAll() (comments []U_comment, err error) {
	query := `SELECT id, user_uuid, uuid, body, created_at FROM comments
		ORDER BY created_at DESC`
	rows, err := Db.Query(query)
	if err != nil {
		return
	}
	for rows.Next() {
		comment := U_comment{}
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
