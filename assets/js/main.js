/* *******************************************
              sticky notes
******************************************* */
var globalStickyNoteCounter = 0;
/* ------------------------------------------
            spawn sticky note
------------------------------------------- */
function spawnNewStickyNote(parentId) {
    var elm = '<div id="note'+globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp">'+
                '<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
                    '<h2 id="title'+globalStickyNoteCounter+'" class="mdl-color-text--cyan can-edit" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="1">New Note</h2>'+
                '</div>'+
                '<div id="wrapper'+globalStickyNoteCounter+'" class="sticky-content-wrapper">'+
                    '<div id="n'+globalStickyNoteCounter+'i2" class="sticky-note-content can-edit" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="2"></div>'+
                '</div>'+
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
    globalStickyNoteCounter++;
}
/* ------------------------------------------
            spawn editable field
------------------------------------------- */
function spawnEditableField(type, parentId, value, stickyNoteId, stickyItemId) {
    console.log("EDIT");
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
            $("#"+parentId).html($(this).val());
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
               MANIPULATE STICKY NOTES
    ------------------------------------------- */
    // spawn new sticky note
    $("#add-note").click(function(event) {
        spawnNewStickyNote("dz1");
    });
    // delete sticky note
    $('body').on('click', '.sticky-delete', function() {
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
        if (event.keyCode === 46) { // delete line
            $(this).closest(".can-edit").remove();
        }
    });
});