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
request.open('GET', 'https://api.iextrading.com/1.0/stock/market/batch?symbols=GAIN,O,CSCO,F,T,BAC&types=dividends&range=ytd', true);

//once request completes from request.open, use onload function to access data
//parses through data received from endpoint of API
request.onload = function() {
	var data = JSON.parse(this.response);
	document.getElementById("GAINDividend").innerHTML = "$" + data.GAIN.dividends[0].amount;
	document.getElementById("ODividend").innerHTML = "$" + data.O.dividends[0].amount;
	document.getElementById("CSCODividend").innerHTML = "$" + data.CSCO.dividends[0].amount;
	document.getElementById("FDividend").innerHTML = "$" + data.F.dividends[0].amount;
	document.getElementById("TDividend").innerHTML = "$" + data.T.dividends[0].amount;
	document.getElementById("BACDividend").innerHTML = "$" + data.BAC.dividends[0].amount;
}

//sends the request when done
request.send();