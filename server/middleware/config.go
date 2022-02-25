package middleware

import . "projects/server/util"

var Routes Router
var RRoutes RRouter

func init() {
	Routes = NewRoutes(Router{
		"/":                    serveIndex,
		"/account/login/":      login,
		"/account/signup/":     signup,
		"/account/logout/":     logout,
		"/notfound/":           serve404,
		"/errpg/":              serveErrPg,
		"/t/":                  serveT,
		"/user/comments/":      comments,
		"/account/update/":     update,
		"/user/feedback/":      feedback,
		"/user/chat/":          chat_,
		"/help/":               help,
		"/account/profile":     profile,
		"/collections/manage/": manageCollections,
	})

	RRoutes = NewRRoutes(RRouter{
		"/account/":  "account/profile",
		"/signup/":   "/account/signup/",
		"/login/":    "/account/login/",
		"/logout/":   "/account/logout/",
		"/comments/": "/user/comments/",
	})

}
