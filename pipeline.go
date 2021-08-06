package main

type Pipeline struct {
	IsAdmin      bool
	IsUser       bool
	IsOwner      bool
	IsLogged     bool
	Privilege    string
	ErrorMessage string
	Session      Session_
}

func InitPipelineVars(pipeline Pipeline) Pipeline {
	pipeline.SetPrivilege()
	return pipeline
}

func (pipeline *Pipeline) SetPrivilege() {
	// privileges are set in order so that owner has both admin and user access
	if Contains(pipeline.Session.User.Privileges, "user") {
		pipeline.IsUser = true
	}
	if Contains(pipeline.Session.User.Privileges, "admin") {
		pipeline.IsAdmin = true
	}
	if Contains(pipeline.Session.User.Privileges, "owner") {
		pipeline.IsOwner = true
	}
	privileges := pipeline.Session.User.Privileges
	if len(privileges) > 0 {
		pipeline.Privilege = privileges[len(privileges)-1]
	}
	if len(pipeline.Privilege) > 0 {
		pipeline.IsLogged = true
	}
}

func (pipeline *Pipeline) GetPrivilege() (privilege string) {
	return pipeline.Privilege
}
