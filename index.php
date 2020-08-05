<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="description" content="Easy and flexible calculator for your budget. Quickly snap things in and have casual breakdown of expenditure." /> <META NAME="ROBOTS" CONTENT="INDEX, FOLLOW" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- description is currently 109 characters max = 155 -->
<!-- 

<meta http-equiv="refresh" content="30">
<meta http-equiv="refresh" content="x_seconds; url=http://www.yourhost.com/pagetosendto.html">
 
Robots Meta Tag
The robots meta tag lets you specify that a particular page should not be indexed by a search engine 
or if you do or do not want links on the page followed.

<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
“Do not Index this page. Do not follow the links on the page.”

<META NAME="ROBOTS" CONTENT="NOINDEX, FOLLOW">
 “Do not Index this page. Do follow the links on the page.”

 <META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
 “Do Index this page. Do follow the links on the page.

 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 -->

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="Styles/index.css" />


<!-- SCRIPTS BEGIN -->
<!-- <script type="text/javascript" src="https://github.com/PTNigeria/CDN/blob/master/Techie.js"></script> -->
<!-- <script type="text/javascript" src="https://cdn.rawgit.com/PTNigeria/CDN/master/Techie.js"></script> -->
<script type="text/javascript" src="sources/JavaScript/PT.js"></script>
<script type="text/javascript" src="sources/JavaScript/jsPDF.min.js"></script>
<script type="text/javascript" src="sources/JavaScript/index.js"></script>
<script>
	(function($){
		$(document).ready(function($, body, head, sapi, _, w, Log, stringify, stringifyAll, a){
        this.qs(".first-toggle", null, true).addHandler("click", init);
        $("#first-toggle").click(init);
        
        function toggleClass(object) { //toggle({"div": ["red", "blue"]})
            var selector;
            for( selector in object) {
                if(selector && object.hasOwnProperty(selector) && Array.isArray(object[selector])) {
                    var current = object[selector][0], replacement = object[selector][1];
                    if(typeof current !== "string" && typeof replacement !== "string") {
                        return
                    }
                    $(selector).toggleClass(current, replacement);
                }
            }
        }
        
        function init(){
                toggleClass({
                    "#menu-container": ["hide-view", "show-view"],
                    "#menus": ["hide-view", "show-view"],
                    "#body-cover": ["body-cover"],
                    "body": ["fix"]
                });
        }
        
        this.escape(function(){
        	if (document.body.classList.contains("fix")) {
        		init();
        	}
        });
		});

	}(Techie));
</script>
	<!-- END -->
	<title>Budget Calculation Tool - Makes Calculations easy | Michael C Iyke</title>
</head>
<body>
 <!-- nav>ul>(li(a{Same})*6) -->
 <!-- But this is not the only comment here. -->
 <!-- There are stil other ones arround. -->
<div id="main">
	<header id="header">
	<div id="body-cover">
	<ul id="menu-container" class="hide-view" >
				<span id="first-toggle" >x</span>
				<div id="menus" class="hide-view">
				

			<div class="menu first">
			 <div class="project-group">BASIC MATHS TOOLS</div> <hr />
			 <div class="wrapper">
			 	
			 <li><a href="/Calc/base10/">Number<sub>10</sub> calculator</a></li>
			<li><a href="/Calc/base2/">Number<sub>10</sub> calculator</a></li>
			<li><a href="/Calc/base10/converter">convert base<sub>10</sub> to base<sub>2</sub></a></li>
			<li><a href="/Calc/base2/converter">convert base<sub>2</sub> to base<sub>10</sub></a></li>
			 </div>
			</div>

			<div class="menu second">
			 <div class="project-group">PROGRESSIVE EXPERIMENTS</div> <hr />
				<div class="wrapper">
					
			 <li><a href="/clickjacking">Web clickjacking</a></li>
			<li><a href="/Flex/box.html">Flex-box experiments</a></li>
			<li><a href="/Grid">Grid layout</a></li>
			<li><a href="/Copy/">Click to copy</a></li>
			
				</div>
			</div>
			
			
			<div id="menu" class="menu third">
			 <div class="project-group">GRADED PROJECTS</div> <hr />
			 <div class="wrapper">
			 	
			 <li><a href="Armstrong/">Armstrong Number</a></li>
			<li><a href="/Color/flexb.html">Boxes &amp; Color</a></li>
			<li><a href="/FOO/Angular">convert x<sub>10</sub> to x<sub>2</sub></a></li>
			<li><a href="/FOO/Angular">convert x<sub>2</sub> to x<sub>10</sub></a></li>
			 </div>
			</div>
	

			<div class="menu fourth">
			 <div class="project-group">PUBLISHED PROJECTS</div> <hr />
				<div class="wrapper">
					
			 <li><a href="https://currenyforester.cf">World Currency converter</a></li>
			<li><a href="/Color">Dev color code</a></li>
			<li><a href="/Calc">Full featured calculator</a></li>
			<li><a href="/FOO/Angular">convert x<sub>2</sub> to x<sub>10</sub></a></li>
			
				</div>
			</div>
			
			</div>
			</ul>
	 </div>
	<nav id="silent-nav">
		<ul>
			<li><a href="/FOO/Angular">Admin</a></li> 
			<li><a href="/FOO/Angular">Email</a></li>
			<li><a href="/FOO/Angular">free contents</a></li>
			<li><a href="/FOO/Angular">another</a></li>
		<li><a href="http://ultimateweb.gear.host/">Ultimateweb</a></li>
			<li><a href="/FOO/Angular">works</a></li> 
		</ul>
			<span class="first-toggle" ><!-- &#9776; &#9651;-->&#9776;</span>
	</nav>
						

	<nav id="nav" class="main-nav">
	
		<ul>

		<li><a href="/">My company</a></li>
		<li><a href="https://michaeliyke.github.io/">About me</a></li>
		<li><a href="/Letter/">Application Letter</a></li>
		<li><a href="http://ultimateweb.gear.host/">social meadia</a></li>
			<li><a href="http://michaeliyke.gear.host/">Michael Iyke</a> </li>
			<li><a href="/FOO/Angular/">Blog page</a></li>
			<li><a href="/FOO/Angular">Brief survey</a></li>
			<li><a href="/FOO/Usability">Contact page</a></li>
			<!-- 
			If Admin, fetch all links below and display them
			Admin is a must login area of the site which features the links below
			https://unpkg.com/techie@0.1.1/dist/techie.js https://unpkg.com/#/
				            jsdelivr.net https://www.jsdelivr.com/features
			 Each of these links below must authenticate for Admin before display.
			  -->
			
			
	<!-- GITHUB
	PTCDN
	Gmail
	Techiecdn@gmail.com
	PrizeTechie@gmail.com
	PTNigeria@gmail.com
	 -->
		</ul>
	</nav>
