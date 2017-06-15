Sticky Prototype
================

Sticky notes web app, client based, works in offline mode thanks to Firebase.

Features:
--------------------
* login with Google & show your Profile
* create new Notes with text and to-do items
* archive notes
* add external links in notes
* add Friends and share your Notes


TO-DO:
--------------------
**User features**
* user profile settings (change public name, picture)
* update _user index_ & _user info_ with updated info when logging in with Google (update profile picture, display name, etc.)
* send verification email

**Social features**
* deleting shared notes (delete only collaborator entry & from shared index) Notes can be deleted only by owner!
* shared notes can have different position in each users grid (make grid coordinates for notes user based, not note based)
* collaborator UI (display collaborators, create UI for adding/removing/finding collaborators & adding friends)
* Notifications (Friend requests, notes shared, shared notes updated, ...)

**Core features**
* date/time detection & smart interaction (inline event creation & seemless integration with Google Calendar; notifications of upcoming tasks; ordering of tasks by due date)
* optimize FireBase connection & offline mode (persistent local storage in case of dropped connection; startup without internet connection)
* polishing of existing features (ctrl+enter should produce new to-do line;)

**Nice to have**
* sticky note tagging/categorizing/color coding (visually distinguish between different sticky notes - identify shared notes)
* color theme selection (choose different color combinations & save settings to profile)

KNOWN BUGS:
--------------------
* non-owners cannot see note collaborators

CHANGELOG:
--------------------
__v0.5.3__<br />
_Fixed toggling to-do items in notes; after deleting lines jump to previous line item_<br />
__v0.5.2__<br />
_Add friends_<br />
__v0.5.1__<br />
_updated TO-DO list_<br />
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
