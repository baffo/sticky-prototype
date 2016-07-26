/**
 * material-design-lite - Material Design Components in CSS, JS and HTML
 * @version v1.0.6
 * @license Apache-2.0
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
!function(){"use strict";function e(e,t){if(e){if(t.element_.classList.contains(t.CssClasses_.MDL_JS_RIPPLE_EFFECT)){var s=document.createElement("span");s.classList.add(t.CssClasses_.MDL_RIPPLE_CONTAINER),s.classList.add(t.CssClasses_.MDL_JS_RIPPLE_EFFECT);var i=document.createElement("span");i.classList.add(t.CssClasses_.MDL_RIPPLE),s.appendChild(i),e.appendChild(s)}e.addEventListener("click",function(s){s.preventDefault();var i=e.href.split("#")[1],n=t.element_.querySelector("#"+i);t.resetTabState_(),t.resetPanelState_(),e.classList.add(t.CssClasses_.ACTIVE_CLASS),n.classList.add(t.CssClasses_.ACTIVE_CLASS)})}}function t(e,t,s,i){if(i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)){var n=document.createElement("span");n.classList.add(i.CssClasses_.RIPPLE_CONTAINER),n.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);var a=document.createElement("span");a.classList.add(i.CssClasses_.RIPPLE),n.appendChild(a),e.appendChild(n)}e.addEventListener("click",function(n){n.preventDefault();var a=e.href.split("#")[1],l=i.content_.querySelector("#"+a);i.resetTabState_(t),i.resetPanelState_(s),e.classList.add(i.CssClasses_.IS_ACTIVE),l.classList.add(i.CssClasses_.IS_ACTIVE)})}var s={upgradeDom:function(e,t){},upgradeElement:function(e,t){},upgradeElements:function(e){},upgradeAllRegistered:function(){},registerUpgradedCallback:function(e,t){},register:function(e){},downgradeElements:function(e){}};s=function(){function e(e,t){for(var s=0;s<p.length;s++)if(p[s].className===e)return"undefined"!=typeof t&&(p[s]=t),p[s];return!1}function t(e){var t=e.getAttribute("data-upgraded");return null===t?[""]:t.split(",")}function s(e,s){var i=t(e);return-1!==i.indexOf(s)}function i(t,s){if("undefined"==typeof t&&"undefined"==typeof s)for(var a=0;a<p.length;a++)i(p[a].className,p[a].cssClass);else{var l=t;if("undefined"==typeof s){var o=e(l);o&&(s=o.cssClass)}for(var r=document.querySelectorAll("."+s),d=0;d<r.length;d++)n(r[d],l)}}function n(i,n){if(!("object"==typeof i&&i instanceof Element))throw new Error("Invalid argument provided to upgrade MDL element.");var a=t(i),l=[];if(n)s(i,n)||l.push(e(n));else{var o=i.classList;p.forEach(function(e){o.contains(e.cssClass)&&-1===l.indexOf(e)&&!s(i,e.className)&&l.push(e)})}for(var r,d=0,_=l.length;_>d;d++){if(r=l[d],!r)throw new Error("Unable to find a registered component for the given class.");a.push(r.className),i.setAttribute("data-upgraded",a.join(","));var h=new r.classConstructor(i);h[C]=r,c.push(h);for(var u=0,m=r.callbacks.length;m>u;u++)r.callbacks[u](i);r.widget&&(i[r.className]=h);var E=document.createEvent("Events");E.initEvent("mdl-componentupgraded",!0,!0),i.dispatchEvent(E)}}function a(e){Array.isArray(e)||(e="function"==typeof e.item?Array.prototype.slice.call(e):[e]);for(var t,s=0,i=e.length;i>s;s++)t=e[s],t instanceof HTMLElement&&(n(t),t.children.length>0&&a(t.children))}function l(t){var s="undefined"==typeof t.widget&&"undefined"==typeof t.widget,i=!0;s||(i=t.widget||t.widget);var n={classConstructor:t.constructor||t.constructor,className:t.classAsString||t.classAsString,cssClass:t.cssClass||t.cssClass,widget:i,callbacks:[]};if(p.forEach(function(e){if(e.cssClass===n.cssClass)throw new Error("The provided cssClass has already been registered: "+e.cssClass);if(e.className===n.className)throw new Error("The provided className has already been registered")}),t.constructor.prototype.hasOwnProperty(C))throw new Error("MDL component classes must not have "+C+" defined as a property.");var a=e(t.classAsString,n);a||p.push(n)}function o(t,s){var i=e(t);i&&i.callbacks.push(s)}function r(){for(var e=0;e<p.length;e++)i(p[e].className)}function d(e){for(var t=0;t<c.length;t++){var s=c[t];if(s.element_===e)return s}}function _(e){if(e&&e[C].classConstructor.prototype.hasOwnProperty(u)){e[u]();var t=c.indexOf(e);c.splice(t,1);var s=e.element_.getAttribute("data-upgraded").split(","),i=s.indexOf(e[C].classAsString);s.splice(i,1),e.element_.setAttribute("data-upgraded",s.join(","));var n=document.createEvent("Events");n.initEvent("mdl-componentdowngraded",!0,!0),e.element_.dispatchEvent(n)}}function h(e){var t=function(e){_(d(e))};if(e instanceof Array||e instanceof NodeList)for(var s=0;s<e.length;s++)t(e[s]);else{if(!(e instanceof Node))throw new Error("Invalid argument provided to downgrade MDL nodes.");t(e)}}var p=[],c=[],u="mdlDowngrade",C="mdlComponentConfigInternal_";return{upgradeDom:i,upgradeElement:n,upgradeElements:a,upgradeAllRegistered:r,registerUpgradedCallback:o,register:l,downgradeElements:h}}(),s.ComponentConfigPublic,s.ComponentConfig,s.Component,s.upgradeDom=s.upgradeDom,s.upgradeElement=s.upgradeElement,s.upgradeElements=s.upgradeElements,s.upgradeAllRegistered=s.upgradeAllRegistered,s.registerUpgradedCallback=s.registerUpgradedCallback,s.register=s.register,s.downgradeElements=s.downgradeElements,window.componentHandler=s,window.componentHandler=s,window.addEventListener("load",function(){"classList"in document.createElement("div")&&"querySelector"in document&&"addEventListener"in window&&Array.prototype.forEach?(document.documentElement.classList.add("mdl-js"),s.upgradeAllRegistered()):(s.upgradeElement=function(){},s.register=function(){})}),Date.now||(Date.now=function(){return(new Date).getTime()},Date.now=Date.now);for(var i=["webkit","moz"],n=0;n<i.length&&!window.requestAnimationFrame;++n){var a=i[n];window.requestAnimationFrame=window[a+"RequestAnimationFrame"],window.cancelAnimationFrame=window[a+"CancelAnimationFrame"]||window[a+"CancelRequestAnimationFrame"],window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var l=0;window.requestAnimationFrame=function(e){var t=Date.now(),s=Math.max(l+16,t);return setTimeout(function(){e(l=s)},s-t)},window.cancelAnimationFrame=clearTimeout,window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}var o=function(e){this.element_=e,this.init()};window.MaterialButton=o,o.prototype.Constant_={},o.prototype.CssClasses_={RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-button__ripple-container",RIPPLE:"mdl-ripple"},o.prototype.blurHandler_=function(e){e&&this.element_.blur()},o.prototype.disable=function(){this.element_.disabled=!0},o.prototype.disable=o.prototype.disable,o.prototype.enable=function(){this.element_.disabled=!1},o.prototype.enable=o.prototype.enable,o.prototype.init=function(){if(this.element_){if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleElement_=document.createElement("span"),this.rippleElement_.classList.add(this.CssClasses_.RIPPLE),e.appendChild(this.rippleElement_),this.boundRippleBlurHandler=this.blurHandler_.bind(this),this.rippleElement_.addEventListener("mouseup",this.boundRippleBlurHandler),this.element_.appendChild(e)}this.boundButtonBlurHandler=this.blurHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundButtonBlurHandler),this.element_.addEventListener("mouseleave",this.boundButtonBlurHandler)}},o.prototype.mdlDowngrade_=function(){this.rippleElement_&&this.rippleElement_.removeEventListener("mouseup",this.boundRippleBlurHandler),this.element_.removeEventListener("mouseup",this.boundButtonBlurHandler),this.element_.removeEventListener("mouseleave",this.boundButtonBlurHandler)},o.prototype.mdlDowngrade=o.prototype.mdlDowngrade_,o.prototype.mdlDowngrade=o.prototype.mdlDowngrade,s.register({constructor:o,classAsString:"MaterialButton",cssClass:"mdl-js-button",widget:!0});var r=function(e){this.element_=e,this.init()};window.MaterialCheckbox=r,r.prototype.Constant_={TINY_TIMEOUT:.001},r.prototype.CssClasses_={INPUT:"mdl-checkbox__input",BOX_OUTLINE:"mdl-checkbox__box-outline",FOCUS_HELPER:"mdl-checkbox__focus-helper",TICK_OUTLINE:"mdl-checkbox__tick-outline",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-checkbox__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded"},r.prototype.onChange_=function(e){this.updateClasses_()},r.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},r.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},r.prototype.onMouseUp_=function(e){this.blur_()},r.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},r.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},r.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},r.prototype.checkToggleState=r.prototype.checkToggleState,r.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},r.prototype.checkDisabled=r.prototype.checkDisabled,r.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},r.prototype.disable=r.prototype.disable,r.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},r.prototype.enable=r.prototype.enable,r.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},r.prototype.check=r.prototype.check,r.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},r.prototype.uncheck=r.prototype.uncheck,r.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("span");e.classList.add(this.CssClasses_.BOX_OUTLINE);var t=document.createElement("span");t.classList.add(this.CssClasses_.FOCUS_HELPER);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.TICK_OUTLINE),e.appendChild(s),this.element_.appendChild(t),this.element_.appendChild(e),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementMouseUp),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},r.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundRippleMouseUp),this.inputElement_.removeEventListener("change",this.boundInputOnChange),this.inputElement_.removeEventListener("focus",this.boundInputOnFocus),this.inputElement_.removeEventListener("blur",this.boundInputOnBlur),this.element_.removeEventListener("mouseup",this.boundElementMouseUp)},r.prototype.mdlDowngrade=r.prototype.mdlDowngrade_,r.prototype.mdlDowngrade=r.prototype.mdlDowngrade,s.register({constructor:r,classAsString:"MaterialCheckbox",cssClass:"mdl-js-checkbox",widget:!0});var d=function(e){this.element_=e,this.init()};window.MaterialIconToggle=d,d.prototype.Constant_={TINY_TIMEOUT:.001},d.prototype.CssClasses_={INPUT:"mdl-icon-toggle__input",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-icon-toggle__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},d.prototype.onChange_=function(e){this.updateClasses_()},d.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},d.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},d.prototype.onMouseUp_=function(e){this.blur_()},d.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},d.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},d.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},d.prototype.checkToggleState=d.prototype.checkToggleState,d.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},d.prototype.checkDisabled=d.prototype.checkDisabled,d.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},d.prototype.disable=d.prototype.disable,d.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},d.prototype.enable=d.prototype.enable,d.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},d.prototype.check=d.prototype.check,d.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},d.prototype.uncheck=d.prototype.uncheck,d.prototype.init=function(){if(this.element_){if(this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(e),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementOnMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementOnMouseUp),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},d.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundRippleMouseUp),this.inputElement_.removeEventListener("change",this.boundInputOnChange),this.inputElement_.removeEventListener("focus",this.boundInputOnFocus),this.inputElement_.removeEventListener("blur",this.boundInputOnBlur),this.element_.removeEventListener("mouseup",this.boundElementOnMouseUp)},d.prototype.mdlDowngrade=d.prototype.mdlDowngrade_,d.prototype.mdlDowngrade=d.prototype.mdlDowngrade,s.register({constructor:d,classAsString:"MaterialIconToggle",cssClass:"mdl-js-icon-toggle",widget:!0});var _=function(e){this.element_=e,this.init()};window.MaterialMenu=_,_.prototype.Constant_={TRANSITION_DURATION_SECONDS:.3,TRANSITION_DURATION_FRACTION:.8,CLOSE_TIMEOUT:150},_.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32,UP_ARROW:38,DOWN_ARROW:40},_.prototype.CssClasses_={CONTAINER:"mdl-menu__container",OUTLINE:"mdl-menu__outline",ITEM:"mdl-menu__item",ITEM_RIPPLE_CONTAINER:"mdl-menu__item-ripple-container",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_UPGRADED:"is-upgraded",IS_VISIBLE:"is-visible",IS_ANIMATING:"is-animating",BOTTOM_LEFT:"mdl-menu--bottom-left",BOTTOM_RIGHT:"mdl-menu--bottom-right",TOP_LEFT:"mdl-menu--top-left",TOP_RIGHT:"mdl-menu--top-right",UNALIGNED:"mdl-menu--unaligned"},_.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),this.container_=e;var t=document.createElement("div");t.classList.add(this.CssClasses_.OUTLINE),this.outline_=t,e.insertBefore(t,this.element_);var s=this.element_.getAttribute("for"),i=null;s&&(i=document.getElementById(s),i&&(this.forElement_=i,i.addEventListener("click",this.handleForClick_.bind(this)),i.addEventListener("keydown",this.handleForKeyboardEvent_.bind(this))));var n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM);this.boundItemKeydown_=this.handleItemKeyboardEvent_.bind(this),this.boundItemClick_=this.handleItemClick_.bind(this);for(var a=0;a<n.length;a++)n[a].addEventListener("click",this.boundItemClick_),n[a].tabIndex="-1",n[a].addEventListener("keydown",this.boundItemKeydown_);if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))for(this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),a=0;a<n.length;a++){var l=n[a],o=document.createElement("span");o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);var r=document.createElement("span");r.classList.add(this.CssClasses_.RIPPLE),o.appendChild(r),l.appendChild(o),l.classList.add(this.CssClasses_.RIPPLE_EFFECT)}this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT),this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT),this.element_.classList.contains(this.CssClasses_.TOP_LEFT)&&this.outline_.classList.add(this.CssClasses_.TOP_LEFT),this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)&&this.outline_.classList.add(this.CssClasses_.TOP_RIGHT),this.element_.classList.contains(this.CssClasses_.UNALIGNED)&&this.outline_.classList.add(this.CssClasses_.UNALIGNED),e.classList.add(this.CssClasses_.IS_UPGRADED)}},_.prototype.handleForClick_=function(e){if(this.element_&&this.forElement_){var t=this.forElement_.getBoundingClientRect(),s=this.forElement_.parentElement.getBoundingClientRect();this.element_.classList.contains(this.CssClasses_.UNALIGNED)||(this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"):this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.bottom=s.bottom-t.top+"px"):this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.bottom=s.bottom-t.top+"px"):(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"))}this.toggle(e)},_.prototype.handleForKeyboardEvent_=function(e){if(this.element_&&this.container_&&this.forElement_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)&&(e.keyCode===this.Keycodes_.UP_ARROW?(e.preventDefault(),t[t.length-1].focus()):e.keyCode===this.Keycodes_.DOWN_ARROW&&(e.preventDefault(),t[0].focus()))}},_.prototype.handleItemKeyboardEvent_=function(e){if(this.element_&&this.container_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");if(t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)){var s=Array.prototype.slice.call(t).indexOf(e.target);if(e.keyCode===this.Keycodes_.UP_ARROW)e.preventDefault(),s>0?t[s-1].focus():t[t.length-1].focus();else if(e.keyCode===this.Keycodes_.DOWN_ARROW)e.preventDefault(),t.length>s+1?t[s+1].focus():t[0].focus();else if(e.keyCode===this.Keycodes_.SPACE||e.keyCode===this.Keycodes_.ENTER){e.preventDefault();var i=new MouseEvent("mousedown");e.target.dispatchEvent(i),i=new MouseEvent("mouseup"),e.target.dispatchEvent(i),e.target.click()}else e.keyCode===this.Keycodes_.ESCAPE&&(e.preventDefault(),this.hide())}}},_.prototype.handleItemClick_=function(e){e.target.hasAttribute("disabled")?e.stopPropagation():(this.closing_=!0,window.setTimeout(function(e){this.hide(),this.closing_=!1}.bind(this),this.Constant_.CLOSE_TIMEOUT))},_.prototype.applyClip_=function(e,t){this.element_.classList.contains(this.CssClasses_.UNALIGNED)?this.element_.style.clip="":this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?this.element_.style.clip="rect(0 "+t+"px 0 "+t+"px)":this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?this.element_.style.clip="rect("+e+"px 0 "+e+"px 0)":this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?this.element_.style.clip="rect("+e+"px "+t+"px "+e+"px "+t+"px)":this.element_.style.clip=""},_.prototype.addAnimationEndListener_=function(){var e=function(){this.element_.removeEventListener("transitionend",e),this.element_.removeEventListener("webkitTransitionEnd",e),this.element_.classList.remove(this.CssClasses_.IS_ANIMATING)}.bind(this);this.element_.addEventListener("transitionend",e),this.element_.addEventListener("webkitTransitionEnd",e)},_.prototype.show=function(e){if(this.element_&&this.container_&&this.outline_){var t=this.element_.getBoundingClientRect().height,s=this.element_.getBoundingClientRect().width;this.container_.style.width=s+"px",this.container_.style.height=t+"px",this.outline_.style.width=s+"px",this.outline_.style.height=t+"px";for(var i=this.Constant_.TRANSITION_DURATION_SECONDS*this.Constant_.TRANSITION_DURATION_FRACTION,n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),a=0;a<n.length;a++){var l=null;l=this.element_.classList.contains(this.CssClasses_.TOP_LEFT)||this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(t-n[a].offsetTop-n[a].offsetHeight)/t*i+"s":n[a].offsetTop/t*i+"s",n[a].style.transitionDelay=l}this.applyClip_(t,s),window.requestAnimationFrame(function(){this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.element_.style.clip="rect(0 "+s+"px "+t+"px 0)",this.container_.classList.add(this.CssClasses_.IS_VISIBLE)}.bind(this)),this.addAnimationEndListener_();var o=function(t){t===e||this.closing_||t.target.parentNode===this.element_||(document.removeEventListener("click",o),this.hide())}.bind(this);document.addEventListener("click",o)}},_.prototype.show=_.prototype.show,_.prototype.hide=function(){if(this.element_&&this.container_&&this.outline_){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),t=0;t<e.length;t++)e[t].style.transitionDelay=null;var s=this.element_.getBoundingClientRect(),i=s.height,n=s.width;this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.applyClip_(i,n),this.container_.classList.remove(this.CssClasses_.IS_VISIBLE),this.addAnimationEndListener_()}},_.prototype.hide=_.prototype.hide,_.prototype.toggle=function(e){this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)?this.hide():this.show(e)},_.prototype.toggle=_.prototype.toggle,_.prototype.mdlDowngrade_=function(){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),t=0;t<e.length;t++)e[t].removeEventListener("click",this.boundItemClick_),e[t].removeEventListener("keydown",this.boundItemKeydown_)},_.prototype.mdlDowngrade=_.prototype.mdlDowngrade_,_.prototype.mdlDowngrade=_.prototype.mdlDowngrade,s.register({constructor:_,classAsString:"MaterialMenu",cssClass:"mdl-js-menu",widget:!0});var h=function(e){this.element_=e,this.init()};window.MaterialProgress=h,h.prototype.Constant_={},h.prototype.CssClasses_={INDETERMINATE_CLASS:"mdl-progress__indeterminate"},h.prototype.setProgress=function(e){this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)||(this.progressbar_.style.width=e+"%")},h.prototype.setProgress=h.prototype.setProgress,h.prototype.setBuffer=function(e){this.bufferbar_.style.width=e+"%",this.auxbar_.style.width=100-e+"%"},h.prototype.setBuffer=h.prototype.setBuffer,h.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.className="progressbar bar bar1",this.element_.appendChild(e),this.progressbar_=e,e=document.createElement("div"),e.className="bufferbar bar bar2",this.element_.appendChild(e),this.bufferbar_=e,e=document.createElement("div"),e.className="auxbar bar bar3",this.element_.appendChild(e),this.auxbar_=e,this.progressbar_.style.width="0%",this.bufferbar_.style.width="100%",this.auxbar_.style.width="0%",this.element_.classList.add("is-upgraded")}},h.prototype.mdlDowngrade_=function(){for(;this.element_.firstChild;)this.element_.removeChild(this.element_.firstChild)},h.prototype.mdlDowngrade=h.prototype.mdlDowngrade_,h.prototype.mdlDowngrade=h.prototype.mdlDowngrade,s.register({constructor:h,classAsString:"MaterialProgress",cssClass:"mdl-js-progress",widget:!0});var p=function(e){this.element_=e,this.init()};window.MaterialRadio=p,p.prototype.Constant_={TINY_TIMEOUT:.001},p.prototype.CssClasses_={IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded",JS_RADIO:"mdl-js-radio",RADIO_BTN:"mdl-radio__button",RADIO_OUTER_CIRCLE:"mdl-radio__outer-circle",RADIO_INNER_CIRCLE:"mdl-radio__inner-circle",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-radio__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple"},p.prototype.onChange_=function(e){for(var t=document.getElementsByClassName(this.CssClasses_.JS_RADIO),s=0;s<t.length;s++){var i=t[s].querySelector("."+this.CssClasses_.RADIO_BTN);i.getAttribute("name")===this.btnElement_.getAttribute("name")&&t[s].MaterialRadio.updateClasses_()}},p.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},p.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},p.prototype.onMouseup_=function(e){this.blur_()},p.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},p.prototype.blur_=function(){window.setTimeout(function(){this.btnElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},p.prototype.checkDisabled=function(){this.btnElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},p.prototype.checkDisabled=p.prototype.checkDisabled,p.prototype.checkToggleState=function(){this.btnElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},p.prototype.checkToggleState=p.prototype.checkToggleState,p.prototype.disable=function(){this.btnElement_.disabled=!0,this.updateClasses_()},p.prototype.disable=p.prototype.disable,p.prototype.enable=function(){this.btnElement_.disabled=!1,this.updateClasses_()},p.prototype.enable=p.prototype.enable,p.prototype.check=function(){this.btnElement_.checked=!0,this.updateClasses_()},p.prototype.check=p.prototype.check,p.prototype.uncheck=function(){this.btnElement_.checked=!1,this.updateClasses_()},p.prototype.uncheck=p.prototype.uncheck,p.prototype.init=function(){if(this.element_){this.btnElement_=this.element_.querySelector("."+this.CssClasses_.RADIO_BTN),this.boundChangeHandler_=this.onChange_.bind(this),this.boundFocusHandler_=this.onChange_.bind(this),this.boundBlurHandler_=this.onBlur_.bind(this),this.boundMouseUpHandler_=this.onMouseup_.bind(this);var e=document.createElement("span");e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);var t=document.createElement("span");t.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE),this.element_.appendChild(e),this.element_.appendChild(t);var s;if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),s=document.createElement("span"),s.classList.add(this.CssClasses_.RIPPLE_CONTAINER),s.classList.add(this.CssClasses_.RIPPLE_EFFECT),s.classList.add(this.CssClasses_.RIPPLE_CENTER),s.addEventListener("mouseup",this.boundMouseUpHandler_);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),s.appendChild(i),this.element_.appendChild(s)}this.btnElement_.addEventListener("change",this.boundChangeHandler_),this.btnElement_.addEventListener("focus",this.boundFocusHandler_),this.btnElement_.addEventListener("blur",this.boundBlurHandler_),this.element_.addEventListener("mouseup",this.boundMouseUpHandler_),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},p.prototype.mdlDowngrade_=function(){var e=this.element_.querySelector("."+this.CssClasses_.RIPPLE_CONTAINER);this.btnElement_.removeEventListener("change",this.boundChangeHandler_),this.btnElement_.removeEventListener("focus",this.boundFocusHandler_),this.btnElement_.removeEventListener("blur",this.boundBlurHandler_),this.element_.removeEventListener("mouseup",this.boundMouseUpHandler_),e&&(e.removeEventListener("mouseup",this.boundMouseUpHandler_),this.element_.removeChild(e))},p.prototype.mdlDowngrade=p.prototype.mdlDowngrade_,p.prototype.mdlDowngrade=p.prototype.mdlDowngrade,s.register({constructor:p,classAsString:"MaterialRadio",cssClass:"mdl-js-radio",widget:!0});var c=function(e){this.element_=e,this.isIE_=window.navigator.msPointerEnabled,this.init()};window.MaterialSlider=c,c.prototype.Constant_={},c.prototype.CssClasses_={IE_CONTAINER:"mdl-slider__ie-container",SLIDER_CONTAINER:"mdl-slider__container",BACKGROUND_FLEX:"mdl-slider__background-flex",BACKGROUND_LOWER:"mdl-slider__background-lower",BACKGROUND_UPPER:"mdl-slider__background-upper",IS_LOWEST_VALUE:"is-lowest-value",IS_UPGRADED:"is-upgraded"},c.prototype.onInput_=function(e){this.updateValueStyles_()},c.prototype.onChange_=function(e){this.updateValueStyles_()},c.prototype.onMouseUp_=function(e){e.target.blur()},c.prototype.onContainerMouseDown_=function(e){if(e.target===this.element_.parentElement){e.preventDefault();var t=new MouseEvent("mousedown",{target:e.target,buttons:e.buttons,clientX:e.clientX,clientY:this.element_.getBoundingClientRect().y});this.element_.dispatchEvent(t)}},c.prototype.updateValueStyles_=function(){var e=(this.element_.value-this.element_.min)/(this.element_.max-this.element_.min);0===e?this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE):this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE),this.isIE_||(this.backgroundLower_.style.flex=e,this.backgroundLower_.style.webkitFlex=e,this.backgroundUpper_.style.flex=1-e,this.backgroundUpper_.style.webkitFlex=1-e)},c.prototype.disable=function(){this.element_.disabled=!0},c.prototype.disable=c.prototype.disable,c.prototype.enable=function(){this.element_.disabled=!1},c.prototype.enable=c.prototype.enable,c.prototype.change=function(e){"undefined"!=typeof e&&(this.element_.value=e),this.updateValueStyles_()},c.prototype.change=c.prototype.change,c.prototype.init=function(){if(this.element_){if(this.isIE_){var e=document.createElement("div");e.classList.add(this.CssClasses_.IE_CONTAINER),
this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_)}else{var t=document.createElement("div");t.classList.add(this.CssClasses_.SLIDER_CONTAINER),this.element_.parentElement.insertBefore(t,this.element_),this.element_.parentElement.removeChild(this.element_),t.appendChild(this.element_);var s=document.createElement("div");s.classList.add(this.CssClasses_.BACKGROUND_FLEX),t.appendChild(s),this.backgroundLower_=document.createElement("div"),this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER),s.appendChild(this.backgroundLower_),this.backgroundUpper_=document.createElement("div"),this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER),s.appendChild(this.backgroundUpper_)}this.boundInputHandler=this.onInput_.bind(this),this.boundChangeHandler=this.onChange_.bind(this),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.boundContainerMouseDownHandler=this.onContainerMouseDown_.bind(this),this.element_.addEventListener("input",this.boundInputHandler),this.element_.addEventListener("change",this.boundChangeHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.addEventListener("mousedown",this.boundContainerMouseDownHandler),this.updateValueStyles_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},c.prototype.mdlDowngrade_=function(){this.element_.removeEventListener("input",this.boundInputHandler),this.element_.removeEventListener("change",this.boundChangeHandler),this.element_.removeEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.removeEventListener("mousedown",this.boundContainerMouseDownHandler)},c.prototype.mdlDowngrade=c.prototype.mdlDowngrade_,c.prototype.mdlDowngrade=c.prototype.mdlDowngrade,s.register({constructor:c,classAsString:"MaterialSlider",cssClass:"mdl-js-slider",widget:!0});var u=function(e){this.element_=e,this.init()};window.MaterialSpinner=u,u.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},u.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},u.prototype.createLayer=function(e){var t=document.createElement("div");t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+e);var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),s.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var a=[s,i,n],l=0;l<a.length;l++){var o=document.createElement("div");o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),a[l].appendChild(o)}t.appendChild(s),t.appendChild(i),t.appendChild(n),this.element_.appendChild(t)},u.prototype.createLayer=u.prototype.createLayer,u.prototype.stop=function(){this.element_.classList.remove("is-active")},u.prototype.stop=u.prototype.stop,u.prototype.start=function(){this.element_.classList.add("is-active")},u.prototype.start=u.prototype.start,u.prototype.init=function(){if(this.element_){for(var e=1;e<=this.Constant_.MDL_SPINNER_LAYER_COUNT;e++)this.createLayer(e);this.element_.classList.add("is-upgraded")}},s.register({constructor:u,classAsString:"MaterialSpinner",cssClass:"mdl-js-spinner",widget:!0});var C=function(e){this.element_=e,this.init()};window.MaterialSwitch=C,C.prototype.Constant_={TINY_TIMEOUT:.001},C.prototype.CssClasses_={INPUT:"mdl-switch__input",TRACK:"mdl-switch__track",THUMB:"mdl-switch__thumb",FOCUS_HELPER:"mdl-switch__focus-helper",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-switch__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},C.prototype.onChange_=function(e){this.updateClasses_()},C.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},C.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},C.prototype.onMouseUp_=function(e){this.blur_()},C.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},C.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},C.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},C.prototype.checkDisabled=C.prototype.checkDisabled,C.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},C.prototype.checkToggleState=C.prototype.checkToggleState,C.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},C.prototype.disable=C.prototype.disable,C.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},C.prototype.enable=C.prototype.enable,C.prototype.on=function(){this.inputElement_.checked=!0,this.updateClasses_()},C.prototype.on=C.prototype.on,C.prototype.off=function(){this.inputElement_.checked=!1,this.updateClasses_()},C.prototype.off=C.prototype.off,C.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("div");e.classList.add(this.CssClasses_.TRACK);var t=document.createElement("div");t.classList.add(this.CssClasses_.THUMB);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.FOCUS_HELPER),t.appendChild(s),this.element_.appendChild(e),this.element_.appendChild(t),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.rippleContainerElement_.addEventListener("mouseup",this.boundMouseUpHandler);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundChangeHandler=this.onChange_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.inputElement_.addEventListener("change",this.boundChangeHandler),this.inputElement_.addEventListener("focus",this.boundFocusHandler),this.inputElement_.addEventListener("blur",this.boundBlurHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},C.prototype.mdlDowngrade_=function(){this.rippleContainerElement_&&this.rippleContainerElement_.removeEventListener("mouseup",this.boundMouseUpHandler),this.inputElement_.removeEventListener("change",this.boundChangeHandler),this.inputElement_.removeEventListener("focus",this.boundFocusHandler),this.inputElement_.removeEventListener("blur",this.boundBlurHandler),this.element_.removeEventListener("mouseup",this.boundMouseUpHandler)},C.prototype.mdlDowngrade=C.prototype.mdlDowngrade_,C.prototype.mdlDowngrade=C.prototype.mdlDowngrade,s.register({constructor:C,classAsString:"MaterialSwitch",cssClass:"mdl-js-switch",widget:!0});var m=function(e){this.element_=e,this.init()};window.MaterialTabs=m,m.prototype.Constant_={},m.prototype.CssClasses_={TAB_CLASS:"mdl-tabs__tab",PANEL_CLASS:"mdl-tabs__panel",ACTIVE_CLASS:"is-active",UPGRADED_CLASS:"is-upgraded",MDL_JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",MDL_RIPPLE_CONTAINER:"mdl-tabs__ripple-container",MDL_RIPPLE:"mdl-ripple",MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events"},m.prototype.initTabs_=function(){this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)&&this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS),this.tabs_=this.element_.querySelectorAll("."+this.CssClasses_.TAB_CLASS),this.panels_=this.element_.querySelectorAll("."+this.CssClasses_.PANEL_CLASS);for(var t=0;t<this.tabs_.length;t++)new e(this.tabs_[t],this);this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)},m.prototype.resetTabState_=function(){for(var e=0;e<this.tabs_.length;e++)this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.resetPanelState_=function(){for(var e=0;e<this.panels_.length;e++)this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.init=function(){this.element_&&this.initTabs_()},s.register({constructor:m,classAsString:"MaterialTabs",cssClass:"mdl-js-tabs"});var E=function(e){this.element_=e,this.maxRows=this.Constant_.NO_MAX_ROWS,this.init()};window.MaterialTextfield=E,E.prototype.Constant_={NO_MAX_ROWS:-1,MAX_ROWS_ATTRIBUTE:"maxrows"},E.prototype.CssClasses_={LABEL:"mdl-textfield__label",INPUT:"mdl-textfield__input",IS_DIRTY:"is-dirty",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_INVALID:"is-invalid",IS_UPGRADED:"is-upgraded"},E.prototype.onKeyDown_=function(e){var t=e.target.value.split("\n").length;13===e.keyCode&&t>=this.maxRows&&e.preventDefault()},E.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},E.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},E.prototype.updateClasses_=function(){this.checkDisabled(),this.checkValidity(),this.checkDirty()},E.prototype.checkDisabled=function(){this.input_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},E.prototype.checkDisabled=E.prototype.checkDisabled,E.prototype.checkValidity=function(){this.input_.validity&&(this.input_.validity.valid?this.element_.classList.remove(this.CssClasses_.IS_INVALID):this.element_.classList.add(this.CssClasses_.IS_INVALID))},E.prototype.checkValidity=E.prototype.checkValidity,E.prototype.checkDirty=function(){this.input_.value&&this.input_.value.length>0?this.element_.classList.add(this.CssClasses_.IS_DIRTY):this.element_.classList.remove(this.CssClasses_.IS_DIRTY)},E.prototype.checkDirty=E.prototype.checkDirty,E.prototype.disable=function(){this.input_.disabled=!0,this.updateClasses_()},E.prototype.disable=E.prototype.disable,E.prototype.enable=function(){this.input_.disabled=!1,this.updateClasses_()},E.prototype.enable=E.prototype.enable,E.prototype.change=function(e){this.input_.value=e||"",this.updateClasses_()},E.prototype.change=E.prototype.change,E.prototype.init=function(){if(this.element_&&(this.label_=this.element_.querySelector("."+this.CssClasses_.LABEL),this.input_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.input_)){this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)&&(this.maxRows=parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE),10),isNaN(this.maxRows)&&(this.maxRows=this.Constant_.NO_MAX_ROWS)),this.boundUpdateClassesHandler=this.updateClasses_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.input_.addEventListener("input",this.boundUpdateClassesHandler),this.input_.addEventListener("focus",this.boundFocusHandler),this.input_.addEventListener("blur",this.boundBlurHandler),this.maxRows!==this.Constant_.NO_MAX_ROWS&&(this.boundKeyDownHandler=this.onKeyDown_.bind(this),this.input_.addEventListener("keydown",this.boundKeyDownHandler));var e=this.element_.classList.contains(this.CssClasses_.IS_INVALID);this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED),e&&this.element_.classList.add(this.CssClasses_.IS_INVALID)}},E.prototype.mdlDowngrade_=function(){this.input_.removeEventListener("input",this.boundUpdateClassesHandler),this.input_.removeEventListener("focus",this.boundFocusHandler),this.input_.removeEventListener("blur",this.boundBlurHandler),this.boundKeyDownHandler&&this.input_.removeEventListener("keydown",this.boundKeyDownHandler)},E.prototype.mdlDowngrade=E.prototype.mdlDowngrade_,E.prototype.mdlDowngrade=E.prototype.mdlDowngrade,s.register({constructor:E,classAsString:"MaterialTextfield",cssClass:"mdl-js-textfield",widget:!0});var L=function(e){this.element_=e,this.init()};window.MaterialTooltip=L,L.prototype.Constant_={},L.prototype.CssClasses_={IS_ACTIVE:"is-active"},L.prototype.handleMouseEnter_=function(e){e.stopPropagation();var t=e.target.getBoundingClientRect(),s=t.left+t.width/2,i=-1*(this.element_.offsetWidth/2);0>s+i?(this.element_.style.left=0,this.element_.style.marginLeft=0):(this.element_.style.left=s+"px",this.element_.style.marginLeft=i+"px"),this.element_.style.top=t.top+t.height+10+"px",this.element_.classList.add(this.CssClasses_.IS_ACTIVE),window.addEventListener("scroll",this.boundMouseLeaveHandler,!1),window.addEventListener("touchmove",this.boundMouseLeaveHandler,!1)},L.prototype.handleMouseLeave_=function(e){e.stopPropagation(),this.element_.classList.remove(this.CssClasses_.IS_ACTIVE),window.removeEventListener("scroll",this.boundMouseLeaveHandler),window.removeEventListener("touchmove",this.boundMouseLeaveHandler,!1)},L.prototype.init=function(){if(this.element_){var e=this.element_.getAttribute("for");e&&(this.forElement_=document.getElementById(e)),this.forElement_&&(this.forElement_.hasAttribute("tabindex")||this.forElement_.setAttribute("tabindex","0"),this.boundMouseEnterHandler=this.handleMouseEnter_.bind(this),this.boundMouseLeaveHandler=this.handleMouseLeave_.bind(this),this.forElement_.addEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("click",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("blur",this.boundMouseLeaveHandler),this.forElement_.addEventListener("touchstart",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("mouseleave",this.boundMouseLeaveHandler))}},L.prototype.mdlDowngrade_=function(){this.forElement_&&(this.forElement_.removeEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("click",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("touchstart",this.boundMouseEnterHandler,!1),this.forElement_.removeEventListener("mouseleave",this.boundMouseLeaveHandler))},L.prototype.mdlDowngrade=L.prototype.mdlDowngrade_,L.prototype.mdlDowngrade=L.prototype.mdlDowngrade,s.register({constructor:L,classAsString:"MaterialTooltip",cssClass:"mdl-tooltip"});var I=function(e){this.element_=e,this.init()};window.MaterialLayout=I,I.prototype.Constant_={MAX_WIDTH:"(max-width: 1024px)",TAB_SCROLL_PIXELS:100,MENU_ICON:"menu",CHEVRON_LEFT:"chevron_left",CHEVRON_RIGHT:"chevron_right"},I.prototype.Mode_={STANDARD:0,SEAMED:1,WATERFALL:2,SCROLL:3},I.prototype.CssClasses_={CONTAINER:"mdl-layout__container",HEADER:"mdl-layout__header",DRAWER:"mdl-layout__drawer",CONTENT:"mdl-layout__content",DRAWER_BTN:"mdl-layout__drawer-button",ICON:"material-icons",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-layout__tab-ripple-container",RIPPLE:"mdl-ripple",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",HEADER_SEAMED:"mdl-layout__header--seamed",HEADER_WATERFALL:"mdl-layout__header--waterfall",HEADER_SCROLL:"mdl-layout__header--scroll",FIXED_HEADER:"mdl-layout--fixed-header",OBFUSCATOR:"mdl-layout__obfuscator",TAB_BAR:"mdl-layout__tab-bar",TAB_CONTAINER:"mdl-layout__tab-bar-container",TAB:"mdl-layout__tab",TAB_BAR_BUTTON:"mdl-layout__tab-bar-button",TAB_BAR_LEFT_BUTTON:"mdl-layout__tab-bar-left-button",TAB_BAR_RIGHT_BUTTON:"mdl-layout__tab-bar-right-button",PANEL:"mdl-layout__tab-panel",HAS_DRAWER:"has-drawer",HAS_TABS:"has-tabs",HAS_SCROLLING_HEADER:"has-scrolling-header",CASTING_SHADOW:"is-casting-shadow",IS_COMPACT:"is-compact",IS_SMALL_SCREEN:"is-small-screen",IS_DRAWER_OPEN:"is-visible",IS_ACTIVE:"is-active",IS_UPGRADED:"is-upgraded",IS_ANIMATING:"is-animating",ON_LARGE_SCREEN:"mdl-layout--large-screen-only",ON_SMALL_SCREEN:"mdl-layout--small-screen-only"},I.prototype.contentScrollHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)||(this.content_.scrollTop>0&&!this.header_.classList.contains(this.CssClasses_.IS_COMPACT)?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.header_.classList.add(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING)):this.content_.scrollTop<=0&&this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING)))},I.prototype.screenSizeHandler_=function(){this.screenSizeMediaQuery_.matches?this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN):(this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN),this.drawer_&&(this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)))},I.prototype.drawerToggleHandler_=function(){this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN)},I.prototype.headerTransitionEndHandler_=function(){this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)},I.prototype.headerClickHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING))},I.prototype.resetTabState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},I.prototype.resetPanelState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},I.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_);for(var s=this.element_.childNodes,i=s.length,n=0;i>n;n++){var a=s[n];a.classList&&a.classList.contains(this.CssClasses_.HEADER)&&(this.header_=a),a.classList&&a.classList.contains(this.CssClasses_.DRAWER)&&(this.drawer_=a),a.classList&&a.classList.contains(this.CssClasses_.CONTENT)&&(this.content_=a)}this.header_&&(this.tabBar_=this.header_.querySelector("."+this.CssClasses_.TAB_BAR));var l=this.Mode_.STANDARD;if(this.header_&&(this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)?l=this.Mode_.SEAMED:this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)?(l=this.Mode_.WATERFALL,this.header_.addEventListener("transitionend",this.headerTransitionEndHandler_.bind(this)),this.header_.addEventListener("click",this.headerClickHandler_.bind(this))):this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)&&(l=this.Mode_.SCROLL,e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)),l===this.Mode_.STANDARD?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)):l===this.Mode_.SEAMED||l===this.Mode_.SCROLL?(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)):l===this.Mode_.WATERFALL&&(this.content_.addEventListener("scroll",this.contentScrollHandler_.bind(this)),this.contentScrollHandler_())),this.drawer_){var o=this.element_.querySelector("."+this.CssClasses_.DRAWER_BTN);if(!o){o=document.createElement("div"),o.classList.add(this.CssClasses_.DRAWER_BTN);var r=document.createElement("i");r.classList.add(this.CssClasses_.ICON),r.textContent=this.Constant_.MENU_ICON,o.appendChild(r)}this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)?o.classList.add(this.CssClasses_.ON_LARGE_SCREEN):this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)&&o.classList.add(this.CssClasses_.ON_SMALL_SCREEN),o.addEventListener("click",this.drawerToggleHandler_.bind(this)),this.element_.classList.add(this.CssClasses_.HAS_DRAWER),this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)?this.header_.insertBefore(o,this.header_.firstChild):this.element_.insertBefore(o,this.content_);var d=document.createElement("div");d.classList.add(this.CssClasses_.OBFUSCATOR),this.element_.appendChild(d),d.addEventListener("click",this.drawerToggleHandler_.bind(this)),this.obfuscator_=d}if(this.screenSizeMediaQuery_=window.matchMedia(this.Constant_.MAX_WIDTH),this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)),this.screenSizeHandler_(),this.header_&&this.tabBar_){this.element_.classList.add(this.CssClasses_.HAS_TABS);var _=document.createElement("div");_.classList.add(this.CssClasses_.TAB_CONTAINER),this.header_.insertBefore(_,this.tabBar_),this.header_.removeChild(this.tabBar_);var h=document.createElement("div");h.classList.add(this.CssClasses_.TAB_BAR_BUTTON),h.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);var p=document.createElement("i");p.classList.add(this.CssClasses_.ICON),p.textContent=this.Constant_.CHEVRON_LEFT,h.appendChild(p),h.addEventListener("click",function(){this.tabBar_.scrollLeft-=this.Constant_.TAB_SCROLL_PIXELS}.bind(this));var c=document.createElement("div");c.classList.add(this.CssClasses_.TAB_BAR_BUTTON),c.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);var u=document.createElement("i");u.classList.add(this.CssClasses_.ICON),u.textContent=this.Constant_.CHEVRON_RIGHT,c.appendChild(u),c.addEventListener("click",function(){this.tabBar_.scrollLeft+=this.Constant_.TAB_SCROLL_PIXELS}.bind(this)),_.appendChild(h),_.appendChild(this.tabBar_),_.appendChild(c);var C=function(){this.tabBar_.scrollLeft>0?h.classList.add(this.CssClasses_.IS_ACTIVE):h.classList.remove(this.CssClasses_.IS_ACTIVE),this.tabBar_.scrollLeft<this.tabBar_.scrollWidth-this.tabBar_.offsetWidth?c.classList.add(this.CssClasses_.IS_ACTIVE):c.classList.remove(this.CssClasses_.IS_ACTIVE)}.bind(this);this.tabBar_.addEventListener("scroll",C),C(),this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)&&this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);for(var m=this.tabBar_.querySelectorAll("."+this.CssClasses_.TAB),E=this.content_.querySelectorAll("."+this.CssClasses_.PANEL),L=0;L<m.length;L++)new t(m[L],m,E,this)}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:I,classAsString:"MaterialLayout",cssClass:"mdl-js-layout"});var f=function(e){this.element_=e,this.init()};window.MaterialDataTable=f,f.prototype.Constant_={},f.prototype.CssClasses_={DATA_TABLE:"mdl-data-table",SELECTABLE:"mdl-data-table--selectable",SELECT_ELEMENT:"mdl-data-table__select",IS_SELECTED:"is-selected",IS_UPGRADED:"is-upgraded"},f.prototype.selectRow_=function(e,t,s){return t?function(){e.checked?t.classList.add(this.CssClasses_.IS_SELECTED):t.classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):s?function(){var t,i;if(e.checked)for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.check(),s[t].classList.add(this.CssClasses_.IS_SELECTED);else for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.uncheck(),s[t].classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):void 0},f.prototype.createCheckbox_=function(e,t){var i=document.createElement("label"),n=["mdl-checkbox","mdl-js-checkbox","mdl-js-ripple-effect",this.CssClasses_.SELECT_ELEMENT];i.className=n.join(" ");var a=document.createElement("input");return a.type="checkbox",a.classList.add("mdl-checkbox__input"),a.addEventListener("change",this.selectRow_(a,e,t)),i.appendChild(a),s.upgradeElement(i,"MaterialCheckbox"),i},f.prototype.init=function(){if(this.element_){var e=this.element_.querySelector("th"),t=this.element_.querySelector("tbody").querySelectorAll("tr");if(this.element_.classList.contains(this.CssClasses_.SELECTABLE)){var s=document.createElement("th"),i=this.createCheckbox_(null,t);s.appendChild(i),e.parentElement.insertBefore(s,e);for(var n=0;n<t.length;n++){var a=t[n].querySelector("td");if(a){var l=document.createElement("td"),o=this.createCheckbox_(t[n]);l.appendChild(o),t[n].insertBefore(l,a)}}}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:f,classAsString:"MaterialDataTable",cssClass:"mdl-js-data-table"});var b=function(e){this.element_=e,this.init()};window.MaterialRipple=b,b.prototype.Constant_={INITIAL_SCALE:"scale(0.0001, 0.0001)",INITIAL_SIZE:"1px",INITIAL_OPACITY:"0.4",FINAL_OPACITY:"0",FINAL_SCALE:""},b.prototype.CssClasses_={RIPPLE_CENTER:"mdl-ripple--center",RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_ANIMATING:"is-animating",IS_VISIBLE:"is-visible"},b.prototype.downHandler_=function(e){if(!this.rippleElement_.style.width&&!this.rippleElement_.style.height){var t=this.element_.getBoundingClientRect();this.boundHeight=t.height,this.boundWidth=t.width,this.rippleSize_=2*Math.sqrt(t.width*t.width+t.height*t.height)+2,this.rippleElement_.style.width=this.rippleSize_+"px",this.rippleElement_.style.height=this.rippleSize_+"px"}if(this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE),"mousedown"===e.type&&this.ignoringMouseDown_)this.ignoringMouseDown_=!1;else{"touchstart"===e.type&&(this.ignoringMouseDown_=!0);var s=this.getFrameCount();if(s>0)return;this.setFrameCount(1);var i,n,a=e.currentTarget.getBoundingClientRect();if(0===e.clientX&&0===e.clientY)i=Math.round(a.width/2),n=Math.round(a.height/2);else{var l=e.clientX?e.clientX:e.touches[0].clientX,o=e.clientY?e.clientY:e.touches[0].clientY;i=Math.round(l-a.left),n=Math.round(o-a.top)}this.setRippleXY(i,n),this.setRippleStyles(!0),window.requestAnimationFrame(this.animFrameHandler.bind(this))}},b.prototype.upHandler_=function(e){e&&2!==e.detail&&this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE),window.setTimeout(function(){this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)}.bind(this),0)},b.prototype.init=function(){if(this.element_){var e=this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)||(this.rippleElement_=this.element_.querySelector("."+this.CssClasses_.RIPPLE),this.frameCount_=0,this.rippleSize_=0,this.x_=0,this.y_=0,this.ignoringMouseDown_=!1,this.boundDownHandler=this.downHandler_.bind(this),this.element_.addEventListener("mousedown",this.boundDownHandler),this.element_.addEventListener("touchstart",this.boundDownHandler),this.boundUpHandler=this.upHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundUpHandler),this.element_.addEventListener("mouseleave",this.boundUpHandler),this.element_.addEventListener("touchend",this.boundUpHandler),this.element_.addEventListener("blur",this.boundUpHandler),this.getFrameCount=function(){return this.frameCount_},this.setFrameCount=function(e){this.frameCount_=e},this.getRippleElement=function(){return this.rippleElement_},this.setRippleXY=function(e,t){this.x_=e,this.y_=t},this.setRippleStyles=function(t){if(null!==this.rippleElement_){var s,i,n,a="translate("+this.x_+"px, "+this.y_+"px)";t?(i=this.Constant_.INITIAL_SCALE,n=this.Constant_.INITIAL_SIZE):(i=this.Constant_.FINAL_SCALE,n=this.rippleSize_+"px",e&&(a="translate("+this.boundWidth/2+"px, "+this.boundHeight/2+"px)")),s="translate(-50%, -50%) "+a+i,this.rippleElement_.style.webkitTransform=s,this.rippleElement_.style.msTransform=s,this.rippleElement_.style.transform=s,t?this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING):this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)}},this.animFrameHandler=function(){this.frameCount_-->0?window.requestAnimationFrame(this.animFrameHandler.bind(this)):this.setRippleStyles(!1)})}},b.prototype.mdlDowngrade_=function(){this.element_.removeEventListener("mousedown",this.boundDownHandler),this.element_.removeEventListener("touchstart",this.boundDownHandler),this.element_.removeEventListener("mouseup",this.boundUpHandler),this.element_.removeEventListener("mouseleave",this.boundUpHandler),this.element_.removeEventListener("touchend",this.boundUpHandler),this.element_.removeEventListener("blur",this.boundUpHandler)},b.prototype.mdlDowngrade=b.prototype.mdlDowngrade_,b.prototype.mdlDowngrade=b.prototype.mdlDowngrade,s.register({constructor:b,classAsString:"MaterialRipple",cssClass:"mdl-js-ripple-effect",widget:!1})}();
//# sourceMappingURL=material.min.js.map
;(function() {

  var supportCustomEvent = window.CustomEvent;
  if (!supportCustomEvent || typeof supportCustomEvent == 'object') {
    supportCustomEvent = function CustomEvent(event, x) {
      x = x || {};
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
      return ev;
    };
    supportCustomEvent.prototype = window.Event.prototype;
  }

  /**
   * Finds the nearest <dialog> from the passed element.
   *
   * @param {Element} el to search from
   * @return {HTMLDialogElement} dialog found
   */
  function findNearestDialog(el) {
    while (el) {
      if (el.nodeName.toUpperCase() == 'DIALOG') {
        return /** @type {HTMLDialogElement} */ (el);
      }
      el = el.parentElement;
    }
    return null;
  }

  /**
   * Blur the specified element, as long as it's not the HTML body element.
   * This works around an IE9/10 bug - blurring the body causes Windows to
   * blur the whole application.
   *
   * @param {Element} el to blur
   */
  function safeBlur(el) {
    if (el && el.blur && el != document.body) {
      el.blur();
    }
  }

  /**
   * @param {!NodeList} nodeList to search
   * @param {Node} node to find
   * @return {boolean} whether node is inside nodeList
   */
  function inNodeList(nodeList, node) {
    for (var i = 0; i < nodeList.length; ++i) {
      if (nodeList[i] == node) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {!HTMLDialogElement} dialog to upgrade
   * @constructor
   */
  function dialogPolyfillInfo(dialog) {
    this.dialog_ = dialog;
    this.replacedStyleTop_ = false;
    this.openAsModal_ = false;

    // Set a11y role. Browsers that support dialog implicitly know this already.
    if (!dialog.hasAttribute('role')) {
      dialog.setAttribute('role', 'dialog');
    }

    dialog.show = this.show.bind(this);
    dialog.showModal = this.showModal.bind(this);
    dialog.close = this.close.bind(this);

    if (!('returnValue' in dialog)) {
      dialog.returnValue = '';
    }

    this.maybeHideModal = this.maybeHideModal.bind(this);
    if ('MutationObserver' in window) {
      // IE11+, most other browsers.
      var mo = new MutationObserver(this.maybeHideModal);
      mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    } else {
      dialog.addEventListener('DOMAttrModified', this.maybeHideModal);
    }
    // Note that the DOM is observed inside DialogManager while any dialog
    // is being displayed as a modal, to catch modal removal from the DOM.

    Object.defineProperty(dialog, 'open', {
      set: this.setOpen.bind(this),
      get: dialog.hasAttribute.bind(dialog, 'open')
    });

    this.backdrop_ = document.createElement('div');
    this.backdrop_.className = 'backdrop';
    this.backdropClick_ = this.backdropClick_.bind(this);
  }

  dialogPolyfillInfo.prototype = {

    get dialog() {
      return this.dialog_;
    },

    /**
     * Maybe remove this dialog from the modal top layer. This is called when
     * a modal dialog may no longer be tenable, e.g., when the dialog is no
     * longer open or is no longer part of the DOM.
     */
    maybeHideModal: function() {
      if (!this.openAsModal_) { return; }
      if (this.dialog_.hasAttribute('open') &&
          document.body.contains(this.dialog_)) { return; }

      this.openAsModal_ = false;
      this.dialog_.style.zIndex = '';

      // This won't match the native <dialog> exactly because if the user set
      // top on a centered polyfill dialog, that top gets thrown away when the
      // dialog is closed. Not sure it's possible to polyfill this perfectly.
      if (this.replacedStyleTop_) {
        this.dialog_.style.top = '';
        this.replacedStyleTop_ = false;
      }

      // Optimistically clear the modal part of this <dialog>.
      this.backdrop_.removeEventListener('click', this.backdropClick_);
      if (this.backdrop_.parentElement) {
        this.backdrop_.parentElement.removeChild(this.backdrop_);
      }
      dialogPolyfill.dm.removeDialog(this);
    },

    /**
     * @param {boolean} value whether to open or close this dialog
     */
    setOpen: function(value) {
      if (value) {
        this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
      } else {
        this.dialog_.removeAttribute('open');
        this.maybeHideModal();  // nb. redundant with MutationObserver
      }
    },

    /**
     * Handles clicks on the fake .backdrop element, redirecting them as if
     * they were on the dialog itself.
     *
     * @param {!Event} e to redirect
     */
    backdropClick_: function(e) {
      var redirectedEvent = document.createEvent('MouseEvents');
      redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
          e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
          e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
      this.dialog_.dispatchEvent(redirectedEvent);
      e.stopPropagation();
    },

    /**
     * Sets the zIndex for the backdrop and dialog.
     *
     * @param {number} backdropZ
     * @param {number} dialogZ
     */
    updateZIndex: function(backdropZ, dialogZ) {
      this.backdrop_.style.zIndex = backdropZ;
      this.dialog_.style.zIndex = dialogZ;
    },

    /**
     * Shows the dialog. This is idempotent and will always succeed.
     */
    show: function() {
      this.setOpen(true);
    },

    /**
     * Show this dialog modally.
     */
    showModal: function() {
      if (this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
      }
      if (!document.body.contains(this.dialog_)) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
      }
      if (!dialogPolyfill.dm.pushDialog(this)) {
        throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
      }
      this.show();
      this.openAsModal_ = true;

      // Optionally center vertically, relative to the current viewport.
      if (dialogPolyfill.needsCentering(this.dialog_)) {
        dialogPolyfill.reposition(this.dialog_);
        this.replacedStyleTop_ = true;
      } else {
        this.replacedStyleTop_ = false;
      }

      // Insert backdrop.
      this.backdrop_.addEventListener('click', this.backdropClick_);
      this.dialog_.parentNode.insertBefore(this.backdrop_,
          this.dialog_.nextSibling);

      // Find element with `autofocus` attribute or first form control.
      var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
      if (!target) {
        // TODO: technically this is 'any focusable area'
        var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
        var query = opts.map(function(el) {
          return el + ':not([disabled])';
        }).join(', ');
        target = this.dialog_.querySelector(query);
      }
      safeBlur(document.activeElement);
      target && target.focus();
    },

    /**
     * Closes this HTMLDialogElement. This is optional vs clearing the open
     * attribute, however this fires a 'close' event.
     *
     * @param {string=} opt_returnValue to use as the returnValue
     */
    close: function(opt_returnValue) {
      if (!this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
      }
      this.setOpen(false);

      // Leave returnValue untouched in case it was set directly on the element
      if (opt_returnValue !== undefined) {
        this.dialog_.returnValue = opt_returnValue;
      }

      // Triggering "close" event for any attached listeners on the <dialog>.
      var closeEvent = new supportCustomEvent('close', {
        bubbles: false,
        cancelable: false
      });
      this.dialog_.dispatchEvent(closeEvent);
    }

  };

  var dialogPolyfill = {};

  dialogPolyfill.reposition = function(element) {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
    element.style.top = Math.max(scrollTop, topValue) + 'px';
  };

  dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
    for (var i = 0; i < document.styleSheets.length; ++i) {
      var styleSheet = document.styleSheets[i];
      var cssRules = null;
      // Some browsers throw on cssRules.
      try {
        cssRules = styleSheet.cssRules;
      } catch (e) {}
      if (!cssRules)
        continue;
      for (var j = 0; j < cssRules.length; ++j) {
        var rule = cssRules[j];
        var selectedNodes = null;
        // Ignore errors on invalid selector texts.
        try {
          selectedNodes = document.querySelectorAll(rule.selectorText);
        } catch(e) {}
        if (!selectedNodes || !inNodeList(selectedNodes, element))
          continue;
        var cssTop = rule.style.getPropertyValue('top');
        var cssBottom = rule.style.getPropertyValue('bottom');
        if ((cssTop && cssTop != 'auto') || (cssBottom && cssBottom != 'auto'))
          return true;
      }
    }
    return false;
  };

  dialogPolyfill.needsCentering = function(dialog) {
    var computedStyle = window.getComputedStyle(dialog);
    if (computedStyle.position != 'absolute') {
      return false;
    }

    // We must determine whether the top/bottom specified value is non-auto.  In
    // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
    // Firefox returns the used value. So we do this crazy thing instead: check
    // the inline style and then go through CSS rules.
    if ((dialog.style.top != 'auto' && dialog.style.top != '') ||
        (dialog.style.bottom != 'auto' && dialog.style.bottom != ''))
      return false;
    return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
  };

  /**
   * @param {!Element} element to force upgrade
   */
  dialogPolyfill.forceRegisterDialog = function(element) {
    if (element.showModal) {
      console.warn('This browser already supports <dialog>, the polyfill ' +
          'may not work correctly', element);
    }
    if (element.nodeName.toUpperCase() != 'DIALOG') {
      throw new Error('Failed to register dialog: The element is not a dialog.');
    }
    new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
  };

  /**
   * @param {!Element} element to upgrade
   */
  dialogPolyfill.registerDialog = function(element) {
    if (element.showModal) {
      console.warn('Can\'t upgrade <dialog>: already supported', element);
    } else {
      dialogPolyfill.forceRegisterDialog(element);
    }
  };

  /**
   * @constructor
   */
  dialogPolyfill.DialogManager = function() {
    /** @type {!Array<!dialogPolyfillInfo>} */
    this.pendingDialogStack = [];

    // The overlay is used to simulate how a modal dialog blocks the document.
    // The blocking dialog is positioned on top of the overlay, and the rest of
    // the dialogs on the pending dialog stack are positioned below it. In the
    // actual implementation, the modal dialog stacking is controlled by the
    // top layer, where z-index has no effect.
    this.overlay = document.createElement('div');
    this.overlay.className = '_dialog_overlay';
    this.overlay.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    this.handleKey_ = this.handleKey_.bind(this);
    this.handleFocus_ = this.handleFocus_.bind(this);
    this.handleRemove_ = this.handleRemove_.bind(this);

    this.zIndexLow_ = 100000;
    this.zIndexHigh_ = 100000 + 150;
  };

  /**
   * @return {Element} the top HTML dialog element, if any
   */
  dialogPolyfill.DialogManager.prototype.topDialogElement = function() {
    if (this.pendingDialogStack.length) {
      var t = this.pendingDialogStack[this.pendingDialogStack.length - 1];
      return t.dialog;
    }
    return null;
  };

  /**
   * Called on the first modal dialog being shown. Adds the overlay and related
   * handlers.
   */
  dialogPolyfill.DialogManager.prototype.blockDocument = function() {
    document.body.appendChild(this.overlay);
    document.body.addEventListener('focus', this.handleFocus_, true);
    document.addEventListener('keydown', this.handleKey_);
    document.addEventListener('DOMNodeRemoved', this.handleRemove_);
  };

  /**
   * Called on the first modal dialog being removed, i.e., when no more modal
   * dialogs are visible.
   */
  dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
    document.body.removeChild(this.overlay);
    document.body.removeEventListener('focus', this.handleFocus_, true);
    document.removeEventListener('keydown', this.handleKey_);
    document.removeEventListener('DOMNodeRemoved', this.handleRemove_);
  };

  dialogPolyfill.DialogManager.prototype.updateStacking = function() {
    var zIndex = this.zIndexLow_;

    for (var i = 0; i < this.pendingDialogStack.length; i++) {
      if (i == this.pendingDialogStack.length - 1) {
        this.overlay.style.zIndex = zIndex++;
      }
      this.pendingDialogStack[i].updateZIndex(zIndex++, zIndex++);
    }
  };

  dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
    var candidate = findNearestDialog(/** @type {Element} */ (event.target));
    if (candidate != this.topDialogElement()) {
      event.preventDefault();
      event.stopPropagation();
      safeBlur(/** @type {Element} */ (event.target));
      // TODO: Focus on the browser chrome (aka document) or the dialog itself
      // depending on the tab direction.
      return false;
    }
  };

  dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
    if (event.keyCode == 27) {
      event.preventDefault();
      event.stopPropagation();
      var cancelEvent = new supportCustomEvent('cancel', {
        bubbles: false,
        cancelable: true
      });
      var dialog = this.topDialogElement();
      if (dialog.dispatchEvent(cancelEvent)) {
        dialog.close();
      }
    }
  };

  dialogPolyfill.DialogManager.prototype.handleRemove_ = function(event) {
    if (event.target.nodeName.toUpperCase() != 'DIALOG') { return; }

    var dialog = /** @type {HTMLDialogElement} */ (event.target);
    if (!dialog.open) { return; }

    // Find a dialogPolyfillInfo which matches the removed <dialog>.
    this.pendingDialogStack.some(function(dpi) {
      if (dpi.dialog == dialog) {
        // This call will clear the dialogPolyfillInfo on this DialogManager
        // as a side effect.
        dpi.maybeHideModal();
        return true;
      }
    });
  };

  /**
   * @param {!dialogPolyfillInfo} dpi
   * @return {boolean} whether the dialog was allowed
   */
  dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
    var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
    if (this.pendingDialogStack.length >= allowed) {
      return false;
    }
    this.pendingDialogStack.push(dpi);
    if (this.pendingDialogStack.length == 1) {
      this.blockDocument();
    }
    this.updateStacking();
    return true;
  };

  /**
   * @param {dialogPolyfillInfo} dpi
   */
  dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
    var index = this.pendingDialogStack.indexOf(dpi);
    if (index == -1) { return; }

    this.pendingDialogStack.splice(index, 1);
    this.updateStacking();
    if (this.pendingDialogStack.length == 0) {
      this.unblockDocument();
    }
  };

  dialogPolyfill.dm = new dialogPolyfill.DialogManager();

  /**
   * Global form 'dialog' method handler. Closes a dialog correctly on submit
   * and possibly sets its return value.
   */
  document.addEventListener('submit', function(ev) {
    var target = ev.target;
    if (!target || !target.hasAttribute('method')) { return; }
    if (target.getAttribute('method').toLowerCase() != 'dialog') { return; }
    ev.preventDefault();

    var dialog = findNearestDialog(/** @type {Element} */ (ev.target));
    if (!dialog) { return; }

    // FIXME: The original event doesn't contain the element used to submit the
    // form (if any). Look in some possible places.
    var returnValue;
    var cands = [document.activeElement, ev.explicitOriginalTarget];
    var els = ['BUTTON', 'INPUT'];
    cands.some(function(cand) {
      if (cand && cand.form == ev.target && els.indexOf(cand.nodeName.toUpperCase()) != -1) {
        returnValue = cand.value;
        return true;
      }
    });
    dialog.close(returnValue);
  }, true);

  dialogPolyfill['forceRegisterDialog'] = dialogPolyfill.forceRegisterDialog;
  dialogPolyfill['registerDialog'] = dialogPolyfill.registerDialog;

  if (typeof module === 'object' && typeof module['exports'] === 'object') {
    // CommonJS support
    module['exports'] = dialogPolyfill;
  } else if (typeof define === 'function' && 'amd' in define) {
    // AMD support
    define(function() { return dialogPolyfill; });
  } else {
    // all others
    window['dialogPolyfill'] = dialogPolyfill;
  }
})();
;!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.dragula=e()}}(function(){return function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var a="function"==typeof require&&require;if(!c&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,n,t){"use strict";function r(e){var n=u[e];return n?n.lastIndex=0:u[e]=n=new RegExp(c+e+a,"g"),n}function o(e,n){var t=e.className;t.length?r(n).test(t)||(e.className+=" "+n):e.className=n}function i(e,n){e.className=e.className.replace(r(n)," ").trim()}var u={},c="(?:^|\\s)",a="(?:\\s|$)";n.exports={add:o,rm:i}},{}],2:[function(e,n,t){(function(t){"use strict";function r(e,n){function t(e){return-1!==le.containers.indexOf(e)||fe.isContainer(e)}function r(e){var n=e?"remove":"add";o(S,n,"mousedown",N),o(S,n,"mouseup",L)}function c(e){var n=e?"remove":"add";o(S,n,"mousemove",T)}function m(e){var n=e?"remove":"add";w[n](S,"selectstart",O),w[n](S,"click",O)}function h(){r(!0),L({})}function O(e){ce&&e.preventDefault()}function N(e){ne=e.clientX,te=e.clientY;var n=1!==i(e)||e.metaKey||e.ctrlKey;if(!n){var t=e.target,r=X(t);r&&(ce=r,c(),"mousedown"===e.type&&(p(t)?t.focus():e.preventDefault()))}}function T(e){if(ce){if(0===i(e))return void L({});if(void 0===e.clientX||e.clientX!==ne||void 0===e.clientY||e.clientY!==te){if(fe.ignoreInputTextSelection){var n=y("clientX",e),t=y("clientY",e),r=x.elementFromPoint(n,t);if(p(r))return}var o=ce;c(!0),m(),D(),B(o);var a=u(W);Z=y("pageX",e)-a.left,ee=y("pageY",e)-a.top,E.add(ie||W,"gu-transit"),K(),U(e)}}}function X(e){if(!(le.dragging&&J||t(e))){for(var n=e;v(e)&&t(v(e))===!1;){if(fe.invalid(e,n))return;if(e=v(e),!e)return}var r=v(e);if(r&&!fe.invalid(e,n)){var o=fe.moves(e,r,n,g(e));if(o)return{item:e,source:r}}}}function Y(e){var n=X(e);n&&B(n)}function B(e){$(e.item,e.source)&&(ie=e.item.cloneNode(!0),le.emit("cloned",ie,e.item,"copy")),Q=e.source,W=e.item,re=oe=g(e.item),le.dragging=!0,le.emit("drag",W,Q)}function P(){return!1}function D(){if(le.dragging){var e=ie||W;R(e,v(e))}}function I(){ce=!1,c(!0),m(!0)}function L(e){if(I(),le.dragging){var n=ie||W,t=y("clientX",e),r=y("clientY",e),o=a(J,t,r),i=q(o,t,r);i&&(ie&&fe.copySortSource||!ie||i!==Q)?R(n,i):fe.removeOnSpill?A():M()}}function R(e,n){var t=v(e);ie&&fe.copySortSource&&n===Q&&t.removeChild(W),k(n)?le.emit("cancel",e,Q,Q):le.emit("drop",e,n,Q,oe),j()}function A(){if(le.dragging){var e=ie||W,n=v(e);n&&n.removeChild(e),le.emit(ie?"cancel":"remove",e,n,Q),j()}}function M(e){if(le.dragging){var n=arguments.length>0?e:fe.revertOnSpill,t=ie||W,r=v(t);r===Q&&ie&&r.removeChild(ie);var o=k(r);o===!1&&!ie&&n&&Q.insertBefore(t,re),o||n?le.emit("cancel",t,Q,Q):le.emit("drop",t,r,Q,oe),j()}}function j(){var e=ie||W;I(),z(),e&&E.rm(e,"gu-transit"),ue&&clearTimeout(ue),le.dragging=!1,ae&&le.emit("out",e,ae,Q),le.emit("dragend",e),Q=W=ie=re=oe=ue=ae=null}function k(e,n){var t;return t=void 0!==n?n:J?oe:g(ie||W),e===Q&&t===re}function q(e,n,r){function o(){var o=t(i);if(o===!1)return!1;var u=H(i,e),c=V(i,u,n,r),a=k(i,c);return a?!0:fe.accepts(W,i,Q,c)}for(var i=e;i&&!o();)i=v(i);return i}function U(e){function n(e){le.emit(e,f,ae,Q)}function t(){s&&n("over")}function r(){ae&&n("out")}if(J){e.preventDefault();var o=y("clientX",e),i=y("clientY",e),u=o-Z,c=i-ee;J.style.left=u+"px",J.style.top=c+"px";var f=ie||W,l=a(J,o,i),d=q(l,o,i),s=null!==d&&d!==ae;(s||null===d)&&(r(),ae=d,t());var p=v(f);if(d===Q&&ie&&!fe.copySortSource)return void(p&&p.removeChild(f));var m,h=H(d,l);if(null!==h)m=V(d,h,o,i);else{if(fe.revertOnSpill!==!0||ie)return void(ie&&p&&p.removeChild(f));m=re,d=Q}(null===m||m!==f&&m!==g(f)&&m!==oe)&&(oe=m,d.insertBefore(f,m),le.emit("shadow",f,d,Q))}}function _(e){E.rm(e,"gu-hide")}function F(e){le.dragging&&E.add(e,"gu-hide")}function K(){if(!J){var e=W.getBoundingClientRect();J=W.cloneNode(!0),J.style.width=d(e)+"px",J.style.height=s(e)+"px",E.rm(J,"gu-transit"),E.add(J,"gu-mirror"),fe.mirrorContainer.appendChild(J),o(S,"add","mousemove",U),E.add(fe.mirrorContainer,"gu-unselectable"),le.emit("cloned",J,W,"mirror")}}function z(){J&&(E.rm(fe.mirrorContainer,"gu-unselectable"),o(S,"remove","mousemove",U),v(J).removeChild(J),J=null)}function H(e,n){for(var t=n;t!==e&&v(t)!==e;)t=v(t);return t===S?null:t}function V(e,n,t,r){function o(){var n,o,i,u=e.children.length;for(n=0;u>n;n++){if(o=e.children[n],i=o.getBoundingClientRect(),c&&i.left>t)return o;if(!c&&i.top>r)return o}return null}function i(){var e=n.getBoundingClientRect();return u(c?t>e.left+d(e)/2:r>e.top+s(e)/2)}function u(e){return e?g(n):n}var c="horizontal"===fe.direction,a=n!==e?i():o();return a}function $(e,n){return"boolean"==typeof fe.copy?fe.copy:fe.copy(e,n)}var G=arguments.length;1===G&&Array.isArray(e)===!1&&(n=e,e=[]);var J,Q,W,Z,ee,ne,te,re,oe,ie,ue,ce,ae=null,fe=n||{};void 0===fe.moves&&(fe.moves=l),void 0===fe.accepts&&(fe.accepts=l),void 0===fe.invalid&&(fe.invalid=P),void 0===fe.containers&&(fe.containers=e||[]),void 0===fe.isContainer&&(fe.isContainer=f),void 0===fe.copy&&(fe.copy=!1),void 0===fe.copySortSource&&(fe.copySortSource=!1),void 0===fe.revertOnSpill&&(fe.revertOnSpill=!1),void 0===fe.removeOnSpill&&(fe.removeOnSpill=!1),void 0===fe.direction&&(fe.direction="vertical"),void 0===fe.ignoreInputTextSelection&&(fe.ignoreInputTextSelection=!0),void 0===fe.mirrorContainer&&(fe.mirrorContainer=C);var le=b({containers:fe.containers,start:Y,end:D,cancel:M,remove:A,destroy:h,dragging:!1});return fe.removeOnSpill===!0&&le.on("over",_).on("out",F),r(),le}function o(e,n,r,o){var i={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},u={mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"},c={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};t.navigator.pointerEnabled?w[n](e,u[r],o):t.navigator.msPointerEnabled?w[n](e,c[r],o):(w[n](e,i[r],o),w[n](e,r,o))}function i(e){if(void 0!==e.touches)return e.touches.length;if(void 0!==e.buttons)return e.buttons;if(void 0!==e.which)return e.which;var n=e.button;return void 0!==n?1&n?1:2&n?3:4&n?2:0:void 0}function u(e){var n=e.getBoundingClientRect();return{left:n.left+c("scrollLeft","pageXOffset"),top:n.top+c("scrollTop","pageYOffset")}}function c(e,n){return"undefined"!=typeof t[n]?t[n]:S.clientHeight?S[e]:C[e]}function a(e,n,t){var r,o=e||{},i=o.className;return o.className+=" gu-hide",r=x.elementFromPoint(n,t),o.className=i,r}function f(){return!1}function l(){return!0}function d(e){return e.width||e.right-e.left}function s(e){return e.height||e.bottom-e.top}function v(e){return e.parentNode===x?null:e.parentNode}function p(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName||"SELECT"===e.tagName||m(e)}function m(e){return e?"false"===e.contentEditable?!1:"true"===e.contentEditable?!0:m(v(e)):!1}function g(e){function n(){var n=e;do n=n.nextSibling;while(n&&1!==n.nodeType);return n}return e.nextElementSibling||n()}function h(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}function y(e,n){var t=h(n),r={pageX:"clientX",pageY:"clientY"};return e in r&&!(e in t)&&r[e]in t&&(e=r[e]),t[e]}var b=e("contra/emitter"),w=e("crossvent"),E=e("./classes"),x=document,S=x.documentElement,C=x.body;n.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./classes":1,"contra/emitter":4,crossvent:8}],3:[function(e,n,t){"use strict";var r=e("ticky");n.exports=function(e,n,t){e&&r(function(){e.apply(t||null,n||[])})}},{ticky:6}],4:[function(e,n,t){"use strict";var r=e("atoa"),o=e("./debounce");n.exports=function(e,n){var t=n||{},i={};return void 0===e&&(e={}),e.on=function(n,t){return i[n]?i[n].push(t):i[n]=[t],e},e.once=function(n,t){return t._once=!0,e.on(n,t),e},e.off=function(n,t){var r=arguments.length;if(1===r)delete i[n];else if(0===r)i={};else{var o=i[n];if(!o)return e;o.splice(o.indexOf(t),1)}return e},e.emit=function(){var n=r(arguments);return e.emitterSnapshot(n.shift()).apply(this,n)},e.emitterSnapshot=function(n){var u=(i[n]||[]).slice(0);return function(){var i=r(arguments),c=this||e;if("error"===n&&t["throws"]!==!1&&!u.length)throw 1===i.length?i[0]:i;return u.forEach(function(r){t.async?o(r,i,c):r.apply(c,i),r._once&&e.off(n,r)}),e}},e}},{"./debounce":3,atoa:5}],5:[function(e,n,t){n.exports=function(e,n){return Array.prototype.slice.call(e,n)}},{}],6:[function(e,n,t){var r,o="function"==typeof setImmediate;r=o?function(e){setImmediate(e)}:function(e){setTimeout(e,0)},n.exports=r},{}],7:[function(e,n,t){(function(e){function t(){try{var e=new r("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(n){}return!1}var r=e.CustomEvent;n.exports=t()?r:"function"==typeof document.createEvent?function(e,n){var t=document.createEvent("CustomEvent");return n?t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):t.initCustomEvent(e,!1,!1,void 0),t}:function(e,n){var t=document.createEventObject();return t.type=e,n?(t.bubbles=Boolean(n.bubbles),t.cancelable=Boolean(n.cancelable),t.detail=n.detail):(t.bubbles=!1,t.cancelable=!1,t.detail=void 0),t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,t){(function(t){"use strict";function r(e,n,t,r){return e.addEventListener(n,t,r)}function o(e,n,t){return e.attachEvent("on"+n,f(e,n,t))}function i(e,n,t,r){return e.removeEventListener(n,t,r)}function u(e,n,t){var r=l(e,n,t);return r?e.detachEvent("on"+n,r):void 0}function c(e,n,t){function r(){var e;return p.createEvent?(e=p.createEvent("Event"),e.initEvent(n,!0,!0)):p.createEventObject&&(e=p.createEventObject()),e}function o(){return new s(n,{detail:t})}var i=-1===v.indexOf(n)?o():r();e.dispatchEvent?e.dispatchEvent(i):e.fireEvent("on"+n,i)}function a(e,n,r){return function(n){var o=n||t.event;o.target=o.target||o.srcElement,o.preventDefault=o.preventDefault||function(){o.returnValue=!1},o.stopPropagation=o.stopPropagation||function(){o.cancelBubble=!0},o.which=o.which||o.keyCode,r.call(e,o)}}function f(e,n,t){var r=l(e,n,t)||a(e,n,t);return h.push({wrapper:r,element:e,type:n,fn:t}),r}function l(e,n,t){var r=d(e,n,t);if(r){var o=h[r].wrapper;return h.splice(r,1),o}}function d(e,n,t){var r,o;for(r=0;r<h.length;r++)if(o=h[r],o.element===e&&o.type===n&&o.fn===t)return r}var s=e("custom-event"),v=e("./eventmap"),p=t.document,m=r,g=i,h=[];t.addEventListener||(m=o,g=u),n.exports={add:m,remove:g,fabricate:c}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":9,"custom-event":7}],9:[function(e,n,t){(function(e){"use strict";var t=[],r="",o=/^on/;for(r in e)o.test(r)&&t.push(r.slice(2));n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[2])(2)});;/* Copyright Google Inc.
 * Licensed under the Apache Licence Version 2.0
 * Autogenerated at Fri Aug 13 11:26:55 PDT 2010
 * @provides html4
 */
var html4 = {};
html4 .atype = {
    'NONE': 0,
    'URI': 1,
    'URI_FRAGMENT': 11,
    'SCRIPT': 2,
    'STYLE': 3,
    'ID': 4,
    'IDREF': 5,
    'IDREFS': 6,
    'GLOBAL_NAME': 7,
    'LOCAL_NAME': 8,
    'CLASSES': 9,
    'FRAME_TARGET': 10
};
html4 .ATTRIBS = {
    '*::class': 9,
    '*::dir': 0,
    '*::id': 4,
    '*::lang': 0,
    '*::onclick': 2,
    '*::ondblclick': 2,
    '*::onkeydown': 2,
    '*::onkeypress': 2,
    '*::onkeyup': 2,
    '*::onload': 2,
    '*::onmousedown': 2,
    '*::onmousemove': 2,
    '*::onmouseout': 2,
    '*::onmouseover': 2,
    '*::onmouseup': 2,
    '*::style': 3,
    '*::title': 0,
    'a::accesskey': 0,
    'a::coords': 0,
    'a::href': 1,
    'a::hreflang': 0,
    'a::name': 7,
    'a::onblur': 2,
    'a::onfocus': 2,
    'a::rel': 0,
    'a::rev': 0,
    'a::shape': 0,
    'a::tabindex': 0,
    'a::target': 10,
    'a::type': 0,
    'area::accesskey': 0,
    'area::alt': 0,
    'area::coords': 0,
    'area::href': 1,
    'area::nohref': 0,
    'area::onblur': 2,
    'area::onfocus': 2,
    'area::shape': 0,
    'area::tabindex': 0,
    'area::target': 10,
    'bdo::dir': 0,
    'blockquote::cite': 1,
    'br::clear': 0,
    'button::accesskey': 0,
    'button::disabled': 0,
    'button::name': 8,
    'button::onblur': 2,
    'button::onfocus': 2,
    'button::tabindex': 0,
    'button::type': 0,
    'button::value': 0,
    'caption::align': 0,
    'col::align': 0,
    'col::char': 0,
    'col::charoff': 0,
    'col::span': 0,
    'col::valign': 0,
    'col::width': 0,
    'colgroup::align': 0,
    'colgroup::char': 0,
    'colgroup::charoff': 0,
    'colgroup::span': 0,
    'colgroup::valign': 0,
    'colgroup::width': 0,
    'del::cite': 1,
    'del::datetime': 0,
    'dir::compact': 0,
    'div::align': 0,
    'dl::compact': 0,
    'font::color': 0,
    'font::face': 0,
    'font::size': 0,
    'form::accept': 0,
    'form::action': 1,
    'form::autocomplete': 0,
    'form::enctype': 0,
    'form::method': 0,
    'form::name': 7,
    'form::onreset': 2,
    'form::onsubmit': 2,
    'form::target': 10,
    'h1::align': 0,
    'h2::align': 0,
    'h3::align': 0,
    'h4::align': 0,
    'h5::align': 0,
    'h6::align': 0,
    'hr::align': 0,
    'hr::noshade': 0,
    'hr::size': 0,
    'hr::width': 0,
    'iframe::align': 0,
    'iframe::frameborder': 0,
    'iframe::height': 0,
    'iframe::marginheight': 0,
    'iframe::marginwidth': 0,
    'iframe::width': 0,
    'img::align': 0,
    'img::alt': 0,
    'img::border': 0,
    'img::height': 0,
    'img::hspace': 0,
    'img::ismap': 0,
    'img::name': 7,
    'img::src': 1,
    'img::usemap': 11,
    'img::vspace': 0,
    'img::width': 0,
    'input::accept': 0,
    'input::accesskey': 0,
    'input::align': 0,
    'input::alt': 0,
    'input::autocomplete': 0,
    'input::checked': 0,
    'input::disabled': 0,
    'input::ismap': 0,
    'input::maxlength': 0,
    'input::name': 8,
    'input::onblur': 2,
    'input::onchange': 2,
    'input::onfocus': 2,
    'input::onselect': 2,
    'input::readonly': 0,
    'input::size': 0,
    'input::src': 1,
    'input::tabindex': 0,
    'input::type': 0,
    'input::usemap': 11,
    'input::value': 0,
    'ins::cite': 1,
    'ins::datetime': 0,
    'label::accesskey': 0,
    'label::for': 5,
    'label::onblur': 2,
    'label::onfocus': 2,
    'legend::accesskey': 0,
    'legend::align': 0,
    'li::type': 0,
    'li::value': 0,
    'map::name': 7,
    'menu::compact': 0,
    'ol::compact': 0,
    'ol::start': 0,
    'ol::type': 0,
    'optgroup::disabled': 0,
    'optgroup::label': 0,
    'option::disabled': 0,
    'option::label': 0,
    'option::selected': 0,
    'option::value': 0,
    'p::align': 0,
    'pre::width': 0,
    'q::cite': 1,
    'select::disabled': 0,
    'select::multiple': 0,
    'select::name': 8,
    'select::onblur': 2,
    'select::onchange': 2,
    'select::onfocus': 2,
    'select::size': 0,
    'select::tabindex': 0,
    'table::align': 0,
    'table::bgcolor': 0,
    'table::border': 0,
    'table::cellpadding': 0,
    'table::cellspacing': 0,
    'table::frame': 0,
    'table::rules': 0,
    'table::summary': 0,
    'table::width': 0,
    'tbody::align': 0,
    'tbody::char': 0,
    'tbody::charoff': 0,
    'tbody::valign': 0,
    'td::abbr': 0,
    'td::align': 0,
    'td::axis': 0,
    'td::bgcolor': 0,
    'td::char': 0,
    'td::charoff': 0,
    'td::colspan': 0,
    'td::headers': 6,
    'td::height': 0,
    'td::nowrap': 0,
    'td::rowspan': 0,
    'td::scope': 0,
    'td::valign': 0,
    'td::width': 0,
    'textarea::accesskey': 0,
    'textarea::cols': 0,
    'textarea::disabled': 0,
    'textarea::name': 8,
    'textarea::onblur': 2,
    'textarea::onchange': 2,
    'textarea::onfocus': 2,
    'textarea::onselect': 2,
    'textarea::readonly': 0,
    'textarea::rows': 0,
    'textarea::tabindex': 0,
    'tfoot::align': 0,
    'tfoot::char': 0,
    'tfoot::charoff': 0,
    'tfoot::valign': 0,
    'th::abbr': 0,
    'th::align': 0,
    'th::axis': 0,
    'th::bgcolor': 0,
    'th::char': 0,
    'th::charoff': 0,
    'th::colspan': 0,
    'th::headers': 6,
    'th::height': 0,
    'th::nowrap': 0,
    'th::rowspan': 0,
    'th::scope': 0,
    'th::valign': 0,
    'th::width': 0,
    'thead::align': 0,
    'thead::char': 0,
    'thead::charoff': 0,
    'thead::valign': 0,
    'tr::align': 0,
    'tr::bgcolor': 0,
    'tr::char': 0,
    'tr::charoff': 0,
    'tr::valign': 0,
    'ul::compact': 0,
    'ul::type': 0
};
html4 .eflags = {
    'OPTIONAL_ENDTAG': 1,
    'EMPTY': 2,
    'CDATA': 4,
    'RCDATA': 8,
    'UNSAFE': 16,
    'FOLDABLE': 32,
    'SCRIPT': 64,
    'STYLE': 128
};
html4 .ELEMENTS = {
    'a': 0,
    'abbr': 0,
    'acronym': 0,
    'address': 0,
    'applet': 16,
    'area': 2,
    'b': 0,
    'base': 18,
    'basefont': 18,
    'bdo': 0,
    'big': 0,
    'blockquote': 0,
    'body': 49,
    'br': 2,
    'button': 0,
    'caption': 0,
    'center': 0,
    'cite': 0,
    'code': 0,
    'col': 2,
    'colgroup': 1,
    'dd': 1,
    'del': 0,
    'dfn': 0,
    'dir': 0,
    'div': 0,
    'dl': 0,
    'dt': 1,
    'em': 0,
    'fieldset': 0,
    'font': 0,
    'form': 0,
    'frame': 18,
    'frameset': 16,
    'h1': 0,
    'h2': 0,
    'h3': 0,
    'h4': 0,
    'h5': 0,
    'h6': 0,
    'head': 49,
    'hr': 2,
    'html': 49,
    'i': 0,
    'iframe': 4,
    'img': 2,
    'input': 2,
    'ins': 0,
    'isindex': 18,
    'kbd': 0,
    'label': 0,
    'legend': 0,
    'li': 1,
    'link': 18,
    'map': 0,
    'menu': 0,
    'meta': 18,
    'noframes': 20,
    'noscript': 20,
    'object': 16,
    'ol': 0,
    'optgroup': 0,
    'option': 1,
    'p': 1,
    'param': 18,
    'pre': 0,
    'q': 0,
    's': 0,
    'samp': 0,
    'script': 84,
    'select': 0,
    'small': 0,
    'span': 0,
    'strike': 0,
    'strong': 0,
    'style': 148,
    'sub': 0,
    'sup': 0,
    'table': 0,
    'tbody': 1,
    'td': 1,
    'textarea': 8,
    'tfoot': 1,
    'th': 1,
    'thead': 1,
    'title': 24,
    'tr': 1,
    'tt': 0,
    'u': 0,
    'ul': 0,
    'var': 0
};

html4 .URIEFFECTS = {

};
html4 .LOADERTYPES = {}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = html4;
    }
    exports.URI = html4;
} else {

    // Exports for closure compiler.
    if (typeof window !== 'undefined') {
        window['html4'] = html4;
    }
}

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * An HTML sanitizer that can satisfy a variety of security policies.
 *
 * <p>
 * The HTML sanitizer is built around a SAX parser and HTML element and
 * attributes schemas.
 *
 * If the cssparser is loaded, inline styles are sanitized using the
 * css property and value schemas.  Else they are remove during
 * sanitization.
 *
 * If it exists, uses parseCssDeclarations, sanitizeCssProperty,  cssSchema
 *
 * @author mikesamuel@gmail.com
 * @author jasvir@gmail.com
 * \@requires html4, URI
 * \@overrides window
 * \@provides html, html_sanitize
 */

// The Turkish i seems to be a non-issue, but abort in case it is.
if ('I'.toLowerCase() !== 'i') { throw 'I/i problem'; }

/**
 * \@namespace
 */
var html = (function(html4) {

    // For closure compiler
    var parseCssDeclarations, sanitizeCssProperty, cssSchema;
    if ('undefined' !== typeof window) {
        parseCssDeclarations = window['parseCssDeclarations'];
        sanitizeCssProperty = window['sanitizeCssProperty'];
        cssSchema = window['cssSchema'];
    }

    // The keys of this object must be 'quoted' or JSCompiler will mangle them!
    // This is a partial list -- lookupEntity() uses the host browser's parser
    // (when available) to implement full entity lookup.
    // Note that entities are in general case-sensitive; the uppercase ones are
    // explicitly defined by HTML5 (presumably as compatibility).
    var ENTITIES = {
        'lt': '<',
        'LT': '<',
        'gt': '>',
        'GT': '>',
        'amp': '&',
        'AMP': '&',
        'quot': '"',
        'apos': '\'',
        'nbsp': '\u00a0'
    };

    // Patterns for types of entity/character reference names.
    var decimalEscapeRe = /^#(\d+)$/;
    var hexEscapeRe = /^#x([0-9A-Fa-f]+)$/;
    // contains every entity per http://www.w3.org/TR/2011/WD-html5-20110113/named-character-references.html
    var safeEntityNameRe = /^[A-Za-z][A-za-z0-9]+$/;
    // Used as a hook to invoke the browser's entity parsing. <textarea> is used
    // because its content is parsed for entities but not tags.
    // TODO(kpreid): This retrieval is a kludge and leads to silent loss of
    // functionality if the document isn't available.
    var entityLookupElement =
        ('undefined' !== typeof window && window['document'])
            ? window['document'].createElement('textarea') : null;
    /**
     * Decodes an HTML entity.
     *
     * {\@updoc
     * $ lookupEntity('lt')
     * # '<'
     * $ lookupEntity('GT')
     * # '>'
     * $ lookupEntity('amp')
     * # '&'
     * $ lookupEntity('nbsp')
     * # '\xA0'
     * $ lookupEntity('apos')
     * # "'"
     * $ lookupEntity('quot')
     * # '"'
     * $ lookupEntity('#xa')
     * # '\n'
     * $ lookupEntity('#10')
     * # '\n'
     * $ lookupEntity('#x0a')
     * # '\n'
     * $ lookupEntity('#010')
     * # '\n'
     * $ lookupEntity('#x00A')
     * # '\n'
     * $ lookupEntity('Pi')      // Known failure
     * # '\u03A0'
     * $ lookupEntity('pi')      // Known failure
     * # '\u03C0'
     * }
     *
     * @param {string} name the content between the '&' and the ';'.
     * @return {string} a single unicode code-point as a string.
     */
    function lookupEntity(name) {
        // TODO: entity lookup as specified by HTML5 actually depends on the
        // presence of the ";".
        if (ENTITIES.hasOwnProperty(name)) { return ENTITIES[name]; }
        var m = name.match(decimalEscapeRe);
        if (m) {
            return String.fromCharCode(parseInt(m[1], 10));
        } else if (!!(m = name.match(hexEscapeRe))) {
            return String.fromCharCode(parseInt(m[1], 16));
        } else if (entityLookupElement && safeEntityNameRe.test(name)) {
            entityLookupElement.innerHTML = '&' + name + ';';
            var text = entityLookupElement.textContent;
            ENTITIES[name] = text;
            return text;
        } else {
            return '&' + name + ';';
        }
    }

    function decodeOneEntity(_, name) {
        return lookupEntity(name);
    }

    var nulRe = /\0/g;
    function stripNULs(s) {
        return s.replace(nulRe, '');
    }

    var ENTITY_RE_1 = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g;
    var ENTITY_RE_2 = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/;
    /**
     * The plain text of a chunk of HTML CDATA which possibly containing.
     *
     * {\@updoc
     * $ unescapeEntities('')
     * # ''
     * $ unescapeEntities('hello World!')
     * # 'hello World!'
     * $ unescapeEntities('1 &lt; 2 &amp;&AMP; 4 &gt; 3&#10;')
     * # '1 < 2 && 4 > 3\n'
     * $ unescapeEntities('&lt;&lt <- unfinished entity&gt;')
     * # '<&lt <- unfinished entity>'
     * $ unescapeEntities('/foo?bar=baz&copy=true')  // & often unescaped in URLS
     * # '/foo?bar=baz&copy=true'
     * $ unescapeEntities('pi=&pi;&#x3c0;, Pi=&Pi;\u03A0') // FIXME: known failure
     * # 'pi=\u03C0\u03c0, Pi=\u03A0\u03A0'
     * }
     *
     * @param {string} s a chunk of HTML CDATA.  It must not start or end inside
     *     an HTML entity.
     */
    function unescapeEntities(s) {
	if(s) {
	    return s.replace(ENTITY_RE_1, decodeOneEntity);
	}
	else {
	    return s;
	}
    }

    var ampRe = /&/g;
    var looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;
    var ltRe = /[<]/g;
    var gtRe = />/g;
    var quotRe = /\"/g;

    /**
     * Escapes HTML special characters in attribute values.
     *
     * {\@updoc
     * $ escapeAttrib('')
     * # ''
     * $ escapeAttrib('"<<&==&>>"')  // Do not just escape the first occurrence.
     * # '&#34;&lt;&lt;&amp;&#61;&#61;&amp;&gt;&gt;&#34;'
     * $ escapeAttrib('Hello <World>!')
     * # 'Hello &lt;World&gt;!'
     * }
     */
    function escapeAttrib(s) {
	if(s) {
	    return ('' + s).replace(ampRe, '&amp;').replace(ltRe, '&lt;')
            .replace(gtRe, '&gt;').replace(quotRe, '&#34;');
	}
	else {
	    return s;
	}
        
    }

    /**
     * Escape entities in RCDATA that can be escaped without changing the meaning.
     * {\@updoc
     * $ normalizeRCData('1 < 2 &&amp; 3 > 4 &amp;& 5 &lt; 7&8')
     * # '1 &lt; 2 &amp;&amp; 3 &gt; 4 &amp;&amp; 5 &lt; 7&amp;8'
     * }
     */
    function normalizeRCData(rcdata) {
	if(rcdata) {
	    return rcdata
                .replace(looseAmpRe, '&amp;$1')
                .replace(ltRe, '&lt;')
                .replace(gtRe, '&gt;');
	}
	else {
	    return rcdata;
	}
    }

    // TODO(felix8a): validate sanitizer regexs against the HTML5 grammar at
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html

    // We initially split input so that potentially meaningful characters
    // like '<' and '>' are separate tokens, using a fast dumb process that
    // ignores quoting.  Then we walk that token stream, and when we see a
    // '<' that's the start of a tag, we use ATTR_RE to extract tag
    // attributes from the next token.  That token will never have a '>'
    // character.  However, it might have an unbalanced quote character, and
    // when we see that, we combine additional tokens to balance the quote.

    var ATTR_RE = new RegExp(
        '^\\s*' +
            '([-.:\\w]+)' +             // 1 = Attribute name
            '(?:' + (
            '\\s*(=)\\s*' +           // 2 = Is there a value?
                '(' + (                   // 3 = Attribute value
                // TODO(felix8a): maybe use backref to match quotes
                '(\")[^\"]*(\"|$)' +    // 4, 5 = Double-quoted string
                    '|' +
                    '(\')[^\']*(\'|$)' +    // 6, 7 = Single-quoted string
                    '|' +
                    // Positive lookahead to prevent interpretation of
                    // <foo a= b=c> as <foo a='b=c'>
                    // TODO(felix8a): might be able to drop this case
                    '(?=[a-z][-\\w]*\\s*=)' +
                    '|' +
                    // Unquoted value that isn't an attribute name
                    // (since we didn't match the positive lookahead above)
                    '[^\"\'\\s]*' ) +
                ')' ) +
            ')?',
        'i');

    // false on IE<=8, true on most other browsers
    var splitWillCapture = ('a,b'.split(/(,)/).length === 3);

    // bitmask for tags with special parsing, like <script> and <textarea>
    var EFLAGS_TEXT = html4.eflags['CDATA'] | html4.eflags['RCDATA'];

    /**
     * Given a SAX-like event handler, produce a function that feeds those
     * events and a parameter to the event handler.
     *
     * The event handler has the form:{@code
     * {
   *   // Name is an upper-case HTML tag name.  Attribs is an array of
   *   // alternating upper-case attribute names, and attribute values.  The
   *   // attribs array is reused by the parser.  Param is the value passed to
   *   // the saxParser.
   *   startTag: function (name, attribs, param) { ... },
   *   endTag:   function (name, param) { ... },
   *   pcdata:   function (text, param) { ... },
   *   rcdata:   function (text, param) { ... },
   *   cdata:    function (text, param) { ... },
   *   startDoc: function (param) { ... },
   *   endDoc:   function (param) { ... }
   * }}
     *
     * @param {Object} handler a record containing event handlers.
     * @return {function(string, Object)} A function that takes a chunk of HTML
     *     and a parameter.  The parameter is passed on to the handler methods.
     */
    function makeSaxParser(handler) {
        // Accept quoted or unquoted keys (Closure compat)
        var hcopy = {
            cdata: handler.cdata || handler['cdata'],
            comment: handler.comment || handler['comment'],
            endDoc: handler.endDoc || handler['endDoc'],
            endTag: handler.endTag || handler['endTag'],
            pcdata: handler.pcdata || handler['pcdata'],
            rcdata: handler.rcdata || handler['rcdata'],
            startDoc: handler.startDoc || handler['startDoc'],
            startTag: handler.startTag || handler['startTag']
        };
        return function(htmlText, param) {
            return parse(htmlText, hcopy, param);
        };
    }

    // Parsing strategy is to split input into parts that might be lexically
    // meaningful (every ">" becomes a separate part), and then recombine
    // parts if we discover they're in a different context.

    // TODO(felix8a): Significant performance regressions from -legacy,
    // tested on
    //    Chrome 18.0
    //    Firefox 11.0
    //    IE 6, 7, 8, 9
    //    Opera 11.61
    //    Safari 5.1.3
    // Many of these are unusual patterns that are linearly slower and still
    // pretty fast (eg 1ms to 5ms), so not necessarily worth fixing.

    // TODO(felix8a): "<script> && && && ... <\/script>" is slower on all
    // browsers.  The hotspot is htmlSplit.

    // TODO(felix8a): "<p title='>>>>...'><\/p>" is slower on all browsers.
    // This is partly htmlSplit, but the hotspot is parseTagAndAttrs.

    // TODO(felix8a): "<a><\/a><a><\/a>..." is slower on IE9.
    // "<a>1<\/a><a>1<\/a>..." is faster, "<a><\/a>2<a><\/a>2..." is faster.

    // TODO(felix8a): "<p<p<p..." is slower on IE[6-8]

    var continuationMarker = {};
    function parse(htmlText, handler, param) {
        var m, p, tagName;
        var parts = htmlSplit(htmlText);
        var state = {
            noMoreGT: false,
            noMoreEndComments: false
        };
        parseCPS(handler, parts, 0, state, param);
    }

    function continuationMaker(h, parts, initial, state, param) {
        return function () {
            parseCPS(h, parts, initial, state, param);
        };
    }

    function parseCPS(h, parts, initial, state, param) {
        try {
            if (h.startDoc && initial == 0) { h.startDoc(param); }
            var m, p, tagName;
            for (var pos = initial, end = parts.length; pos < end;) {
                var current = parts[pos++];
                var next = parts[pos];
                switch (current) {
                    case '&':
                        if (ENTITY_RE_2.test(next)) {
                            if (h.pcdata) {
                                h.pcdata('&' + next, param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                            pos++;
                        } else {
                            if (h.pcdata) { h.pcdata("&amp;", param, continuationMarker,
                                continuationMaker(h, parts, pos, state, param));
                            }
                        }
                        break;
                    case '<\/':
                        if ((m = /^([-\w:]+)[^\'\"]*/.exec(next))) {
                            if (m[0].length === next.length && parts[pos + 1] === '>') {
                                // fast case, no attribute parsing needed
                                pos += 2;
                                tagName = m[1].toLowerCase();
                                if (h.endTag) {
                                    h.endTag(tagName, param, continuationMarker,
                                        continuationMaker(h, parts, pos, state, param));
                                }
                            } else {
                                // slow case, need to parse attributes
                                // TODO(felix8a): do we really care about misparsing this?
                                pos = parseEndTag(
                                    parts, pos, h, param, continuationMarker, state);
                            }
                        } else {
                            if (h.pcdata) {
                                h.pcdata('&lt;/', param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                        }
                        break;
                    case '<':
                        if (m = /^([-\w:]+)\s*\/?/.exec(next)) {
                            if (m[0].length === next.length && parts[pos + 1] === '>') {
                                // fast case, no attribute parsing needed
                                pos += 2;
                                tagName = m[1].toLowerCase();
                                if (h.startTag) {
                                    h.startTag(tagName, [], param, continuationMarker,
                                        continuationMaker(h, parts, pos, state, param));
                                }
                                // tags like <script> and <textarea> have special parsing
                                var eflags = html4.ELEMENTS[tagName];
                                if (eflags & EFLAGS_TEXT) {
                                    var tag = { name: tagName, next: pos, eflags: eflags };
                                    pos = parseText(
                                        parts, tag, h, param, continuationMarker, state);
                                }
                            } else {
                                // slow case, need to parse attributes
                                pos = parseStartTag(
                                    parts, pos, h, param, continuationMarker, state);
                            }
                        } else {
                            if (h.pcdata) {
                                h.pcdata('&lt;', param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                        }
                        break;
                    case '<\!--':
                        // The pathological case is n copies of '<\!--' without '-->', and
                        // repeated failure to find '-->' is quadratic.  We avoid that by
                        // remembering when search for '-->' fails.
                        if (!state.noMoreEndComments) {
                            // A comment <\!--x--> is split into three tokens:
                            //   '<\!--', 'x--', '>'
                            // We want to find the next '>' token that has a preceding '--'.
                            // pos is at the 'x--'.
                            for (p = pos + 1; p < end; p++) {
                                if (parts[p] === '>' && /--$/.test(parts[p - 1])) { break; }
                            }
                            if (p < end) {
                                if (h.comment) {
                                    var comment = parts.slice(pos, p).join('');
                                    h.comment(
                                        comment.substr(0, comment.length - 2), param,
                                        continuationMarker,
                                        continuationMaker(h, parts, p + 1, state, param));
                                }
                                pos = p + 1;
                            } else {
                                state.noMoreEndComments = true;
                            }
                        }
                        if (state.noMoreEndComments) {
                            if (h.pcdata) {
                                h.pcdata('&lt;!--', param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                        }
                        break;
                    case '<\!':
                        if (!/^\w/.test(next)) {
                            if (h.pcdata) {
                                h.pcdata('&lt;!', param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                        } else {
                            // similar to noMoreEndComment logic
                            if (!state.noMoreGT) {
                                for (p = pos + 1; p < end; p++) {
                                    if (parts[p] === '>') { break; }
                                }
                                if (p < end) {
                                    pos = p + 1;
                                } else {
                                    state.noMoreGT = true;
                                }
                            }
                            if (state.noMoreGT) {
                                if (h.pcdata) {
                                    h.pcdata('&lt;!', param, continuationMarker,
                                        continuationMaker(h, parts, pos, state, param));
                                }
                            }
                        }
                        break;
                    case '<?':
                        // similar to noMoreEndComment logic
                        if (!state.noMoreGT) {
                            for (p = pos + 1; p < end; p++) {
                                if (parts[p] === '>') { break; }
                            }
                            if (p < end) {
                                pos = p + 1;
                            } else {
                                state.noMoreGT = true;
                            }
                        }
                        if (state.noMoreGT) {
                            if (h.pcdata) {
                                h.pcdata('&lt;?', param, continuationMarker,
                                    continuationMaker(h, parts, pos, state, param));
                            }
                        }
                        break;
                    case '>':
                        if (h.pcdata) {
                            h.pcdata("&gt;", param, continuationMarker,
                                continuationMaker(h, parts, pos, state, param));
                        }
                        break;
                    case '':
                        break;
                    default:
                        if (h.pcdata) {
                            h.pcdata(current, param, continuationMarker,
                                continuationMaker(h, parts, pos, state, param));
                        }
                        break;
                }
            }
            if (h.endDoc) { h.endDoc(param); }
        } catch (e) {
            if (e !== continuationMarker) { throw e; }
        }
    }

    // Split str into parts for the html parser.
    function htmlSplit(str) {
        // can't hoist this out of the function because of the re.exec loop.
        var re = /(<\/|<\!--|<[!?]|[&<>])/g;
        str += '';
        if (splitWillCapture) {
            return str.split(re);
        } else {
            var parts = [];
            var lastPos = 0;
            var m;
            while ((m = re.exec(str)) !== null) {
                parts.push(str.substring(lastPos, m.index));
                parts.push(m[0]);
                lastPos = m.index + m[0].length;
            }
            parts.push(str.substring(lastPos));
            return parts;
        }
    }

    function parseEndTag(parts, pos, h, param, continuationMarker, state) {
        var tag = parseTagAndAttrs(parts, pos);
        // drop unclosed tags
        if (!tag) { return parts.length; }
        if (h.endTag) {
            h.endTag(tag.name, param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
        }
        return tag.next;
    }

    function parseStartTag(parts, pos, h, param, continuationMarker, state) {
        var tag = parseTagAndAttrs(parts, pos);
        // drop unclosed tags
        if (!tag) { return parts.length; }
        if (h.startTag) {
            h.startTag(tag.name, tag.attrs, param, continuationMarker,
                continuationMaker(h, parts, tag.next, state, param));
        }
        // tags like <script> and <textarea> have special parsing
        if (tag.eflags & EFLAGS_TEXT) {
            return parseText(parts, tag, h, param, continuationMarker, state);
        } else {
            return tag.next;
        }
    }

    var endTagRe = {};

    // Tags like <script> and <textarea> are flagged as CDATA or RCDATA,
    // which means everything is text until we see the correct closing tag.
    function parseText(parts, tag, h, param, continuationMarker, state) {
        var end = parts.length;
        if (!endTagRe.hasOwnProperty(tag.name)) {
            endTagRe[tag.name] = new RegExp('^' + tag.name + '(?:[\\s\\/]|$)', 'i');
        }
        var re = endTagRe[tag.name];
        var first = tag.next;
        var p = tag.next + 1;
        for (; p < end; p++) {
            if (parts[p - 1] === '<\/' && re.test(parts[p])) { break; }
        }
        if (p < end) { p -= 1; }
        var buf = parts.slice(first, p).join('');
        if (tag.eflags & html4.eflags['CDATA']) {
            if (h.cdata) {
                h.cdata(buf, param, continuationMarker,
                    continuationMaker(h, parts, p, state, param));
            }
        } else if (tag.eflags & html4.eflags['RCDATA']) {
            if (h.rcdata) {
                h.rcdata(normalizeRCData(buf), param, continuationMarker,
                    continuationMaker(h, parts, p, state, param));
            }
        } else {
            throw new Error('bug');
        }
        return p;
    }

    // at this point, parts[pos-1] is either "<" or "<\/".
    function parseTagAndAttrs(parts, pos) {
        var m = /^([-\w:]+)/.exec(parts[pos]);
        var tag = {};
        tag.name = m[1].toLowerCase();
        tag.eflags = html4.ELEMENTS[tag.name];
        var buf = parts[pos].substr(m[0].length);
        // Find the next '>'.  We optimistically assume this '>' is not in a
        // quoted context, and further down we fix things up if it turns out to
        // be quoted.
        var p = pos + 1;
        var end = parts.length;
        for (; p < end; p++) {
            if (parts[p] === '>') { break; }
            buf += parts[p];
        }
        if (end <= p) { return void 0; }
        var attrs = [];
        while (buf !== '') {
            m = ATTR_RE.exec(buf);
            if (!m) {
                // No attribute found: skip garbage
                buf = buf.replace(/^[\s\S][^a-z\s]*/, '');

            } else if ((m[4] && !m[5]) || (m[6] && !m[7])) {
                // Unterminated quote: slurp to the next unquoted '>'
                var quote = m[4] || m[6];
                var sawQuote = false;
                var abuf = [buf, parts[p++]];
                for (; p < end; p++) {
                    if (sawQuote) {
                        if (parts[p] === '>') { break; }
                    } else if (0 <= parts[p].indexOf(quote)) {
                        sawQuote = true;
                    }
                    abuf.push(parts[p]);
                }
                // Slurp failed: lose the garbage
                if (end <= p) { break; }
                // Otherwise retry attribute parsing
                buf = abuf.join('');
                continue;

            } else {
                // We have an attribute
                var aName = m[1].toLowerCase();
                var aValue = m[2] ? decodeValue(m[3]) : '';
                attrs.push(aName, aValue);
                buf = buf.substr(m[0].length);
            }
        }
        tag.attrs = attrs;
        tag.next = p + 1;
        return tag;
    }

    function decodeValue(v) {
        var q = v.charCodeAt(0);
        if (q === 0x22 || q === 0x27) { // " or '
            v = v.substr(1, v.length - 2);
        }
        return unescapeEntities(stripNULs(v));
    }

    /**
     * Returns a function that strips unsafe tags and attributes from html.
     * @param {function(string, Array.<string>): ?Array.<string>} tagPolicy
     *     A function that takes (tagName, attribs[]), where tagName is a key in
     *     html4.ELEMENTS and attribs is an array of alternating attribute names
     *     and values.  It should return a record (as follows), or null to delete
     *     the element.  It's okay for tagPolicy to modify the attribs array,
     *     but the same array is reused, so it should not be held between calls.
     *     Record keys:
     *        attribs: (required) Sanitized attributes array.
     *        tagName: Replacement tag name.
     * @return {function(string, Array)} A function that sanitizes a string of
     *     HTML and appends result strings to the second argument, an array.
     */
    function makeHtmlSanitizer(tagPolicy) {
        var stack;
        var ignoring;
        var emit = function (text, out) {
            if (!ignoring) { out.push(text); }
        };
        return makeSaxParser({
            'startDoc': function(_) {
                stack = [];
                ignoring = false;
            },
            'startTag': function(tagNameOrig, attribs, out) {
                if (ignoring) { return; }
                if (!html4.ELEMENTS.hasOwnProperty(tagNameOrig)) { return; }
                var eflagsOrig = html4.ELEMENTS[tagNameOrig];
                if (eflagsOrig & html4.eflags['FOLDABLE']) {
                    return;
                }

                var decision = tagPolicy(tagNameOrig, attribs);
                if (!decision) {
                    ignoring = !(eflagsOrig & html4.eflags['EMPTY']);
                    return;
                } else if (typeof decision !== 'object') {
                    throw new Error('tagPolicy did not return object (old API?)');
                }
                if ('attribs' in decision) {
                    attribs = decision['attribs'];
                } else {
                    throw new Error('tagPolicy gave no attribs');
                }
                var eflagsRep;
                var tagNameRep;
                if ('tagName' in decision) {
                    tagNameRep = decision['tagName'];
                    eflagsRep = html4.ELEMENTS[tagNameRep];
                } else {
                    tagNameRep = tagNameOrig;
                    eflagsRep = eflagsOrig;
                }
                // TODO(mikesamuel): relying on tagPolicy not to insert unsafe
                // attribute names.

                // If this is an optional-end-tag element and either this element or its
                // previous like sibling was rewritten, then insert a close tag to
                // preserve structure.
                if (eflagsOrig & html4.eflags['OPTIONAL_ENDTAG']) {
                    var onStack = stack[stack.length - 1];
                    if (onStack && onStack.orig === tagNameOrig &&
                        (onStack.rep !== tagNameRep || tagNameOrig !== tagNameRep)) {
                        out.push('<\/', onStack.rep, '>');
                    }
                }

                if (!(eflagsOrig & html4.eflags['EMPTY'])) {
                    stack.push({orig: tagNameOrig, rep: tagNameRep});
                }

                out.push('<', tagNameRep);
                for (var i = 0, n = attribs.length; i < n; i += 2) {
                    var attribName = attribs[i],
                        value = attribs[i + 1];
                    if (value !== null && value !== void 0) {
                        out.push(' ', attribName, '="', escapeAttrib(value), '"');
                    }
                }
                out.push('>');

                if ((eflagsOrig & html4.eflags['EMPTY'])
                    && !(eflagsRep & html4.eflags['EMPTY'])) {
                    // replacement is non-empty, synthesize end tag
                    out.push('<\/', tagNameRep, '>');
                }
            },
            'endTag': function(tagName, out) {
                if (ignoring) {
                    ignoring = false;
                    return;
                }
                if (!html4.ELEMENTS.hasOwnProperty(tagName)) { return; }
                var eflags = html4.ELEMENTS[tagName];
                if (!(eflags & (html4.eflags['EMPTY'] | html4.eflags['FOLDABLE']))) {
                    var index;
                    if (eflags & html4.eflags['OPTIONAL_ENDTAG']) {
                        for (index = stack.length; --index >= 0;) {
                            var stackElOrigTag = stack[index].orig;
                            if (stackElOrigTag === tagName) { break; }
                            if (!(html4.ELEMENTS[stackElOrigTag] &
                                html4.eflags['OPTIONAL_ENDTAG'])) {
                                // Don't pop non optional end tags looking for a match.
                                return;
                            }
                        }
                    } else {
                        for (index = stack.length; --index >= 0;) {
                            if (stack[index].orig === tagName) { break; }
                        }
                    }
                    if (index < 0) { return; }  // Not opened.
                    for (var i = stack.length; --i > index;) {
                        var stackElRepTag = stack[i].rep;
                        if (!(html4.ELEMENTS[stackElRepTag] &
                            html4.eflags['OPTIONAL_ENDTAG'])) {
                            out.push('<\/', stackElRepTag, '>');
                        }
                    }
                    if (index < stack.length) {
                        tagName = stack[index].rep;
                    }
                    stack.length = index;
                    out.push('<\/', tagName, '>');
                }
            },
            'pcdata': emit,
            'rcdata': emit,
            'cdata': emit,
            'endDoc': function(out) {
                for (; stack.length; stack.length--) {
                    out.push('<\/', stack[stack.length - 1].rep, '>');
                }
            }
        });
    }

    var ALLOWED_URI_SCHEMES = /^(?:https?|mailto)$/i;

    function safeUri(uri, effect, ltype, hints, naiveUriRewriter) {
        if (!naiveUriRewriter) { return null; }
        try {
            var parsed = URI.parse('' + uri);
            if (parsed) {
                if (!parsed.hasScheme() ||
                    ALLOWED_URI_SCHEMES.test(parsed.getScheme())) {
                    var safe = naiveUriRewriter(parsed, effect, ltype, hints);
                    return safe ? safe.toString() : null;
                }
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    function log(logger, tagName, attribName, oldValue, newValue) {
        if (!attribName) {
            logger(tagName + " removed", {
                change: "removed",
                tagName: tagName
            });
        }
        if (oldValue !== newValue) {
            var changed = "changed";
            if (oldValue && !newValue) {
                changed = "removed";
            } else if (!oldValue && newValue)  {
                changed = "added";
            }
            logger(tagName + "." + attribName + " " + changed, {
                change: changed,
                tagName: tagName,
                attribName: attribName,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    function lookupAttribute(map, tagName, attribName) {
        var attribKey;
        attribKey = tagName + '::' + attribName;
        if (map.hasOwnProperty(attribKey)) {
            return map[attribKey];
        }
        attribKey = '*::' + attribName;
        if (map.hasOwnProperty(attribKey)) {
            return map[attribKey];
        }
        return void 0;
    }
    function getAttributeType(tagName, attribName) {
        return lookupAttribute(html4.ATTRIBS, tagName, attribName);
    }
    function getLoaderType(tagName, attribName) {
        return lookupAttribute(html4.LOADERTYPES, tagName, attribName);
    }
    function getUriEffect(tagName, attribName) {
        return lookupAttribute(html4.URIEFFECTS, tagName, attribName);
    }

    /**
     * Sanitizes attributes on an HTML tag.
     * @param {string} tagName An HTML tag name in lowercase.
     * @param {Array.<?string>} attribs An array of alternating names and values.
     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
     *     apply to URI attributes; it can return a new string value, or null to
     *     delete the attribute.  If unspecified, URI attributes are deleted.
     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
     *     to attributes containing HTML names, element IDs, and space-separated
     *     lists of classes; it can return a new string value, or null to delete
     *     the attribute.  If unspecified, these attributes are kept unchanged.
     * @return {Array.<?string>} The sanitized attributes as a list of alternating
     *     names and values, where a null value means to omit the attribute.
     */
    function sanitizeAttribs(tagName, attribs,
        opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
        // TODO(felix8a): it's obnoxious that domado duplicates much of this
        // TODO(felix8a): maybe consistently enforce constraints like target=
        for (var i = 0; i < attribs.length; i += 2) {
            var attribName = attribs[i];
            var value = attribs[i + 1];
            var oldValue = value;
            var atype = null, attribKey;
            if ((attribKey = tagName + '::' + attribName,
                html4.ATTRIBS.hasOwnProperty(attribKey)) ||
                (attribKey = '*::' + attribName,
                    html4.ATTRIBS.hasOwnProperty(attribKey))) {
                atype = html4.ATTRIBS[attribKey];
            }
            if (atype !== null) {
                switch (atype) {
                    case html4.atype['NONE']: break;
                    case html4.atype['SCRIPT']:
                        value = null;
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                    case html4.atype['STYLE']:
                        if ('undefined' === typeof parseCssDeclarations) {
                            value = null;
                            if (opt_logger) {
                                log(opt_logger, tagName, attribName, oldValue, value);
                            }
                            break;
                        }
                        var sanitizedDeclarations = [];
                        parseCssDeclarations(
                            value,
                            {
                                'declaration': function (property, tokens) {
                                    var normProp = property.toLowerCase();
                                    sanitizeCssProperty(
                                        normProp, tokens,
                                        opt_naiveUriRewriter
                                            ? function (url) {
                                            return safeUri(
                                                url, html4.ueffects.SAME_DOCUMENT,
                                                html4.ltypes.SANDBOXED,
                                                {
                                                    "TYPE": "CSS",
                                                    "CSS_PROP": normProp
                                                }, opt_naiveUriRewriter);
                                        }
                                            : null);
                                    if (tokens.length) {
                                        sanitizedDeclarations.push(
                                            normProp + ': ' + tokens.join(' '));
                                    }
                                }
                            });
                        value = sanitizedDeclarations.length > 0 ?
                            sanitizedDeclarations.join(' ; ') : null;
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                    case html4.atype['ID']:
                    case html4.atype['IDREF']:
                    case html4.atype['IDREFS']:
                    case html4.atype['GLOBAL_NAME']:
                    case html4.atype['LOCAL_NAME']:
                    case html4.atype['CLASSES']:
                        value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                    case html4.atype['URI']:
                        value = safeUri(value,
                            getUriEffect(tagName, attribName),
                            getLoaderType(tagName, attribName),
                            {
                                "TYPE": "MARKUP",
                                "XML_ATTR": attribName,
                                "XML_TAG": tagName
                            }, opt_naiveUriRewriter);
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                    case html4.atype['URI_FRAGMENT']:
                        if (value && '#' === value.charAt(0)) {
                            value = value.substring(1);  // remove the leading '#'
                            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                            if (value !== null && value !== void 0) {
                                value = '#' + value;  // restore the leading '#'
                            }
                        } else {
                            value = null;
                        }
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                    default:
                        value = null;
                        if (opt_logger) {
                            log(opt_logger, tagName, attribName, oldValue, value);
                        }
                        break;
                }
            } else {
                value = null;
                if (opt_logger) {
                    log(opt_logger, tagName, attribName, oldValue, value);
                }
            }
            attribs[i + 1] = value;
        }
        return attribs;
    }

    /**
     * Creates a tag policy that omits all tags marked UNSAFE in html4-defs.js
     * and applies the default attribute sanitizer with the supplied policy for
     * URI attributes and NMTOKEN attributes.
     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
     *     apply to URI attributes.  If not given, URI attributes are deleted.
     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
     *     to attributes containing HTML names, element IDs, and space-separated
     *     lists of classes.  If not given, such attributes are left unchanged.
     * @return {function(string, Array.<?string>)} A tagPolicy suitable for
     *     passing to html.sanitize.
     */
    function makeTagPolicy(
        opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
        return function(tagName, attribs) {
            if (!(html4.ELEMENTS[tagName] & html4.eflags['UNSAFE'])) {
                return {
                    'attribs': sanitizeAttribs(tagName, attribs,
                        opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger)
                };
            } else {
                if (opt_logger) {
                    log(opt_logger, tagName, undefined, undefined, undefined);
                }
            }
        };
    }

    /**
     * Sanitizes HTML tags and attributes according to a given policy.
     * @param {string} inputHtml The HTML to sanitize.
     * @param {function(string, Array.<?string>)} tagPolicy A function that
     *     decides which tags to accept and sanitizes their attributes (see
     *     makeHtmlSanitizer above for details).
     * @return {string} The sanitized HTML.
     */
    function sanitizeWithPolicy(inputHtml, tagPolicy) {
        var outputArray = [];
        makeHtmlSanitizer(tagPolicy)(inputHtml, outputArray);
        return outputArray.join('');
    }

    /**
     * Strips unsafe tags and attributes from HTML.
     * @param {string} inputHtml The HTML to sanitize.
     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
     *     apply to URI attributes.  If not given, URI attributes are deleted.
     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
     *     to attributes containing HTML names, element IDs, and space-separated
     *     lists of classes.  If not given, such attributes are left unchanged.
     */
    function sanitize(inputHtml,
        opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
        var tagPolicy = makeTagPolicy(
            opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger);
        return sanitizeWithPolicy(inputHtml, tagPolicy);
    }

    // Export both quoted and unquoted names for Closure linkage.
    var html = {};
    html.escapeAttrib = html['escapeAttrib'] = escapeAttrib;
    html.makeHtmlSanitizer = html['makeHtmlSanitizer'] = makeHtmlSanitizer;
    html.makeSaxParser = html['makeSaxParser'] = makeSaxParser;
    html.makeTagPolicy = html['makeTagPolicy'] = makeTagPolicy;
    html.normalizeRCData = html['normalizeRCData'] = normalizeRCData;
    html.sanitize = html['sanitize'] = sanitize;
    html.sanitizeAttribs = html['sanitizeAttribs'] = sanitizeAttribs;
    html.sanitizeWithPolicy = html['sanitizeWithPolicy'] = sanitizeWithPolicy;
    html.unescapeEntities = html['unescapeEntities'] = unescapeEntities;
    return html;
})(html4);

var html_sanitize = html['sanitize'];

// Exports for Closure compiler.  Note this file is also cajoled
// for domado and run in an environment without 'window'
if (typeof window !== 'undefined') {
    window['html'] = html;
    window['html_sanitize'] = html_sanitize;
}

var Sanitizer = {};

// Ensure backwards compatibility
Sanitizer.escapeAttrib = html.escapeAttrib;
Sanitizer.makeHtmlSanitizer = html.makeHtmlSanitizer;
Sanitizer.makeSaxParser = html.makeSaxParser;
Sanitizer.makeTagPolicy = html.makeTagPolicy;
Sanitizer.normalizeRCData = html.normalizeRCData
Sanitizer.sanitizeAttribs = html.sanitizeAttribs
Sanitizer.sanitizeWithPolicy = html.sanitizeWithPolicy
Sanitizer.unescapeEntities = html.unescapeEntities
Sanitizer.escape = html.escapeAttrib;

// https://github.com/theSmaw/Caja-HTML-Sanitizer/issues/8
Sanitizer.sanitize = function(inputHtml, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    if (typeof(inputHtml) === "string") {
        inputHtml = inputHtml.replace(/<([a-zA-Z]+)([^>]*)\/>/g, '<$1$2></$1>');
    }
    
    if (inputHtml) {
        return html.sanitize(inputHtml, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger);
    }
    else {
        return inputHtml;
    }
    
}

// the browser, add 'Sanitizer' as a global object via a string identifier,
// for Closure Compiler "advanced" mode.
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Sanitizer;
    }
    exports.Sanitizer = Sanitizer;
} else {
    this.Sanitizer = Sanitizer;
}
;var sticky = sticky || {};
/* ------------------------------------------
initialize variables
------------------------------------------- */
sticky.vars = {
	globalStickyNoteCounter: 0,
	homeCount: 0,
	archivedCount: 0,
	page: ['home', 'archive'],
	greetings: ['Hello,', 'Wellcome back,', 'Howdy,', 'Nice to see you,', 'Greetings,', 'Good day,', "What's up,"],
	fireBaseUrl: "https://boiling-torch-8284.firebaseio.com",
	noteDefaults: {title: "New Note", column: 0, row: 0, items : {0: {text: "New Item"}}},
	loggedUser: {}
};
;var sticky = sticky || {};
sticky.model = sticky.model || {};

/* USER MODEL */
sticky.model.log = (function (global) {
	_self = {};
	var messages = ["Data could not be saved.", "Login Failed!", "Account creation failed!", "Data could not be deleted.", "Authenticated successfully with payload:", "Permisssion denied:"];

	_self.output = function (msgType, msg) {
		if (msg)
			console.log(messages[msgType] + msg);
	};

	return _self;
})(sticky);
;var sticky = sticky || {};
sticky.model = sticky.model || {};

/* USER MODEL */
sticky.model.user = (function (global) {
	_self = {};

	_self.uid = null;
	_self.name = null;
	_self.picture = null;
	_self.email = null;

	_self.userFromData = function (uid, name, picture, email) {
		_self.uid = uid;
		_self.name = name;
		_self.picture = picture;
		_self.email = email;
	};

	_self.userFromObj = function (obj) {
		_self.uid = obj.uid;
		_self.name = obj.name;
		_self.picture = obj.picture;
		_self.email = obj.email;
	};

	return _self;
})(sticky);
;var sticky = sticky || {};

sticky.utils = (function (global) {
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;
	var user = global.model.user;

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
	_self.getNote = function(noteId, page) {
		return global.core._notes.child(noteId).once("value").then(function(data) {
			var n = data.val();
			if (n != null) {
				if (!n.archived && page == "home") {
					_self.spawnNewStickyNote("dz"+n.column, false, n, data.key);
					vars.homeCount++;
				} else if (n.archived && page == "archive") {
					_self.spawnNewStickyNote("dz"+n.column, false, n, data.key);
					vars.archivedCount++;
				} else {
					if(!n.archived) { // TO-DO implement pageDisplay (String type) property to notes
						vars.homeCount++;
					} else if(n.archived) {
						vars.archivedCount++;
					}
				}
			}
		});
	};
	_self.loadSavedState = function(page) {
		// get personal notes
		global.core._users.child(global.core.getUser().uid).child('notes').once("value", function(snapshot) {
			var promisedNotes = [];
			snapshot.forEach(function(child){
				var noteId = child.key;
				var promise = _self.getNote(noteId, page);
				promisedNotes.push(promise);
			});
			Promise.all(promisedNotes).then(function(results) {
				$("#home .mdl-badge").attr("data-badge", vars.homeCount);
				$("#archive .mdl-badge").attr("data-badge", vars.archivedCount);
			});
		});
		// get shared notes
		global.core._shared.child(global.core.getUser().uid).once("value", function(snapshot) {
			var promisedNotes = [];
			snapshot.forEach(function(child){
				var noteId = child.key;
				var promise = _self.getNote(noteId, page);
				promisedNotes.push(promise);
			});
			Promise.all(promisedNotes).then(function(results) {
				$("#home .mdl-badge").attr("data-badge", vars.homeCount);
				$("#archive .mdl-badge").attr("data-badge", vars.archivedCount);
			});
		});
	};
	/* ------------------------------------------
	spawn sticky note
	------------------------------------------- */
	_self.spawnNewStickyNote = function(parentId, isNew, data, key) {
		var elm = '<div id="note'+vars.globalStickyNoteCounter+'" class="sticky-note mdl-card mdl-shadow--2dp" data-note-key="'+key+'">'+
		'<div class="sticky-header-drawer mdl-card__title mdl-card--border">'+
		'<h2 id="title'+vars.globalStickyNoteCounter+'" class="sticky-title mdl-color-text--cyan can-edit" data-sticky-id="'+vars.globalStickyNoteCounter+'" data-item-id="1">'+data.title+'</h2>'+
		'<div id="n_s_'+vars.globalStickyNoteCounter+'" class="material-icons note_shared">people</div>'+
		'<div class="mdl-tooltip" for="n_s_'+vars.globalStickyNoteCounter+'">Shared with 1 collaborator</div>'+
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
		'<button class="sticky-add-collaborator mdl-button mdl-js-button mdl-button--fab  mdl-button--mini-fab">'+
		'<i class="material-icons">person_add</i>'+
		'</button>'+
		'</div>'+
		'</div>';

		document.getElementById(parentId).appendChild(prepareHtmlElement(elm, true));

		// needs to be saved if triggered by user
		if (isNew) {
			var push = global.core._notes.push({
					title: "New Note",
					column: 0,
					row: 0,
					archived: false,
					owner: global.core.getUser().uid,
					created_at: firebase.database.ServerValue.TIMESTAMP,
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});

			var set = global.core._users.child(global.core.getUser().uid+'/notes/'+push.key).set(true,
				function(error) {log.output(0, error);});

			$("#note"+vars.globalStickyNoteCounter).attr("data-note-key", push.key);
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
					var update = global.core._notes.child($("#note"+stickyNoteId).attr("data-note-key")).update(
						{
							title: inputText,
							changed_at: firebase.database.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(0, error);});
				} else if ($("#"+parentId).attr("data-item-key")) {
					var update = global.core._notes.child($("#note"+stickyNoteId).attr("data-note-key")+"/items/"+$("#"+parentId).attr("data-item-key")).update(
						{
							type: fieldType,
							text: inputText,
							changed_at: firebase.database.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(0, error);});
				} else {
					var push = global.core._notes.child($("#note"+stickyNoteId).attr("data-note-key")+'/items').push(
						{
							type: fieldType,
							text: inputText,
							created_at: firebase.database.ServerValue.TIMESTAMP,
							changed_at: firebase.database.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(0, error);});
					$("#"+parentId).attr("data-item-key", push.key);
				}
				$("#"+parentId).removeClass("sticky-editing");
			});
		} else if (type == "checkbox") {
			$("#cbn"+stickyNoteId+"i"+stickyItemId).click(); // toggle checkbox label edit field
		} else {
			throw "Invalid type";
		}
	};
	// transform email address to valid index key form (remove .) & retrieve it
	// source: https://gist.github.com/katowulf/6479129
	_self.emailToKey = function(emailAddress) {
		return emailAddress.replace(/[.]/g, '%20');
	}
	_self.getUserByEmail = function(emailAddress) {
		return global.core._user_index.child(_self.emailToKey(emailAddress)).once('value').then(function(snap) {
			return snap.val();
		});
	}
	_self.addFriend = function(emailAddress) {
		global.core._users.child(global.core.getUser().uid+'/friends/'+_self.emailToKey(emailAddress)).set(true, function(error) {log.output(0, error);});
	}
	_self.addCollaborator = function(noteKey, friendEmail) {
		_self.getUserByEmail(friendEmail).then(function(collaborator) {
			global.core._notes.child(noteKey+'/collaborators/'+collaborator.uid).set(true, function(error) {log.output(0, error);});
			global.core._shared.child(collaborator.uid+'/'+noteKey).set(true, function(error) {log.output(0, error);});
		});

	}
	_self.deleteCollaborator = function(noteKey, friendEmail) {
		_self.getUserByEmail(friendEmail).then(function(collaborator) {
			global.core._notes.child(noteKey+'/collaborators/'+collaborator.uid).set(null, function(error) {log.output(0, error);});
			global.core._shared.child(collaborator.uid+'/'+noteKey).set(null, function(error) {log.output(0, error);});
		});
	}
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

	var getGreeting = function() {
		return vars.greetings[Math.floor((Math.random() * vars.greetings.length))];
	};

	_self.displayProfile = function() {
		if (global.core.getUser().picture) {
			$("#profile_image").css("background-image", "url("+global.core.getUser().picture+")");
			$("#profile_image").css("background-size", "contain");
			$("#profile_icon").hide();
			$("#profile_image").show();
		}
		$("#profile_greeting").html(getGreeting());
		$("#profile_name").html(global.core.getUser().name);
		$("#profile").show();
		$("#controls").show();
	};

	return _self;
})(sticky);
;var sticky = sticky || {};
/* ------------------------------------------
initialize variables
------------------------------------------- */
sticky.core = (function (global) {
	var _self = {};
	var vars = global.vars;
	var log = global.model.log;
	var utils = global.utils;

	_self.constr = function() {
		// Initialize firebase
		console.log("cc");
		var config = {
			apiKey: "AIzaSyAv7-HAOAE72ig6Tle2G0Q4PWxufGqWJq0",
			authDomain: "boiling-torch-8284.firebaseapp.com",
			databaseURL: "https://boiling-torch-8284.firebaseio.com",
			storageBucket: "boiling-torch-8284.appspot.com",
		};
		firebase.initializeApp(config);

		_self._firebase = firebase.database().ref();
		_self._notes = _self._firebase.child('notes');
		_self._users = _self._firebase.child('users');
		_self._user_index = _self._firebase.child('user_index');
		_self._shared = _self._firebase.child('shared');

		interface(); // load interface dependencies & event handlers
	}

	var interface = function() {
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
			var update = _self._notes.child($(el).attr("data-note-key")).update(
				{
					column: $(container).attr("data-column"),
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
		});

		/* ------------------------------------------
		MANIPULATE STICKY NOTES - LISTENERS
		------------------------------------------- */
		// GO-TO home
		$("#login").click(function(event) {
			_self.login();
		});
		// spawn new sticky note
		$("#add-note").click(function(event) {
			utils.spawnNewStickyNote("dz"+vars.noteDefaults.column, true, vars.noteDefaults, "new");
		});
		// GO-TO home
		$("#home").click(function(event) {
			window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
		});
		// GO-TO archive
		$("#archive").click(function(event) {
			window.location.href = window.location.protocol+"//"+window.location.hostname+window.location.pathname+"?archive";
		});
		// delete sticky note & associated list in users list of notes
		$('body').on('click', '.sticky-delete', function() {
			var set = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")).set(
				null,
				function(error) {log.output(3, error);});
			var set = _self._users.child(global.core.getUser().uid+'/notes/'+$(this).closest(".sticky-note").attr("data-note-key")).set(
				null,
				function(error) {log.output(3, error);});
			$(this).closest(".sticky-note").toggleClass('delete');
			setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
		});
		// archive sticky note
		$('body').on('click', '.sticky-archive', function() {
			var update = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")).update(
				{
					archived: true,
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
			// update UI
			$(this).closest(".sticky-note").toggleClass('archive');
			setTimeout(function() {$(this).closest(".sticky-note").remove();}, 600);
			vars.archivedCount++;
			$("#archive .mdl-badge").attr("data-badge", vars.archivedCount);
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
					utils.spawnEditableField(type, $(this).attr("id"), $(this).html(), $(this).attr("data-sticky-id"),$(this).attr("data-item-id"));
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

			var update = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".checkbox-item").find('.checkbox-content').attr("data-item-key")).update(
				{
					checked: isChecked,
					changed_at: firebase.database.ServerValue.TIMESTAMP,
				},
				function(error) {log.output(0, error);});
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
				var set = _self._notes.child($(this).closest(".sticky-note").attr("data-note-key")+"/items/"+$(this).closest(".can-edit").attr("data-item-key")).set(
					null,
					function(error) {log.output(3, error);});
				if ($(this).closest(".can-edit").hasClass('checkbox-content')) {
					$(this).closest(".checkbox-item").parent().remove();
				} else {
					$(this).closest(".can-edit").remove();
				}
			}
		});

		/* ------------------------------------------
		register dialogs
		------------------------------------------- */
		var dialogAddColl = document.getElementById('add-collaborator');
		if (!dialogAddColl.showModal) {
			dialogPolyfill.registerDialog(dialogAddColl);
		}
		$('body').on('click', '.sticky-add-collaborator', function() {
			dialogAddColl.showModal();
		});
		$('body').on('click', '#add-collaborator .close', function() {
			dialogAddColl.close();
		});
	}

	/*
	* AUTHENTIFICATION
	*/
	_self.login = function() {
		var auth = firebase.auth();
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.email');
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

		auth.signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var authData = result.user;
			_self._users.child(authData.uid).once("value", function(snapshot) {
				if (snapshot.val() !== null) { // update user TIMESTAMP
					_self._users.child(authData.uid).update(
						{
							last_login_at: firebase.database.ServerValue.TIMESTAMP
						},
						function(error) {log.output(2, error);});
				} else { // set up new user
					var setUser = _self._users.child(authData.uid).set(
						{
							name: authData.displayName,
							email: authData.email,
							picture: authData.photoURL,
							created_at: firebase.database.ServerValue.TIMESTAMP,
							last_login_at: firebase.database.ServerValue.TIMESTAMP
						},
						function(error) {log.output(2, error);});
					// set up entry into user_index (used for looking up users)
					var setUserIndex = _self._user_index.child(sticky.utils.emailToKey(authData.email)).set(
						{
							name: authData.displayName,
							uid: authData.uid,
							picture: authData.photoURL,
							created_at: firebase.database.ServerValue.TIMESTAMP,
						},
						function(error) {log.output(2, error);});
				}
			});
			global.model.user.userFromData(authData.uid, authData.displayName, authData.photoURL, authData.google.email); // save local instance of user
			// display interface
			$("#login").hide();
			global.utils.displayProfile();
			global.utils.loadSavedState(global.utils.getPage()); // load data

			log.output(4, error);
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
		});
	};

	_self.logout = function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// An error happened.
		});
	};

	_self.getUser = function() {
		if (global.model.user.uid == null) { // set local instance
			var user = firebase.auth().currentUser;
			global.model.user.userFromData(user.uid, user.displayName, user.photoURL, user.email);
		}
		return global.model.user;
	};

	return _self;
})(sticky);
;var loggedUser;
/* *******************************************
INITIATE STICKY NOTES APP
******************************************* */
$(function() {
	// INIT Sticky APP & WAIT TO CHECK FOR USER AUTH
	sticky.core.constr();
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			sticky.utils.displayProfile();
			sticky.utils.loadSavedState(sticky.utils.getPage());
		} else {
			$("#login").show();
		}
	});
});
