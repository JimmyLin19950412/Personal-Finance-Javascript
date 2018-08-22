//Yucky global variables
var APIData;
var APIUrl = 'https://api.iextrading.com/1.0/stock/market/batch?symbols=GAIN,O,CSCO,F,T,BAC&types=dividends,delayed-quote,stats&range=ytd'

//populates the data for # of shares hold of each stock
function populateShares() {
	//variables that hold # of shares, needs to be updated by user
	var GAINShares = 23;
	var OShares = 5;
	var CSCOShares = 8;
	var FShares = 23;
	var TShares = 5;
	var BACShares = 3;
	
	//populates table
	document.getElementById("GAINShares").innerHTML = GAINShares;
	document.getElementById("OShares").innerHTML = OShares;
	document.getElementById("CSCOShares").innerHTML = CSCOShares;
	document.getElementById("FShares").innerHTML = FShares;
	document.getElementById("TShares").innerHTML = TShares;
	document.getElementById("BACShares").innerHTML = BACShares;
	
}

//open files and make  an HTTP request
var request = new XMLHttpRequest();

//API, open connection with endpoint. GET data from endpoint https://api.iextrading.com/1.0
request.open('GET', APIUrl, true);

//sends the request
request.send();

//once request completes from request.open, use onload function to access data
//parses through data received from endpoint of API
request.onload = function() {
	//places retrieved data into global variable APIData
	APIData = JSON.parse(this.response);
	
	//populates Delayed Price $ column of table with retrieved data
	document.getElementById("GAINDelayedPrice").innerHTML = APIData.GAIN["delayed-quote"].delayedPrice;
	document.getElementById("ODelayedPrice").innerHTML = APIData.O["delayed-quote"].delayedPrice;
	document.getElementById("CSCODelayedPrice").innerHTML = APIData.CSCO["delayed-quote"].delayedPrice;
	document.getElementById("FDelayedPrice").innerHTML = APIData.F["delayed-quote"].delayedPrice;
	document.getElementById("TDelayedPrice").innerHTML = APIData.T["delayed-quote"].delayedPrice;
	document.getElementById("BACDelayedPrice").innerHTML = APIData.BAC["delayed-quote"].delayedPrice;
	
	//populates Dividend Yield column of table with retrieved data
	document.getElementById("GAINDividendYield").innerHTML = APIData.GAIN.stats.dividendYield;
	document.getElementById("ODividendYield").innerHTML = APIData.O.stats.dividendYield;
	document.getElementById("CSCODividendYield").innerHTML = APIData.CSCO.stats.dividendYield;
	document.getElementById("FDividendYield").innerHTML = APIData.F.stats.dividendYield;
	document.getElementById("TDividendYield").innerHTML = APIData.T.stats.dividendYield;
	document.getElementById("BACDividendYield").innerHTML = APIData.BAC.stats.dividendYield;
	
	/*
	//populates Dividend Amount $ column of table with retrieved data
	document.getElementById("GAINDividend").innerHTML = APIData.GAIN.dividends[0].amount;
	document.getElementById("ODividend").innerHTML = APIData.O.dividends[0].amount;
	document.getElementById("CSCODividend").innerHTML = APIData.CSCO.dividends[0].amount;
	document.getElementById("FDividend").innerHTML = APIData.F.dividends[0].amount;
	document.getElementById("TDividend").innerHTML = APIData.T.dividends[0].amount;
	document.getElementById("BACDividend").innerHTML = APIData.BAC.dividends[0].amount;
	*/
	
	//calls calculateYearly function
	calculateYearlyDividend();
}

//calculates yearly dividend yield of each stock
function calculateYearlyDividend() {
	//calculations -> delayed price * (dividend yield / 100)
	//divide dividend yeld by 100 to get a percent
	//.toPrecision(#) -> set to # of decimal places
	
	document.getElementById("GAINYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.GAIN.stats.dividendYield / 100)).toFixed(3);
	document.getElementById("OYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.O.stats.dividendYield / 100)).toFixed(3);
	document.getElementById("CSCOYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.CSCO.stats.dividendYield / 100)).toFixed(3);
	document.getElementById("FYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.F.stats.dividendYield / 100)).toFixed(3);
	document.getElementById("TYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.T.stats.dividendYield / 100)).toFixed(3);
	document.getElementById("BACYearlyDividend").innerHTML = (APIData.GAIN["delayed-quote"].delayedPrice * (APIData.BAC.stats.dividendYield / 100)).toFixed(3);
	
	
}

//displays current time
function currentTime() {
	//obtain current time
	var time = new Date();
	var seconds = time.getSeconds();
	var minutes = time.getMinutes();
	var hours = time.getHours();
	var AmOrPm = "AM";
	
	//adds a 0 to seconds if seconds is less then 10
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	
	//adds a 0 to minutes if minutes is less then 10
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	
	//changes hours to 12 hour time with am and pm instead of default 24 hour time
	//if hours is greater then 12 then it is PM and need to reduce hours by 12
	if(hours >= 12) {
		//changes to PM
		AmOrPm = "PM";
		
		//reduce horus by 12 to make a 12 hour time
		hours = hours - 12;
	}
	
	//adds a 0 to hours if hours is less then 10
	if(hours < 10) {
		hours = "0" + hours;
	}
	
document.getElementById("currentTime").innerHTML = "Last updated " + hours + ":" + minutes + ":" + seconds + " " + AmOrPm;
}
