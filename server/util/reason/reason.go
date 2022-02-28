package reason

type rs = string

const (
	InvalidName         rs = "InvalidName"
	InvalidPassword     rs = "InvalidPassword"
	InvalidMessage      rs = "InvalidAcceptedText"
	InvalidInfo         rs = "InvalidInformationProvided"
	InvalidField        rs = "InvalidFieldProvided"
	InvalidEmail        rs = "InvalidEmailAddress"
	InvalidUUID         rs = "InvalidUUID"
	EmailNotFound       rs = "EmailAddressNotFound"
	InfoRequired        rs = "RequiredInfoMissing"
	FieldRequired       rs = "RequiredFieldMissing"
	EmailRequired       rs = "RequiredEmailAddressMissing"
	NameRequired        rs = "RequiredNameMissing"
	PasswordRequired    rs = "RequiredPasswordMissing"
	CookieNotFound      rs = "NamedCookieNotFound"
	UnknownFail         rs = "UnknownFailure"
	AuthFail            rs = "AuthenticationFailure"
	SessionCheckFail    rs = "SessionValidationFailure"
	SessionInitFail     rs = "SessionInitializationFailure"
	SessionRetrieveFail rs = "SessionRetrievalFailure"
	AcctCreateFail      rs = "AccountCreateFailure"
	FeedbackCreateFail  rs = "FeedbackCreateFailure"
	CommentCreateFail   rs = "CannotCreateComment"
	HelpCreateFail      rs = "CannotCreateHelp"
	InputTooLong        rs = "FormInputAboveRange"
	InputTooShort       rs = "FormInputBelowRange"
)

var reasonCode = map[rs]int{
	InvalidName:         100,
	InvalidPassword:     101,
	InvalidMessage:      102,
	InvalidInfo:         103,
	InvalidField:        104,
	InvalidEmail:        105,
	InvalidUUID:         106,
	EmailNotFound:       200,
	CookieNotFound:      201,
	InfoRequired:        300,
	FieldRequired:       301,
	EmailRequired:       302,
	NameRequired:        303,
	PasswordRequired:    304,
	UnknownFail:         400,
	AuthFail:            401,
	SessionCheckFail:    402,
	SessionInitFail:     403,
	SessionRetrieveFail: 404,
	AcctCreateFail:      405,
	FeedbackCreateFail:  406,
	CommentCreateFail:   407,
	HelpCreateFail:      408,
	InputTooLong:        500,
	InputTooShort:       501,
}

// ReasonCode returns code for registered error reasons
func ReasonCode(reason rs) int {
	return reasonCode[reason]
}
