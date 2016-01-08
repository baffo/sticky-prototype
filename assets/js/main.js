/* *******************************************
              sticky notes
******************************************* */
var globalStickyNoteCounter = 0;

function newStickyNote(parentId) {
    var elm = '<div id="note'+globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp mdl-color--amber-50">'+
                '<div class="sticky-header-drawer mdl-card__title mdl-color--amber-200">'+
                    '<h2 class="mdl-color-text--cyan sticky-editable" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="1">New Note</h2>'+
                '</div>'+
                '<div class="sticky-content-wrapper">'+
                    '<div id="n'+globalStickyNoteCounter+'i2" class="sticky-note-content" data-sticky-id="'+globalStickyNoteCounter+'" data-item-id="2"></div>'+
                '</div>'+
                '<div class="sticky-footer-drawer mdl-color--amber-300">'+
                    '<button class="mdl-button mdl-js-button mdl-button--fab  mdl-button--mini-fab">'+
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

function invokeEditableField(parentId, value, stickyNoteId, stickyItemId) {
    var valueText = "";
    if (value.length > 0) {
        valueText = ' value="'+value+'"';
    }
    var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                    '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'"'+valueText+'>'+
                    '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                '</div>';

    var form = document.createElement('form');
    form.innerHTML = elm;
    var newElm = form.firstChild;
    componentHandler.upgradeElement(newElm);
    $("#"+parentId).html(form);
    $("#"+parentId).addClass("sticky-editing");
    $("#note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
    $("#note"+stickyNoteId+"-item"+stickyItemId).blur(function(){ // on lose focus move content to DOM out of input
        $("#n"+stickyNoteId+"i"+stickyItemId).html($(this).val());
        $("#n"+stickyNoteId+"i"+stickyItemId).removeClass("sticky-editing");
    });
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
    dragula(containers);
    /* *******************************************
                  sticky INTERACTIONS
    ******************************************* */
    // INVOKE EDITABLE LINE
    $('body').on('click', '.sticky-note-content', function() {
        if (!$(this).hasClass("sticky-editing")) { // check if we're already editing - prevent nesting
            invokeEditableField($(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
            if (!$(this).attr("data-dirty")) { // fire only on last line (add new one)   
                var itemId = parseInt($(this).attr("data-item-id")) + 1;
                // INSERT NEW EMPTY LINE
                $(this).parent().append('<div id="n'+$(this).attr("data-sticky-id")+'i'+itemId+'" class="sticky-note-content" data-sticky-id="'+$(this).attr("data-sticky-id")+'" data-item-id="'+itemId+'"></div>');
                $(this).attr("data-dirty", "true"); // mark as dirty
            }
        }
    });
    $("#add-note").click(function(event) {
        newStickyNote("dz1");
    });
});