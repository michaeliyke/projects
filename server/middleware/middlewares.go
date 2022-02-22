package middleware

import (
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	// Manage all things login here
	/*
		client := &http.Client{
			CheckRedirect: redirectPolicyFunc,
		}
		resp, err := client.Get("http://example.com")
		defer resp.Body.Close()
		resp, err := http.Get("http://webcode.me")
		fmt.Println(resp.Status)
		fmt.Println(resp.StatusCode)
		resp, err := http.Get("http://webcode.me")
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		fmt.Println(string(body)
	*/

	/*
		resp, err := http.PostForm("https://httpbin.org/post",
		url.Values{"name": {"John Doe"}, "message": {"Hey!"}})

		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(string(body))
	*/

}
func Signup() {}
