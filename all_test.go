package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestEmailValidation(t *testing.T) {
	emailsX := []string{
		"JaneDoeemail.com", "Jane@Doe@email.com",
		"Jane:Doe@email.com", "janedoe@email.-com",
		"janedoe@email.com-", "janedoe@email.)com",
		"janedoe@mysite_email.!com", "janedoe@mysite+account.com",
	}

	emails := []string{
		"!#$%&'*+-/=?^_`{|}~0123456789@mail.com", "a@email.com",
		"JaneDoe@email.com", "Jane.Doe@email.com", "Jane-Doe@email.com",
	}
	for _, email := range emails {
		err := ValidateEmail(strings.TrimSpace(email))
		if err != nil {
			t.Errorf("cannot detect correct email: %v", email)
		}
	}
	for _, email := range emailsX {
		err := ValidateEmail(strings.TrimSpace(email))
		if err == nil {
			t.Errorf("cannot detect invalid email: %v", email)
		}
	}
}

func TestAccountLogin(t *testing.T) {
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var json_ io.Reader = strings.NewReader(
		`{
			"email": "okeysajogwuoke@gmail.com'--",
			"password": "usually",
		}`,
	)
	mux.HandleFunc("/account/login/", func(w http.ResponseWriter, r *http.Request) {
		user := &MockUser{
			Email:      "iou@gm.org",
			Password:   "secretes",
			KeepLogged: false,
		}

		UserHandler(w, r, user)
		if user.Id != 2021 {
			t.Fatal("TestUserAuth failed")
		}
	}) // POST
	request, err := http.NewRequest("POST", "/user/auth/", json_)
	if err != nil {
		t.Fatal("error making http request")
	}
	if writer.Code != 200 {
		t.Fatalf(" user auth failed with reponse code: %v", writer.Code)
	}
	// Let's prove that our mock fetch method was indeed called
	var user User
	json.Unmarshal(writer.Body.Bytes(), &user)
	if user.Id != 1 {
		t.Fatal("cannot fetch user")
	}
	mux.ServeHTTP(writer, request)
}

func TestUserCreate(t *testing.T) {
	var json io.Reader = strings.NewReader(
		`{
			"name": "Ikechukwu Chukwuma",
			"email": "okeysajogwuoke@gmail.com",
			"password": "usually",
		}`,
	)
	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	request := httptest.NewRequest("POST", "/user/create/", json)
	mux.HandleFunc("/user/create/", func(w http.ResponseWriter, r *http.Request) {
		UserHandler(w, r, &user)
	})
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Fatalf("create request failed with response code %v", writer.Code)
	}
	// At this point, user has been filled with json body
	// if user.Email != "okeysajogwuoke@gmail.com" {
	// 	t.Error("incorrect user - user create error")
	// 	t.FailNow()
	// }
}

func TestUserUpdate(t *testing.T) {
	var json io.Reader = strings.NewReader(
		`{
			"email": "onyenze@gmail.com"
		}`,
	)
	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	request := httptest.NewRequest("PUT", "/user/preferences/", json)
	mux.HandleFunc("/user/", func(w http.ResponseWriter, r *http.Request) {
		UserHandler(w, r, &user)
	})
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("update request failed with response code %v", writer.Code)
		t.FailNow()
	}
	// At this point, user has been filled with json body
	// if user.Email != "onyenze@gmail.com" {
	// 	t.Error("incorrect user - user update error")
	// 	t.FailNow()
	// }
}

func TestUserDelete(t *testing.T) {

	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var request *http.Request = httptest.NewRequest("DELETE", "/user/", nil)
	mux.HandleFunc("/user/", func(w http.ResponseWriter, r *http.Request) {
		UserHandler(w, r, &user)
	})
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("delete request failed with response code %v", writer.Code)
		t.FailNow()
	}
}
