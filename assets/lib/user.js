var sticky = sticky || {};
sticky.model = sticky.model || {};

/* USER MODEL */
sticky.model.user = (function (global) {
	_self = {};

	_self.uid = null;
	_self.name = null;
	_self.picture = null;
	_self.email = null;

	_self.userFromData = function (uid, name, picture, email) {
		_self.uid = uid;
		_self.name = name;
		_self.picture = picture;
		_self.email = email;
	};

	_self.userFromObj = function (obj) {
		_self.uid = obj.uid;
		_self.name = obj.name;
		_self.picture = obj.picture;
		_self.email = obj.email;
	};

	return _self;
})(sticky);
