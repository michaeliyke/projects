package payload

import (
	"projects/server/util/reporting"
	"projects/server/util/responses/comment"
	"projects/server/util/session"
)

type IPayload interface {
	init()
	SetAuthorizations()
	GetAuthorization() string
	GetAuthorizations() []string
	GetPrivileges() []string
	GetPrivilege() string
}

// Payload is the object delivered to templates for use
type Payload struct {
	IsAdmin        bool
	IsUser         bool
	IsOwner        bool
	IsLogged       bool
	ErrorMessage   string
	privilege      string
	authorization  string
	Referer        string
	Query          string
	privileges     []string
	authorizations []string
	Session        session.U_session
	Comments       []comment.U_comment
}

func (load *Payload) HasAccess(level string) (allow bool) {
	for _, privilege := range load.Session.User.Privileges {
		if privilege == level {
			allow = true
			break
		}
	}
	return
}

// TODO: MAKE ALL BELOW
// AS WELL AS ANY OTHER
// WE CAN'T HAVE PAYLOADINFORMATION  WITHING AUTH
//TODO: util/comment -> importatble
//TODO: util/session -> importatble

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
	if load.HasAccess("user") {
		load.IsUser = true
		load.privilege = "user"
	}
	if load.HasAccess("admin") {
		load.IsAdmin = true
		load.privilege = "admin"
	}
	if load.HasAccess("owner") {
		load.IsOwner = true
		load.privilege = "owner"
	}
	load.setLogginParams()
}

// Gets all available privileges
func (load *Payload) GetPrivileges() []string {
	return load.privileges
}

// Gets the highest privilege
func (load *Payload) GetPrivilege() (privilege string) {
	return load.privilege
}

// set payload related log in params
func (load *Payload) setLogginParams() {
	if len(load.privilege) > 0 {
		reporting.ReportInfo("payload: '" + load.Session.UserUuid + "'")
		load.IsLogged = true
		return
	}
	reporting.ReportInfo("package payload: 'visitor'")
}
