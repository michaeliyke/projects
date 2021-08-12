package main

import "github.com/go-mail/mail"

type Mail struct {
	receiverAddress  string // Email of receiever
	senderAddress    string // Email of the sender
	replyAddress     string // Email to forward reply to
	subject          string
	message          string
	mailtrapUsername string
	mailtrapPassword string
}

// Sends the given email and returns nil or error
func (m *Mail) Send(email *mail.Message) (err error) {
	err = mail.NewDialer(
		"smtp.mailtrap.io",
		25,
		m.mailtrapUsername,
		m.mailtrapPassword,
	).DialAndSend(email)
	return
}

// Set up the mail packet for transport
func (m *Mail) SetUp() {
	// set defaults
	switch {
	case m.subject == "":
		m.subject = "Help Message from Projects"
	}
	email := mail.NewMessage()
	email.SetHeader("To", m.receiverAddress)
	email.SetHeader("From", m.senderAddress)
	email.SetHeader("Reply-To", m.replyAddress)
	email.SetHeader("Subject", m.subject)
	email.SetBody("text/plain", m.message)

	// Mailtrap.io account details
	m.mailtrapUsername = "mikey"
	m.mailtrapPassword = "littlesecretes"
}

// Creates and sends mail
func SendMail(mail *Mail) {

}
