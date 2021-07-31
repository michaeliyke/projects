package main

type Pipeline struct {
	Privilege    string
	IsAdmin      bool
	IsUser       bool
	IsOwner      bool
	ErrorMessage string
	Session      Session_
}

func (pipline *Pipeline) SetPrivilege() {
	// privileges are set in order so that owner has both admin and user access
	switch {
	case Contains(pipline.Session.User.Privileges, "user"):
		pipline.IsUser = true
	case Contains(pipline.Session.User.Privileges, "admin"):
		pipline.IsAdmin = true
	case Contains(pipline.Session.User.Privileges, "owner"):
		pipline.IsOwner = true
	}
}

func (pipline *Pipeline) GetPrivilege() (privilege string) {
	switch {
	case pipline.IsAdmin:
		privilege = "admin"
	case pipline.IsOwner:
		privilege = "owner"
	case pipline.IsUser:
		privilege = "user"
	}
	return
}
