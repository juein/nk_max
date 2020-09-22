
// onload
window.onload = function(){
    const pageIntroAction = new TimelineMax({paused:true})
    .to('.visual-intro__type-text', 0.8, {opacity: 1}, 0.2)
    .to('.visual-intro__illust', 0.6, {opacity: 1, x: 0, y: 0}, 0.4)
    .to('.visual-intro__type-text.before', 0.8, {opacity: 0}, 0.8)
    .to('.visual-intro__area--headline-first', 0.6, {opacity: 1, x: 0}, 0.8)
    .to('.visual-intro__area--headline-last', 0.6, {opacity: 1, x: 0}, 0.8)
    pageIntroAction.play();
}
// onload

window.addEventListener('DOMContentLoaded', () => { 

    let pageNum = 0, 
    isAnimating = false, 
    isListAnimating = false, 
    naviFlag = false, 
    hoverItem, 
    hoverAction,
    listActiveNum = 0,
    quizStep = 1,
    hoveHeroFlag = false;

    // default setting
    const defaultSet = () => {
        gsap.set('.assassin-info__visual--list .grayscale', {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)'});
        gsap.set('.quiz-area__inner--question-step1', {opacity: 1, pointerEvents:'visible'});
    }

    // quiz-area
    $('.start-btn').click( () => {
        gsap.to('.quiz-area__inner--start', 0.6, {opacity: 0, pointerEvents: 'none'});
        gsap.to('.start-btn', 0.6, {opacity: 0, pointerEvents: 'none'});
        gsap.to('.quiz-area__inner--question', 0.5, {opacity: 1, pointerEvents: 'visible', delay: 0.4});
    })

    for( let $i = 1; $i <= 10; $i++ ){
        $('input:radio[name=q'+$i+']').click( () => { 
            if($i == 10){
                gsap.to('.quiz__btn--finish', 0.5, {opacity: 1, pointerEvents: 'visible'});
            }else {
                gsap.to('.quiz__btn--next', 0.5, {opacity: 1, pointerEvents: 'visible'});
            }
        });
    }

   $('.quiz__btn--next').click( () => {
        $('.this-quoetion').removeClass('thisActive');
        gsap.to('.quiz-area__inner--question-step'+quizStep, 0.5, {opacity: 0, pointerEvents:'none'});
        gsap.to('.quiz__btn--next', 0.5, {opacity: 0, pointerEvents: 'none'});
        quizStep += 1;
        gsap.to('.quiz-area__inner--question-step'+quizStep, 0.5, {opacity: 1, pointerEvents:'visible', delay: 0.4});
        $('.progress__box:nth-of-type('+quizStep+') .chk').addClass('active');
        $('.progress__box:nth-of-type('+quizStep+') .this-quoetion').addClass('thisActive');
   });

   $('.quiz__btn--finish').click( ()=>{
        let quizResult = $('#quiz-area__form').serializeArray();
        //정답이랑 내가 체크한 값 비교하기
        let quizScore = 0;
        const quizCorrectResult = [ 2, 1, 2, 2, 1, 2, 2, 2, 1, 2 ];
        for(let k = 0; k < quizCorrectResult.length; k++){
            if( quizCorrectResult[k] == Number(quizResult[k].value) ){
                quizScore += 1;
                //console.log((k + 1) +' = 정답 ');
                $('.explain__list-item.q'+( k + 1 )+' .answer-status--true').addClass('active');
            }else {
                //console.log((k + 1) +' = 틀림 ');
                $('.explain__list-item.q'+( k + 1 )+' .answer-status--false').addClass('active');
            }
            if( Number(quizResult[k].value) == 1 ){
                $('.explain__list-item.q'+( k + 1 )+' .select_true').addClass('active');
            }else {
                $('.explain__list-item.q'+( k + 1 )+' .select_false').addClass('active');
            }
        }
        //해설지 ox표기
        quizResultPage(quizScore);
   });

    const quizResultPage = (score) => {
        // score graph 표기
        for (let $j = 1; $j <= score; $j++){
            $('.number-graph path:nth-of-type('+$j+')').addClass('active');
        }
        $('.number-text-strong .sc-num').html( (score * 10) );
        $('.number-text-default .sc-num').html( score );
        // grade 표기
        let gradeTitle, gradeEtc;
        if( score == 0 ){
            gradeTitle = '당신은 면역 상식이 전혀 없습니다.';
            gradeEtc = '아직 면역에 대해 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        }else if( score <= 3 ){
            gradeTitle = '당신은 면역 상식 어린이 수준입니다.';
            gradeEtc = '아직 면역에 대해 잘 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        }else if( score <= 7 ){
            gradeTitle = '당신은 면역 상식은 학생수준 입니다.';
            gradeEtc = '어느 정도 더 관심을 기울인다면, <br>곧 면역 상식왕이 되겠습니다!';
        }else if( score <= 8 ){
            gradeTitle = '당신은 면역 상식 박사입니다.';
            gradeEtc = '혹시 면역학 공부를 따로 하셨나요? <br>면역 상식으론 따라 잡을 이가 없네요.';
        }
        $('.grade-title').html( gradeTitle );
        $('.grade-etc').html( gradeEtc );
        gsap.to('.quiz-area__inner--question', 0.5, {opacity: 0, pointerEvents: 'none'});
        gsap.to('.quiz-area__inner--result', 0.5, {opacity: 1, pointerEvents: 'visible'});
    }

    $('.quiz-explain-btn').click( () => {
        gsap.to('.quiz-area__inner', 0.5, {opacity: 0, pointerEvents: 'none'});
        gsap.to('.quiz-area__explain', 0.8, {opacity: 1, pointerEvents: 'visible'});
    });
    // quiz-area


    // immunity-relation
    MorphSVGPlugin.convertToPath("circle, rect, polygon");

    const immunityMorph = new TimelineLite({paused: true, repeat: -1})
    .set('.cell-area .scene_one .cell-1.num6', {scale: 0}, 0)
    .set('.cell-area .scene_two i', {scale: 0}, 0)
    .set(".bar-graph-active", {width: '10%'}, 0)
    .set(".cell-bar-graph-pointer", {left: 50}, 0)

    .to(".bar-graph-active", 4.5, {width: '94%', ease: 'none'}, 0)
    .to(".cell-bar-graph-pointer", 4.5, {left: 570, ease: 'none'}, 0)
    .to(".bar-graph-active", 4.5, {width: '10%', ease: 'none'}, 4.7)
    .to(".cell-bar-graph-pointer", 4.5, {left: 50, ease: 'none'}, 4.7)

    .to('.cell-area .scene_one .cancer.num21', 0.5, {scale: 0, ease: 'none'}, 0.1)
    .to('.cell-area .scene_two .cell-2.num5', 0.7, {scale: 1, ease: 'none'}, 0.2)
    .to('.cell-area .scene_one .cancer.num10', 0.5, {scale: 0, ease: 'none'}, 0.2)
    .to('.cell-area .scene_two .cell-1.num9', 0.7, {scale: 1, ease: 'none'}, 0.3)
    .to('.cell-area .scene_two .cell-1.num10', 0.4, {scale: 1, ease: 'none'}, 0.4)
    .to('.cell-area .scene_one .cancer.num15', 0.5, {scale: 0, ease: 'none'}, 0.5)

    .to('.cell-area .scene_two .cell-1.num19', 0.8, {scale: 1, ease: 'none'}, 0.6)
    .to('.cell-area .scene_two .cell-1.num20', 0.4, {scale: 1, ease: 'none'}, 0.7)
    .to('.cell-area .scene_one .cancer.num15', 0.5, {scale: 0, ease: 'none'}, 0.8)
    .to('.cell-area .scene_one .cancer.num3', 0.5, {scale: 0, ease: 'none'}, 0.8)
    .to('.cell-area .scene_two .cell-1.num5', 0.6, {scale: 1, ease: 'none'}, 0.9)
    .to('.cell-area .scene_one .cancer.num8', 0.5, {scale: 0, ease: 'none'}, 1)

    .to('.cell-area .scene_one .cancer.num6', 0.5, {scale: 0, ease: 'none'}, 1)
    .to('.cell-area .scene_one .cell-2.num1', 0.7, {scale: 0, ease: 'none'}, 1.1)
    .to('.cell-area .scene_two .cell-1.num8', 0.6, {scale: 1, ease: 'none'}, 1.2)
    .to('.cell-area .scene_two .cell-1.num7', 0.6, {scale: 1, ease: 'none'}, 1.2)
    .to('.cell-area .scene_one .cancer.num19', 0.5, {scale: 0.6, ease: 'none'}, 1.3)
    .to('.cell-area .scene_two .cell-1.num22', 0.6, {scale: 1, ease: 'none'}, 1.4)
    .to('.cell-area .scene_one .cancer.num24', 0.8, {scale: 0, ease: 'none'}, 1.4)
    .to('.cell-area .scene_one .cell-2.num2', 0.5, {scale: 0, ease: 'none'}, 1.5)
    .to('.cell-area .scene_one .cancer.num9', 0.7, {scale: 0, ease: 'none'}, 1.5)

    .to('.cell-area .scene_two .cell-2.num6', 0.6, {scale: 1, ease: 'none'}, 1.6)
    .to('.cell-area .scene_two .cell-1.num24', 0.6, {scale: 1, ease: 'none'}, 1.6)
    .to('.cell-area .scene_one .cancer.num11', 0.7, {scale: 0.4, ease: 'none'}, 1.7)
    .to('.cell-area .scene_one .cancer.num1', 0.5, {scale: 0, ease: 'none'}, 1.7)
    .to('.cell-area .scene_one .cancer.num23', 0.9, {scale: 0, ease: 'none'}, 1.8)
    .to('.cell-area .scene_two .cell-1.num1', 0.6, {scale: 1, ease: 'none'}, 1.9)
    .to('.cell-area .scene_one .cancer.num2', 0.6, {scale: 0, ease: 'none'}, 1.9)
    .to('.cell-area .scene_one .cancer.num4', 0.5, {x: 40, ease: 'none'}, 2)

    .to('.cell-area .scene_one .cell-1.num1', 0.5, {scale: 0, ease: 'none'}, 2.1)
    .to('.cell-area .scene_one .cancer.num22', 0.5, {scale: 0, ease: 'none'}, 2.2)
    .to('.cell-area .scene_two .cell-1.num18', 0.7, {scale: 1, ease: 'none'}, 2.2)
    .to('.cell-area .scene_two .cell-1.num3', 0.5, {scale: 1, ease: 'none'}, 2.3)
    .to('.cell-area .scene_two .cell-1.num23', 0.7, {scale: 1, ease: 'none'}, 2.4)
    .to('.cell-area .scene_two .cell-1.num17', 0.5, {scale: 1, ease: 'none'}, 2.5)

    .to('.cell-area .scene_one .cancer.num16', 0.5, {scale: 0, ease: 'none'}, 2.6)
    .to('.cell-area .scene_one .cancer.num5', 0.6, {scale: 0, ease: 'none'}, 2.6)
    .to('.cell-area .scene_two .cell-1.num2', 0.7, {scale: 1, ease: 'none'}, 2.7)
    .to('.cell-area .scene_one .cell-1.num5', 0.5, {scale: 1.9, ease: 'none'}, 2.7)
    .to('.cell-area .scene_one .cancer.num7', 0.5, {scale: 0, ease: 'none'}, 2.7)
    .to('.cell-area .scene_one .cancer.num17', 0.5, {scale: 0, ease: 'none'}, 2.8)
    .to('.cell-area .scene_two .cell-1.num16', 0.5, {scale: 1, ease: 'none'}, 2.8)
    .to('.cell-area .scene_one .cancer.num13', 0.8, {scale: 0.6, ease: 'none'}, 2.9)
    .to('.cell-area .scene_two .cell-1.num11', 0.7, {scale: 1, ease: 'none'}, 2.9)
    .to('.cell-area .scene_one .cancer.num20', 0.5, {scale: 0, ease: 'none'}, 3)
    .to('.cell-area .scene_one .cancer.num12', 0.8, {scale: 0, ease: 'none'}, 3)
    .to('.cell-area .scene_two .cell-2.num4', 0.6, {scale: 1, ease: 'none'}, 3)

    .to('.cell-area .scene_two .cell-1.num15', 0.7, {scale: 1, ease: 'none'}, 3.1)
    .to('.cell-area .scene_two .cell-1.num4', 0.5, {scale: 1, ease: 'none'}, 3.1)
    .to('.cell-area .scene_one .cell-1.num2', 0.5, {scale: 0, ease: 'none'}, 3.2)
    .to('.cell-area .scene_one .cell-1.num3', 0.3, {scale: 1.8, x: -5, y: -18, ease: 'none'}, 3.2)
    .to('.cell-area .scene_one .cancer.num14', 0.5, {scale: 0, ease: 'none'}, 3.3)
    .to('.cell-area .scene_two .cell-2.num3', 0.4, {scale: 1, ease: 'none'}, 3.3)
    .to('.cell-area .scene_one .cell-1.num4', 0.3, {scale: 0, ease: 'none'}, 3.3)
    .to('.cell-area .scene_two .cell-2.num1', 0.8, {scale: 1, ease: 'none'}, 3.4)
    .to('.cell-area .scene_two .cell-1.num13', 0.5, {scale: 1, ease: 'none'}, 3.5)
    .to('.cell-area .scene_one .cancer.num18', 0.6, {scale: 0, ease: 'none'}, 3.5)
    
    .to('.cell-area .scene_two .cell-1.num21', 0.7, {scale: 1, ease: 'none'}, 3.6)
    .to('.cell-area .scene_two .cell-2.num2', 0.5, {scale: 1, ease: 'none'}, 3.5)
    .to('.cell-area .scene_two .cell-1.num12', 0.8, {scale: 1, ease: 'none'}, 3.7)
    
    //back
    .to('.cell-area .scene_two .cell-1.num21', 0.5, {scale: 0, ease: 'none'}, 5)
    .to('.cell-area .scene_two .cell-2.num2', 0.4, {scale: 0, ease: 'none'}, 5.2)
    .to('.cell-area .scene_two .cell-1.num12', 0.3, {scale: 0, ease: 'none'}, 5.4)

    .to('.cell-area .scene_two .cell-1.num15', 0.7, {scale: 0, ease: 'none'}, 5.4)
    .to('.cell-area .scene_two .cell-1.num4', 0.5, {scale: 0, ease: 'none'}, 5.4)
    .to('.cell-area .scene_one .cell-1.num2', 0.5, {scale: 1, ease: 'none'}, 5.5)
    .to('.cell-area .scene_one .cell-1.num3', 0.3, {scale: 1, x: 0, y: 0, ease: 'none'}, 5.5)
    .to('.cell-area .scene_one .cancer.num14', 0.5, {scale: 1, ease: 'none'}, 5.5)
    .to('.cell-area .scene_two .cell-2.num3', 0.4, {scale: 0, ease: 'none'}, 5.6)
    .to('.cell-area .scene_one .cell-1.num4', 0.3, {scale: 1, ease: 'none'}, 5.7)
    .to('.cell-area .scene_two .cell-2.num1', 0.8, {scale: 0, ease: 'none'}, 5.7)
    .to('.cell-area .scene_two .cell-1.num13', 0.5, {scale: 0, ease: 'none'}, 5.7)
    .to('.cell-area .scene_one .cancer.num18', 0.6, {scale: 1, ease: 'none'}, 5.7)

    .to('.cell-area .scene_two .cell-2.num4', 0.6, {scale: 0, ease: 'none'}, 5.8)
    .to('.cell-area .scene_one .cancer.num16', 0.5, {scale: 1, ease: 'none'}, 5.8)
    .to('.cell-area .scene_one .cancer.num5', 0.6, {scale: 1, ease: 'none'}, 5.8)
    .to('.cell-area .scene_two .cell-1.num2', 0.7, {scale: 0, ease: 'none'}, 5.8)
    .to('.cell-area .scene_one .cell-1.num5', 0.5, {scale: 1, ease: 'none'}, 5.8)
    .to('.cell-area .scene_one .cancer.num7', 0.5, {scale: 1, ease: 'none'}, 5.9)
    .to('.cell-area .scene_one .cancer.num17', 0.5, {scale: 1, ease: 'none'}, 5.9)
    .to('.cell-area .scene_two .cell-1.num16', 0.5, {scale: 0, ease: 'none'}, 5.9)
    .to('.cell-area .scene_one .cancer.num13', 0.8, {scale: 1, ease: 'none'}, 6)
    .to('.cell-area .scene_two .cell-1.num11', 0.7, {scale: 0, ease: 'none'}, 6)
    .to('.cell-area .scene_one .cancer.num20', 0.5, {scale: 1, ease: 'none'}, 6)
    .to('.cell-area .scene_one .cancer.num12', 0.8, {scale: 1, ease: 'none'}, 6.1)

    .to('.cell-area .scene_one .cell-1.num1', 0.5, {scale: 1, ease: 'none'}, 6.1)
    .to('.cell-area .scene_one .cancer.num22', 0.5, {scale: 1, ease: 'none'}, 6.1)
    .to('.cell-area .scene_two .cell-1.num18', 0.7, {scale: 0, ease: 'none'}, 6.2)
    .to('.cell-area .scene_two .cell-1.num3', 0.5, {scale: 0, ease: 'none'}, 6.3)
    .to('.cell-area .scene_two .cell-1.num23', 0.7, {scale: 0, ease: 'none'}, 6.3)
    .to('.cell-area .scene_two .cell-1.num17', 0.5, {scale: 0, ease: 'none'}, 6.3)

    .to('.cell-area .scene_two .cell-2.num6', 0.6, {scale: 0, ease: 'none'}, 6.3)
    .to('.cell-area .scene_two .cell-1.num24', 0.6, {scale: 0, ease: 'none'}, 6.3)
    .to('.cell-area .scene_one .cancer.num11', 0.7, {scale: 1, ease: 'none'}, 6.4)
    .to('.cell-area .scene_one .cancer.num1', 0.5, {scale: 1, ease: 'none'}, 6.4)
    .to('.cell-area .scene_one .cancer.num23', 0.9, {scale: 1, ease: 'none'}, 6.5)
    .to('.cell-area .scene_two .cell-1.num1', 0.6, {scale: 0, ease: 'none'}, 6.6)
    .to('.cell-area .scene_one .cancer.num2', 0.6, {scale: 1, ease: 'none'}, 6.7)
    .to('.cell-area .scene_one .cancer.num4', 0.5, {x: 0, ease: 'none'}, 6.7)

    .to('.cell-area .scene_one .cancer.num6', 0.5, {scale: 1, ease: 'none'}, 6.8)
    .to('.cell-area .scene_one .cell-2.num1', 0.7, {scale: 1, ease: 'none'}, 6.8)
    .to('.cell-area .scene_two .cell-1.num8', 0.6, {scale: 0, ease: 'none'}, 6.9)
    .to('.cell-area .scene_two .cell-1.num7', 0.6, {scale: 0, ease: 'none'}, 6.9)
    .to('.cell-area .scene_one .cancer.num19', 0.5, {scale: 1, ease: 'none'}, 7.1)
    .to('.cell-area .scene_two .cell-1.num22', 0.6, {scale: 0, ease: 'none'}, 7.1)
    .to('.cell-area .scene_one .cancer.num24', 0.8, {scale: 1, ease: 'none'}, 7.2)
    .to('.cell-area .scene_one .cell-2.num2', 0.5, {scale: 1, ease: 'none'}, 7.2)
    .to('.cell-area .scene_one .cancer.num9', 0.7, {scale: 1, ease: 'none'}, 7.4)
    
    .to('.cell-area .scene_two .cell-1.num19', 0.8, {scale: 0, ease: 'none'}, 7.6)
    .to('.cell-area .scene_two .cell-1.num20', 0.4, {scale: 0, ease: 'none'}, 7.6)
    .to('.cell-area .scene_one .cancer.num15', 0.5, {scale: 1, ease: 'none'}, 7.7)
    .to('.cell-area .scene_one .cancer.num3', 0.5, {scale: 1, ease: 'none'}, 7.8)
    .to('.cell-area .scene_two .cell-1.num5', 0.6, {scale: 0, ease: 'none'}, 7.9)
    .to('.cell-area .scene_one .cancer.num8', 0.5, {scale: 1, ease: 'none'}, 7.9)

    .to('.cell-area .scene_one .cancer.num21', 0.5, {scale: 1, ease: 'none'}, 8)
    .to('.cell-area .scene_two .cell-2.num5', 0.7, {scale: 0, ease: 'none'}, 8)
    .to('.cell-area .scene_one .cancer.num10', 0.5, {scale: 1, ease: 'none'}, 8.1)
    .to('.cell-area .scene_two .cell-1.num9', 0.2, {scale: 0, ease: 'none'}, 8.2)
    .to('.cell-area .scene_two .cell-1.num10', 0.2, {scale: 0, ease: 'none'}, 8.5)
    .to('.cell-area .scene_one .cancer.num15', 0.5, {scale: 1, ease: 'none'}, 8.5)


    // immunity-relation
    const hoverOriginAction = new TimelineLite({paused: true})
    .to('.assassin-info__visual--character-origin', 2, {x: -80}, 0)

    const hoverTalentAction = new TimelineLite({paused: true})
    .set('.talent__object-1', {opacity: 0, x: -20}, 0)
    .set('.talent__object-2', {opacity: 0, x: 100, y: -40}, 0)
    .set('.talent__object-3', {opacity: 0, x: 150, y: -50}, 0)
    .set('.talent__object-4', {opacity: 0, x: 200, y: -60}, 0)
    .to('.talent__object-1', 0.4, {opacity: 1, x: 0}, 0.2)
    .to('.talent__object-2', 0.4, {opacity: 1, x: 0, y: 0}, 0.4)
    .to('.talent__object-3', 0.3, {opacity: 1, x: 0, y: 0}, 0.6)
    .to('.talent__object-4', 0.5, {opacity: 1, x: 0, y: 0}, 0.7)

    const hoverHeroAction = new TimelineLite({paused: true})
    .to('.assassin-info__visual--character-hero', 0.7, {x: 0, y: 0}, 0)
    .to('.assassin-info__visual--bg-hero.assasin_bg', 0.7, {scale: 1.5}, 0)

    const hoverVillainAction = new TimelineLite({paused: true})
    .set('.villain__object-1', {opacity: 0, y: -350}, 0)
    .to('.villain__object-1', 1, {opacity: 1, y: -250}, 0.2)


    const assasinHoverControl = {
        originPlay(){
            hoverOriginAction.restart();
        },
        originReverse(){
            hoverOriginAction.reverse();
        },
        talentPlay(){
            gsap.to('.assassin-info__visual--character-talent', 1, {x: 0});
            hoverTalentAction.restart();
        },
        talentReverse(){
            hoverTalentAction.seek(0);
            hoverTalentAction.pause(0);
            gsap.to('.assassin-info__visual--character-talent', 1, {x: 40});
        },
        heroPlay(){
            hoverHeroAction.restart();
        },
        heroReverse(){
            if(!hoveHeroFlag){
                hoverHeroAction.reverse();
            }
        },
        villainPlay(){
            hoverVillainAction.restart();
        },
        villainReverse(){
            hoverVillainAction.seek(0);
            hoverVillainAction.pause(0);
        }
    }

    // assassin-info
    $(".assassin-info .grayscale").hover(function(){
        hoverItem = $(this).attr('class').replace('grayscale', '');
        gsap.to( '.'+hoverItem, 1, {'-webkit-filter':'grayscale(0%)', filter: 'grayscale(0%)'} );
        hoverAction = String(hoverItem.replace('assassin-info__visual--list-', '').trim());
        if(hoverAction == 'origin'){
            assasinHoverControl.originPlay();
        }else if(hoverAction == 'talent'){
            assasinHoverControl.talentPlay();
        }else if(hoverAction == 'hero'){
            assasinHoverControl.heroPlay();
        }else if(hoverAction == 'villain'){
            assasinHoverControl.villainPlay();
        }
    }, function(){
        if(listActiveNum == 0){
            gsap.to( '.'+hoverItem, 1, {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)'} );
        }
        if(hoverAction == 'origin'){
            assasinHoverControl.originReverse();
        }else if(hoverAction == 'talent'){
            assasinHoverControl.talentReverse();
        }else if(hoverAction == 'hero'){
            assasinHoverControl.heroReverse();
        }else if(hoverAction == 'villain'){
            assasinHoverControl.villainReverse();
        }
    });

    const tMechanismAnimation = new TimelineLite({paused: true, repeat: -1})
    .to('.t-cell-1', 1.4, {x: 170, ease: 'none'}, 0)
    .to('.t-cell-2', 1.4, {x: 140, ease: 'none'}, 0)
    .to('.t-cell-3', 1.4, {x: 150, ease: 'none'}, 0)
    .to('.cancer-cell.tarea', 1.4, {x: -180, ease: 'none'}, 0)
    .to('.cancer-cell.tarea', 0.4, {opacity: 0.8, ease: 'none'}, 0.3)
    .to('.cancer-cell.tarea', 0.4, {opacity: 1, ease: 'none'}, 0.8)
    .to('.t-cell-1', 1.4, {x: 0, ease: 'none'}, 1.4)
    .to('.t-cell-2', 1.4, {x: 0, ease: 'none'}, 1.4)
    .to('.t-cell-3', 1.4, {x: 0, ease: 'none'}, 1.4)
    .to('.cancer-cell.tarea', 1.4, {x: 0, ease: 'none'}, 1.4)
    .to('.cancer-cell.tarea', 0.4, {opacity: 0.8, ease: 'none'}, 1.7)
    .to('.cancer-cell.tarea', 0.4, {opacity: 1, ease: 'none'}, 2.2)

    const nkMechanismAnimation = new TimelineLite({paused: true, repeat: -1})
    .set('.cancer-cell.nkarea', {opacity: 1}, 0)
    .to('.nk-weapon-1', 0.2, {scaleX: 0.45}, 0)
    .to('.nk-weapon-2', 0.2, {scaleX: 1}, 0)
    .to('.nk-cell-1', 1, {x: 20, ease: 'none'}, 0)
    .to('.nk-cell-2', 0.8, {x: 30, ease: 'none'}, 0)
    .to('.nk-weapon-1', 0.4, {scaleX: 1}, 0.2)
    .to('.nk-weapon-1', 0.4, {scaleX: 0.45}, 0.6)
    .to('.nk-weapon-2', 0.4, {scaleX: 2}, 0.6)
    .to('.nk-weapon-2', 0.4, {scaleX: 1}, 1)
    .to('.nk-weapon-1', 0.4, {scaleX: 1}, 1)
    .to('.nk-cell-1', 1, {x: 0, ease: 'none'}, 1.1)
    .to('.nk-cell-2', 1.1, {x: 0, ease: 'none'}, 0.8)
    .to('.nk-boom', 0.3, {scale: 1, ease: 'back.out(1.7)'}, 1.2)
    .to('.nk-boom', 0.2, {scale: 0}, 1.5)
    .to('.cancer-cell.nkarea', 0.6, {opacity: 0, scale: 1.5}, 1.5)
    
    const assassinContent = {
        hideContent(){
            gsap.to('.assassin-info__visual--content--origin', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, {opacity: 0});
        },
        origin(){
            gsap.to('.assassin-info__visual--content--origin-typo', 1, {opacity: 1});
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--origin', 0.5, {opacity: 1, delay: 0.5});
            gsap.to('.assassin-info__visual--content--talent', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain', 0.3, {opacity: 0});
        },
        talent(){
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent-typo', 1, {opacity: 1});
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--origin', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent', 0.5, {opacity: 1, delay: 0.5});
            gsap.to('.assassin-info__visual--content--hero', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain', 0.3, {opacity: 0});
        },
        hero(){
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero-typo', 1, {opacity: 1});
            gsap.to('.assassin-info__visual--content--villain-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--origin', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero', 0.5, {opacity: 1, delay: 0.5});
            gsap.to('.assassin-info__visual--content--villain', 0.3, {opacity: 0});
        },
        heroAnimation(){
            const procedureAnimation = new TimelineLite({paused: true})
            .set('.procedure-nk', {scale: 0}, 0)
            .set('.procedure-cancer', {scale: 0}, 0)
            .set('.procedure-etc.num2', {scale: 0}, 0)
            .set('.procedure-etc.num3', {scale: 0}, 0)
            .set('.procedure-etc.num4', {scale: 0}, 0)
            .set('.procedure-step1 .procedure-line', {scaleX: 0}, 0)
            .set('.procedure-step1 .procedure-arrow-text', {opacity: 0}, 0)
            .set('.procedure-step1 .procedure-arrow', {opacity: 0}, 0)
            .set('.procedure-step2 .procedure-line', {scaleX: 0, rotate: -45}, 0)
            .set('.procedure-step2 .procedure-arrow-text', {opacity: 0}, 0)
            .set('.procedure-step2 .procedure-arrow', {opacity: 0}, 0)
            .set('.procedure-step3 .procedure-line', {scaleX: 0}, 0)
            .set('.procedure-step3 .procedure-arrow-text', {opacity: 0}, 0)
            .set('.procedure-step3 .procedure-arrow', {opacity: 0}, 0)
            .set('.procedure-step4 .procedure-line', {rotate: -45, scaleX: 0}, 0)
            .set('.procedure-step4 .procedure-arrow-text', {opacity: 0}, 0)
            .set('.procedure-step4 .procedure-arrow', {opacity: 0}, 0)

            .to('.procedure-nk', 0.6, {scale:1}, 0.5)
            .to('.procedure-cancer', 0.6, {scale:1}, 0.7)
            .to('.procedure-step1 .procedure-line', 0.5, {scaleX: 1}, 1.1)
            .to('.procedure-step1 .procedure-arrow-text', 0.5, {opacity: 1}, 1.1)
            .to('.procedure-step1 .procedure-arrow', 0.4, {opacity: 1}, 1.6)
            .to('.procedure-etc.num2', 0.6, {scale: 1}, 1.3)
            .to('.procedure-etc.num3', 0.6, {scale: 1}, 1.5)
            .to('.procedure-step2 .procedure-line', 0.5, {scaleX: 1}, 1.9)
            .to('.procedure-step2 .procedure-arrow-text', 0.5, {opacity: 1}, 1.9)
            .to('.procedure-step2 .procedure-arrow', 0.4, {opacity: 1}, 2.4)
            .to('.procedure-etc.num4', 0.6, {scale: 1}, 2.3)
            .to('.procedure-step3 .procedure-line', 0.5, {scaleX: 1}, 2.9)
            .to('.procedure-step3 .procedure-arrow-text', 0.5, {opacity: 1}, 2.9)
            .to('.procedure-step3 .procedure-arrow', 0.4, {opacity: 1}, 3.4)
            .to('.procedure-step4 .procedure-line', 0.5, {scaleX: 1}, 3.5)
            .to('.procedure-step4 .procedure-arrow-text', 0.5, {opacity: 1}, 3.5)
            .to('.procedure-step4 .procedure-arrow', 0.4, {opacity: 1}, 4)
            procedureAnimation.pause();
            procedureAnimation.restart();
        },
        villain(){
            gsap.to('.assassin-info__visual--content--origin-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero-typo', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain-typo', 1, {opacity: 1});
            gsap.to('.assassin-info__visual--content--origin', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--talent', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--hero', 0.3, {opacity: 0});
            gsap.to('.assassin-info__visual--content--villain', 0.5, {opacity: 1, delay: 0.5});
        },
    }

    const visualList = {
        origin(){
            const listOriginAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-origin', {overflow: 'visible'}, 0)
            .set('.assassin-info__visual--list-talent', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-hero', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-villain', {overflow: 'hidden'}, 0)
            .to('.assassin-info__visual--character-origin', 1, {scale: 1.2, y: 100, x: 80}, 0.7)
            .to('.assassin-info__visual--bg-origin', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-hero', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#F2F2F2'}, 0.5)
            
            $('.assassin-info__visual--list-origin').addClass('active');
            listActiveNum = 1;
            listOriginAction.restart();
            assassinContent.origin();
        },
        talent(){
            const listTalentAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-origin', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-talent', {overflow: 'visible'}, 0)
            .set('.assassin-info__visual--list-hero', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-villain', {overflow: 'hidden'}, 0)
            .to('.assassin-info__visual--character-talent', 0.8, {x: 0, scale: 1.2}, 0.7)
            .to('.assassin-info__visual--bg-talent', 1, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "-80%"}, 0.7)
            .to('.assassin-info__visual--list-hero', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#f2f2f2'}, 0.5);
    
            $('.assassin-info__visual--list-talent').addClass('active');
            listActiveNum = 2;
            listTalentAction.restart();
            assassinContent.talent();
            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        },
        hero(){
            const listHeroAction = new TimelineLite({paused: true})
            .to('.assassin-info__visual--character-hero', 1.2, {x: 400, y: 200}, 0)
            .set('.assassin-info__visual--list-origin', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-talent', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-hero', {overflow: 'visible'}, 0)
            .set('.assassin-info__visual--list-villain', {overflow: 'hidden'}, 0)
            .to('.assassin-info__visual--bg-hero', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "-201%"}, 0)
            .to('.assassin-info__visual--list-hero', 1.2, {x: "0%", y: "0%"}, 0.7)
            .to('.assassin-info__visual--list-villain', 1, {x: "301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#f2f2f2'}, 0.5);
    
            $('.assassin-info__visual--list-hero').addClass('active');
            listActiveNum = 3;
            listHeroAction.restart();
            assassinContent.hero();
            assassinContent.heroAnimation();
        },
        villain(){
            const listVillainAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-origin', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-talent', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-hero', {overflow: 'hidden'}, 0)
            .set('.assassin-info__visual--list-villain', {overflow: 'visible'}, 0)
            .to('.assassin-info__visual--bg-villain', 0.5, {opacity: 0}, 0)
            .to('.assassin-info__visual--list-origin', 1, {x: "-101%"}, 0)
            .to('.assassin-info__visual--list-talent', 1, {x: "-201%"}, 0)
            .to('.assassin-info__visual--list-hero', 1, {x: "-301%"}, 0)
            .to('.assassin-info__visual', 0.5, {background: '#f2f2f2'}, 0.5)
    
            $('.assassin-info__visual--list-villain').addClass('active');
            listActiveNum = 4;
            listVillainAction.restart();
            assassinContent.villain();
        },
    }

    const navi = {
        home(){
            isListAnimating = false;
            gsap.set('.assassin-info__visual--navigation', {pointerEvents: 'none', opacity: 0});
            gsap.to('.assassin-info__visual--scene', 0.7, {opacity: 1});
            $('.assassin-info__visual--navigation-btn').removeClass('active');

            const naviHomeAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list', {opacity: 0}, 0)
            .to('.assassin-info__visual--character-origin', 0.4, {scale: 1.5, y: 0, x: 0}, 0)
            .to('.assassin-info__visual--character-talent', 0.4, {x: 40, scale: 1.6}, 0)
            .to('.assassin-info__visual--character-hero', 0.4, {x: 30, y: 0}, 0)
            .set('.assassin-info__visual--list-origin', {overflow: 'hidden'}, 0.3)
            .set('.assassin-info__visual--list-talent', {overflow: 'hidden'}, 0.3)
            .set('.assassin-info__visual--list-hero', {overflow: 'hidden'}, 0.3)
            .set('.assassin-info__visual--list-villain', {overflow: 'hidden'}, 0.3)
            .set('.assasin_bg', {opacity: 1}, 0.4)
            .set('.assassin-info__visual--list-villain', {x: '101%'}, 0)
            .to('.assassin-info__visual', 1, {background: '#d00116'}, 0)
            .to('.assassin-info__visual--list li', 0.5, {x: 0, y: 0, opacity: 1, filter: 'grayscale(100%)'}, 0.2)
            .to('.assassin-info__visual--list', 0.4, {opacity: 1}, 0.5)
    
            $('.assassin-info__visual--list li').removeClass('active');

            gsap.set('.assassin-info__visual--list', {pointerEvents: 'visible', delay: 0.8});
            listActiveNum = 0;
            naviHomeAction.restart();
            assassinContent.hideContent();

            hoveHeroFlag = false; 

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        origin(){
            const naviOriginAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-origin', {overflow: 'visible'}, 0.2)
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-origin', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-origin', {opacity: 0, x: 0, y: 0}, 0.2)
            .set('.assassin-info__visual--character-origin', {scale: 1.2, y: 0, x: 0}, 0.2)
            .to('.assassin-info__visual--list-origin', 0.8, {opacity: 1}, 0.4)
            .to('.assassin-info__visual--character-origin', 0.8, {y: 100, x: 80}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-origin').addClass('active');
                listActiveNum = 1;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);
    
            naviOriginAction.restart();
            assassinContent.origin();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        talent(){
            const naviTalentAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-talent', {overflow: 'visible'}, 0.2)
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-talent', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-talent', {opacity: 0, x: "-50%"}, 0.2)
            .set('.assassin-info__visual--character-talent', {scale: 1.2, x: 0}, 0.2)
            .to('.assassin-info__visual--list-talent', 0.8, {x: "-80%", opacity: 1}, 0.4)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-talent').addClass('active');
                listActiveNum = 2;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);
    
            naviTalentAction.restart();
            assassinContent.talent();
            tMechanismAnimation.restart();
            nkMechanismAnimation.restart();
        },
        hero(){
            const naviHeroAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-hero', {overflow: 'visible', opacity: 0, x: '0%', y: '0%'}, 0.2)
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-hero', {opacity: 0}, 0)
            .to('.assassin-info__visual--list-hero', 0.8, {opacity: 1}, 0.4)
            .set('.assassin-info__visual--character-hero', {x: 300, y: 200}, 0.2)
            .to('.assassin-info__visual--character-hero', 0.8, {x: 400}, 0.4)

            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-hero').addClass('active');
                listActiveNum = 3;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 3000);
    
            naviHeroAction.restart();
            assassinContent.hero();
            assassinContent.heroAnimation();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        },
        villain(){
            const naviVillainAction = new TimelineLite({paused: true})
            .set('.assassin-info__visual--list-villain', {overflow: 'visible'}, 0.2)
            .to('.assassin-info__visual--list li.active', 0.5, {opacity: 0})
            .set('.assassin-info__visual--bg-villain', {opacity: 0}, 0)
            .set('.assassin-info__visual--list-villain', {opacity: 0, x: "0", y: "0"}, 0.2)
            .to('.assassin-info__visual--list-villain', 0.8, {opacity: 1}, 0.4)
            .set('.assassin-info__visual--list .grayscale', {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)' }, 0.2)
            .to('.assassin-info__visual--list .grayscale', 0.8, {'-webkit-filter':'grayscale(0%)', filter: 'grayscale(0%)' }, 0.5)
    
            setTimeout(() => {
                $('.assassin-info__visual--list li').removeClass('active');
                $('.assassin-info__visual--list-villain').addClass('active');
                listActiveNum = 4;
                isListAnimating = false;
                console.log('isListAnimating == ' + isListAnimating);
            }, 1400);
    
            naviVillainAction.restart();
            assassinContent.villain();

            tMechanismAnimation.pause();
            nkMechanismAnimation.pause();
        }
    }

    const assassinList = document.querySelector('.assassin-info__visual--list');
    assassinList.addEventListener("click", assassinListClick);
    function assassinListClick(e){
        let listValue = Number(e.target.getAttribute('data-value'));
        if( listValue != 4 ){
            gsap.to('.assassin-info__visual--list .grayscale', 0.4, {'-webkit-filter':'grayscale(100%)', filter: 'grayscale(100%)', delay: 0.5 });
        }
        $('.assassin-info__visual--navigation-btn:nth-of-type('+ (listValue + 1) +')').addClass('active');
        gsap.set('.assassin-info__visual--list', {pointerEvents: 'none'});
        gsap.to('.assassin-info__visual--navigation', 0.5, {opacity: 1, pointerEvents: "visible", delay: 0.8});
        gsap.to('.assassin-info__visual--scene', 0.7, {opacity: 0});
        switch ( listValue ){
            case 1:
                visualList.origin();
                break;
            case 2:
                visualList.talent();
                break;
            case 3:
                hoverHeroAction.pause();
                hoveHeroFlag = true;
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
        //console.log('isListAnimating == ' + isListAnimating);
        let naviValue = Number(e.target.getAttribute('data-value'));
        if(listActiveNum == naviValue) return false;
        if(!isListAnimating){
            isListAnimating = true;
            //console.log('isListAnimating == ' + isListAnimating);
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
            $('.assassin-info__visual--navigation-btn').removeClass('active');
            $('.assassin-info__visual--navigation-btn:nth-of-type('+ (naviValue + 1) +')').addClass('active');
        }
    }
    // assassin-info

    // outro
    $('.outro__inner--video-play').click( () => {
        gsap.to('.outro', 1, {background: '#212121'});
        gsap.to('.outro__inner', 0.5, {opacity: 0});
        gsap.to('.outro__video', 0.8, {opacity: 1, pointerEvents: 'visible', delay: 0.2});
        gsap.to('.outro__background', 0.5, {opacity: 0});
        setTimeout(() => {
            $(".outro__video--panel-in").get(0).play();
        }, 800)
    });
    // outro

   const pageNextScene = {
        quiz(){
            const visualPageScene = new TimelineLite({paused: true})
            .set('.quiz-area__inner--headline', {opacity: 0, y: 40}, 0)
            .set('.quiz-area__inner--cover', {opacity: 0}, 0)
            .set('.start-explanatory', {opacity: 0, y: 40}, 0)
            .set('.start-btn', {opacity: 0}, 0)
            .to('.quiz-area__inner--headline', 0.8, {opacity: 1, y: 0}, 0.4)
            .to('.quiz-area__inner--cover', 0.8, {opacity: 1}, 0.4)
            .to('.start-explanatory', 0.8, {opacity: 1, y: 0}, 0.7)
            .to('.start-btn', 0.8, {opacity: 1}, 0.8)
            visualPageScene.restart();
        },
        immunity(){
            const quizPageScene = new TimelineLite({paused: true})
            .set('.immunity-relation__inner--headline', {opacity: 0, y: 40}, 0)
            .set('.immunity-relation__inner--chart', {opacity: 0}, 0)
            .to('.immunity-relation__inner--headline', 0.8, {opacity: 1, y: 0}, 0.4)
            .to('.immunity-relation__inner--chart', 0.8, {opacity: 1}, 0.5)
            quizPageScene.restart();
        },
        natural(){
            const naturalPageScene = new TimelineLite({paused: true})
            .set('.natural-killer__explain--headline', {opacity: 0, y: 40}, 0)
            .set('.natural-killer__explain--text-box-mg', {opacity: 0, y: 40}, 0)
            .to('.natural-killer__explain--headline', 0.8, {opacity: 1, y: 0}, 0.6)
            .to('.natural-killer__explain--text-box-mg:nth-of-type(1)', 0.8, {opacity: 1, y: 0}, 0.6)
            .to('.natural-killer__explain--text-box-mg:nth-of-type(2)', 0.8, {opacity: 1, y: 0}, 0.8)
            .to('.natural-killer__explain--text-box-mg:nth-of-type(3)', 0.8, {opacity: 1, y: 0}, 1)
            naturalPageScene.restart();
        },
        epilogue(){
            const epiloguePageScene = new TimelineLite({paused: true})
            .set('.epilogue__background-illust', {opacity: 0}, 0)
            .set('.epilogue__background-rain1', {opacity: 0, y: -30}, 0)
            .set('.epilogue__background-rain2', {opacity: 0, y: -50, scale: 1.2}, 0)
            .set('.epilogue__background-rain3', {opacity: 0, y: -100, scale: 1.2}, 0)
            .set('.epilogue__inner--area-headline', {opacity: 0, y: 40}, 0)
            .set('.epilogue__inner--area-explain', {opacity: 0, y: 40}, 0)
            .to('.epilogue__background-illust', 0.5, {opacity: 1}, 0.5)
            .to('.epilogue__background-rain2', 0.8, {opacity: 1, y: 0}, 0.5)
            .to('.epilogue__background-rain3', 1.5, {opacity: 1, y: 0}, 1.3)
            .to('.epilogue__background-rain1', 1.2, {opacity: 1, y: 0}, 1.3)
            .to('.epilogue__inner--area-headline', 0.8, {opacity: 1, y: 0}, 0.5)
            .to('.epilogue__inner--area-explain', 0.8, {opacity: 1, y: 0}, 0.9)
            epiloguePageScene.restart();
        },
        outro(){
            const outroPageScene = new TimelineLite({paused: true})
            .set('.outro__background', {y: -200, scaleY: 1.5}, 0)
            .set('.outro__inner--headline', {opacity: 0, y: 40}, 0)
            .set('.outro__inner--text-first', {opacity: 0, y: 40}, 0)
            .set('.outro__inner--text-second', {opacity: 0, y: 40}, 0)
            .set('.outro__inner--video-play', {opacity: 0}, 0)
            .to('.outro__background', 3, {y: 0, scaleY: 1.5}, 0.2)
            .to('.outro__inner--headline', 0.8, {opacity: 1, y: 0}, 0.5)
            .to('.outro__inner--text-first', 0.8, {opacity: 1, y: 0}, 0.8)
            .to('.outro__inner--text-second', 0.8, {opacity: 1, y: 0}, 1.1)
            .to('.outro__inner--video-play', 1, {opacity: 1}, 1.3)
            outroPageScene.restart();
        }
    }

    //content swiper
    const verticalPageSwapNext = {
        visual() {
            gsap.to('.quiz-area', 1.2, {y: 0, ease: "power4.out"});
            pageNextScene.quiz();
            immunityMorph.pause();
        },
        quiz(){
            gsap.to('.immunity-relation', 1.2, {y: 0, ease: "power4.out"});
            pageNextScene.immunity();
            immunityMorph.restart();
        },
        immunity(){
            gsap.to('.natural-killer', 1.2, {y: 0, ease: "power4.out"});
            pageNextScene.natural();
            immunityMorph.pause();
        },
        natural(){
            gsap.to('.assassin-info', 1.2, {y: 0, ease: "power4.out"});
        },
        assassin(){
            gsap.to('.epilogue', 1.2, {y: 0, ease: "power4.out"});
            pageNextScene.epilogue();
        },
        epilogue(){
            gsap.to('.outro', 1.2, {y: 0, ease: "power4.out"});
            pageNextScene.outro();
        },
        outro(){
            gsap.to('.copyright', 1.2, {y: 0, ease: "power4.out"});
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
            immunityMorph.restart();
        },
        assassin(){
            gsap.to('.assassin-info', 1.2, {y: "100vh", ease: "power4.out"});
        },
        epilogue(){
            gsap.to('.epilogue', 1.2, {y: "100vh", ease: "power4.out"});
        },
        outro(){
            gsap.to('.outro', 1.2, {y: "100vh", ease: "power4.out"});
        },
        copyright(){
            gsap.to('.copyright', 1.2, {y: 195, ease: "power4.out"});
        }
    }

    const horizontalEvent = (htEvent) => {
        //console.log('horizontalEvent');
        if(htEvent == 1){
            const naturalTypeOn = new TimelineLite({paused: true})
            .to('.natural-killer__type', 1, {opacity: 1}, 0)
            .to('.natural-killer__explain', 0.5, {opacity: 0}, 0)
            .to('.natural-killer', 1, {background: '#A5001A'}, 0.2)
            .to('.natural-killer__type .deep', 1.4, {fill: '#900017', opacity: 0}, 0.8)
            .to('.natural-killer__type .light', 1, {fill: '#ffffff'}, 0.8)
            .to('.natural-killer__type .text_n', 1, {x: 130}, 1.8)
            .to('.natural-killer__type .text_k', 1, {x: -275}, 1.8)
            .to('.natural-killer__type .text_cell', 1, {x: -520}, 1.8)
            naturalTypeOn.restart();
        }else {
            const naturalTypeOff = new TimelineLite({paused: true})
            .to('.natural-killer', 0.5, {background: '#F2F2F2'}, 0)
            .to('.natural-killer__type', 0.5, {opacity: 0}, 0)
            .to('.natural-killer__explain', 1, {opacity: 1}, 0)
            .set('.natural-killer__type .deep.st0', {fill: '#BA0000', opacity: 1}, 1.1)
            .set('.natural-killer__type .deep.st1', {fill: '#212121', opacity: 1}, 1.1)
            .set('.natural-killer__type .light', {fill: '#BA0000'}, 1.1)
            .set('.natural-killer__type .text_n', {x: 0}, 1.1)
            .set('.natural-killer__type .text_k', {x: 0}, 1.1)
            .set('.natural-killer__type .text_cell', {x: 0}, 1.1)
            naturalTypeOff.restart();
        }
    }

    //page controll
    const goToNextSlide = () => {
        if(pageNum >= 8) return false; //index: 0 기준 false 처리
        if(!isAnimating){
            isAnimating = true;
            pageNum +=1;
            //console.log('next page = ' + pageNum);
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
                case 8:
                    verticalPageSwapNext.outro();
                    $(".outro__video--panel-in").get(0).pause();
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
            //console.log('prev page = ' + pageNum);
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
                    $(".outro__video--panel-in").get(0).pause();
                    break;
                case 7:
                    verticalPageSwapPrev.copyright();
                    break;
            }
            setTimeout(() => {
                onSlideChangeEnd();
            }, 1200)
        }
    }
    const onSlideChangeEnd = () => {
        //console.log('isAnimating == false');
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

var explainBtnActive;
const explainBtn = (num) => {
    if(explainBtnActive == num){
        $('.explain__list-more.q'+num).removeClass('view');
        if( num == 9 || num == 10){
            gsap.to('.explain__list', 0.5, {top: 40});
        }
        explainBtnActive = 0;
    }else {
        if( num == 9 ){
            gsap.to('.explain__list', 0.5, {top: -90});
        }else if( num == 10 ){
            gsap.to('.explain__list', 0.5, {top: -30});
        }else {
            gsap.to('.explain__list', 0.5, {top: 40});
        }
        $('.explain__list-more').removeClass('view');
        $('.explain__list-more.q'+num).addClass('view');
        explainBtnActive = num;
    }
}