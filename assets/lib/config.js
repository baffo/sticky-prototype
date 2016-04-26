var sticky = sticky || {};
/* ------------------------------------------
        initialize variables
------------------------------------------- */
sticky.vars = {
  globalStickyNoteCounter: 0,
  homeCount: 0,
  archivedCount: 0,
  page: ['home', 'archive'],
  fireBaseUrl: "https://boiling-torch-8284.firebaseio.com",
  noteDefaults: {title: "New Note", column: 0, row: 0, items : {0: {text: "New Item"}}}
};
