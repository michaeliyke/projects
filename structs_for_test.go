package main

import "time"

/*
	All the test structs will be written here.
	This is to enable us focus on details without much clutter
*/

type MockUser struct {
	Id         int       `json:"id"`
	Email      string    `json:"email"`
	Name       string    `json:"name"`
	Uuid       string    `json:"uuid"`
	Password   string    `json:"password"`
	Privileges string    `json:"privileges"`
	CreatedAt  time.Time `json:"created_at"`
}

func (u *MockUser) Verify() (err error) {
	return
}
func (u *MockUser) Create() (err error) {
	return
}
func (u *MockUser) Update() (err error) {
	return
}
func (u *MockUser) Delete() (err error) {
	return
}
