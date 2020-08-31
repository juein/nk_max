$(function() {
    //공유 설정
    var snsMore = $("#snsMore");
    $(".sns-share-box .sns-more").on("click", function() {
        snsMore.toggleClass("open");
        return false;
    });

    // IE 감지
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    }

    if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
        try{
            document.execCommand("BackgroundImageCache", false, true);
        } catch(err) {}
    }

    if ( detectIE() ){
        $('body').addClass('ie ie'+detectIE());
    }

    // Lazyload Default 
    /*
    $('.lazy').lazyload({
        effect : 'fadeIn'
    });
    */

    // Defalut
    var scrollTop, roofHeight, winHeight;
    var roofHeight = $('#roof').outerHeight();
    var winHeight = $(window).height();

    function dateCheck() {
        Date.prototype.yyyymmdd = function() {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = this.getDate().toString();
            var hh  = this.getHours().toString(); // Hours(24)
            var min = this.getMinutes().toString();
            var sec = this.getSeconds().toString();
            return yyyy + (mm[1]?mm:'0'+mm[0]) + (dd[1]?dd:'0'+dd[0]); // padding
        };
        var date = new Date();
        var currentDate = date.yyyymmdd();

        // 날짜체크
        // if( currentDate >= 20170227 ) {
        //     $('#part').show();
        // } else {
        //     $('#part').hide();
        // }
    }
    dateCheck();
});




// 스크립트 시작

//global
var pageIntroAction;

// onload
$(window).load(function(){
    pageIntroAction.play();
});
// onload

$(function() {
    //리로드시 최상단으로
    window.onbeforeunload = function () {
        //window.scrollTo(0, 0);
        //console.clear(); 
    }

    var ctrl = new ScrollMagic.Controller();

    // page__intro
    //TweenMax.set(".page__intro--box", {opacity: 0});
    gsap.set(".page__intro--box", {opacity: 0});

    pageIntroAction = new TimelineLite({paused: true})
    .to(".page__intro--box", 0.5, {opacity: 1}, 0.5)

    var part1_bridgeTextScene = new ScrollMagic.Scene({
        triggerElement: ".page__intro",
        triggerHook: 0.6
    }).setTween(pageIntroAction).addTo(ctrl);



    
});