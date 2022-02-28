package util

import (
	"projects/server/util/reporting"
)

type Reporter = reporting.Reporter

var Logger = reporting.Logger
var Error = reporting.Error
var Sprintf = reporting.Sprintf
var Println = reporting.Println
var ReportInfo = reporting.ReportInfo
var Report = reporting.Report
var ReportError = reporting.ReportError
var ReportWarning = reporting.ReportWarning
var ReportFatal = reporting.ReportFatal
var Danger = reporting.Danger
var Warning = reporting.Warning
var Info = reporting.Info
var NewError = reporting.NewError
var Log = reporting.Log
var Fatal = reporting.Fatal
