/* *******************************************
INITIATE STICKY NOTES APP
******************************************* */
$.fn.findBack = function(expr) {
    var r = this.find(expr);
    if (this.is(expr)) r = r.add(this);
    return this.pushStack(r);
};
$(function() {
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("Sticky App v"+sticky.vars.version);
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("Starting Up");
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
