// 스크립트 시작

//global
//const pageIntroAction;

// onload
window.onload = function(){
    //console.log('onload');
}
// onload



window.addEventListener('DOMContentLoaded', function(){ 

    let pageNum = 0;
    let isAnimating = false;
    let verticallSwiper;
    

    //리로드시 최상단으로
    window.onbeforeunload = function () {
        //window.scrollTo(0, 0);
        //console.clear(); 
    }

    const ctrl = new ScrollMagic.Controller();

    //swiper 제어
    //verticallSwiper.slideTo(0, 500);
    //verticallSwiper.slideNext();
    //goToSlide(0);

    //content swiper
    verticallSwiper = new Swiper('.content__container', {
        on: {
          slideChangeTransitionStart: function(){
            var idx = this.realIndex;
            console.log('vertical idx : ' + idx);
          },
        },
        direction: 'vertical',
        autoplay: false,
        //keyboard : true,
        //allowTouchMove : false,
        //mousewheelControl: true,
        //mousewheel: {
        //  invert: false,
        //},
        speed: 800,
    });


    //page controll
    function goToNextSlide(){
        if( pageNum >= 15) return false; //총 페이지 수를 넘어가면 false처리

        if(!isAnimating){
            isAnimating = true;
            pageNum += 1;

            console.log('page = ' + pageNum);

            
            verticallSwiper.slideTo(pageNum, 500);
            //verticallSwiper.slideNext();

            setTimeout(() => {
                onSlideChangeEnd();
            }, 1000)
            

            
            //switch
            /*
            switch(pageNum){
                case 0:
                    break;
                case 1:
                    console.log('page = ' + pageNum);
                    setTimeout(() => {
                        onSlideChangeEnd();
                    }, 1000);
                    break;
                case 2:
                    console.log('page = ' + pageNum);
                    setTimeout(() => {
                        onSlideChangeEnd();
                    }, 1000);
                    break;
                default:
                    //onSlideChangeEnd();
                    break;
            }
            */
            
        }
    };

    
    function goToPrevSlide(){
        if(pageNum <= 0) return false; //index: 0 기준 false

        if(!isAnimating){
            isAnimating = true;
            pageNum -= 1;

            console.log('page = ' + pageNum);

            //verticallSwiper.slidePrev();
            verticallSwiper.slideTo(pageNum, 500);

            setTimeout(() => {
                onSlideChangeEnd();
            }, 1000)

        }
    };
    

    function onSlideChangeEnd(){
        console.log('isAnimating == false');
        isAnimating = false;
    }

    //Math.sign 함수 대체
    //function sgn(x) {
    //    return (x > 0) - (x < 0);
    //}

    // scroll controll
    window.addEventListener("wheel", function (event) {
        //let delta = sgn(event.deltaY);
        let delta = Math.sign(event.deltaY);
        
        if(delta > 0){ //down
        goToNextSlide();
        }else { //up
            goToPrevSlide();
        }
    });


    // key controll
    const keyCodes = {
        UP  : 38,
        DOWN: 40
    }
    window.addEventListener("keydown", function (event) {
        let PRESSED_KEY = event.keyCode;
        if(PRESSED_KEY == keyCodes.DOWN){
            goToNextSlide();
            event.preventDefault();
        }else if(PRESSED_KEY == keyCodes.UP){
            goToPrevSlide();
            event.preventDefault();
        }
    });

});

