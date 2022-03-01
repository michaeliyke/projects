package util

import (
	"projects/server/util/request"
)

type RequestFields = request.RequestFields
type Handler = request.Handler
type HandlerFunc = request.HandlerFunc

var Form = request.Form
var DisplayError = request.DisplayError
var InfoMessage = request.InfoMessage
var GetIpAddress = request.GetIpAddress
var FromRequest = request.FromRequest
var NewContext = request.NewContext
var FromContext = request.FromContext
var Path = request.Path
var Url = request.Url
var PathRoot = request.PathRoot
var GetPathRoot = request.GetPathRoot
var PopSlashes = request.PopSlashes
var AppendSlash = request.AppendSlash
var AddTrailingSlash = request.AddTrailingSlash
var RemoveTrailingSlashes = request.RemoveTrailingSlashes
var CheckRoute = request.CheckRoute
var RedirectTo = request.RedirectTo
var RedirectToNotFound = request.RedirectToNotFound
var RedirectWithReferer = request.RedirectWithReferer
var RedirectToReferer = request.RedirectToReferer
var GetReferer = request.GetReferer
var ClearReferer = request.ClearReferer
var Referred = request.Referred
var CorrectPathSlashes = request.CorrectPathSlashes
var Queries = request.Queries
var IncludeURIParts = request.IncludeURIParts
var GetQuery = request.GetQuery
var AddQuery = request.AddQuery
var CreateQuery = request.CreateQuery
var EncodeString = request.EncodeString
var DecodeString = request.DecodeString
var RouteTo = request.RouteTo
