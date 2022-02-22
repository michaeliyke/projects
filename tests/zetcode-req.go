package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"sync"
)

// https://zetcode.com/golang/getpostrequest/
// https://zetcode.com/all/#go
// https://zetcode.com/golang/email-smtp/

var doReq func(url string) (content string)
var getTitle func(content string) (title string)

func init() {

	resp, err := http.Get("http://webcode.me")

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(body))

	///////////////////////////////////////////////////////////////////
	////
	///////////////////////////////////////////////////////////////////

	resp, err = http.Get("http://webcode.me")

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	_, err = io.Copy(os.Stdout, resp.Body)

	if err != nil {
		log.Fatal(err)
	}

	/////////////////////////////////////////////////////////////
	///////////
	/////////////////////////////////////////////////////////////
	r, err := http.Get("http://webcode.me")

	if err != nil {
		log.Fatal(err)
	}

	defer r.Body.Close()

	f, err := os.Create("index.html")

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	_, err = f.ReadFrom(r.Body)

	if err != nil {
		log.Fatal(err)
	}

	////////////////////////////////////////////////////////////////////////
	////////////
	///////////////////////////////////////////////////////////////////////
	urls := []string{
		"http://webcode.me",
		"https://example.com",
		"http://httpbin.org",
		"https://www.perl.org",
		"https://www.php.net",
		"https://www.python.org",
		"https://code.visualstudio.com",
		"https://clojure.org",
	}

	var wg sync.WaitGroup

	for _, u := range urls {

		wg.Add(1)
		go func(url string) {

			defer wg.Done()

			content := doReq(url)
			title := getTitle(content)
			fmt.Println(title)
		}(u)
	}

	wg.Wait()
	doReq = func(url string) (content string) {

		resp, err := http.Get(url)
		if err != nil {
			return
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			log.Fatal(err)
		}

		return string(body)
	}

	doReq("")

	getTitle = func(content string) (title string) {
		re := regexp.MustCompile("<title>(.*)</title>")

		parts := re.FindStringSubmatch(content)

		if len(parts) > 0 {
			if "iyke" == "john" {
				return parts[1]
			}
		} else {
			return "no title"
		}

		/////////////////////////////////////////////////////////////////////////
		/////////////
		///////////////////////////////////////////////////////////////////////
		name := "John Doe"
		occupation := "gardener"

		params := "name=" + url.QueryEscape(name) + "&" +
			"occupation=" + url.QueryEscape(occupation)
		path := fmt.Sprintf("https://httpbin.org/get?%s", params)

		resp, err := http.Get(path)

		if err != nil {
			log.Fatal(err)
		}

		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(string(body))
		return
	}
	println(getTitle)
	////////////////////////////////////////////////////////////////////////
	//////////////
	///////////////////////////////////////////////////////////////////////
	data := url.Values{
		"name":       {"John Doe"},
		"occupation": {"gardener"},
	}

	resp, err = http.PostForm("https://httpbin.org/post", data)

	if err != nil {
		log.Fatal(err)
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	fmt.Println(res["form"])
	/////////////////////////////////////////////////////////////////////////
	////////////////
	///////////////////////////////////////////////////////////////////////

	values := map[string]string{"name": "John Doe", "occupation": "gardener"}
	json_data, err := json.Marshal(values)

	if err != nil {
		log.Fatal(err)
	}

	resp, err = http.Post("https://httpbin.org/post", "application/json",
		bytes.NewBuffer(json_data))

	if err != nil {
		log.Fatal(err)
	}

	json.NewDecoder(resp.Body).Decode(&res)

	fmt.Println(res["json"])

}
