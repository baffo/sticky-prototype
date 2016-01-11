/* *******************************************
              sticky notes
******************************************* */
function Sticky() {}
Sticky.globalStickyNoteCounter = 0;
Sticky.homeCount = 0;
Sticky.archivedCount = 0;
Sticky.page = ['home', 'archive'];
Sticky.fireBaseUrl = "https://boiling-torch-8284.firebaseio.com";
Sticky.noteDefaults = {title: "New Note", column: 0, row: 0, items : {0: {text: "New Item"}}};

/* ------------------------------------------
        detect URL within string
------------------------------------------- */
Sticky.findUrl = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
};
Sticky.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || Sticky.findUrl.start;
    var _end = options.end || Sticky.findUrl.end;
    var _trim = options.trim || Sticky.findUrl.trim;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end).replace(_trim, '');
      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
};
/* ------------------------------------------
        prepare HTML element
        construct DOM tree from string
        and register element with componentHandler
------------------------------------------- */
Sticky.prepareHtmlElement = function(elm, upgrade, child, withWrapper) {
    upgrade = typeof upgrade !== 'undefined' ? upgrade : false;
    child = typeof child !== 'undefined' ? child : false;
    withWrapper = typeof withWrapper !== 'undefined' ? withWrapper : false;
    var div = document.createElement('div');
    div.innerHTML = elm;
    var newElm = div.firstChild;
    if (upgrade) {
        if (child) {componentHandler.upgradeElement(newElm.firstChild);} 
            else {componentHandler.upgradeElement(newElm);}
    }
    if (withWrapper) {return div;}
    return newElm;
}
/* ------------------------------------------
        check for url parameter
------------------------------------------- */
Sticky.getPage = function() {
	var regex = new RegExp("[\\?&][a-z]+");
	var results = regex.exec(window.location.href);
	if (results) {
        if (Sticky.page.indexOf(results[0].substring(1, results[0].length))) {
            $('body').addClass(results[0].substring(1, results[0].length)); 
            return results[0].substring(1, results[0].length);
        }
        $('body').addClass(Sticky.page[0]); 
		return Sticky.page[0];
	}
    $('body').addClass(Sticky.page[0]); 
    return Sticky.page[0];
};
/* ------------------------------------------
            sanitize String
------------------------------------------- */
Sticky.sanitizeString = function(text) {
    var inputText = $(Sticky.prepareHtmlElement(text)).text(); // retrieve only text and get rid of (most) HTML tags
    inputText = Sanitizer.escape(inputText, function(url) {return url;}); // run through sanitizer to tak ecare of possible XSS injections
    inputText = Sticky.withinString(inputText, function(url) {return "<a>" + url + "</a>";}); // make url-s clickable
    return inputText;
}
/* ------------------------------------------
        load saved state from DB
------------------------------------------- */
Sticky.loadSavedState = function(page) {
    var notes = new Firebase(Sticky.fireBaseUrl+'/notes');

    notes.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (!data.val().isArchived && page == "home") {
                spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
                Sticky.homeCount++;
            } else if (data.val().isArchived && page == "archive") {
                spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
                Sticky.archivedCount++;
            } else {
                if(!data.val().isArchived) { // TO-DO implement pageDisplay (String type) property to notes
                    Sticky.homeCount++;
                } else if(data.val().isArchived) {
                    Sticky.archivedCount++; 
                }    
            }
        });
        $("#home .mdl-badge").attr("data-badge", Sticky.homeCount);
        $("#archive .mdl-badge").attr("data-badge", Sticky.archivedCount);
    });
}
/* ------------------------------------------
            spawn sticky note
------------------------------------------- */
function spawnNewStickyNote(parentId, isNew, data, key) {
    var elm = '<div id="note'+Sticky.globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp" data-note-key="'+key+'">'+
                '<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
                    '<h2 id="title'+Sticky.globalStickyNoteCounter+'" class="sticky-title mdl-color-text--cyan can-edit" data-sticky-id="'+Sticky.globalStickyNoteCounter+'" data-item-id="1">'+data.title+'</h2>'+
                '</div>'+
                '<div id="wrapper'+Sticky.globalStickyNoteCounter+'" class="sticky-content-wrapper">';
    var c = 2;
    if (!data.items) {data.items = Sticky.noteDefaults.items;}
    for(item in data.items) {
        var key = "";
        if (item != 0) {key = 'data-item-key="'+item+'"';}
        if (data.items[item].type == "checkbox") {           
            var newElm = Sticky.prepareHtmlElement(returnCheckbox(data.items[item].text, Sticky.globalStickyNoteCounter, c), true, true, true);
            
            elm += '<div id="n'+Sticky.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+Sticky.globalStickyNoteCounter+'" data-item-id="'+c+'" '+key+'>'+newElm.innerHTML+'</div>';
        
        } else {
            elm += '<div id="n'+Sticky.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+Sticky.globalStickyNoteCounter+'" data-item-id="'+c+'" '+key+'>'+data.items[item].text+'</div>';
        }
        c++;
    }
    elm += '</div>'+
            '<div class="spacer"></div>'+
            '<div class="sticky-footer-drawer mdl-color--amber">'+
                '<button class="sticky-delete mdl-button mdl-js-button mdl-button--fab  mdl-button--mini-fab">'+
                    '<i class="material-icons">delete</i>'+
                '</button>'+
                '<button class="sticky-archive mdl-button mdl-js-button mdl-button--fab  mdl-button--mini-fab">'+
                    '<i class="material-icons">archive</i>'+
                '</button>'+
            '</div>'+
        '</div>';

    document.getElementById(parentId).appendChild(Sticky.prepareHtmlElement(elm, true));
    
    // needs to be saved if triggered by user
    if (isNew) {
        var notes = new Firebase(Sticky.fireBaseUrl+'/notes');
        var push = notes.push({
            title: "New Note",
            column: 0,
            row: 0,
            isArchived: false,
            timestamp: Firebase.ServerValue.TIMESTAMP,
        }, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
        $("#note"+Sticky.globalStickyNoteCounter).attr("data-note-key", push.key());
    } 
    Sticky.globalStickyNoteCounter++;
}
/* ------------------------------------------
            spawn editable field
------------------------------------------- */
function spawnEditableField(type, parentId, value, stickyNoteId, stickyItemId) {
    var valueText = "", elm = null, newElm;
    if (value.length > 0) {
        valueText = ' value="'+value+'"';
    }
    if (type == "input") { 
        elm = returnTextField(valueText, stickyNoteId, stickyItemId);
        newElm = Sticky.prepareHtmlElement(elm, true);
    } else if (type == "checkbox") {
        elm = returnCheckbox(value, stickyNoteId, stickyItemId);
        newElm = Sticky.prepareHtmlElement(elm, true, true);
        $("#"+parentId).removeClass("can-edit");
    } else {
        throw "Invalid type";
    }

    $("#"+parentId).html(newElm);
    $("#"+parentId).addClass("sticky-editing");
    if (type == "input") { 
        $("#note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
        $("#note"+stickyNoteId+"-item"+stickyItemId).blur(function(){ // on lose focus move content to DOM out of input
            var inputText = Sticky.sanitizeString($(this).val());
            var fieldType = "input";
            if ($("#"+parentId).hasClass("checkbox-content")) {var fieldType = "checkbox";}
            
            $("#"+parentId).html(inputText); // write to DOM
            if ($("#"+parentId).hasClass("sticky-title")) {
                var note = new Firebase(Sticky.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key"));
                note.update({
                    title: inputText,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
            } else if ($("#"+parentId).attr("data-item-key")) {
                var items = new Firebase(Sticky.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+"/items/"+$("#"+parentId).attr("data-item-key"));
                items.set({
                    type: fieldType,
                    text: inputText,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
            } else {
                var items = new Firebase(Sticky.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+'/items');
                var push = items.push({
                    type: fieldType,
                    text: inputText,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
                $("#"+parentId).attr("data-item-key", push.key());
            }
            $("#"+parentId).removeClass("sticky-editing");
        });
    } else if (type == "checkbox") {
        $("#cbn"+stickyNoteId+"i"+stickyItemId).click(); // toggle checkbox label edit field
    } else {
        throw "Invalid type";
    }
}
function returnTextField(value, stickyNoteId, stickyItemId) {
    var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                    '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'"'+value+'>'+
                    '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                '</div>';
    return elm;
}
function returnCheckbox(value, stickyNoteId, stickyItemId) {
    var elm = '<div class="checkbox-item">'+
                '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="note'+stickyNoteId+'-item'+stickyItemId+'">'+
                    '<input type="checkbox" id="note'+stickyNoteId+'-item'+stickyItemId+'" class="mdl-checkbox__input">'+
                '</label>'+
                '<div id="cbn'+stickyNoteId+'i'+stickyItemId+'" class="sticky-note-content checkbox-content can-edit" data-sticky-id="'+stickyNoteId+'" data-item-id="900'+stickyItemId+'" data-dirty="true">'+value+'</div>'+
            '</div>';
    return elm;
}
/* *******************************************
             INITIATE LISTENERS
******************************************* */
$(function() {
    /* *******************************************
             dragula.js DRAG & DROP
    ******************************************* */
    // sticky-note drag & drop
    var containers = $('.dropzone').toArray();
    dragula(containers, {
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
        var note = new Firebase(Sticky.fireBaseUrl+'/notes/'+$(el).attr("data-note-key"));
        note.update({
            column: $(container).attr("data-column")
        }, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
    });
    /* *******************************************
              sticky-note INTERACTIONS
    ******************************************* */
    /* ------------------------------------------
            Load saved state for current page
    ------------------------------------------- */
    Sticky.loadSavedState(Sticky.getPage());
    /* ------------------------------------------
               MANIPULATE STICKY NOTES
    ------------------------------------------- */
    // spawn new sticky note
    $("#add-note").click(function(event) {
        spawnNewStickyNote("dz"+Sticky.noteDefaults.column, true, Sticky.noteDefaults, "new");
    });
    // GO-TO home
    $("#home").click(function(event) {
        window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname; 
    });
    // GO-TO archive
    $("#archive").click(function(event) {
        window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname+"?archive"; 
    });
    // delete sticky note
    $('body').on('click', '.sticky-delete', function() {
        var note = new Firebase(Sticky.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key"));
        note.set(null, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
        $(this).closest(".sticky-note").toggleClass('delete');
        setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
    });
    // archive sticky note
    $('body').on('click', '.sticky-archive', function() {
        var note = new Firebase(Sticky.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key"));
        note.update({
            isArchived: true
        }, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
        // update UI
        $(this).closest(".sticky-note").toggleClass('archive');
        setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
        Sticky.archivedCount++;
        $("#archive .mdl-badge").attr("data-badge", Sticky.archivedCount);
    });
    /* ------------------------------------------
             interactions with content
    ------------------------------------------- */
    // INVOKE EDITABLE LINE
    $('body').on('click', '.can-edit', function(event) {
        if (!$(this).hasClass("sticky-editing")) { // check if we're already editing - prevent nesting
            var type = "input";
            if (event.ctrlKey) { // if ctrl is pressed, toggle checkbox input
                type = "checkbox";
            }
            try {
                spawnEditableField(type, $(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
            } catch(error) {console.log(error);}
            
            if (!$(this).attr("data-dirty") && !$(this).is("h2")) { // fire only on last line (add new one) && make sure it's not the title (we need only one)   
                var itemId = parseInt($(this).attr("data-item-id")) + 1;
                // INSERT NEW EMPTY LINE
                $(this).parent().append('<div id="n'+$(this).attr("data-sticky-id")+'i'+itemId+'" class="sticky-note-content can-edit" data-sticky-id="'+$(this).attr("data-sticky-id")+'" data-item-id="'+itemId+'"></div>');
                $(this).attr("data-dirty", "true"); // mark as dirty
            }
        }
    });
    // key events on editable content
    $('body').on('keydown', '.mdl-textfield__input', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault(); // prevent ENTER to trigger page reload
        }
    });
    // key events on editable content
    $('body').on('keyup', '.mdl-textfield__input', function (event) {
        if (event.keyCode === 27) { // remove focus on ESC (finish editing)
            $(this).blur();
        }
        if (event.keyCode === 13) { // remove focus and start new line on ENTER
            $(this).closest(".can-edit").next().click();
            $(this).blur();
        }
        if (event.keyCode === 46) { // delete line item
            var items = new Firebase(Sticky.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".can-edit").attr("data-item-key"));
            items.set(null, function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                }
            });
            $(this).closest(".can-edit").remove();
        }
    });
});