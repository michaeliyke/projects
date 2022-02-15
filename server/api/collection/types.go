package collection

type listing struct {
	Id          int      `json:"id"`
	Name        string   `json:"name"`
	Content     []row    `json:"content"`
	Collections []string `json:"collections"`
}

type row struct {
	Item  string `json:"json"`
	Value string `json:"value"`
}
