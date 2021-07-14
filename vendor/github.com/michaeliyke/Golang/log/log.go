// Package log is an interface for the fmt package with additions
package log

import (
	"fmt"
	"log"
)

// Fatal is an override for the fmt.Fatal since we are overriding.
// It accepts any number of arguments of any type as the built-in
func Fatal(args ...interface{}) {
	log.Fatal(args...)
}

func typeof(datum interface{}, types ...string) bool {
	if len(types) > 0 {
		var answer bool = false
		var typeofdatum string = fmt.Sprintf("%T", datum)
		for _, t := range types {
			if t == typeofdatum {
				answer = true
				break
			}
		}
		return answer
	}
	fmt.Printf("%T\n", datum)
	return false
}

// Returns the type of an object
func ShowType(datum interface{}, types ...string) bool {
	return typeof(datum, types...)
}

// TypeOf shows if the type of a given object is in a short list.
// Returns true if a given object belongs to a list of types.
// Works best with primitive types and their arrays.
func TypeOf(datum interface{}, types ...string) bool {
	return typeof(datum, types...)
}

// Type is an aliase for TypeOf().
// Returns true if a given object belongs to a list of types.
// Works best with primitive types and their arrays.
func Type(datum interface{}, types ...string) bool {
	return TypeOf(datum, types...)
}

func sprintf(str string, args ...interface{}) string {
	return fmt.Sprintf(str, args...)
}

func print(args ...interface{}) {
	fmt.Print(args...)
}

func printf(str string, args ...interface{}) {
	fmt.Printf(str, args...)
}

func println(args ...interface{}) {
	fmt.Println(args...)
}

// Printf is an override for the fmt.Printf since we are overriding.
// It accepts any number of arguments of any type as the built-in
func Printf(str string, args ...interface{}) {
	printf(str, args...)
}

// Pf is an aliase for Printf() which overrides fmt.Printf()
func Pf(str string, args ...interface{}) {
	printf(str, args...)
}

// Log is an aliase for Println() which overrides fmt.Println()
func Log(args ...interface{}) {
	Println(args...)
}

// L is an aliase for Println() which overrides fmt.Println()
func L(args ...interface{}) {
	Println(args...)
}

// Print is an override for the fmt.Print since we are overriding.
// It accepts any number of arguments of any type as the built-in
func Print(args ...interface{}) {
	print(args...)
}

// Println is an override for the fmt.Println since we are overriding.
// It accepts any number of arguments of any type as the built-in
func Println(args ...interface{}) {
	println(args...)
}

// P is an aliase for Println() which overrides fmt.Println()
func P(args ...interface{}) {
	Println(args...)
}

// Sprintf is an override for the fmt.Sprintf since we are overriding.
// It accepts any number of arguments of any type as the built-in
func Sprintf(str string, args ...interface{}) string {
	return sprintf(str, args...)
}

// Sp is an aliase for Sprintf() which overrides fmt.Sprintf()
func Sp(str string, args ...interface{}) string {
	return sprintf(str, args...)
}
