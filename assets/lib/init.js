var sticky = sticky || {};
/* *******************************************
             INITIATE STICKY NOTES APP
******************************************* */
$(function() {

  var StickyStart = {
    init: function() {
      /* *******************************************
               dragula.js DRAG & DROP
      ******************************************* */
      // sticky-note drag & drop
      // var containers = $('.dropzone').toArray();
      dragula($('.dropzone').toArray(), {
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
          var note = new Firebase(sticky.vars.fireBaseUrl+'/notes/'+$(el).attr("data-note-key"));
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
              Init & Load saved state for current page
      ------------------------------------------- */
      sticky.utils.loadSavedState(sticky.utils.getPage());

      // set up listeners for Sticky
      this.setUpListeners();
    },
    setUpListeners: function() {
      /* ------------------------------------------
                 MANIPULATE STICKY NOTES
      ------------------------------------------- */
      // spawn new sticky note
      $("#add-note").click(function(event) {
          sticky.utils.spawnNewStickyNote("dz"+sticky.vars.noteDefaults.column, true, sticky.vars.noteDefaults, "new");
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
          var note = new Firebase(sticky.vars.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key"));
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
          var note = new Firebase(sticky.vars.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key"));
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
          sticky.vars.archivedCount++;
          $("#archive .mdl-badge").attr("data-badge", sticky.vars.archivedCount);
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
                  sticky.utils.spawnEditableField(type, $(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
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

          var items = new Firebase(sticky.vars.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".checkbox-item").find('.checkbox-content').attr("data-item-key"));
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
              var items = new Firebase(sticky.vars.fireBaseUrl+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".can-edit").attr("data-item-key"));
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
    }
  };
  StickyStart.init();
});
