package main

import "testing"

var user User = User{
	Email:      "iykedairo@gmail.com",
	Name:       "Ikechukwu Michael Chukwuma",
	Uuid:       "**********",
	Password:   "***********",
	Privileges: []string{"******"},
}

func TestCreateUser(t *testing.T) {
	ClearTable("users")
	err := user.Create()
	if err != nil {
		t.Fatalf("cannot create user: %v", err)
	}
}
