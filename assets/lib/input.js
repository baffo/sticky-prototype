var sticky = sticky || {};
//
// Original implementation @Braden Best https://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
// Modifications @Primoz Bevk
// modified to apply listeners to dynamically added elements with certain className/tagName
// has a KeyUp callback in addition to the original KeyDown callback
// passes event.target to callbacks
//
sticky.input = function (el) {
    var _self = {},
		keysMap = {},
		keysMapHistory = {},
		target = null,
        intervals = {};

    var ev_kdown = function(event) {
		if (event.target.className.toLowerCase() === el || event.target.tagName.toLowerCase() === el) {
			if (event.key == "Enter") {
				event.preventDefault();
			}
	        keysMap[event.key] = true;
			target = event.target;
			return;
		}
    }

    var ev_kup = function(event) {
		if (event.target.className.toLowerCase() === el || event.target.tagName.toLowerCase() === el) {
	        keysMap[event.key] = false;
			target = event.target;
			return;
		}
    }

    var key_down = function(key) {
        return keysMap[key];
    }

    var keys_down_array = function(array) {
		var keys_down = [];
        for (var i = 0; i < array.length; i++) {
            if (!key_down(array[i])) {
                return false;
			} else {
				keys_down.push(array[i]);
			}
		}
		for (var i = 0; i < keys_down.length; i++) {
			keysMapHistory[keys_down[i]] = true;
		}
        return true;
    }

	var keys_up_array = function(array) {
        for(var i = 0; i < array.length; i++)
            if(!keysMapHistory[array[i]]) {
				keysMapHistory[array[i]] = false;
                return false;
			} else {
				keysMapHistory[array[i]] = false;
			}

        return true;
    }

    var keys_down_arguments = function() {
        return keys_down_array(Array.from(arguments));
    }

    _self.clear = function() {
        keysMap = {};
		keysMapHistory = {};
    }

    var watch_loop = function(keylist, callbackKeyDown, callbackKeyUp){
        return function() {
            if (keys_down_array(keylist)) {
				callbackKeyDown(target);
			} else if (keys_up_array(keylist)) {
				callbackKeyUp(target);
			}
        }
    }

    _self.watch = function(name, callbackKeyDown, callbackKeyUp) {
        var keylist = Array.from(arguments).splice(3);
        intervals[name] = setInterval(watch_loop(keylist, callbackKeyDown, callbackKeyUp), 1000/24);
    }

    _self.unwatch = function(name) {
        clearInterval(intervals[name]);
        delete intervals[name];
    }

    _self.detach = function() {
        document.querySelector('body').removeEventListener("keydown", ev_kdown);
        document.querySelector('body').removeEventListener("keyup", ev_kup);
    }

    var attach = function(el) {
        document.querySelector('body').addEventListener("keydown", ev_kdown);
        document.querySelector('body').addEventListener("keyup", ev_kup);
    }

    attach();

    return _self;
};
