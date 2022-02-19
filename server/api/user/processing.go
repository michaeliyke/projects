package user

import (
	"encoding/json"
	"errors"
	"net/http"
	"path"
	. "projects/server/util"
	"strconv"
)

// Effects user fetch
func UserGET(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("could not retrieve user")
		return errors.New("could not retrieve user")
	}
	ouput, err := json.MarshalIndent(&u, "", "  ")
	if err != nil {
		Log("could not create output json")
		return errors.New("could not create output json")
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(ouput)
	return
}

// Effects user create
func UserPOST(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	leng := r.ContentLength
	body := make([]byte, leng)
	r.Body.Read(body)
	json.Unmarshal(body, &u)
	err = u.Create()
	if err != nil {
		Log("could not create user")
		return errors.New("could not create user")
	}
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user update
func UserPUT(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return errors.New("user does not exist")
	}
	leng := r.ContentLength
	body := make([]byte, leng)
	r.Body.Read(body)
	json.Unmarshal(body, &u)
	err = u.Update()
	if err != nil {
		Log("could not update user")
		return errors.New("could not update user")
	}
	Log("user update successful!")
	w.WriteHeader(http.StatusOK)
	return
}

// Effects user delete
func UserDELETE(w http.ResponseWriter, r *http.Request, u IUser) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		Log("id should be integer")
		return errors.New("id should be integer")
	}
	err = u.Fetch(id)
	if err != nil {
		Log("user does not exist")
		return errors.New("user does not exist")
	}
	err = u.Delete()
	if err != nil {
		return errors.New("could not delete user")
	}
	Log("user deleted")
	w.WriteHeader(http.StatusOK)
	return
}
