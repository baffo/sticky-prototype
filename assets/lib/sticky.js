var sticky = sticky || {};

sticky.Sticky = (function(global) {

  function Sticky() {
    this.vars = sticky.vars;
    this.fb = sticky.FirebaseAdapter;
    this.utils = sticky.utils;

    return this;
  }
  return Sticky;

})(this);

var Sticky = sticky.Sticky;
