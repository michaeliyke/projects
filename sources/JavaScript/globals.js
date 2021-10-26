const sapi = document;
const vars = {};

function ucWord(str) {
  if (Object.prototype.toString.call(str) !== "[object String]") {
    return null;
  }
  return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
}

function createRow(item, value) {
  var number = -1, length = arguments.length, stack = [], args = arguments, txt,
    row = sapi.createElement("tr"), cell = sapi.createElement("td");
  while (++number < 2) {
    txt = " <td class='cell' id='cell" + number + "'> </td> <span class='del del" + number +
      "' title='Remove record'>x</span>"
    stack.push(txt);
  }
  // a(stack)
  row.innerHTML = stack.join(' ');
  row.querySelector("#cell0").textContent = ucWord(item);
  row.querySelector("#cell1").textContent = value;
  return row;
}

function getData() {
  const table = grab("table tbody");
  const data = [];
  Array.forEach.call(table.children, (ch) => {
    if (ch && ch.nodeName === "ROW") {
      const item = grab.call(ch, "#cell0");
      const amount = grab.call(ch, "#cell1");
      data.push({ item: item.textContent, amount: amount.textContent });
    }
  });
  return JSON.stringify(data);
}
