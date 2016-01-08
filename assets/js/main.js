/* *******************************************
              sticky notes
******************************************* */

function newStickyLineItem(parentId, stickyNoteId, stickyItemId) {
    var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                    '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'">'+
                    '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                '</div>';

    var form = document.createElement('form');
    form.innerHTML = elm;
    var newElm = form.firstChild;
    componentHandler.upgradeElement(newElm);
    document.getElementById(parentId).appendChild(form);
    document.getElementById("note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
}

/* *******************************************
              DOCUMENT READY
******************************************* */
$(function() {
    /* *******************************************
             dragula.js DRAG & DROP
    ******************************************* */
    // sticky-note interaction
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
    });
    /* *******************************************
                  sticky INTERACTIONS
    ******************************************* */
    // ADD NEW EDITABLE LINE ON STICKY NOTE
    $('body').on('click', '.sticky-note-content', function() {
        if (!$(this).attr("data-dirty")) { // fire only on empty line
            newStickyLineItem($(this).attr("id"), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
            var itemId = parseInt($(this).attr("data-item-id")) + 1;
            // INSERT NEW EMPTY LINE
            $(this).parent().append('<div id="n'+$(this).attr("data-sticky-id")+'i'+itemId+'" class="sticky-note-content" data-sticky-id="'+$(this).attr("data-sticky-id")+'" data-item-id="'+itemId+'"></div>');
            $(this).attr("data-dirty", "true"); // mark as dirty
        }
    });
});