<div id="main-heading">
<!-- <img src="./Images/Hero_openO_CC-800x533.jpg" alt="Image for the header" width="100%" height="100%" /> -->
	<h1 id="title"><!-- Simple  -->Budget Calculation <br /> Utility</h1>	
  <ol>
    <li>Make calculations with ease and simplicity.</li>
     <li>View the result, print it and take it with you.</li>
    <li>Save your result and view anytime on any device</li>

  </ol>
</div>
	</header>
<article id="project-body">
	<div id="list">
			<div id="questions-list">
			<ul>
			<div class="questions-intro-1 heading">
				Do you want to make a budget for 
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div></div>

				<li class="question"> A new month ?</li> 
				<li class="question"> A week ? </li>
				<li class="question">OR . . .</li>
				<li class="question">Just a day ?</li>
			</ul>
			</div>
			<div id="options-list">
			<ul>
			<div class="questions-intro-2  heading">Are you 
				<div class="dot dotdot"></div>
				<div class="dot dotdot"></div>
				<div class="dot dotdot"></div> 
			</div>
			<div class="questions">
				<li class="option"> An accounting officer looking for a good tool to ease your routine sums ? </li>
				<li class="option">A keeper of stock looking for a tool to  calculate faster ?</li>
				<li class="option">An earner trying to keep track of your expenditures	?</li>
				</div>
				<div>
					<div class="shout  heading">Look no further!</div>
					<p class="introducing">
We have a simple budget calculation tool ready for use and its free. 
To use, start by typing an item of your budget and hit enter. That's it! The result is shown in real time and it is free and easy to use. Once you're done listing your budget items, you can print it or just grab the pdf version of your work already prepared for you. </p>
				</div>
				<div class="covered comfirm">This budget calculator is for you &nbsp;
						<img alt="we've got you covered img" src="sources/images/tick.png" />
				 </div>
			</ul>
			</div>
		</div>
	<div id="project">
	<h2 class="calculator-heading heading">Simple Online Budget Calculator</h2>
		<form method="post" action="" id="budget" name="budget" >
		<div id="inputs">
			<div id="trigger">
			<div  id="reset"  class="trigger" > Reset </div>
			<div id="total" class="trigger">Total: 0.00</div>
			<div id="submit"  class="trigger" > Add </div>
			<div  id="toggler">
				<span class="show"  id ="equiv"><!-- &#9776; &#9651;-->&#9776;</span>
			<div id="manage">
			<div>Management tools</div> <hr />
			<div class="managed" id="converting">convert to pdf</div>
			<div class="managed disabled" id="saving">save data</div>
			<div class="managed disabled" id="managing">manage</div>
			<div class="managed" id="printing"> print</div>
		</div>
			</div>		
			</div>  
			<div id="input">
			<input type="text" name="item" id="item"  class="input type" placeholder="First Item" 	/>
			<input type="digit" name="value" id="amount"  class="input type" placeholder="value" />
			</div>
					<div id="current" class="trigger"> 
						<span id="currentItem">current value</span> <span>:</span> <span id="current"> 0.0</span>
					</div>
			</div>
			<!-- <div id="resultsPane">  -->
			<table id="table" class="table resultsPane" cellspacing="15" cellpadding="11" border="1"  id="table" width="100%">
	
				<tbody>
					<!-- 
					This is where all results will be shown and managed -->
					<tr style="display: none;" ><td colspan="" rowspan="" headers="">results will be shown here</td></tr>
				</tbody>
			</table>
			</div>			
		</form>	
	</div>
	<hr style="opacity: 0;" />
</article>
<footer id="footer">

	<small>Copy Right &copy;: Michael C. Iyke | <i> <a href="mailto:ymichaelc@gmail.com">ymichaelc@gmail.com</a> </i> <br /> All rights reserved.</small>
</footer>
</div>
</body>
</html>