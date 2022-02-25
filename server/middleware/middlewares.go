package middleware

import (
	"net/http"
	. "projects/server/util"
)

// General route handler
//
// /account/login/
func login(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveLogin,
		"POST": authWrapper,
	}
	routes.Execute(w, r)
}

// ServeComments
// General route handler
//
// /account/signup/
func signup(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveSignUp,
		"POST": signupWrapper,
	}
	routes.Execute(w, r)
}

// General route handler
//
// /account/signup/
func comments(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveComments,
		"POST": commentsWrapper,
	}
	routes.Execute(w, r)
}

// General route handler
//
// /account/logout/
func logout(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET": logoutWrapper,
	}
	routes.Execute(w, r)
}

func update(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveUpdateProfile,
		"POST": updateWrapper,
	}
	routes.Execute(w, r)
}

func feedback(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveFeedback,
		"POST": feedbackWrapper,
	}
	routes.Execute(w, r)
}

func chat_(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveChat,
		"POST": chatWrapper,
	}
	routes.Execute(w, r)
}

func help(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveHelp,
		"POST": helpWrapper,
	}
	routes.Execute(w, r)
}

func profile(w http.ResponseWriter, r *http.Request) {
	var routes ExecRoutes = ExecRoutes{
		"GET":  serveProfile,
		"POST": profileWrapper,
	}
	routes.Execute(w, r)
}

func manageCollections(w http.ResponseWriter, r *http.Request) {
	// There are no wrappers yet until I'm sure of exact steps required to be accomplished
	var routes ExecRoutes = ExecRoutes{
		"GET": serveManageRecords,
	}
	routes.Execute(w, r)
}
