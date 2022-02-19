package comment

import (
	. "projects/server/util"
	"time"

	"github.com/lib/pq"
)

type iListing interface {
	post() error
	get() listing
	delete() error
	update() error
}

type listing struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	Rows        []row     `json:"rows"`
	Collections []string  `json:"collections"`
	Uuid        string    `json:"uuid"`
	UserUuid    string    `json:"user_uuid"`
	CreatedAt   time.Time `json:"create"`
}

type row struct {
	Item  string `json:"item"`
	Value string `json:"value"`
}

func (l *listing) post() (err error) {
	q := `INSERT INTO listings (name, rows, collections, uuid, created_at)
		VALUES($1, ARRAY[$2], $3, $4, $5) RETURNING id`
	stmt, err := Db.Prepare(q)
	if err != nil {
		return ReportError(err)
	}
	defer stmt.Close()
	err = stmt.QueryRow(
		&l.Name, &l.Rows, pq.Array(&l.Collections), CreateUuid(),
		CreateUuid(), time.Now(),
	).Scan(&l.Id)
	if err != nil {
		return ReportError(err)
	}
	Report("SUCCES!")
	return
}

// .getUser func(), l.User struct

func (l *listing) get() (err error) {
	return
}

func (l *listing) delete() (err error) {
	return
}

func (l *listing) update() (err error) {
	return
}
