#### es6 -> es5 컴파일 가이드

1. 바벨 설치

```
npm i -g babel-cli
npm i -D babel-cli babel-preset-latest
```

- babel-cli를 global로 설치하지 않으면, 터미널에서 *babel*이라는 명령어를 인식하지 못한다.

- babel-cli는 터미널에서 babel을 돌려주는 것으로써 현재 프로젝트에 또 설치를 해줘야 동작을 제대로 한다.

- babel에는 plugin이라는 게 존재한다.
  이 plugin은 es6의 애로우 펑션을 지원하는 플러그인, 클래스를 지원하는 플러그인 등등이 있다.
  그러한 플러그인을 모아놓은 걸 preset이라고 부른다.
  es2015 preset은 es6의 플러그인들을 모아놓은 것이고,
  latest preset은 ES2015~ES2017까지의 프리셋들을 모아놓은 것이다.
  시간이 지나면 latest의 지원 프리셋 범위는 더 늘어날 수도 있다.



2. 바벨 설정파일 생성  

   .barbelrc

```
{
	"presets" : ["latest"]
}
```







#### IE 추가지원

1. polyfill.js 파일 추가

```
https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
```



polyfill은 Array.find, Object.assign 등 es6 문법이 미지원되는 환경에서 예외코드를 실행해준다.

// js 내용

```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);
```

// ie에서 object.asign을 불러올 수 없음

```
if ( !Object.values ) {
	블라블라 내용내용
}
```



2. html에서 컴파일 한 스크립트 보다 먼저 로드해준다

```
<script src="polyfill.js"></script>
<script src="es6_To_es5.js"></script>
```









컴파일 명령어

```
babel 폴더명 -d 결과물폴더명 -w
ex ) babel es6 -d e5 -w
```



- babel : babel 사용

- es6: es6 디렉토리에 있는 파일을 트랜스파일 한다.

- -d es5: 결과물을 es5 폴더에 생성

- -w: watch, 파일이 수정될 때 마다 트랜스파일 해준다. 

