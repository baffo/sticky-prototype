var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global) {
  function FirebaseAdapter(fireBaseUrl) {
    this._firebase = new Firebase(fireBaseUrl);
    this._notes = this._firebase.child('notes');
  };

  return FirebaseAdapter;
});
