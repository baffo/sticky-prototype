var loggedUser;
/* *******************************************
INITIATE STICKY NOTES APP
******************************************* */
$(function() {
	// INIT Sticky APP & WAIT TO CHECK FOR USER AUTH
	sticky.core.constr();
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			sticky.utils.displayProfile();
			sticky.utils.loadSavedState(sticky.utils.getPage());
		} else {
			$("#login").show();
		}
	});
});
