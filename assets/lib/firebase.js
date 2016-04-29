var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global) {
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;

	_self._firebase = new Firebase(vars.fireBaseUrl);
	_self._notes = _self._firebase.child('notes');
	_self._users = _self._firebase.child('users');
	_self._user_index = _self._firebase.child('user_index');
	_self._owners = _self._firebase.child('owners');

	/*
	* SET new data (used also for deleting: set NULL)
	*/
	_self.set = function(node, data, response) {
		var set = node.set(
			data,
			function(error) {response(error);});
			return set;
		};



		/*
		* PUSH new data, added to existing list
		*/
		_self.push = function(node, data, response) {
			var push = node.push(
				data,
				function(error) {response(error);});
				return push;
			};

			/*
			* UPDATE existing data
			*/
			_self.update = function(node, data, response) {
				var update = node.update(
					data,
					function(error) {response(error);});
					return update;
				};

				/*
				* LISTENER/GETTER: Listen ONCE
				*/
				_self.once = function(node, value, result) {
					node.once(value, function(snapshot) {
						result(snapshot);
					});
				};
				/*
				* LISTENER/GETTER: Listen ON
				*/
				_self.on = function(node, value, result) {
					node.on(value, function(snapshot) {
						result(snapshot);
					});
				};

				/*
				* AUTHENTIFICATION
				*/
				_self.login = function() {
					_self._firebase.authWithOAuthPopup("google", function(error, authData) {
						if (!error) {
							_self.once(_self._users.child(authData.uid), "value", function(snapshot) {
								if (snapshot.val() !== null) { // update user TIMESTAMP
									_self.update(_self._users.child(authData.uid),
										{
											last_login_at: Firebase.ServerValue.TIMESTAMP
										},
										function(error) {log.output(2, error);});
									);
								} else { // set up new user
									_self.set(_self._users.child(authData.uid),
										{
											name: authData.google.displayName,
											email: authData.google.email,
											picture: authData.google.profileImageURL,
											created_at: Firebase.ServerValue.TIMESTAMP,
											last_login_at: Firebase.ServerValue.TIMESTAMP
										},
										function(error) {log.output(2, error);});
								);
						}
						log.output(1, error);
					});
					global.model.user.setUser(authData.uid, authData.google.displayName, authData.google.profileImageURL, authData.google.email); // save local instance of user
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
					global.model.user.setUser(_self.loggedUser().uid, _self.loggedUser().google.displayName, _self.loggedUser().google.profileImageURL, _self.loggedUser().google.email);
				}
				return true;
			}
			return false;
		};

		return _self;
	})(sticky);
