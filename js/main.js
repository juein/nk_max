'use strict';

// 스크립트 시작

//global
//const pageIntroAction;

// onload
window.onload = function () {}
//console.log('onload');

// onload


;window.addEventListener('DOMContentLoaded', function () {

    //리로드시 최상단으로
    window.onbeforeunload = function () {
        //window.scrollTo(0, 0);
        //console.clear(); 
    };

    var ctrl = new ScrollMagic.Controller();

    var target = { a: 1, b: 2 };
    var source = { b: 4, c: 5 };

    var returnedTarget = Object.assign(target, source);

    console.log(target);
    // expected output: Object { a: 1, b: 4, c: 5 }

    console.log(returnedTarget);
    // expected output: Object { a: 1, b: 4, c: 5 } 

    // ES6
    var arr = [1, 2, 3];
    var pow = arr.map(function (x) {
        return x * x;
    });

    console.log(pow); // [ 1, 4, 9 ]


    //document.querySelector('.test').innerHTML = 'test123';

});