package main

// POST, PUT, GET, PATCH, OPTIONS, HEAD, DELETE, RENAME

/*
	ROUTING
	----DONE------
	"/", Index - ServeIndex
	"/account/logout/", LogOut - ServeLogout
	"/account/signup/", SignUp - ServeSignup, ProcessSignup
	"/account/login/", LogIn - ServeLogin, ProcessUSerLogin
	"/notfound/", NotFound - Serve404
	"/errpg/", ErrPG - ServePg
	"/t/", T - ServeT
	"/user/comments/", Comments - ServeComments, ProcessComments
	"/account/update/", AccountUpdate - ServeUpdateProfile, ProcessAccountUpdate
	"/user/feedback/", Feedback- ServeFeedback, ProcessFeedback
	"/client/chat/", Chat - ServeChat, ProcessChat
	"/help/", Help -ServeHelp, ProcessHelp
	"/app/manage/", ManageRecords - ServeManageRecords


	----NOT DONE---
*/
