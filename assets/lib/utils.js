var sticky = sticky || {};

sticky.utils = (function (global) {
  var _self = {};
  var vars = global.vars;
  var fb = global.FirebaseAdapter;

  var findUrl = {
      // valid "scheme://" or "www."
      start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
      // everything up to the next whitespace
      end: /[\s\r\n]|$/,
      // trim trailing punctuation captured by end RegExp
      trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
  };
  /* ------------------------------------------
          detect URL within string
  ------------------------------------------- */
  var withinString = function(string, callback, options) {
      options || (options = {});
      var _start = options.start || findUrl.start;
      var _end = options.end || findUrl.end;
      var _trim = options.trim || findUrl.trim;
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
  var prepareHtmlElement = function(elm, upgrade, child, withWrapper) {
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
              sanitize String
  ------------------------------------------- */
  var sanitizeString = function(text, isFormatted) {
      isFormatted = typeof isFormatted !== 'undefined' ? isFormatted : false;
      var inputText = $(prepareHtmlElement(text)).text(); // retrieve only text and get rid of (most) HTML tags
      inputText = Sanitizer.escape(inputText, function(url) {return url;}); // run through sanitizer to take care of possible XSS injections
      if (isFormatted) {inputText = withinString(inputText, function(url) {return '<a href='+url+' target=_blank>'+url+'</a>';});}
      return inputText;
  };

  /* ------------------------------------------
          check for url parameter
  ------------------------------------------- */
  _self.getPage = function() {
      var regex = new RegExp("[\\?&][a-z]+");
      var results = regex.exec(window.location.href);
      if (results) {
          if (vars.page.indexOf(results[0].substring(1, results[0].length))) {
              $('body').addClass(results[0].substring(1, results[0].length));
              return results[0].substring(1, results[0].length);
          }
          $('body').addClass(vars.page[0]);
          return vars.page[0];
      }
      $('body').addClass(vars.page[0]);
      return vars.page[0];
  };
  /* ------------------------------------------
          load saved state from DB
  ------------------------------------------- */
  _self.loadSavedState = function(page) {
    fb.once(fb._notes, "value",
      function(snapshot) {
        snapshot.forEach(function(data) {
          if (!data.val().archived && page == "home") {
              _self.spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
              vars.homeCount++;
          } else if (data.val().archived && page == "archive") {
              _self.spawnNewStickyNote("dz"+data.val().column, false, data.val(), data.key());
              vars.archivedCount++;
          } else {
              if(!data.val().archived) { // TO-DO implement pageDisplay (String type) property to notes
                  vars.homeCount++;
              } else if(data.val().archived) {
                  vars.archivedCount++;
              }
          }
        });
        $("#home .mdl-badge").attr("data-badge", vars.homeCount);
        $("#archive .mdl-badge").attr("data-badge", vars.archivedCount);
      });
  };
  /* ------------------------------------------
              spawn sticky note
  ------------------------------------------- */
  _self.spawnNewStickyNote = function(parentId, isNew, data, key) {
      var elm = '<div id="note'+vars.globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp" data-note-key="'+key+'">'+
                  '<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
                      '<h2 id="title'+vars.globalStickyNoteCounter+'" class="sticky-title mdl-color-text--cyan can-edit" data-sticky-id="'+vars.globalStickyNoteCounter+'" data-item-id="1">'+data.title+'</h2>'+
                  '</div>'+
                  '<div id="wrapper'+vars.globalStickyNoteCounter+'" class="sticky-content-wrapper">';
      var c = 2;
      if (!data.items) {data.items = vars.noteDefaults.items;}
      for(item in data.items) {
          var key = "";
          if (item != 0) {key = 'data-item-key="'+item+'"';}
          if (data.items[item].type == "checkbox") {
              var newElm = prepareHtmlElement(returnCheckbox(data.items[item].text, vars.globalStickyNoteCounter, c, data.items[item].checked, key), true, true, true);
              if (data.items[item].checked) {newElm.querySelector('.mdl-js-checkbox').MaterialCheckbox.check();}
              elm += '<div id="n'+vars.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content" data-sticky-id="'+vars.globalStickyNoteCounter+'" data-item-id="'+c+'" data-dirty="true">'+newElm.innerHTML+'</div>';

          } else {
              elm += '<div id="n'+vars.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+vars.globalStickyNoteCounter+'" data-item-id="'+c+'" '+key+' data-dirty="true">'+data.items[item].text+'</div>';
          }
          c++;
      }
      // add last empty line
      elm += '<div id="n'+vars.globalStickyNoteCounter+'i'+c+'" class="sticky-note-content can-edit" data-sticky-id="'+vars.globalStickyNoteCounter+'" data-item-id="'+c+'"></div>';
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

      document.getElementById(parentId).appendChild(prepareHtmlElement(elm, true));

      // needs to be saved if triggered by user
      if (isNew) {
        var push = fb.push(fb._notes, {
            title: "New Note",
            column: 0,
            row: 0,
            archived: false,
            created_at: Firebase.ServerValue.TIMESTAMP,
            changed_at: Firebase.ServerValue.TIMESTAMP,
        },
        function() {
          console.log("Data could not be saved." + error);
        }, function() {});
        $("#note"+vars.globalStickyNoteCounter).attr("data-note-key", push.key());
      }
      vars.globalStickyNoteCounter++;
  };
  /* ------------------------------------------
              spawn editable field
  ------------------------------------------- */
  _self.spawnEditableField = function(type, parentId, value, stickyNoteId, stickyItemId) {
      var valueText = "", elm = null, newElm;
      if (value.length > 0) {
          valueText = ' value="'+sanitizeString(value)+'"';
      }
      if (type == "input") {
          elm = returnTextField(valueText, stickyNoteId, stickyItemId);
          newElm = prepareHtmlElement(elm, true);
      } else if (type == "checkbox") {
          elm = returnCheckbox(value, stickyNoteId, stickyItemId, '');
          newElm = prepareHtmlElement(elm, true, true);
          $("#"+parentId).removeClass("can-edit");
      } else {
          throw "Invalid type";
      }

      $("#"+parentId).html(newElm);

      if (type == "input") {
          $("#"+parentId).addClass("sticky-editing");
          $("#note"+stickyNoteId+"-item"+stickyItemId).focus(); // set focus to new input
          $("#note"+stickyNoteId+"-item"+stickyItemId).blur(function(){ // on lose focus move content to DOM out of input
              var inputText = sanitizeString($(this).val(), true);
              var fieldType = "input";
              if ($("#"+parentId).hasClass("checkbox-content")) {var fieldType = "checkbox";}

              $("#"+parentId).html(inputText); // write to DOM
              if ($("#"+parentId).hasClass("sticky-title")) {
                var update = fb.update(fb._notes.child($("#note"+stickyNoteId).attr("data-note-key")),
                {
                  title: inputText,
                  changed_at: Firebase.ServerValue.TIMESTAMP,
                },
                function() {
                  console.log("Data could not be saved." + error);
                }, function() {});
              } else if ($("#"+parentId).attr("data-item-key")) {
                var update = fb.update(fb._notes.child($("#note"+stickyNoteId).attr("data-note-key")+"/items/"+$("#"+parentId).attr("data-item-key")),
                {
                  type: fieldType,
                  text: inputText,
                  changed_at: Firebase.ServerValue.TIMESTAMP,
                },
                function() {
                  console.log("Data could not be saved." + error);
                }, function() {});
              } else {
                var push = fb.push(fb._notes.child($("#note"+stickyNoteId).attr("data-note-key")+'/items'),
                {
                  type: fieldType,
                  text: inputText,
                  created_at: Firebase.ServerValue.TIMESTAMP,
                  changed_at: Firebase.ServerValue.TIMESTAMP,
                },
                function() {
                  console.log("Data could not be saved." + error);
                }, function() {});
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
  /* ------------------------------------------
              generate editable text field
  ------------------------------------------- */
  var returnTextField = function(value, stickyNoteId, stickyItemId) {
      var elm = '<div class="mdl-textfield mdl-js-textfield">'+
                      '<input class="mdl-textfield__input" type="text" id="note'+stickyNoteId+'-item'+stickyItemId+'"'+value+'>'+
                      '<label class="mdl-textfield__label" for="note'+stickyNoteId+'-item'+stickyItemId+'">New item</label>'+
                  '</div>';
      return elm;
  };
  /* ------------------------------------------
              generate editable checkbox
  ------------------------------------------- */
  var returnCheckbox = function(value, stickyNoteId, stickyItemId, isChecked, keyId) {
      var checked = ""; if (typeof isChecked != 'undefined' && isChecked == true) {checked = "is-checked";}
      var elm = '<div class="checkbox-item '+checked+'">'+
                  '<label class="'+checked+' mdl-checkbox mdl-js-checkbox" for="note'+stickyNoteId+'-item'+stickyItemId+'">'+
                      '<input type="checkbox" id="note'+stickyNoteId+'-item'+stickyItemId+'" class="mdl-checkbox__input">'+
                  '</label>'+
                  '<div id="cbn'+stickyNoteId+'i'+stickyItemId+'" class="sticky-note-content checkbox-content can-edit is-checkbox" data-sticky-id="'+stickyNoteId+'" data-item-id="900'+stickyItemId+'" data-dirty="true" '+keyId+'>'+value+'</div>'+
              '</div>';
      return elm;
  };

  return _self;
})(sticky);
