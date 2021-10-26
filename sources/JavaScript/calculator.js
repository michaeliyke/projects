Techie(function ($, body, head, sapi, _, global, Log, stringify, stringifyAll, a) {
  
  const grab = sapi.querySelector.bind(sapi);
  $("input[name='item'], input[name='value']").on("input", function (e) {
    const rowMap = {};
    const input = e.target;
    if (input.value.length > 0) {
      if (!vars.activeRow) {
        // Add a row for the first add
        const row = createRow("", "");
        const table = grab("table tbody");
        table.insertBefore(row, table.firstChild);
        vars.activeRow = grab.call(table, "tr");
      }

      const cell0 = grab("#cell0");
      const cell1 = grab("#cell1");
      // fill row text
      if (input.id === "item") {
        console.log(false);
        cell0.textContent = ucWord(input.value);
        return
      }
      cell1.textContent = input.value;
      return
    }
    // remove row if value is empty
    if (!vars.activeRow) {
      return
    }
    const cell0 = grab("#cell0");
    const cell1 = grab("#cell1");
    const amount = grab.call(vars.activeRow.parentNode, "#amount");
    const item = grab.call(vars.activeRow.parentNode, "#item");
    if (item.value.trim() || amount.value.trim()) {
      return
    }
    cell0.textContent = "";
    vars.activeRow.parentNode.removeChild(vars.activeRow);
    vars.activeRow = null;
  });

});