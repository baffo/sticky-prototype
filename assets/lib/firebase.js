var sticky = sticky || {};

sticky.FirebaseAdapter = (function (global) {
  var _self = {};
  var vars = global.vars;

  _self._firebase = new Firebase(vars.fireBaseUrl);
  _self._notes = _self._firebase.child('notes');

  /*
  * SET new data (used also for deleting: set NULL)
  */
  _self.set = function(node, data, onError, onSuccess) {
    var set = node.set(
      data,
      function(error) {
        if (error) { onError(); }
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
        if (error) { onError(); }
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
        if (error) { onError(); }
        else { onSuccess();}
      });
    return update;
  };
  
  /*
  * LISTENER: Listen ONCE
  */
  _self.once = function(node, value, result) {
    node.once(value, function(snapshot) {
      result(snapshot);
    });
  };

  return _self;
})(sticky);
