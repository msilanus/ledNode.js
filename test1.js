var http = require('http');
var fs = require('fs');
var led = require('fs');

led.writeFile("/sys/class/gpio/export", "21", function(err) {
           if(err) {
                 return console.log(err);
            }
});

led.writeFile("/sys/class/gpio/gpio21", "out", function(err) {
           if(err) {
                 return console.log(err);
            }
});

var isLedOn = 0;

var listen = function()
{
   console.log('Working on port 1185');
}

var todo = function (req, res) 
{
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        
	isLedOn = +!isLedOn;
	led.writeFile("/sys/class/gpio/gpio21/value", isLedOn, function(err) {
           if(err) {
                 return console.log(err);
            }

	    if(isLedOn==1) console.log("Led Allumée...");
	    else console.log("Led Eteinte...");
	    displayResponse(res, isLedOn);
        });
    }
}

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length': data.length});
        res.write(data);
        res.end();
    });
}

function displayResponse(res, stateLed) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length': data.length+8});
        res.write(data);
	res.write('Led is '+isLedOn);
        res.end();
    });
}

var server = http.createServer(todo);
server.listen(1185, listen);


