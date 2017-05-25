Sticky Prototype v0.5
================

Sticky notes web app, client based, works in offline mode thanks to Firebase.

TO-DO:
--------------------
* sharing of sticky notes among users (add collaborators)
* deleting shared notes (delete only collaborator entry & from shared index) Notes can be deleted only by owner!
* shared notes can have different position in each users grid (make grid coordinates for notes user based, not note based)
* collaborator UI (display collaborators, create UI for adding/removing/finding collaborators & adding friends)
* date/time detection & smart interaction (inline event creation & seemless integration with Google Calendar; notifications of upcoming tasks; ordering of tasks by due date)
* sticky note tagging/categorizing/color coding (visually distinguish between different sticky notes - identify shared notes)
* optimize FireBase connection & offline mode (persistent local storage in case of dropped connection; startup without internet connection)
* polishing of existing features (ctrl+enter should produce new to-do line;)
* color theme selection (choose different color combinations & save settings to profile)
* user profile settings (change public name, picture)
* send verification email

KNOWN BUGS:
--------------------
* loaded to-do items do not have clickable checkboxes

CHANGELOG:
--------------------
__v0.5.0__<br />
_notes sharing (collaboration)_<br />
__v0.4.0__<br />
_authentification & security (notes are private)_<br />
__v0.3.5__<br />
_major refactoring_<br />
__v0.3__<br />
_refactored into module with own variable scope; multiple bugfixes; to-do's are now almost usable_<br />
__v0.2.2__<br />
_TO-DO newline items added (line with leading checkbox); bugfixes_<br />
__v0.2.0__<br />
_archive implemented and possibility to add multiple pages; bugfixes_<br />
__v0.1.0__<br />
_base functionality & UI_<br />
