var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global) {
  var _self = {};
  var vars = global.vars;

  _self._firebase = new Firebase(vars.fireBaseUrl);
  _self._notes = _self._firebase.child('notes');
  _self._users = _self._firebase.child('users');
  _self._owners = _self._firebase.child('owners');

  /*
  * SET new data (used also for deleting: set NULL)
  */
  _self.set = function(node, data, onError, onSuccess) {
    var set = node.set(
      data,
      function(error) {
        if (error) { onError(error); }
        else { onSuccess(); }
      });
    return set;
  };

  /*
  * PUSH new data, added to existing list
  */
  _self.push = function(node, data, onError, onSuccess) {
    var push = node.push(
      data,
      function(error) {
        if (error) { onError(error); }
        else { onSuccess(); }
      });
    return push;
  };

  /*
  * UPDATE existing data
  */
  _self.update = function(node, data, onError, onSuccess) {
    var update = node.update(
      data,
      function(error) {
        if (error) { onError(error); }
        else { onSuccess();}
      });
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
  * AUTHENTIFICATION
  */
  _self.login = function() {
    _self._firebase.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        _self.once(_self._users.child(authData.uid), "value", function(snapshot) {
          if (snapshot.val() !== null) { // update user TIMESTAMP
            _self.update(_self._users.child(authData.uid),
              {
                last_login_at: Firebase.ServerValue.TIMESTAMP
              },
              function(error) { console.log("Account update failed!", error); },
              function() {}
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
              function(error) { console.log("Account creation failed!", error); },
              function() {}
            );
          }
        });
        global.user.setUser(authData.uid, authData.google.displayName, authData.google.profileImageURL, authData.google.email);
        $("#login").hide();
        global.utils.displayProfile();
        console.log("Authenticated successfully with payload:", authData);
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
    if (_self.loggedUser()) {
      if (global.user.uid == null) { // set local instance
        global.user.setUser(_self.loggedUser().uid, _self.loggedUser().google.displayName, _self.loggedUser().google.profileImageURL, _self.loggedUser().google.email);
      }
      return true;
    }
    return false;
  };

  return _self;
})(sticky);
