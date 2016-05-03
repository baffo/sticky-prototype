var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global) {
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;

	_self._firebase = new Firebase(vars.fireBaseUrl);
	_self._notes = _self._firebase.child('notes');
	_self._users = _self._firebase.child('users');
	_self._user_index = _self._firebase.child('user_index');
	_self._shared = _self._firebase.child('shared');

	/*
	* AUTHENTIFICATION
	*/
	_self.login = function() {
		_self._firebase.authWithOAuthPopup("google", function(error, authData) {
			if (!error) {
				_self._users.child(authData.uid).once("value", function(snapshot) {
					if (snapshot.val() !== null) { // update user TIMESTAMP
						_self._users.child(authData.uid).update(
							{
								last_login_at: Firebase.ServerValue.TIMESTAMP
							},
							function(error) {log.output(2, error);});
					} else { // set up new user
						var setUser = _self._users.child(authData.uid).set(
							{
								name: authData.google.displayName,
								email: authData.google.email,
								picture: authData.google.profileImageURL,
								created_at: Firebase.ServerValue.TIMESTAMP,
								last_login_at: Firebase.ServerValue.TIMESTAMP
							},
							function(error) {log.output(2, error);});
						// set up entry into user_index (used for looking up users)
						var setUserIndex = _self._user_index.child(sticky.utils.emailToKey(authData.google.email)).set(
							{
								name: authData.google.displayName,
								uid: authData.uid,
								picture: authData.google.profileImageURL,
								created_at: Firebase.ServerValue.TIMESTAMP,
							},
							function(error) {log.output(2, error);});
					}
					log.output(1, error);
				});
				log.output(1, "errorrrrrr");
				global.model.user.userFromData(authData.uid, authData.google.displayName, authData.google.profileImageURL, authData.google.email); // save local instance of user
				// display interface
				$("#login").hide();
				global.utils.displayProfile();
				global.utils.loadSavedState(global.utils.getPage()); // load data

				log.output(4, error);
			}
		},
		{
			remember: "default",
			scope: "profile,email"
		});
	};

	_self.logout = function() {
		_self._firebase.unauth();
	};

	_self.loggedUser = function() {
		return _self._firebase.getAuth();
	};

	_self.loggedIn = function() {
		if (_self.loggedUser() != null) {
			if (global.model.user.uid == null) { // set local instance
				global.model.user.userFromData(_self.loggedUser().uid, _self.loggedUser().google.displayName, _self.loggedUser().google.profileImageURL, _self.loggedUser().google.email);
			}
			return true;
		}
		return false;
	};

	return _self;
})(sticky);
