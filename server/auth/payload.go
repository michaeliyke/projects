package auth

import (
	"net/http"
	. "projects/server/util"
	"text/template"
)

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
	Session        Session_
	Comments       []CommentStruct
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

func UnloadTemplates(files, junks []string) []string {
	var files_ []string
	for _, file := range files {
		if Contains(junks, file) == false {
			files_ = append(files_, file)
		}
	}
	return files_
}

func Note(r *http.Request) {
	Log(GetIpAddress(r))
}

func GenerateHTML(w http.ResponseWriter, data *Payload, filenames ...string) {
	if data == nil {
		Fatal("valid payload object required")
		return
	}
	var files []string
	for _, filename := range filenames {
		files = append(files, Sprintf("views/templates/%s.html", filename))
	}
	templates := template.Must(template.ParseFiles(files...))
	templates.ExecuteTemplate(w, "layout", data) //'layout' is the entry template
}

func ParseTemplateFiles(filenames ...string) (t *template.Template) {
	var files []string
	temp := template.New("layout") // 'layout' is the entry template
	for _, filename := range filenames {
		files = append(files, Sprintf("views/templates/%s.html", filename))
	}
	t = template.Must(temp.ParseFiles(files...))
	return
}
