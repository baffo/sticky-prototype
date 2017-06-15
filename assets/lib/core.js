var sticky = sticky || {};
/* ------------------------------------------
initialize variables
------------------------------------------- */
sticky.core = (function (global) {
	// GLOBAL variables
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;
	var utils = global.utils;
	var newEditableFieldState = "input";

	_self.constr = function() {
		// Initialize firebase
		console.log("Initializing Firebase");
		var config = {
			apiKey: "AIzaSyAv7-HAOAE72ig6Tle2G0Q4PWxufGqWJq0",
		    authDomain: "boiling-torch-8284.firebaseapp.com",
		    databaseURL: "https://boiling-torch-8284.firebaseio.com",
		    projectId: "boiling-torch-8284",
		    storageBucket: "boiling-torch-8284.appspot.com",
		    messagingSenderId: "275531933667"
		};
		firebase.initializeApp(config);

		_self._firebase = firebase.database().ref();
		_self._notes = _self._firebase.child('notes');
		_self._users = _self._firebase.child('users');
		_self._user_index = _self._firebase.child('user_index');
		_self._shared = _self._firebase.child('shared');

		interface(); // load interface dependencies & event handlers
	}

	var interface = function() {
		console.log("Drawing Interface");
		/* *******************************************
		dragula.js DRAG & DROP
		******************************************* */
		// sticky-note drag & drop
		// var containers = $('.dropzone').toArray();
		dragula($('.dropzone').toArray(), {
			isContainer: function (el) {
				return false; // only elements in drake.containers will be taken into account
			},
			moves: function (el, source, handle, sibling) {
				return true; // elements are always draggable by default
			},
			accepts: function (el, target, source, sibling) {
				return true; // elements can be dropped in any of the `containers` by default
			},
			invalid: function (el, target) {
				return false; // don't prevent any drags from initiating by default
			},
			direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
			copy: false,                       // elements are moved by default, not copied
			copySortSource: false,             // elements in copy-source containers can be reordered
			revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
			removeOnSpill: false,              // spilling will `.remove` the element, if this is true
			mirrorContainer: document.body,    // set the element that gets mirror elements appended
			ignoreInputTextSelection: true     // allows users to select input text, see details below
		}).on('over', function (el, container) {
			container.className += ' drop-target';
		}).on('out', function (el, container) {
			container.className = container.className.replace(' drop-target', '');
		}).on('drop', function (el, container) {
			var update = _self._notes.child($(el).attr("data-note-key")).update(
				{
					column: $(container).attr("data-column"),
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
		});

		/* ------------------------------------------
		MANIPULATE STICKY NOTES - LISTENERS
		------------------------------------------- */
		// GO-TO home
		$("#login").click(function(event) {
			_self.login();
		});
		$("#logout").click(function(event) {
			_self.logout();
		});
		// spawn new sticky note
		$("#add-note").click(function(event) {
			utils.spawnNewStickyNote("dz"+vars.noteDefaults.column, true, vars.noteDefaults, "new");
		});
		// GO-TO home
		$("#home").click(function(event) {
			window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
		});
		// GO-TO archive
		$("#archive").click(function(event) {
			window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname+"?archive";
		});
		// delete sticky note & associated list in users list of notes
		$('body').on('click', '.sticky-delete', function() {
			var set = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")).set(
				null,
				function(error) {log.output(3, error);});
			var set = _self._users.child(global.core.getUser().uid+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")).set(
				null,
				function(error) {log.output(3, error);});
			$(this).closest(".sticky-note").toggleClass('delete');
			setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
		});
		// archive sticky note
		$('body').on('click', '.sticky-archive', function() {
			var update = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")).update(
				{
					archived: true,
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
			// update UI
			$(this).closest(".sticky-note").toggleClass('archive');
			setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
			vars.archivedCount++;
			$("#archive .mdl-badge").attr("data-badge", vars.archivedCount);
		});
		/* ------------------------------------------
		interactions with content
		------------------------------------------- */
		// INVOKE EDITABLE LINE
		$('body').on('click', '.can-edit:not(a)', function(event) {
			if (!$(this).hasClass("sticky-editing")) { // check if we're already editing - prevent nesting
				var type = newEditableFieldState;
				if (type == "checkbox" && $(this).hasClass('is-checkbox')) { // prevent checkbox nesting
					type = "input";
				}
				try {
					utils.spawnEditableField(type, $(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
				} catch(error) {console.log(error);}

				if (!$(this).attr("data-dirty") && !$(this).is("h2")) { // fire only on last line (add new one) && make sure it's not the title (we need only one)
					var itemId = parseInt($(this).attr("data-item-id")) + 1;
					// INSERT NEW EMPTY LINE
					$(this).parent().append('<div id="n'+$(this).attr("data-sticky-id")+'i'+itemId+'" class="sticky-note-content can-edit" data-sticky-id="'+$(this).attr("data-sticky-id")+'" data-item-id="'+itemId+'"></div>');
					$(this).attr("data-dirty", "true"); // mark as dirty
				}
			}
		});
		$('body').on('click', '.mdl-checkbox__tick-outline', function(event) {
			$(this).closest('.mdl-checkbox').toggleClass('is-checked');
			$(this).closest('.checkbox-item').toggleClass('is-checked');
			var isChecked = false; if ($(this).closest('.mdl-checkbox').hasClass('is-checked')) {isChecked = true;}

			var update = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".checkbox-item").find('.checkbox-content').attr("data-item-key")).update(
				{
					checked: isChecked,
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
		});
		// key events on editable content
		$('body').on('keydown', '.mdl-textfield__input', function (event) {
			if (event.keyCode === 13) {
				event.preventDefault(); // prevent ENTER to trigger page reload
			} else if (event.ctrlKey || event.keyCode === 17 || event.keyCode === 91) { // if ctrl is pressed, toggle checkbox input
				newEditableFieldState = "checkbox";
			}
		});
		// key events on editable content
		$('body').on('keyup', '.mdl-textfield__input', function (event) {
			if (event.keyCode === 27) { // remove focus on ESC (finish editing)
				$(this).blur();
			}
			if (event.ctrlKey || event.keyCode === 17 || event.keyCode === 91) { //if ctrl is lifted, toggle classic input
			   newEditableFieldState = "input";
		   	}
			if (event.keyCode === 13) { // remove focus and start new line on ENTER
				$(this).closest(".can-edit").next().click();
				$(this).blur();
			}
			if (event.keyCode === 46) { // delete line item
				var set = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".can-edit").attr("data-item-key")).set(
					null,
					function(error) {log.output(3, error);});

				var $previous = $(this).closest(".can-edit").prev().findBack(".can-edit");
				var $previousCheckbox = $(this).closest(".can-edit").parent().closest(".sticky-note-content").prev().findBack(".can-edit");
				console.log($previousCheckbox);
				if ($(this).closest(".can-edit").hasClass('checkbox-content')) {
					$(this).closest(".checkbox-item").parent().remove();
					$previousCheckbox.click();
				} else {
					$(this).closest(".can-edit").remove();
					$previous.click();
				}

			}
		});

		/* ------------------------------------------
		register dialogs
		------------------------------------------- */
		var dialogShowFriends = document.getElementById('show-friends');
		if (!dialogShowFriends.showModal) {
			dialogPolyfill.registerDialog(dialogShowFriends);
		}
		$('body').on('click', '#add-friend', function() {
			global.utils.displayFriends();
			dialogShowFriends.showModal();
		});
		$('body').on('click', '#show-friends .close', function() {
			dialogShowFriends.close();
		});
		$('body').on('click', '.mdl-dialog .add_new_friends', function() {
			global.utils.addFriend($("#friend_email").val()).then(function(res) {
				global.utils.displayFriends(); // refresh view
			});
		});

		var dialogShowCollab = document.getElementById('show-collaborators');
		if (!dialogShowCollab.showModal) {
			dialogPolyfill.registerDialog(dialogShowCollab);
		}
		$('body').on('click', '.sticky-show-collaborators', function() {
			global.utils.displayCollaborators($(this).closest(".sticky-note").attr("data-note-key"));
			dialogShowCollab.showModal();
		});
		$('body').on('click', '#show-collaborators .close', function() {
			dialogShowCollab.close();
		});
		$('body').on('click', '.mdl-dialog .add_new', function() {
			global.utils.addCollaborator($("#show-collaborators").attr("data-rel"), $("#coll_email").val()).then(function(res) {
				global.utils.displayCollaborators($("#show-collaborators").attr("data-rel")); // refresh view
			});
		});
		$('body').on('click', '.mdl-dialog .delete', function() {
			global.utils.deleteCollaborator($(this).closest(".sticky-signed-in-user-container").attr("data-email")).then(function(res) {
				global.utils.displayCollaborators($("#show-collaborators").attr("data-rel")); // refresh view
			});
		});
	}

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
							last_login_at: firebase.database.ServerValue.TIMESTAMP
						},
						function(error) {log.output(2, error);});
				} else { // set up new user
					var setUser = _self._users.child(authData.uid).set(
						{
							name: authData.displayName,
							email: authData.email,
							picture: authData.photoURL,
							created_at: firebase.database.ServerValue.TIMESTAMP,
							last_login_at: firebase.database.ServerValue.TIMESTAMP
						},
						function(error) {log.output(2, error);});
					// set up entry into user_index (used for looking up users)
					var setUserIndex = _self._user_index.child(sticky.utils.emailToKey(authData.email)).set(
						{
							name: authData.displayName,
							uid: authData.uid,
							picture: authData.photoURL,
							created_at: firebase.database.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(2, error);});
				}
			});

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
			global.utils.hideProfile();
		}, function(error) {
			log.output(6, error);
		});
	};

	_self.getUser = function() {
		if (global.model.user.uid == null) { // set local instance
			var user = firebase.auth().currentUser;
			global.model.user.userFromData(user.uid, user.displayName, user.photoURL, user.email);
		}
		return global.model.user;
	};

	return _self;
})(sticky);
