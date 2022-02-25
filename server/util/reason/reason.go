package reason

type rs = string

const (
	InvalidName        rs = "InvalidName"
	InvalidPassword    rs = "InvalidPassword"
	InvalidMessage     rs = "InvalidAcceptedText"
	InvalidInfo        rs = "InvalidInformationProvided"
	InvalidField       rs = "InvalidFieldProvided"
	InvalidEmail       rs = "InvalidEmailAddress"
	EmailNotFound      rs = "EmailAddressNotFound"
	CookieNotFound     rs = "NamedCookieNotFound"
	UnknownFail        rs = "UnknownFailure"
	AuthFail           rs = "AuthenticationFailure"
	SessionCheckFail   rs = "SessionValidationFailure"
	AcctCreateFail     rs = "AccountCreateFailure"
	FeedbackCreateFail rs = "FeedbackCreateFailure"
	CommentCreateFail  rs = "CannotCreateComment"
	HelpCreateFail     rs = "CannotCreateHelp"
)
