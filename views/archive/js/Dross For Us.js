
//You atimes want to inspect reloads or refreshes

!function(checkFirstVisit){
                if (document.cookie.indexOf("mycookie") == -1) {
                    //cookie doesn't exist, create it
                    document.cookie = "mycookie = 1";
                }
                    else{
                        //not first visit, so fire your weapon.
                        alert("You just refreshed. Why?");
                    }
                
            }();



            this.addHandler(window, "beforeunload", function(){
                console.log("Reloaded Right!");
            });

            