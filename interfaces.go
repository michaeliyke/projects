package main

import "net/http"

type IPayload interface {
	init()
	SetAuthorizations()
	GetAuthorization() string
	GetAuthorizations() []string
	GetPrivileges() []string
	GetPrivilege() string
}

type IUser interface {
	Create() (err error)
	Fetch(id int) error
	Update() (err error)
	Delete() (err error)
	Authenticate(w http.ResponseWriter, r *http.Request) error
	CreateAcount(w http.ResponseWriter, r *http.Request) error
	UpdateAccount(w http.ResponseWriter, r *http.Request) error
}

type IEmpty interface{}
