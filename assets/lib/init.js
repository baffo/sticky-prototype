var loggedUser;
/* *******************************************
INITIATE STICKY NOTES APP
******************************************* */
$(function() {
	// INIT Sticky APP
	sticky.core.constr();
	// WAIT TO CHECK FOR USER AUTH
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			sticky.model.user.userFromData(user.uid, user.displayName, user.photoURL, user.email);
			// load data
			sticky.utils.displayProfile();
			sticky.utils.loadSavedState(sticky.utils.getPage()); // load data
		} else {
			sticky.utils.hideProfile();
		}
	});
});
