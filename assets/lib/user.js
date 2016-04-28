var sticky = sticky || {};

/* USER MODEL */
sticky.user = (function (global) {
  _self = {};

  _self.uid = null;
  _self.name = null;
  _self.picture = null;
  _self.email = null;

  _self.setUser = function (uid, name, picture, email) {
    _self.uid = uid;
    _self.name = name;
    _self.picture = picture;
    _self.email = email;
  };

  return _self;
})(sticky);
