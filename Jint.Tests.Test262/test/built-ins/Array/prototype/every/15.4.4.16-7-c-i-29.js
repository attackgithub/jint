// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.every
es5id: 15.4.4.16-7-c-i-29
description: >
    Array.prototype.every - element changed by getter on previous
    iterations is observed on an Array-like object
---*/

function callbackfn(val, idx, obj) {
  return val > 10;
}

var preIterVisible = false;
var obj = {
  length: 2
};

Object.defineProperty(obj, "0", {
  get: function() {
    preIterVisible = true;
    return 11;
  },
  configurable: true
});

Object.defineProperty(obj, "1", {
  get: function() {
    if (preIterVisible) {
      return 9;
    } else {
      return 13;
    }
  },
  configurable: true
});

assert.sameValue(Array.prototype.every.call(obj, callbackfn), false, 'Array.prototype.every.call(obj, callbackfn)');
