package middleware

import . "projects/server/util"

var Mt, Mt2 MT

func init() {
	Mt = CreateMult(MT{
		"/account/login/": {"GET": Login},
		// "/account/":            {"GET": RedirectToNotFound},
		// "/account/signup/":     {"GET": ServeSignUp},
		// "/account/logout/":     {"GET": ServeLogout},
		// "/account/update/":     {"GET": ServeUpdateProfile},
		// "/user/comments/":      {"GET": ServeComments},
		// "/user/feedback/":      {"GET": ServeFeedback},
		// "/user/chat/":          {"GET": ServeChat},
		// "/":                    {"GET": ServeIndex},
		// "/notfound/":           {"GET": Serve404},
		// "/errpg/":              {"GET": ServeErrPg},
		// "/help/":               {"GET": ServeHelp},
		// "/t/":                  {"GET": ServeT},
		// "/collections/manage/": {"GET": ServeManageRecords},
	})

	Mt2 = CreateMult(MT{
		"/signup/":   {},
		"/login/":    {},
		"/logout/":   {},
		"/account/":  {},
		"/comments/": {},
	}).Map(func(s string, m M) M {
		if s == "/comments/" {
			s = "/user/comments/"
		} else {
			s = "/account" + s
		}
		m[s] = HandlerFunc(RouteTo(s))
		return m
	})

}
