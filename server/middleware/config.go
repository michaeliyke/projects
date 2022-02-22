package middleware

import . "projects/server/util"

var Routes Router
var RRoutes RRouter

func init() {
	Routes = NewRoutes(Router{
		"/account/login/": Login,
		// "/account/":            RedirectToNotFound,
		// "/account/signup/":     ServeSignUp,
		// "/account/logout/":     ServeLogout,
		// "/account/update/":     ServeUpdateProfile,
		// "/user/comments/":      ServeComments,
		// "/user/feedback/":      ServeFeedback,
		// "/user/chat/":          ServeChat,
		// "/":                    ServeIndex,
		// "/notfound/":           Serve404,
		// "/errpg/":              ServeErrPg,
		// "/help/":               ServeHelp,
		// "/t/":                  ServeT,
		// "/collections/manage/": ServeManageRecords,
	})

	RRoutes = NewRRoutes(RRouter{
		"/signup/":   "/account/signup/",
		"/login/":    "/account/login/",
		"/logout/":   "/account/logout/",
		"/comments/": "/user/comments/",
	})

}
