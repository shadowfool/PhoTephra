// take an array and return arr selecting only =limit # of elements
module.exports.minimizeAndRandArr = function (arr, targetLength) {
  var totalLen = arr.length;
  var di = totalLen/targetLength;
  var results = [];

  if (totalLen <= targetLength) {
    return arr;
  } else {
    for (var i = 0; i < totalLen; i += di) {
      var ind = Math.floor(i + Math.floor(Math.random()*di));
      console.log(ind);
      results.push(arr[ind]);
    }
  }
  return results;
}