(function(ionic) {
'use strict';
  /**
   * An ActionSheet is the slide up menu popularized on iOS.
   *
   * You see it all over iOS apps, where it offers a set of options 
   * triggered after an action.
   */
  ionic.views.Popup = ionic.views.View.inherit({
    initialize: function(opts) {
      var _this = this;

      this.el = opts.el;

      this.maxWidth = opts.maxWidth || 250;
    },

    _position: function() {
      var lb = this.el.querySelector('.popup');

      if(!lb) { return; }

      var width = Math.min(this.maxWidth, Math.max(window.outerWidth - 40, lb.offsetWidth));

      lb.style.width = width + 'px';

      lb.style.marginLeft = (-lb.offsetWidth) / 2 + 'px';
      lb.style.marginTop = (-lb.offsetHeight) / 2 + 'px';

    },
    setTitle: function(title) {
      var titleEl = this.el.querySelector('.popup-title');
      if(titleEl) {
        titleEl.innerHTML = title;
      }
    },
    setMessage: function(message) {
      var bodyEl = this.el.querySelector('.popup-body');
      if(bodyEl) {
        bodyEl.innerHTML = message;
      }
    },
    setButtons: function(buttons) {
      var buttonsEl = this.el.querySelector('.popup-buttons');
      if(!buttonsEl || !buttons) { return; }

      var buttonEl, i, button;

      for(i = 0; i < buttons.length; i++) {
        button = buttons[i];
        buttonEl = document.createElement('button');
        buttonEl.classList.add('button');
        buttonEl.classList.add('button-clear');
        buttonEl.classList.add('col');
        buttonEl.innerHTML = button.text;
        buttonEl.classList.add(button.type || 'button-positive');
        buttonsEl.appendChild(buttonEl);
      }
    },
    show: function(opts) {
      var _this = this;

      window.rAF(function() {
        _this.setMessage(opts.message);
        _this.setTitle(opts.title);
        _this.setButtons(opts.buttons);
        _this._position();
        _this.el.classList.add('active');
      });
    },
    hide: function() {
      // Force a reflow so the animation will actually run
      this.el.offsetWidth;

      this.el.classList.remove('active');
    }
  });

})(ionic);
