(function(d) {
	const query = d.querySelector.bind(d);
	const queryAll = [].slice.call(d.querySelectorAll.bind(d));
	
	const caret = query(".menu-bar ul .fa-caret-down");
	const dropdown = query(".menu-bar ul li .drop-down-menu");
	const heroImage = query("section.hero");

	function toggleClass(element, name, eventTarget) {
		if (!(eventTarget && eventTarget.classList.contains("toggle-sign"))) {
			element.classList.remove(name);
			return
		}
		if (element.classList.contains(name)) {
			element.classList.remove(name);
		} else {
			element.classList.add(name);
		}
	}

	d.addEventListener("click", (e) => {
		const target = e.target;
		switch(true) {
			case target == caret:
				toggleClass(dropdown, "show-block", caret);
				break
			case target == heroImage:
				toggleClass(dropdown, "show-block");
				break
		}
	});

	window.addEventListener("keydown", (e) => {
		if(e.keyCode == 27) {
			toggleClass(dropdown, "show-block");
		}
	});

}(document));