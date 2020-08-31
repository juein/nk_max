'use strict';

//document.write('js test');
//document.write('<br>');

var target = { a: 1, b: 2 };
var source = { b: 4, c: 5 };

var returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

//document.write(returnedTarget.a);


// ES6
var arr = [1, 2, 3];
var pow = arr.map(function (x) {
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]

document.querySelector('.content__area--index').innerHTML = '<span>test</span>';