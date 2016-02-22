var mandrill = require('mandrill-api/mandrill');

module.exports = function(app){


	app.get('/mail', function(req, res){
		res.render('mail');
	});

	app.post('/send-mail', function(req, res){
		var mandrill_client = new mandrill.Mandrill(req.body.api);

		var arrMail = req.body.email.split("\n");

		var arr = [];

		for (var i = 0; i < arrMail.length; i++) {
			arr.push({
				email: arrMail[i].replace("\r", "").replace("\"", "").replace("'", ""),
				name: req.body.fn,
				type: "to"
			});
		};

		
		var message = {
		    html: req.body.html,
		    text: "",
		    subject: req.body.subject,
		    from_email: req.body.fe,
		    from_name: req.body.fn,
		    to: arr,
		    track_clicks : true,
            track_opens : true,
            merge : true
		};

		var async = false;



		mandrill_client.messages.send({"message": message, "async": async}, function(result) {

		    console.log(result);

		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});

		
		res.render('mail');
	});



	var getUserInfo = function(api){
		var mandrill_client = new mandrill.Mandrill(api);
		mandrill_client.users.info({}, function(result) {
		    console.log(result);
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Invalid_Key - Invalid API key
		});
	}
	
}