/* *******************************************
              sticky notes
******************************************* */
var globalStickyNoteCounter = 0;
var fireBaseUrl = "https://boiling-torch-8284.firebaseio.com";
var noteDefaults = {title: "New Note", column: 0, row: 0, items : {0: "New Item"}};
/* ------------------------------------------
            sanitize String
------------------------------------------- */
function sanitizeString(text) {
    // create temporary containing element
    var elm = document.createElement('div');
    elm.innerHTML = text;
    var inputText = $(elm).text(); // retrieve only text and get rid of (most) HTML tags
    inputText = Sanitizer.escape(inputText, function(url) {return url;}); // run through sanitizer to tak ecare of possible XSS injections
    inputText = URI.withinString(inputText, function(url) {return "<a>" + url + "</a>";}); // make url-s clickable
    return inputText;
}
/* ------------------------------------------
        load saved state from DB
------------------------------------------- */
function loadSavedState() {
    var notes = new Firebase(fireBaseUrl+'/notes');

    notes.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
        });
    });
}
/* ------------------------------------------
            spawn sticky note
------------------------------------------- */
function spawnNewStickyNote(parentId, isNew, data, key) {
    var elm = '<div id="note'+globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp" data-note-key="'+key+'">'+
                '<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
                    '<h2 id="title'+globalStickyNoteCounter+'" class="sticky-title mdl-color-text--cyan can-edit" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="1">'+data.title+'</h2>'+
                '</div>'+
                '<div id="wrapper'+globalStickyNoteCounter+'" class="sticky-content-wrapper">';
    var c = 2;
    for(item in data.items) {
        var key = "";
        if (item != 0) {key = 'data-item-key="'+item+'"';}
        elm += '<div id="n'+globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="'+c+'" '+key+'>'+data.items[item].text+'</div>';
        c++;
    }
    elm += '</div>'+
            '<div class="spacer"></div>'+
            '<div class="sticky-footer-drawer mdl-color--amber">'+
                '<button class="sticky-delete mdl-button mdl-js-button mdl-button--fab  mdl-button--mini-fab">'+
                    '<i class="material-icons">delete</i>'+
                '</button>'+
            '</div>'+
        '</div>';

    var parent = document.createElement('div');
    parent.innerHTML = elm;
    var newElm = parent.firstChild;
    componentHandler.upgradeElement(newElm);
    document.getElementById(parentId).appendChild(newElm);
    
    // needs to be saved if triggered by user
    if (isNew) {
        var notes = new Firebase(fireBaseUrl+'/notes');
        var push = notes.push({
            title: "New Note",
            column: 0,
            row: 0,
            timestamp: Firebase.ServerValue.TIMESTAMP,
        }, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
        $("#note"+globalStickyNoteCounter).attr("data-note-key", push.key());
    } 
    globalStickyNoteCounter++;
}
/* ------------------------------------------
            spawn editable field
------------------------------------------- */
function spawnEditableField(type, parentId, value, stickyNoteId, stickyItemId) {
    var valueText = "", elm = null;
    if (value.length > 0) {
        valueText = ' value="'+value+'"';
    }
    if (type == "input") { 
        elm = returnTextField(valueText, stickyNoteId, stickyItemId);
    } else if (type == "checkbox") {
        elm = returnCheckbox(value, stickyNoteId, stickyItemId);
        $("#"+parentId).removeClass("can-edit");
    } else {
        throw "Invalid type";
    }

    var form = document.createElement('form');
    form.innerHTML = elm;
    var newElm = form.firstChild;
    componentHandler.upgradeElement(newElm);
    $("#"+parentId).html(form);
    $("#"+parentId).addClass("sticky-editing");
    $("#note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
    $("#note"+stickyNoteId+"-item"+stickyItemId).blur(function(){ // on lose focus move content to DOM out of input
        if (type == "input") {
            var inputText = sanitizeString($(this).val());
            $("#"+parentId).html(inputText); // write to DOM
            if ($("#"+parentId).hasClass("sticky-title")) {
                var note = new Firebase(fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key"));
                note.update({
                    title: inputText,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
            } else if ($("#"+parentId).attr("data-item-key")) {
                var items = new Firebase(fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+"/items/"+$("#"+parentId).attr("data-item-key"));
                items.set({
                    text: inputText,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
            } else {
                var items = new Firebase(fireBaseUrl+'/notes/'+$("#note"+stickyNoteId).attr("data-note-key")+'/items');
                var push = items.push({
                    text: inputText,
                    timestamp: Firebase.ServerValue.TIMESTAMP,
                }, function(error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    }
                });
                $("#"+parentId).attr("data-item-key", push.key());
            }
            
            
        } else if (type == "checkbox") {
            //$("#"+parentId).html($(this).val());
        } else {
            throw "Invalid type";
        }
        
        $("#"+parentId).removeClass("sticky-editing");
    });
}
function returnTextField(value, stickyNoteId, stickyItemId) {
    var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                    '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'"'+value+'>'+
                    '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                '</div>';
    return elm;
}
function returnCheckbox(value, stickyNoteId, stickyItemId) {
    var elm = '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="note'+stickyNoteId+'-item'+stickyItemId+'">'+
                    '<input type="checkbox" id="note'+stickyNoteId+'-item'+stickyItemId+'" class="mdl-checkbox__input">'+
                    '<span id="cb900'+stickyItemId+'" class="mdl-checkbox__label can-edit" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="900'+stickyItemId+'">'+value+'</span>'+
                '</label>';
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
    });
    /* *******************************************
              sticky-note INTERACTIONS
    ******************************************* */
    /* ------------------------------------------
               Load saved state from DB
    ------------------------------------------- */
    loadSavedState();
    /* ------------------------------------------
               MANIPULATE STICKY NOTES
    ------------------------------------------- */
    // spawn new sticky note
    $("#add-note").click(function(event) {
        spawnNewStickyNote("dz"+noteDefaults.column, true, noteDefaults, "new");
    });
    // delete sticky note
    $('body').on('click', '.sticky-delete', function() {
        var note = new Firebase(fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key"));
        note.set(null, function(error) {
            if (error) {
                console.log("Data could not be saved." + error);
            }
        });
        $(this).closest(".sticky-note").remove();
    });
    // archive sticky note
    $('body').on('click', '.sticky-archive', function() {
        // TO DO
        $(this).closest(".sticky-note").detach();
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
            var items = new Firebase(fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".can-edit").attr("data-item-key"));
            items.set(null, function(error) {
                if (error) {
                    console.log("Data could not be saved." + error);
                }
            });
            $(this).closest(".can-edit").remove();
        }
    });
});