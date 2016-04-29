var sticky = sticky || {};
sticky.model = sticky.model || {};

/* USER MODEL */
sticky.model.log = (function (global) {
	_self = {};
	var messages = ["Data could not be saved.", "Login Failed!", "Account creation failed!", "Data could not be deleted.", "Authenticated successfully with payload:"];

	_self.output = function (msgType, msg) {
		if (msg)
			console.log(messages[msgType] + msg);
	};

	return _self;
})(sticky);
