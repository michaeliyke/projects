package config

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var Db *sql.DB

func init() {
	credentials := `user=iyke dbname=projects sslmode=disable`
	var err error
	Db, err = sql.Open("postgres", credentials)
	if err != nil {
		panic(err)
	}
}

func ClearTable(table string) (err error) {
	_, err = Db.Exec("TRUNCATE $1 RESTART IDENTITY CASCADE", table)
	return
}
