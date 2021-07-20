package main

type IUser interface {
	Create() (err error)
	Update() (err error)
	Delete() (err error)
}

type IEmpty interface{}
