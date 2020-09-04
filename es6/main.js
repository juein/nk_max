// 스크립트 시작

//global
//const pageIntroAction;

// onload
//window.onload = function(){
//    console.log('onload');
//}

// onload

window.addEventListener('DOMContentLoaded', () => { 

    let pageNum = 0, 
    isAnimating = false, 
    isListAnimating = false, 
    naviFlag = false, 
    hoverItem, 
    listActiveNum = 0,
    quizAnimation = false,
    quizNum = 1;

    //리로드시 최상단으로
    //window.onbeforeunload = function () {
    //    //window.scrollTo(0, 0);
    //    //console.clear(); 
    //}

    const ctrl = new ScrollMagic.Controller();

    // default setting
    const defaultSet = () => {
        gsap.set('.assassin-info__visual--list .grayscale', {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)'});
        gsap.set('.assassin-info__visual--character-villain', {backgroundSize: '200%', backgroundPosition: 'center 100%'});
    }

    // assassin-info
    $(".assassin-info .grayscale").hover(function(){
        hoverItem = $(this).attr('class').replace('grayscale', '');
        gsap.to( '.'+hoverItem, 1, {'-webkit-filter':'grayscale(0%)', filter: 'grayscale(0%)'} );
    }, function(){
        if(listActiveNum == 0){
            gsap.to( '.'+hoverItem, 1, {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)'} );
        }
    });

    const assassinContent = {
        hideContent(){
            //컨텐츠 display none
            gsap.to('.assassin-info__visual--explain--origin', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--explain--talent', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--explain--hero', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--explain--villain', 0.3, {opacity: 0});
        },
        origin(){
            console.log('origin content!!');
            gsap.to('.assassin-info__visual--explain--origin', 1, {opacity: 1});
            //$('.assassin-info__visual--explain--origin')
        },
        talent(){
            console.log('talent content!!');
        },
        hero(){
            console.log('hero content!!');
        },
        villain(){
            console.log('villain content!!');
        },
    }
    
    const visualList = {
        origin(){
            const listOriginAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--list-origin', 1.2, {y: "10%"}, 0.7)
            //.to('.assassin-info__visual--list-origin .assasin_character', 1.2, {y: "10%"}, 0.7)
            .to('.assassin-info__visual--bg-origin', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-hero', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#F2F2F2'}, 1)
            
            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            listOriginAction.restart();
            assassinContent.origin();
        },
        talent(){
            const listTalentAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--bg-talent', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1.2, {x: "-80%"}, 0.7)
            .to('.assassin-info__visual--list-hero', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#ddd'}, 1);
    
            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            listTalentAction.restart();
        },
        hero(){
            const listHeroAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--bg-hero', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "-201%"}, 0)
            .to('.assassin-info__visual--list-hero', 1.2, {x: "90%", y: "20%"}, 0.7)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#ddd'}, 1);
    
            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            listHeroAction.restart();
        },
        villain(){
            const listVillainAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--bg-villain', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "-201%"}, 0)
            .to('.assassin-info__visual--list-hero', 1, {x: "-301%"}, 0)
            //.to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#ddd'}, 1)
            .to('.assassin-info__visual--character-villain', 1, {backgroundSize: '140%', backgroundPosition: 'center 10%'}, 1)
    
            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            listVillainAction.restart();
        },
    }

    const navigationShow = (flag) => {
        if(flag == true){
            gsap.to('.assassin-info__visual--navigation', 1, {opacity: 1, pointerEvents: "visible", delay: 1.2});
        }else {
            gsap.to('.assassin-info__visual--navigation', 0.5, {opacity: 0, pointerEvents: "none"});
        }
    }

    const navi = {
        home(){
            const naviHomeAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--character-villain', 0.5, {backgroundSize: '200%', backgroundPosition: 'center 100%'}, 0)
            .set('.assasin_bg', {opacity: 1}, 0.4)
            .set('.assassin-info__visual--list-villain', {x: '101%'}, 0)
            
            .to('.assassin-info__visual', 1, {background: '#d00116'}, 0)
            .to('.assassin-info__visual--list li', 0.5, {x: 0, y: 0, opacity: 1, filter: 'grayscale(100%)'}, 0.2);
    
            $('.assassin-info__visual--list li').removeClass('active');
            listActiveNum = 0;
            naviHomeAction.restart();
            assassinContent.hideContent();
    
            setTimeout(() => {
                isListAnimating = false;
            }, 1200);
    
            if(naviFlag){
                naviFlag = false;
                navigationShow(naviFlag); //네비 비활성화
            }
        },
        origin(){
            const naviOriginAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-origin', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-origin', {opacity: 0, x: 0, y: 0}, 0.2)
            .to('.assassin-info__visual--list-origin', 0.8, {y: "10%", opacity: 1}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-origin').addClass('active');
                listActiveNum = 1;
                isListAnimating = false;
            }, 1200);
    
            naviOriginAction.restart();
            assassinContent.origin();
        },
        talent(){
            const naviTalentAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-talent', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-talent', {opacity: 0, x: "-50%"}, 0.2)
            .to('.assassin-info__visual--list-talent', 0.8, {x: "-80%", opacity: 1}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-talent').addClass('active');
                listActiveNum = 2;
                isListAnimating = false;
            }, 1200);
    
            naviTalentAction.restart();
        },
        hero(){
            const naviHeroAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-hero', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-hero', {opacity: 0, x: "70%", y: "10%"}, 0.2)
            .to('.assassin-info__visual--list-hero', 0.8, {x: "90%", y: "20%", opacity: 1}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-hero').addClass('active');
                listActiveNum = 3;
                isListAnimating = false;
            }, 1200);
    
            naviHeroAction.restart();
        },
        villain(){
            const naviVillainAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-villain', {opacity: 0}, 0)
            .set('.assassin-info__visual--character-villain',  {backgroundSize: '140%', backgroundPosition: 'center 10%'}, 0)
            .set('.assassin-info__visual--list-villain', {opacity: 0, x: "0", y: "0"}, 0.2)
            .to('.assassin-info__visual--list-villain', 0.8, {opacity: 1}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-villain').addClass('active');
                listActiveNum = 4;
                isListAnimating = false;
            }, 1200);
    
            naviVillainAction.restart();
        }
    }

    const assassinList = document.querySelector('.assassin-info__visual--list');
    assassinList.addEventListener("click", assassinListClick);
    function assassinListClick(e){
        let listValue = Number(e.target.getAttribute('data-value'));
        //console.log(e.target);
        if(!naviFlag){
            naviFlag = true;
            navigationShow(naviFlag);
        }
        switch ( listValue ){
            case 1:
                visualList.origin();
                break;
            case 2:
                visualList.talent();
                break;
            case 3:
                visualList.hero();
                break;
            case 4:
                visualList.villain();
                break;
        }
    };

    const assassinNavigation = document.querySelector('.assassin-info__visual--navigation');
    assassinNavigation.addEventListener("click", assassinNaviClick);

    function assassinNaviClick(e){
        let naviValue = Number(e.target.getAttribute('data-value'));

        if(listActiveNum == naviValue) return false;
        if(!isListAnimating){
            isListAnimating = true;
            switch ( naviValue ){
                case 0:
                    navi.home();
                    break;
                case 1:
                    navi.origin();
                    break;
                case 2:
                    navi.talent();
                    break;
                case 3:
                    navi.hero();
                    break;
                case 4:
                    navi.villain();
                    break;
            }
        }

    }
    // assassin-info

    
    // quiz-area
    const quizSecChange = () => {
        setTimeout(() => {
            console.log('quizNum222 = ' + quizNum);
            $('.quiz-area__inner--question-sec.active').addClass('before').removeClass('active');
            quizNum++;
        }, 500);

        setTimeout(() => {
            $('.quiz-area__inner--question-sec:nth-of-type('+quizNum+')').addClass('active');
            $('.quiz-area__inner--progress .mark .radius:nth-of-type('+quizNum+')').addClass('active');
        }, 600);
    }

    const quizFormScroll = (h) => {
        gsap.to("#quiz-area__form", 1, {y: h, delay: 0.5});
    }
    const quizProgress = (xs) => {
        gsap.to(".quiz-area__inner--progress .line .active-line", 1, {x : xs});
    }

    $('.quiz-area__inner--result').click( () => {
        let quizResult = $('#quiz-area__form').serializeArray();

        gsap.to('.quiz-area__inner--headline', 0.5, {opacity: 0});
        gsap.to('.quiz-area__inner--result', 0.5, {opacity: 0});
        gsap.to('.quiz-area__inner--progress', 0.5, {opacity: 0});
        gsap.to('.quiz-area__inner--question', 1, {height: 620, marginTop: -110});
        gsap.to('#quiz-area__form', 1, {y: 0});
        gsap.to('.explain__gloup', 1, {opacity: 1, delay: 0.8, pointerEvents: 'visible'});
    });

    //$('.explainBtn').click( () => {
    //    console.log( $(this).attr('class') ); return false;
    //    let clickBtn = $(this).attr('class').replace('quiz-area__inner--explainBtn', '');
    //    console.log(clickBtn);
    //});

    
    const explainBtn = document.querySelector('.quiz-area__inner--explainBtn');
    explainBtn.addEventListener("click", explainBtnClick);
    function explainBtnClick(e){
        let clickBtn = Number(e.target.getAttribute('data-value'));
        console.log(e.target);
        console.log(clickBtn);
    }
    


    $('.quix-form__button label').click( () => {
        console.log('quizNum = ' + quizNum);
        if(!quizAnimation){
            quizAnimation = true;

            quizSecChange();

            switch(quizNum){
                case 1:
                    quizProgress(-600);
                    break;
                case 2:
                    quizFormScroll(-64);
                    quizProgress(-530);
                    break;
                case 3:
                    quizFormScroll(-124);
                    quizProgress(-450);
                    break;
                case 4:
                    quizFormScroll(-184);
                    quizProgress(-380);
                    break;
                case 5:
                    quizFormScroll(-246);
                    quizProgress(-300);
                    break;
                case 6:
                    quizFormScroll(-308);
                    quizProgress(-230);
                    break;
                case 7:
                    quizFormScroll(-368);
                    quizProgress(-155);
                    break;
                case 8:
                    quizFormScroll(-430);
                    quizProgress(-85);
                    break;
                case 9:
                    quizProgress(-5);
                    break;
                case 10:
                    gsap.to('.quiz-area__inner--result', 0.8, {opacity: 1, pointerEvents: 'visible', delay: 0.5});
                    break;
            }

            setTimeout(() => {
                quizAnimation = false;
            }, 1200); //모션 끝나는 타이밍에
        }
        
        
    } );
    // quiz-area


    //content swiper
    const verticalPageSwapNext = {
        visual() {
            gsap.to('.quiz-area', 1.2, {y: 0, ease: "power4.out"});
        },
        quiz(){
            gsap.to('.immunity-relation', 1.2, {y: 0, ease: "power4.out"});
        },
        immunity(){
            gsap.to('.natural-killer', 1.2, {y: 0, ease: "power4.out"});
        },
        natural(){
            gsap.to('.assassin-info', 1.2, {y: 0, ease: "power4.out"});
        },
        assassin(){
            gsap.to('.epilogue', 1.2, {y: 0, ease: "power4.out"});
        },
        epilogue(){
            gsap.to('.outro', 1.2, {y: 0, ease: "power4.out"});
        },
        outro(){
            
        }
    }

    const verticalPageSwapPrev = {
        quiz(){
            gsap.to('.quiz-area', 1.2, {y: "100vh", ease: "power4.out"});
        },
        immunity(){
            gsap.to('.immunity-relation', 1.2, {y: "100vh", ease: "power4.out"});
        },
        natural(){
            gsap.to('.natural-killer', 1.2, {y: "100vh", ease: "power4.out"});
        },
        assassin(){
            gsap.to('.assassin-info', 1.2, {y: "100vh", ease: "power4.out"});
        },
        epilogue(){
            gsap.to('.epilogue', 1.2, {y: "100vh", ease: "power4.out"});
        },
        outro(){
            gsap.to('.outro', 1.2, {y: "100vh", ease: "power4.out"});
        }
    }


    const horizontalEvent = (htEvent) => {
        console.log('horizontalEvent');
        if(htEvent == 1){
            gsap.to('.natural-killer__type', 1, {opacity: 1});
            gsap.to('.natural-killer__explain', 0.5, {opacity: 0});
        }else {
            gsap.to('.natural-killer__type', 0.5, {opacity: 0});
            gsap.to('.natural-killer__explain', 1, {opacity: 1});
        }
        setTimeout(() => {
            onSlideChangeEnd();
        }, 1200)
    }

    //page controll
    const goToNextSlide = () => {
        if(pageNum >= 7) return false; //index: 0 기준 false 처리
        
        if(!isAnimating){
            isAnimating = true;
            pageNum +=1;

            console.log('next page = ' + pageNum);

            switch(pageNum){
                case 0:
                    break;
                case 1:
                    verticalPageSwapNext.visual();
                    break;
                case 2:
                    verticalPageSwapNext.quiz();
                    break;
                case 3:
                    verticalPageSwapNext.immunity();
                    break;
                case 4:
                    horizontalEvent(1);
                    break;
                case 5:
                    verticalPageSwapNext.natural();
                    break;
                case 6:
                    verticalPageSwapNext.assassin();
                    break;
                case 7:
                    verticalPageSwapNext.epilogue();
                    break;
            }

            setTimeout(() => {
                onSlideChangeEnd();
            }, 1200)
        }
    }
    const goToPrevSlide = () => {
        if(pageNum <= 0) return false; //총 페이지 수를 넘어가면 false처리
        
        if(!isAnimating){
            isAnimating = true;
            pageNum -=1;

            console.log('prev page = ' + pageNum);

            switch(pageNum){
                case 0:
                    verticalPageSwapPrev.quiz();
                    break;
                case 1:
                    verticalPageSwapPrev.immunity();
                    break;
                case 2:
                    verticalPageSwapPrev.natural();
                    break;
                case 3:
                    horizontalEvent(2);
                    break;
                case 4:
                    verticalPageSwapPrev.assassin();
                    break;
                case 5:
                    verticalPageSwapPrev.epilogue();
                    break;
                case 6:
                    verticalPageSwapPrev.outro();
                    break;
            }

            setTimeout(() => {
                onSlideChangeEnd();
            }, 1200)
        }
        
    }
    const onSlideChangeEnd = () => {
        console.log('isAnimating == false');
        isAnimating = false;
    }

    // scroll controll
    window.addEventListener("wheel", (event) => {
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
    window.addEventListener("keydown", (event) => {
        let PRESSED_KEY = event.keyCode;
        if(PRESSED_KEY == keyCodes.DOWN){
            goToNextSlide();
            event.preventDefault();
        }else if(PRESSED_KEY == keyCodes.UP){
            goToPrevSlide();
            event.preventDefault();
        }
    });

    defaultSet(); // 기본 셋팅 실행

});

