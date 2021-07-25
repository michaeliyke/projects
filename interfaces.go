package main

type IUser interface {
	Create() (err error)
	Fetch(id int) error
	Update() (err error)
	Delete() (err error)
}

type IEmpty interface{}
