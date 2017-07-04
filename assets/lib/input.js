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
        interval = null;

    var event_keydown = function(event) {
		if (event.target.classList.contains(el) || event.target.tagName.toLowerCase() === el) {
			if (event.key == "Enter") {
				event.preventDefault();
			}
	        keysMap[event.key] = true;
			target = event.target;
			return;
		}
    }

    var event_keyup = function(event) {
		if (event.target.classList.contains(el) || event.target.tagName.toLowerCase() === el) {
	        keysMap[event.key] = false;
			target = event.target;
			return;
		}
    }

    var key_down = function(key) {
        return keysMap[key];
    }

    _self.clear = function() {
        keysMap = {};
		keysMapHistory = {};
    }

    var watch_loop = function(keylist, callbackKeyDown, callbackKeyUp){
        return function() {
            if (key_down('Control') && key_down('Enter') || key_down('Meta') && key_down('Enter')) {
				keysMapHistory['ctrlenter'] = true;
				callbackKeyDown('ctrlenter', target);
			} else if (key_down('Enter')) {
				keysMapHistory['enter'] = true;
				callbackKeyDown('enter', target);
			} else if (key_down('Meta') || key_down('Control')) {
				keysMapHistory['ctrl'] = true;
				callbackKeyDown('ctrl', target);
			} else if (key_down('Delete')) {
				keysMapHistory['delete'] = true;
				callbackKeyDown('delete', target);
			} else if (!key_down('Control') && !key_down('Enter') && keysMapHistory['ctrlenter'] || !key_down('Meta') && !key_down('Enter') && keysMapHistory['ctrlenter']) {
				keysMapHistory['ctrlenter'] = false;
				callbackKeyUp('ctrlenter',target);
			} else if (!key_down('Enter') && keysMapHistory['enter']) {
				keysMapHistory['enter'] = false;
				callbackKeyUp('enter',target);
			} else if ((!key_down('Meta') || !key_down('Control')) && keysMapHistory['ctrl']) {
				keysMapHistory['ctrl'] = false;
				callbackKeyUp('ctrl',target);
			} else if (!key_down('Delete') && keysMapHistory['delete']) {
				keysMapHistory['delete'] = false;
				callbackKeyUp('delete',target);
			}
        }
    }

    _self.watch = function(callbackKeyDown, callbackKeyUp) {
        var keylist = Array.from(arguments).splice(3);
        interval = setInterval(watch_loop(keylist, callbackKeyDown, callbackKeyUp), 1000/24);
    }

    _self.unwatch = function() {
        clearInterval(interval);
        delete interval;
    }

    _self.detach = function() {
        document.querySelector('body').removeEventListener("keydown", event_keydown);
        document.querySelector('body').removeEventListener("keyup", event_keyup);
    }

    var attach = function(el) {
        document.querySelector('body').addEventListener("keydown", event_keydown);
        document.querySelector('body').addEventListener("keyup", event_keyup);
    }

    attach();

    return _self;
};
