/*global chrome:false, document:false, console:false*/
(function (window) {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    console.log('loaded')
    var rangeInput = document.getElementById('range'),
      valElt = document.getElementById('val'),
      debounced;
    function setRate (rate) {
      chrome.tabs.getSelected(null, function (tab) {
        valElt.textContent = rangeInput.value;
        chrome.tabs.sendMessage(tab.id,
          {
            op: 'setRate',
            rate: rate
          });
      });
    }
    function setToInput () {
      setRate(parseFloat(rangeInput.value));
    }
    function debounce (fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
    debounced = debounce(setToInput);
    rangeInput.addEventListener('change', setToInput);
    rangeInput.addEventListener('mouseout', function () {
      document.removeEventListener(debounced);
    });
    rangeInput.addEventListener('mousedown', function () {
      rangeInput.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', debounced);
      });
      document.addEventListener('mousemove', debounced);
    });

  });
}(this));
