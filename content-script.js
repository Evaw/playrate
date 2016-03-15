/*global chrome:false, document:false*/
function setRate(rate) {
  'use strict';
  var v = document.getElementsByTagName('video'),
    i;
  for (i = v.length - 1; i >= 0; i -= 1) {
    v[i].playbackRate = rate;
  }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  'use strict';
  if (request.op === 'setRate') {
    setRate(request.rate);
  }
});