var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var led = require('fs');


led.writeFile("/sys/class/gpio/export", "21", function(err) {
           if(err) {
                 return console.log("Impossible d'écrire sur export : "+err);
            }
});

led.writeFile("/sys/class/gpio/gpio21/direction", "out", function(err) {
           if(err) {
                 return console.log("Impossible d'écrire sur direction : "+err);
            }
});

led.writeFile("/sys/class/gpio/gpio21/value", "0", function(err) {
           if(err) {
                 return console.log("Impossible d'écrire sur Value : "+err);
            }
});


var body = 	'<html><body>'+
			'<form action="/update" method="post" enctype="multipart/form-data">'+
			'	<fieldset>'+
			'		<input type="submit" name="ON" value="ON" />&nbsp;&nbsp;'+
			'		<input type="submit" name="OFF" value="OFF" />'+
			'	</fieldset>'+
			'</form>'

var close = '</html></body>'
			

function header(rep)
{
	rep.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  
}

function start(rep) {
	console.log("Le gestionnaire 'start' est appelé.");
	header(rep);
	rep.write(body);
	rep.write(close);  
	rep.end();	
}

function update(rep, req) {
  console.log("Le gestionnaire 'upload' est appelé.");

  var form = new formidable.IncomingForm();
  console.log("Récupération des éléments reçus");
  form.parse(req, function(error, fields, files) {
    console.log("Traitement terminé");
	console.log(fields.ON);
	console.log(fields.OFF);
	
    header(rep);
	rep.write(body);
	
	if(fields.ON=="ON") 
	{
		rep.write("LED Allumée");
		led.writeFile("/sys/class/gpio/gpio21/value", "1", function(err) {
           	if(err) 
			{
                 return console.log(err);
            }
		});
	}

	if(fields.OFF=="OFF")
	{
		rep.write("LED Eteinte");
		led.writeFile("/sys/class/gpio/gpio21/value", "0", function(err) {
           	if(err) 
			{
                 return console.log(err);
            }
		});
	}

	rep.write(close);  	

    rep.end();
  });
}


exports.start = start;
exports.update = update;

