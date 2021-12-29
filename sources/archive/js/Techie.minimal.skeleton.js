;(function(w) {
	return  !(w && w.document) ? null: (function(w){
		w.Techie = function(selector, context){
			return this instanceof Techie ? Techie(seletor, context): new Techie.fn.Techie(seletor, context);
		};

		Techie.PT = Techie.prototype = {
			Techie: function(seletor, context){
				// 
			},
			extend: function(){}
		}
	}());
}(this));