package common

import (
	"crypto/rand"
	"crypto/sha1"
	. "projects/server/util/reporting"
)

func CreateUuid() (uuid string) {
	u := new([16]byte)
	_, err := rand.Read(u[:])
	if err != nil {
		Fatal("cannot generate UUID" + Sprintf("%v", err))
	}
	// 0x40 is reserved variant from RFC 4122
	u[8] = (u[8] | 0x40) & 0x70
	// set the four most significant bits (bits 12 through 15) of the
	// time_hi_and_version field to the 4-bit version number
	u[6] = (u[6] & 0xF) | (0x4 << 4)
	uuid = Sprintf("%x-%x-%x-%x-%x", u[0:4], u[4:6], u[6:8], u[8:10], u[10:])
	return
}

// hashes plain text with SHA-1
func Encrypt(text string) (cryptext string) {
	cryptext = Sprintf("%x", sha1.Sum([]byte(text)))
	return
}
