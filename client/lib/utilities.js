Array.prototype.getIndexBy = function(name, value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][name] == value) {
      return i;
    }
  }
  return -1;
}

Array.prototype.getIndexByKey = function(name) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][name]) {
      return i;
    }
  }
  return -1;
}

Array.prototype.getLastIndexByKey = function(name) {
  var index = -1;

  for (var i = 0; i < this.length; i++) {
    if (this[i][name]) {
      index = i;
    }
  }

  return index;
}
