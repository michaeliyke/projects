package chat

import (
	"net/http"
	. "projects/server/util"
)

func Chat(w http.ResponseWriter, r *http.Request) (res APIResponse) {
	res.ResponseOk([]byte(nil))
	return
}
