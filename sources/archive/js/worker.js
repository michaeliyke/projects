;(function(w){
	if (!("serviceWorker" in navigator)) return;
	let url = location.href;
	navigator.serviceWorker.register(url.concat("service.js"), {scope: url}).then(function(register){
		console.log("Success");
	}).catch(function(){
		console.log("Failed");
	});
}(this));


/*
self.addEventLister("'install", function(event){

}).addEventLister("activate", function(event){

}).addEventLister("fetch", function(event){

});*/