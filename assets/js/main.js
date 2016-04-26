/* ------------------------------------------
        Object.keys polyfill
------------------------------------------- */
if (!Object.keys) {
    Object.keys = function (obj) {
        var arr = [],
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }
        return arr;
    };
}

/* *******************************************
              Sticky notes
******************************************* */
var Sticky = (function (s) {
    /* ------------------------------------------
            initialize variables
    ------------------------------------------- */
	s.globalStickyNoteCounter = 0;
    s.homeCount = 0;
    s.archivedCount = 0;
    s.page = ['home', 'archive'];
    s.fireBaseUrl = "https://boiling-torch-8284.firebaseio.com";
    s.noteDefaults = {title: "New Note", column: 0, row: 0, items : {0: {text: "New Item"}}};

    /* ------------------------------------------
            detect URL within string
    ------------------------------------------- */
    s.findUrl = {
        // valid "scheme://" or "www."
        start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
        // everything up to the next whitespace
        end: /[\s\r\n]|$/,
        // trim trailing punctuation captured by end RegExp
        trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
    };
    s.withinString = function(string, callback, options) {
        options || (options = {});
        var _start = options.start || s.findUrl.start;
        var _end = options.end || s.findUrl.end;
        var _trim = options.trim || s.findUrl.trim;
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
    s.prepareHtmlElement = function(elm, upgrade, child, withWrapper) {
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
    };
    /* ------------------------------------------
            check for url parameter
    ------------------------------------------- */
    s.getPage = function() {
        var regex = new RegExp("[\\?&][a-z]+");
        var results = regex.exec(window.location.href);
        if (results) {
            if (s.page.indexOf(results[0].substring(1, results[0].length))) {
                $('body').addClass(results[0].substring(1, results[0].length));
                return results[0].substring(1, results[0].length);
            }
            $('body').addClass(s.page[0]);
            return s.page[0];
        }
        $('body').addClass(s.page[0]);
        return s.page[0];
    };
    /* ------------------------------------------
                sanitize String
    ------------------------------------------- */
    s.sanitizeString = function(text, isFormatted) {
        isFormatted = typeof isFormatted !== 'undefined' ? isFormatted : false;
        var inputText = $(s.prepareHtmlElement(text)).text(); // retrieve only text and get rid of (most) HTML tags
        inputText = Sanitizer.escape(inputText, function(url) {return url;}); // run through sanitizer to take care of possible XSS injections
        if (isFormatted) {inputText = s.withinString(inputText, function(url) {return '<a href='+url+' target=_blank>'+url+'</a>';});}
        return inputText;
    };
    /* ------------------------------------------
            load saved state from DB
    ------------------------------------------- */
    s.loadSavedState = function(page) {
        var notes = new Firebase(s.fireBaseUrl+'/notes');

        notes.once("value", function(snapshot) {
            snapshot.forEach(function(data) {
                if (!data.val().archived && page == "home") {
                    s.spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
                    s.homeCount++;
                } else if (data.val().archived && page == "archive") {
                    s.spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
                    s.archivedCount++;
                } else {
                    if(!data.val().archived) { // TO-DO implement pageDisplay (String type) property to notes
                        s.homeCount++;
                    } else if(data.val().archived) {
                        s.archivedCount++;
                    }
                }
            });
            $("#home .mdl-badge").attr("data-badge", s.homeCount);
            $("#archive .mdl-badge").attr("data-badge", s.archivedCount);
        });
    };

    /* ------------------------------------------
                spawn sticky note
    ------------------------------------------- */
    s.spawnNewStickyNote = function(parentId, isNew, data, key) {
        var elm = '<div id="note'+s.globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp" data-note-key="'+key+'">'+
                    '<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
                        '<h2 id="title'+s.globalStickyNoteCounter+'" class="sticky-title mdl-color-text--cyan can-edit" data-sticky-id="'+s.globalStickyNoteCounter+'" data-item-id="1">'+data.title+'</h2>'+
                    '</div>'+
                    '<div id="wrapper'+s.globalStickyNoteCounter+'" class="sticky-content-wrapper">';
        var c = 2;
        if (!data.items) {data.items = s.noteDefaults.items;}
        for(item in data.items) {
            var key = "";
            if (item != 0) {key = 'data-item-key="'+item+'"';}
            if (data.items[item].type == "checkbox") {
                var newElm = s.prepareHtmlElement(s.returnCheckbox(data.items[item].text, s.globalStickyNoteCounter, c, data.items[item].checked, key), true, true, true);
                if (data.items[item].checked) {newElm.querySelector('.mdl-js-checkbox').MaterialCheckbox.check();}
                elm += '<div id="n'+s.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content" data-sticky-id="'+s.globalStickyNoteCounter+'" data-item-id="'+c+'" data-dirty="true">'+newElm.innerHTML+'</div>';

            } else {
                elm += '<div id="n'+s.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+s.globalStickyNoteCounter+'" data-item-id="'+c+'" '+key+' data-dirty="true">'+data.items[item].text+'</div>';
            }
            c++;
        }
        // add last empty line
        elm += '<div id="n'+s.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+s.globalStickyNoteCounter+'" data-item-id="'+c+'"></div>';
        // close off sticky note
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

        document.getElementById(parentId).appendChild(s.prepareHtmlElement(elm, true));

        // needs to be saved if triggered by user
        if (isNew) {
            var notes = new Firebase(s.fireBaseUrl+'/notes');
            var push = notes.push({
                title: "New Note",
                column: 0,
                row: 0,
                archived: false,
                created_at: Firebase.ServerValue.TIMESTAMP,
                changed_at: Firebase.ServerValue.TIMESTAMP,
            }, function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                }
            });
            $("#note"+s.globalStickyNoteCounter).attr("data-note-key", push.key());
        }
        s.globalStickyNoteCounter++;
    };
    /* ------------------------------------------
                spawn editable field
    ------------------------------------------- */
    s.spawnEditableField = function(type, parentId, value, stickyNoteId, stickyItemId) {
        var valueText = "", elm = null, newElm;
        if (value.length > 0) {
            valueText = ' value="'+s.sanitizeString(value)+'"';
        }
        if (type == "input") {
            elm = s.returnTextField(valueText, stickyNoteId, stickyItemId);
            newElm = s.prepareHtmlElement(elm, true);
        } else if (type == "checkbox") {
            elm = s.returnCheckbox(value, stickyNoteId, stickyItemId, '');
            newElm = s.prepareHtmlElement(elm, true, true);
            $("#"+parentId).removeClass("can-edit");
        } else {
            throw "Invalid type";
        }

        $("#"+parentId).html(newElm);

        if (type == "input") {
            $("#"+parentId).addClass("sticky-editing");
            $("#note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
            $("#note"+stickyNoteId+"-item"+stickyItemId).blur(function(){ // on lose focus move content to DOM out of input
                var inputText = s.sanitizeString($(this).val(), true);
                var fieldType = "input";
                if ($("#"+parentId).hasClass("checkbox-content")) {var fieldType = "checkbox";}

                $("#"+parentId).html(inputText); // write to DOM
                if ($("#"+parentId).hasClass("sticky-title")) {
                    var note = new Firebase(s.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key"));
                    note.update({
                        title: inputText,
                        changed_at: Firebase.ServerValue.TIMESTAMP,
                    }, function(error) {
                        if (error) {
                            console.log("Data could not be saved." + error);
                        }
                    });
                } else if ($("#"+parentId).attr("data-item-key")) {
                    var items = new Firebase(s.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+"/items/"+$("#"+parentId).attr("data-item-key"));
                    items.update({
                        type: fieldType,
                        text: inputText,
                        changed_at: Firebase.ServerValue.TIMESTAMP,
                    }, function(error) {
                        if (error) {
                            console.log("Data could not be saved." + error);
                        }
                    });
                } else {
                    var items = new Firebase(s.fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+'/items');
                    var push = items.push({
                        type: fieldType,
                        text: inputText,
                        created_at: Firebase.ServerValue.TIMESTAMP,
                        changed_at: Firebase.ServerValue.TIMESTAMP,
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
    };
    s.returnTextField = function(value, stickyNoteId, stickyItemId) {
        var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                        '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'"'+value+'>'+
                        '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                    '</div>';
        return elm;
    };
    s.returnCheckbox = function(value, stickyNoteId, stickyItemId, isChecked, keyId) {
        var checked = ""; if (typeof isChecked != 'undefined' && isChecked == true) {checked = "is-checked";}
        var elm = '<div class="checkbox-item '+checked+'">'+
                    '<label class="'+checked+' mdl-checkbox mdl-js-checkbox" for="note'+stickyNoteId+'-item'+stickyItemId+'">'+
                        '<input type="checkbox" id="note'+stickyNoteId+'-item'+stickyItemId+'" class="mdl-checkbox__input">'+
                    '</label>'+
                    '<div id="cbn'+stickyNoteId+'i'+stickyItemId+'" class="sticky-note-content checkbox-content can-edit is-checkbox" data-sticky-id="'+stickyNoteId+'" data-item-id="900'+stickyItemId+'" data-dirty="true" '+keyId+'>'+value+'</div>'+
                '</div>';
        return elm;
    };

	return s;
}(Sticky || {}));



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
            column: $(container).attr("data-column"),
            changed_at: Firebase.ServerValue.TIMESTAMP,
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
        Sticky.spawnNewStickyNote("dz"+Sticky.noteDefaults.column, true, Sticky.noteDefaults, "new");
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
            archived: true,
            changed_at: Firebase.ServerValue.TIMESTAMP,
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
    $('body').on('click', '.can-edit:not(a)', function(event) {
        if (!$(this).hasClass("sticky-editing")) { // check if we're already editing - prevent nesting
            var type = "input";
            if (event.ctrlKey && !$(this).hasClass('is-checkbox')) { // if ctrl is pressed, toggle checkbox input/ prevent nesting of checkboxes
                type = "checkbox";
            }
            try {
                Sticky.spawnEditableField(type, $(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
            } catch(error) {console.log(error);}

            if (!$(this).attr("data-dirty") && !$(this).is("h2")) { // fire only on last line (add new one) && make sure it's not the title (we need only one)
                var itemId = parseInt($(this).attr("data-item-id")) + 1;
                // INSERT NEW EMPTY LINE
                $(this).parent().append('<div id="n'+$(this).attr("data-sticky-id")+'i'+itemId+'" class="sticky-note-content can-edit" data-sticky-id="'+$(this).attr("data-sticky-id")+'" data-item-id="'+itemId+'"></div>');
                $(this).attr("data-dirty", "true"); // mark as dirty
            }
        }
    });
    $('body').on('click', '.mdl-checkbox__tick-outline', function(event) {
        $(this).closest('.mdl-checkbox').toggleClass('is-checked');
        $(this).closest('.checkbox-item').toggleClass('is-checked');
        var isChecked = false; if ($(this).closest('.mdl-checkbox').hasClass('is-checked')) {isChecked = true;}

        var items = new Firebase(Sticky.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".checkbox-item").find('.checkbox-content').attr("data-item-key"));
        items.update({
            checked: isChecked,
            changed_at: Firebase.ServerValue.TIMESTAMP,
        }, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
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
                    console.log("Data could not be deleted." + error);
                }
            });
            if ($(this).closest(".can-edit").hasClass('checkbox-content')) {
                $(this).closest(".checkbox-item").parent().remove();
            } else {
                $(this).closest(".can-edit").remove();
            }

        }
    });
});
