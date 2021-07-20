package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestUserFetch(t *testing.T) {
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	mux.HandleFunc("/user/", UserHandler(&MockUser{})) // Junction
	request, _ := http.NewRequest("GET", "/user/1", nil)
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("fetch request failed with response code is %v", writer.Code)
		t.FailNow()
	}
	// Let's prove that our mock fetch method was indeed called
	var user User
	json.Unmarshal(writer.Body.Bytes(), &user)
	if user.Id != 1 {
		t.Error("cannot fetch user")
		t.FailNow()
	}
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
	var request *http.Request = httptest.NewRequest("POST", "/user/", json)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("create request failed with response code %v", writer.Code)
		t.FailNow()
	}
	// At this point, user has been filled with json body
	if user.Email != "okeysajogwuoke@gmail.com" {
		t.Error("incorrect user - user create error")
		t.FailNow()
	}
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
	var request *http.Request = httptest.NewRequest("PUT", "/user/1", json)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("update request failed with response code %v", writer.Code)
		t.FailNow()
	}
	// At this point, user has been filled with json body
	if user.Email != "onyenze@gmail.com" {
		t.Error("incorrect user - user update error")
		t.FailNow()
	}
}

func TestUserDelete(t *testing.T) {

	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var request *http.Request = httptest.NewRequest("DELETE", "/user/", nil)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
	if writer.Code != 200 {
		t.Errorf("delete request failed with response code %v", writer.Code)
		t.FailNow()
	}
}

func TestUserLogin(t *testing.T) {
	var json io.Reader = strings.NewReader(
		`{
			"name": "Ikechukwu Chukwuma",
			"email": "okeysajogwuoke@gmail.com",
			"password": "usually"
		}`,
	)
	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var request *http.Request = httptest.NewRequest("POST", "/user/", json)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
}

func TestUserLogout(t *testing.T) {
	var json io.Reader = strings.NewReader(
		`{
			"name": "Ikechukwu Chukwuma",
			"email": "okeysajogwuoke@gmail.com",
			"password": "usually"
		}`,
	)
	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var request *http.Request = httptest.NewRequest("GET", "/user/logout", json)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
}

func TestUserVerify(t *testing.T) {
	var json io.Reader = strings.NewReader(
		`{
			"name": "Ikechukwu Chukwuma",
			"email": "okeysajogwuoke@gmail.com",
			"password": "usually"
		}`,
	)
	var user MockUser = MockUser{}
	var mux *http.ServeMux = http.NewServeMux()
	var writer *httptest.ResponseRecorder = httptest.NewRecorder()
	var request *http.Request = httptest.NewRequest("GET", "/user/confirm/", json)
	mux.HandleFunc("/user/", UserHandler(&user))
	mux.ServeHTTP(writer, request)
}
