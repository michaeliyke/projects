package reporting

import (
	"projects/server/util/logger"

	"github.com/michaeliyke/Golang/log"
)

var Sprintf = log.Sprintf
var Println = log.Println
var Logger = logger.Logger

type plain interface{}

// Reporter This is for use in handling errors internally.
//
// It produces the same result as errors.New()
type Reporter struct {
	message string
}

func (err Reporter) Error() string {
	return err.message
}

func ReportInfo(message plain) (r Reporter) {
	log.Println((message))
	Info(message)
	return
}

func Report(report plain) (r Reporter) {
	log.Println((report))
	Info(report)
	return
}

func ReportError(err plain) (r Reporter) {
	log.Println((err))
	Danger(err)
	return
}

func ReportWarning(message plain) (r Reporter) {
	log.Println((message))
	Warning(message)
	return
}

func ReportFatal(err plain) (r Reporter) {
	log.Println((err))
	Danger(err)
	return
}

func Danger(message plain) (r Reporter) {
	Logger.SetPrefix("ERROR ")
	Logger.Println(message)
	return
}

func Warning(message plain) (r Reporter) {
	Logger.SetPrefix("WARNING ")
	Logger.Println(message)
	return
}

func Info(message plain) (r Reporter) {
	Logger.SetPrefix("INFO ")
	Logger.Println(message)
	return
}

func NewError(message string) error {
	return &Reporter{message}
}

func Error(message string) error {
	return NewError(message)
}

func Log(args ...interface{}) (r Reporter) {
	Logger.SetPrefix("LOGS ")
	Logger.Println(args...)
	log.Println(args...)
	return
}

func Fatal(args ...interface{}) (r Reporter) {
	Logger.SetPrefix("FATAL ")
	Logger.Println(args...)
	log.Fatal(args...)
	return
}
