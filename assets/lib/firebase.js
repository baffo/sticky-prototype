var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global, firebase) {
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAv7-HAOAE72ig6Tle2G0Q4PWxufGqWJq0",
		authDomain: "boiling-torch-8284.firebaseapp.com",
		databaseURL: "https://boiling-torch-8284.firebaseio.com",
		storageBucket: "boiling-torch-8284.appspot.com",
	};
	firebase.initializeApp(config);

	_self._firebase = firebase.database().ref();
	_self._notes = _self._firebase.child('notes');
	_self._users = _self._firebase.child('users');
	_self._user_index = _self._firebase.child('user_index');
	_self._shared = _self._firebase.child('shared');

	/*
	* AUTHENTIFICATION
	*/
	_self.login = function() {
		var auth = firebase.auth();
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.email');
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

		auth.signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var authData = result.user;
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
							name: authData.displayName,
							email: authData.email,
							picture: authData.photoURL,
							created_at: Firebase.ServerValue.TIMESTAMP,
							last_login_at: Firebase.ServerValue.TIMESTAMP
						},
						function(error) {log.output(2, error);});
					// set up entry into user_index (used for looking up users)
					var setUserIndex = _self._user_index.child(sticky.utils.emailToKey(authData.email)).set(
						{
							name: authData.displayName,
							uid: authData.uid,
							picture: authData.photoURL,
							created_at: Firebase.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(2, error);});
				}
				log.output(1, error);
			});
			global.model.user.userFromData(authData.uid, authData.displayName, authData.photoURL, authData.google.email); // save local instance of user
			// display interface
			$("#login").hide();
			global.utils.displayProfile();
			global.utils.loadSavedState(global.utils.getPage()); // load data

			log.output(4, error);
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
		});
	};

	_self.logout = function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// An error happened.
		});
	};

	_self.loggedUser = function() {
		return firebase.auth().currentUser;
	};

	_self.loggedIn = function() {
		if (_self.loggedUser() != null) {
			if (global.model.user.uid == null) { // set local instance
				global.model.user.userFromData(_self.loggedUser().uid, _self.loggedUser().displayName, _self.loggedUser().photoURL, _self.loggedUser().email);
			}
			return true;
		}
		return false;
	};

	return _self;
})(sticky, firebase);
