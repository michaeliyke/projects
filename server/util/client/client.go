package client

import (
	"io/ioutil"
	"net/http"
	"net/http/cookiejar"
	"net/url"
)

type client struct {
	*http.Client
	response *http.Response
	request  *http.Request
}

func (c *client) CheckRedirect(req *http.Request, via *http.Request) (err error) {
	return
}

func (c *client) Get(url string) (res *http.Response, err error) {
	res, err = c.Get(url)
	c.response = res
	defer res.Body.Close()
	return
}

func (c *client) Body() (string, error) {
	body, err := ioutil.ReadAll(c.response.Body)
	return string(body), err
}

func (c *client) Bytes() ([]byte, error) {
	return ioutil.ReadAll(c.response.Body)
}

func New(r *http.Request) (client *client, err error) {
	client = &CstmClient{}
	jar, err := cookiejar.New(nil)
	client.Jar = jar

	return
}

func (c *client) Post(uri, jsonData string) (res *http.Response, err error) {
	res, err = c.PostForm(uri, url.Values{})
	c.response = res
	defer res.Body.Close()
	return
}

var Client = New

type CstmClient = client
