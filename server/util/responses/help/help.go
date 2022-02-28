package help

import (
	"projects/server/util/common"
	. "projects/server/util/config"
	. "projects/server/util/reporting"
	"projects/server/util/validation"
	"time"
)

// HelpStruct The struct for handling help information from the help page
//
// This creates and broadcasts a help message to subscribing dbs and mail
type U_help struct {
	Id        int       `json:"id" validate:"isDefault"`
	Name      string    `json:"name" validate:"required"`
	Email     string    `json:"email" validate:"required,email"`
	UserUuid  string    `json:"user_uuid" validate:"omitempty,uuid"`
	Uuid      string    `json:"uuid" validate:"omitempty,uuid"`
	Body      string    `json:"body" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
}

// help contructor
//
// sets the Body, Uuid, and CreatedAt fields
func New(body string) *U_help {
	return &U_help{
		Uuid:      common.CreateUuid(),
		Body:      validation.EscapeHtml(body),
		CreatedAt: time.Now(),
	}
}

// Post help information to db
func (help *U_help) Post() (err error) {
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

	return
}

// Fetch all comments
func FetchAll() (help []U_help, err error) {
	query := `SELECT id, name, email, user_uuid, uuid, body, created_at 
		FROM help ORDER BY created_at DESC`
	rows, err := Db.Query(query)
	if err != nil {
		return
	}
	for rows.Next() {
		h := U_help{}
		err = rows.Scan(&h.Id, &h.Name, &h.Email, &h.UserUuid,
			&h.Uuid, &h.Body, &h.CreatedAt,
		)
		if err != nil {
			return
		}
		help = append(help, h)
	}
	rows.Close()
	return
}
