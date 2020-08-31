$(function() {
    /* ######################################################################## */
        //공유 설정
        var snsMore = $("#snsMore");
        $(".forehead .btn-sns-more").on("click",function() {
            snsMore.toggleClass('open');
            return false;
        });
        $("#snsMore .close-modal").on("click",function() {
            snsMore.removeClass('open');
            popupWechat.removeClass("open");
            return false;
        });
    
        var shareUrl = $("meta[property='og:url']").attr("content");
        var popupWechat = $("#popup_wechat");
        $("#snsMore .sns-wc").on("click", function() {
            popupWechat.addClass("open");
            var getWidth =  $("#qrcode").width();
            $("#qrcode").empty().qrcode({width:getWidth,height:getWidth,text:shareUrl});
            return false;
        });
    /* ######################################################################## */
    
        // Lazyload Default
        //$('.lazy').lazyload({effect:'fadeIn'});
    
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
    
            // 날짜 체크
            // if( currentDate >= 20170227 ) {
            //     $('#part').show();
            // } else {
            //     $('#part').hide();
            // }
        }
        dateCheck();
    });
    
    
    /*
        스크립트 시작
    */
    
//global
var introAction;

// onload
$(window).load(function(){
    //introAction.play();
}); 
// onload

$(function() {

    //리로드시 최상단으로
    window.onbeforeunload = function () {
        //window.scrollTo(0, 0);
        console.clear();
    }

    var ctrl = new ScrollMagic.Controller();



});
