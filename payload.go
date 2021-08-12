package main

// Payload is the object delivered to templates for use
type Payload struct {
	IsAdmin        bool
	IsUser         bool
	IsOwner        bool
	IsLogged       bool
	authorization  string
	authorizations []string
	privilege      string
	privileges     []string
	ErrorMessage   string
	Session        Session_
}

// InitPayloadVars initiates the set up of a payload object for delivery
func InitPayload(load *Payload) *Payload {
	load.init()
	return load
}

// Gets all available authorizations
func (load *Payload) GetAuthorizations() []string {
	return load.authorizations
}

// Gets the highest authorization
func (load *Payload) GetAuthorization() string {
	return load.authorization
}

func (load *Payload) SetAuthorizations() {
	// If necessary, this will be created later
}

// Initialize properties for transport
func (load *Payload) init() {
	// privileges are set in order so that owner has both admin and user access
	if Contains(load.Session.User.Privileges, "user") {
		load.IsUser = true
	}
	if Contains(load.Session.User.Privileges, "admin") {
		load.IsAdmin = true
	}
	if Contains(load.Session.User.Privileges, "owner") {
		load.IsOwner = true
	}
	privileges := load.Session.User.Privileges
	if len(privileges) > 0 {
		load.privilege = privileges[len(privileges)-1]
	}
	if len(load.privilege) > 0 {
		load.IsLogged = true
	}
}

// Gets all available privileges
func (load *Payload) GetPrivileges() []string {
	return load.privileges
}

// Gets the highest privilege
func (load *Payload) GetPrivilege() (privilege string) {
	return load.privilege
}
