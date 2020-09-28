
// onload
window.onload = function(){
    console.log('onload');
    
};
// onload


window.addEventListener('DOMContentLoaded', () => { 

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    let quizCoverWidth,
    quizCoverHeight,
    quizResultWidth,
    quizResultHeight,
    quizStep = 1,
    isQuizAnimation = false;
    //quizFinishFlag = false;
    //listContentSize;

    // default setting
    const defaultSet = () => {
        gsap.set('.quiz-area__question--progress .process', {scaleX: 0.1});
    }

    const newSize = () => {
        quizCoverWidth = $('.quiz-area__start--cover').width();
        quizCoverHeight = $('.quiz-area__start--cover').height();
        gsap.set('.quiz-area__start--cover', {clip: 'rect('+quizCoverHeight+'px, '+quizCoverWidth+'px, '+quizCoverHeight+'px, 0px)'});

        quizResultWidth = $('.quiz-area__result').width();
        quizResultHeight = $('.quiz-area__result').height();

        if( (quizResultWidth * 2) > quizResultHeight ){
            gsap.set('.quiz-area__result .result-area', {scale: 0.9, top: '8vh'});
            gsap.set('.quiz-area__result .score-grade', {top: '5vh'});
            gsap.set('.visual-intro__area--goToTest, .visual-intro__area--goToStory', {scale: 0.8});
        }else {
            gsap.set('.quiz-area__result .result-area', {scale: 1, top: '15vh'});
            gsap.set('.quiz-area__result .score-grade', {top: '8vh'});
            gsap.set('.visual-intro__area--goToTest, .visual-intro__area--goToStory', {scale: 1});
        }

        //if(quizFinishFlag){
        //    listContentSize = $('.explain__list').height();
        //    gsap.to('.quiz-area__explain', 0.5, {height: 'calc('+listContentSize+'px + 30vw)' });
        //}
    }

    newSize();
    window.addEventListener("resize", newSize);


    // intro
    $('.visual-intro__area--goToStory').click( () => {
        gsap.to(window, {duration: 1, scrollTo: {y: ".natural-killer-cell", offsetY: 50 }, ease: "circ.out"});
    });

    $('.visual-intro__area--goToTest').click( () => {
        gsap.set('.quiz__container', {pointerEvents: 'visible', position: 'fixed'});
        gsap.set('body', {overflow: 'hidden'});
        gsap.to('.quiz-area', 0.8, {y: 0});

        gsap.to('.quiz-area__start--cover', 1, {clip: 'rect(0px, '+quizCoverWidth+'px, '+quizCoverHeight+'px, 0px)', delay: 0.7});
    });

    
    // intro

    // quiz-area
    $('.start-btn').click( () => {
        gsap.to('.start-btn', 0.3, {background: '#BA0000', color: '#fff'});
        gsap.to('.quiz-area__question', 0.6, {x: 0, delay: 0.3, pointerEvents: 'visible'});
    });

    $('.quiz-skip').click( () => {
        gsap.set('.quiz__container', {pointerEvents: 'none', position: 'absolute'});
        gsap.set('body', {overflow: 'visible'});
        gsap.to('.quiz-area', 0.8, {y: '-100vh'});
        gsap.to(window, {duration: 1, scrollTo: {y: ".natural-killer-cell", offsetY: 50}, ease: "circ.out", delay: 0.5});
    });

    for( let $i = 1; $i <= 10; $i++ ){
        $('input:radio[name=q'+$i+']').click( () => { 
            if($i == 10){
                gsap.to('.quiz-area__question--finish', 0.5, {opacity: 0.9, pointerEvents:'visible'});
            }else {
                quizNextQuestion( $i );
            }
        });
    }

    $('.question__input .true').click( ()=>{
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.true', 0.5, {background: '#C22C2C'});
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.true', 0.5, {background: '#BA0000', delay: 0.5});
    })

    $('.question__input .false').click( ()=>{
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.false', 0.5, {background: '#8F0101'});
        gsap.to('.quiz-area__question .question__input input[type=radio] + label.false', 0.5, {background: '#B10000', delay: 0.5});
    })

    const quizNextQuestion = () => {
        //isQuizAnimation = true;
        if(!isQuizAnimation){
            isQuizAnimation = true;
            console.log('test ==== ' + quizStep);

            gsap.to('.quiz-area__question-step'+quizStep+' .question--text', 0.5, {x: '-100vw', ease: 'none'});
            gsap.set('.quiz-area__question-step'+quizStep, {visibility: 'hidden', pointerEvents: 'none', delay: 0.5});
            quizStep += 1;

            let processScale = quizStep * 0.1;
            gsap.to('.quiz-area__question--progress .process', 0.5, {scaleX: processScale, ease: 'none'});
    
            gsap.set('.quiz-area__question-step'+quizStep, {visibility: 'visible', pointerEvents: 'visible', delay: 0.5});
            gsap.to('.quiz-area__question-step'+quizStep+' .question--text', 0.5, {x: 0, ease: 'none', delay: 0.5});

            setTimeout(() => {
                isQuizAnimation = false;
            }, 600);
        }
    }

    $('.show-result').click( () =>{
        gsap.to('.quiz-area__result', 0.5, {opacity: 1, pointerEvents: 'visible'});

        let quizResult = $('#quiz-area__form').serializeArray();
        //정답이랑 내가 체크한 값 비교하기

        let quizScore = 0;
        const quizCorrectResult = [ 1, 1, 2, 1, 1, 2, 2, 1, 1, 2 ];  // 1 : true, 2 : false
        for(let k = 0; k < quizCorrectResult.length; k++){
            if( quizCorrectResult[k] == Number(quizResult[k].value) ){
                quizScore += 1;
                $('.explain__list-item.q'+( k + 1 )+' .answer-status--true').addClass('active');
            }else {
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
            gradeTitle = '당신은 면역 상식이 <br>전혀 없습니다.';
            gradeEtc = '아직 면역에 대해 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        }else if( score <= 3 ){
            gradeTitle = '당신은 면역 상식 <br>어린이 수준입니다.';
            gradeEtc = '아직 면역에 대해 잘 모르시네요. <br>NK세포와 함께 더 알아가는 건 어떨까요?';
        }else if( score <= 7 ){
            gradeTitle = '당신은 면역 상식은 <br>학생수준 입니다.';
            gradeEtc = '어느 정도 더 관심을 기울인다면, <br>곧 면역 상식왕이 되겠습니다!';
        }else if( score <= 8 ){
            gradeTitle = '당신은 면역 상식 박사입니다.';
            gradeEtc = '혹시 면역학 공부를 따로 하셨나요? <br>면역 상식으론 따라 잡을 이가 없네요.';
        }else {
            gradeTitle = '당신은 면역 상식 박사입니다.';
            gradeEtc = '혹시 면역학 공부를 따로 하셨나요? <br>면역 상식으론 따라 잡을 이가 없네요.';
        }
        $('.grade-title').html( gradeTitle );
        $('.grade-etc').html( gradeEtc );
    }

    $('.quiz-explain-btn').click( ()=> {

        //listContentSize = $('.explain__list').height();

        //gsap.to('.quiz-area__explain', 0.5, {opacity: 1, pointerEvents: 'visible', height: 'calc('+listContentSize+'px + 30vw)' });
        gsap.to('.quiz-area__explain', 0.5, {opacity: 1, pointerEvents: 'visible' });

        //quizFinishFlag = true;

        gsap.set('.quiz__container', {position: 'absolute', overflow: 'visible'});
        gsap.set('.quiz-area', {overflow: 'visible'});
        gsap.set('body', {overflow: 'visible'});
        gsap.set('.natural-killer-cell', {top: '14vw'});
        gsap.set('.visual-intro', {height: '190vw'});

        //  quiz-area__explain  height: calc(565px + 30vw);
        //gsap.set()

    });

    // quiz-area



    defaultSet(); // 기본 셋팅 실행

});

var explainBtnActive;
//var explainAddHeight = 0;
//var defaultHeight;

const explainBtn = (num) => {

    if(explainBtnActive == num){
        $('.explain__list-more.q'+num).removeClass('view');
        if( num == 9 || num == 10){
            gsap.to('.explain__list', 0.5, {top: 40});
        }
        explainBtnActive = 0;

        gsap.to('.quiz-area__explain', 0.5, {height: '190vw'});
        gsap.to('.natural-killer-cell', 0.5, {marginTop: '0vw'})

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

        if( $('.explain__list-more.q'+num).hasClass('long') ){
            gsap.to('.quiz-area__explain', 0.5, {height: '250vw'});
            gsap.to('.natural-killer-cell', 0.5, {marginTop: '60vw'})

        }else if( $('.explain__list-more.q'+num).hasClass('md2')  ){
            gsap.to('.quiz-area__explain', 0.5, {height: '240vw'});
            gsap.to('.natural-killer-cell', 0.5, {marginTop: '50vw'})

        }else if( $('.explain__list-more.q'+num).hasClass('md1') ){
            gsap.to('.quiz-area__explain', 0.5, {height: '232vw'});
            gsap.to('.natural-killer-cell', 0.5, {marginTop: '42vw'})

        }else {
            gsap.to('.quiz-area__explain', 0.5, {height: '226vw'});
            gsap.to('.natural-killer-cell', 0.5, {marginTop: '36vw'})
        }
    }

    



}
