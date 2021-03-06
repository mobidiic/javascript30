01. javascript-drum-kit

내 방식을 사용해서 풀었을 때는, playing 클래스를 제거하는 방식을 window.addEventListener를 통해 keyup에 classList.remove()메소드를 부여하는 방식으로 하였다.


그러나 솔루션에서는 함수를 정의하여 keys를 변수지정한 다음 forEach메소드를 통해 각각의 키에 트랜스폼이 끝난 경우 classList.remove를 통해 playing클래스를 자동으로 지우는 방법을 택했다.


내 방식과 솔루션의 차이는 해당 버튼을 꾹 누르고 있는 경우에 내 방식은 누르고 있는 동안 playing 클래스가 유지되며, 솔루션의 방식은 트랜스폼이 끝나면 다시 제거되었다가 바로 추가되는 차이가 있다.


두 방식의 성능을 console.time - console.timeEnd를 찍어서 확인해 본 결과, 같은 s버튼을 눌렀을 때의 차이는 다음과 같다.

![addtype](./imgs/01_addtype.png)
![functype](./imgs/01_functype.png)


솔루션의 방법이 거의 2배 가까이 시간차이가 난다.
이는 이벤트리스너를 사용하면 이벤트의 전파가 이루어지고, 전역객체에서 이벤트리스너를 호출하고 다시 거기 쿼리셀렉터를 사용해 dom을 제어하는 이용하기 때문인 것으로 보인다.


<br />
이번에는 html태그에서 data-* 어트리뷰트를 사용하는 법을 배웠고, arrow function 에서 this가 바인딩이 안된다는 것을 다시 상기하였다.

***


02. css-js-Clock

내 방식과 솔루션의 차이 중 하나는 DOM을 변수지정할 때, 나는 document.getElementsByClassName을 사용했고, 솔루션은 querySelector를 사용했다는 것이다. 내가 저 방식을 사용한 이유는, 쿼리셀렉터의 경우 (HTMLCollection)이 아닌 nodelist의 형식으로 불러와지는데, 이는 정적 컬렉션이라 셀렉트 되는 시점의 상태에 고정되는 것이라 하였다. 물론 이 예제에서 이것이 바뀌어지지 않지만, 만약 큰 프로젝트에서는 고려해줘야 할 것 같아서 이를 사용했다.(물론 Array.from을 쓰거나 call로 체이닝해도 된다.)


이후에는 시계바늘을 침별로 다른 스타일을 적용하여 가독성을 높였고, 또한 디지털 시계를 추가해 보았다.


![02_final](./imgs/02_finalProduct.png)


***

03. css-variables


여지껏 공부해 오면서, sass를 사용해왔기 때문인지, css 변수사용을 처음 겪어보았다. :root 에 변수를 --변수명 이런 형태로 저장하고, 해당 변수를 사용할때 style: var(--변수명); 이런 방식으로 사용하는 것이다. sass가 없을 때에는 유용했을 것 같지만, sass가 훨씬 직관적이고 편하게 쓸 수 있을 것 같다.($변수명)


역시 저번에도 나왔던 nodelist와 HTMLCollection의 차이가 여기서도 나왔었고, 여기서는 nodelist의 forEach 메소드를 사용하였다. data어트리뷰트를 사용하는 것도 자바스크립트로 제어하기에 유용한 기능인 것 같다. this.dataset. 의 방식으로 접근하기 쉬우니까.


또한 이 :root 를 셀렉트하기 위해서 document.documentElement를 사용한 것도 이 주제에서 처음 보았다. setProperty(바꿀속성명, 내용) 이 메소드는 본 적이 있지만, 사용할 때는 style.marginTop = '30px' 이런 방식을 사용하기 때문에 잘 사용한 적이 없었다.
하지만 이번 경우처럼, 제어해야 할 속성이 가변적인 경우, 템플릿 리터럴을 통해 무엇인지 정해주고, 얼마만큼인지 주기 위해서는 이 setProperty()메소드가 적절해 보인다.


***


04. array-cardio-1


이번 주제는 자바스크립트 배열객체의 메소드 들을 익히는 것이였다.
기존에 많이 썼던 map(), sort()메소드나 filter()메소드의 경우 자주 사용해서 익숙한 것이였지만, reduce()메소드의 경우 이번에 처음 사용해보는 것이였다. 확실히 reduce 메소드는 계산을 쉽게 해준다는 장점이 있었다. 하지만 내가 아직 익숙하지 않아서 인지 for문을 돌리는 것이 더 쉽긴 했다. 메소드를 자주 써서 익숙하게 만들어야 겠다.

string객체의 includes()메소드도 처음 사용하는 것이였다.
내장객체들의 속성과 메소드들은 사실 맨날 쓰는 것만 써서, 이렇게 다른 사람이 하는 것을 봐야 하나씩 익히기 시작하는 것 같다. 발전을 위해서는 모질라나 구글링을 통해 다양한 메소드 들을 찾아보고 쉬운 예제들을 가끔 해보는 것이 필요함을 느꼈다.


문제를 풀던 중, 문자열에서 성과 이름을 분리하는 과정을 거칠 때, 나는 정규표현식을 사용하여, match를 통해 이름을 골라낸 다음 소팅하려고 했었다. 이 방식은 내가 아직 정규표현식에 미숙하여 이름 전체를 정규표현식으로 캐칭하지 못하고 이름의 일부만 찾아서 소팅하는 방식을 사용해, 완전하다고 보기 힘들고 코드가 길어졌다.
솔루션의 경우, split()메소드로 ,을 기준으로 분리하여, 디스트럭쳐링 구문을 사용함으로 훨씬 코드가 간단하고, 분리가 쉬워졌다.

    const [aLast, aFirst] = lastOne.split(', ')

이외에도, 아직 자바스크립트의 내장객체 메소드들에 대해 부족한 것이 많고 더 알아봐야 겠다는 반성을 하게되는 챕터였다.

  ***


  05. flex-pannel-gallery


  이번 방법에서는 css transform 을 통해 translate 애니메이션을 만든 다음, addEventListener를 통해 클릭이벤트 발생 시 해당 애니메이션을 실행하는 방법을 썼다.
  내 방식에서는 각 패널에 일일이 이벤트를 부여하는 방식을 썼었으나, 솔루션 방식에서는 nodelist의 forEach메소드를 사용했다. 이것이 훨씬 직관적이고 코드가 간단하였다.


  또한 부모가 flex box일때, 자식 노드들도 flex를 선언해줘야 함을 알았다. 이전에는 계속 습관적으로 붙혔었는데, 이제는 이유를 알게 되었다. 선언하지 않으면 그냥 block박스인 것이다. (하지만 flex의 속성을 적용하면 일부 먹는 것이 있다.)


  그리고 transform이 발생하여 애니메이션이 실행될 때, transitionend에서는 변하는 것들이 다 들어간다. (이번 예제에서는 flex-grow와 font-size이다.) 따라서 transitionend 이벤트에 핸들러를 추가할 때에는 그것중 하나를 셀렉트 해줘야 한다는 것을 알았다.


***


06. type-ahead


이번에는 글자를 form에 타이핑하면, 해당하는 글자를 포함한 리스트들을 보여주는 방식을 코딩했다. 흔히 검색엔진에서 사용하는 방식이였다. 놀라운 것은, 나는 이것을 rxjs라고 하는 리액티브 프로그래밍 라이브러리를 사용해서 구현한다고 알고 있었는데, 순수 자바스크립트로도 구현이 가능한 것이 놀라웠다. 물론 fetch API를 통해 json파일로 해당 데이터를 불러오고, 그것을 정규표현식을 통해 파싱한 다음, 배열에 필터를 적용했고, 그 필터된 배열에 map을 통해 템플릿 리터럴로 html코드를 스트링 타입으로 변환한 다음 이것을 리턴하여 ul태그의 innerHTML에 넣어서 리스트를 만들었다.

여태까지 비록 많은 편을 수행하진 못했지만, 이번 문제가 가장 인상적이였다. 순수 자바스크립트의 힘을 느꼈달까. 뭔가 요즈음 다양한 라이브러리들이 많이 나오고 있는데, 사실 기본에 충실하면 다 커버할 수 있다는 점을 깨닫게 해 주었다.


이번 문제를 통해 정규식에 변수를 넣는 법을 배웠다. 예전에 공부하면서 궁금했던 내용이였지만, 검색해도 잘 안나오길래 잠깐 잊고있었는데, 이번에 확실히 알게 되었다. new RegExp 생성자를 통해 변수를 프롭으로 넣어주면 되는 것이였다.


또 html문법을 리턴하는 것이 리액트의 jsx와 비슷하였지만, 스트링을 리턴하고 innerHTML에 넣는 방식으로 dom을 새로 그리는 방법도 있다는 것을 알게 되었다. 만약 프로젝트의 규모가 커지게 된다면, (예를들어 검색엔진 같은 경우) 리액트가 이 방식보다 더 적절할까? 사실 유지보수의 측면에서는 리액트로 통일하는 것이 더 편할 것 같으나, 성능적인 차이에서는 확신하기 어렵다.

*웹으로 검색해본 결과, innerHTML의 경우는 xss 이슈에서 취약하다고 한다.  

*fetch API는 프로미스를 리턴한다.

*웹API는 컨텐츠가 하드웨어나 데이터저장소에 접근하기 위한 기기전환, 접근 API들의 모음이다.


***


07. array-cardio-day-2



이번 과제는 배열의 메소드를 배우는 시간이였다. some(), every()의 메소드는 처음 공부할 때 배우고는 그 이후로 써먹지 않았던 것이였는데, 이번에 다시 상기시켜 줘서 좋았다.


그리고 마지막 문제에서 redux의 경우 원본을 유지하면서 새로운 배열은 만드는 방법으로

    const index = comments.findIndex((comment)=>comment.id==823423)
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index+1)
    ]

이 방식을 사용했는데, 실제로 쓰이고 있는지 궁금하다.
내 생각에는 filter()를 사용하는 것이 더 효과적일 듯 한데 왜 filter()를 안썼는지...

        console.table(comments.filter((comment)=>comment.id !== 823423))

filter()의 경우도 원본유지가 되기 때문이고, 위의 코드보다 훨씬 간단하다.


***

08. fun-with-html-Canvas



이번 문제는 html5의 canvas태그를 통해 마우스로 선을 그리는 것을 코딩했다. canvas는 처음 공부할 때는 그리 중히 여기진 않았는데, 이것저것 혼자 공부하다 보니 몇번 보게 되어서 최근들어 많이 살펴보았다.


문제의 솔루션에서는 디스트럭쳐링 구문으로 최근 위치를 이전 마우스의 오프셋 위치로 정하였는데, 이를 draw() 함수 내부에 정의하는 과정에서, 밖의 이벤트리스너의 함수와 중복되면서 그것이 프로퍼티 처리가 되어 오류가 났다.

    [lastX, lastY] = [e.offsetX, e.offsetY]

![08_errorImg](imgs/08_errorImg.png)

따라서 디스트럭쳐링이 아닌 다음과 같이 풀어 쓰는 것이 의도한 결과를 내었다.

    lastX = e.offsetX
    lastY = e.offsetY


또한 내 방식으로는 mouseover이벤트에 처리하여

    cvs.addEventListener('mousemove', (e)=> {
      lastX = e.offsetX
      lastY = e.offsetY
    })

이러한 방식을 사용했는데, 솔루션에서는 mousedown을 사용하여, 한번 클릭했을 때 점이 찍히고 안찍히고의 차이인줄 알았지만, mousedown이였을 때도, 한번 클릭시 점이 찍히지 않았다. 이는 lastX와 lastY가 아직 위의 오프셋으로 초기화되지 않았기 때문이라고 생각한다. //이것이 아니라 moveTo와 lineTo가 동일하여 path가 찍히지 않았던 것이다.



***


09. dev-tools-domination


이번 문제에서는 console 객체의 여러 메소드 들을 살펴봤다. 기존에 알고있던 .log(), .table(), .time(), .timeEnd(), .groupCollapsed(), .groupEnd(), warn(), info(), error() 가 있었고, 추가로 알게 된, assert(), count()등이 있었다. 이러한 것들은 디버깅 시 활용하면 유용하게 쓰일 수 있는 메소드들이다. 물론 lint등의 디버깅 툴을 쓰기도 하지만, 문법적인 것들만 걸러줄 뿐, 실제로 내가 원하는 결과를 제대로 담고 있나, 데이터가 제대로 바인딩 되었나를 살펴볼 때에는 이런식으로 콘솔에 찍어보는게 가장 간편하고 정확한 방식인 것 같다.



***

10. hold-shift-and-checkboxes



이번 문제는 정말 골머리가 썩었다... 시프트 키를 누르고 있는 동안 다른 체크박스를 클릭하면 이전에 체크한 것과의 사이의 체크박스들이 모두 다 체크가 되게 하는 기능을 구현하는 것이였는데, 나는 처음에 이 문제를 접하고 input태그의 checked속성을 몰라서, 우선 class로 .checked를 만들고 여기에 체크가 된다면 들어가 스타일룰을 넣고, 이벤트 리스너로 인풋태그를 클릭시 checked클래스를 classList.add(), classList.remove()를 통해서 적용하도록 기본 세팅을 바꾸었다.



그러나 여기까지는 좋았으나, 다음 시프트 멀티 체킹 기능을 구현함에 있어 문제가 있었다. 이벤트 리스터를 통해 시프트키가 눌러져 있는 동안, keydown이벤트로 시프트 변수를 true로 놓고, keyup이벤트시 다시 false로 바꾸는 방식으로 시프트 키 홀딩을 만들었고,
이것이 true인 동안 인풋태그에 새로운 이벤트 리스너를 넣어서 첫 클릭과 다음 클릭 사이의 인풋 태그의 부모에 class를 추가하는 방법을 구현했다. 
처음에는 이 방식은 성공적이였다. 그러나 체크박스의 체크표현이 되지 않았고, keyup이벤트시 다시 위에서 새로 부여한 이벤트리스너를 초기화해야 하는데, 이에 실패했다.


이유는 우선 그 위에 그냥 addEventListener를 새로 했을 시에는 이벤트가 중복적용이라 그런지 원하는 뷰를 그리지 못했고, 또한 removeEventListener 메소드를 사용하고자 하였으나, 익명함수가 아닌 밖에서 선언한 함수를 호출할 때에는 map의 인수로 들어간 인덱스 변수를 해당 함수의 매개변수에 넣기를 실패했기 때문이다. 

위에서 첫번째 기능구현엔 성공하였더라도, 반복문과 조건문이 많아서 가독성이 떨어지는 코드였다.
그러나 input태그의 checked속성과 이벤트가 가진 shiftKey 속성을 알고 있었으면, 정말 간단하게 구현이 가능한 기능이였다. 위의 이벤트 리스너 중복과 초기화 문제를 전혀 겪지 않고 간단한 코드 몇줄로 구현이 가능했다.


아직 내가 기본적인 내장객체와 dom 엘리먼트에 대해서 잘 알지 못하고 있었다... 자주쓰는 메소드들만 외우다 보니 커버리지가 작아지는 것 같다. HTML의 태그와 기본 이벤트의 프로퍼티들을 자주자주 찾아봐야 겠다..


***


11. custom video player


저번 문제에서 배운 교훈이 있어서 이번 문제는 꽤나 수월하게 해결했다. video태그의 내부 속성을 console에 로깅하여서 내부 프로퍼티를 확인하였고, 또 mdn문서를 통해 메소드를 확인하였다. 하지만 솔루션과의 차이는 코드의 길이였다. 확실히 솔루션의 방식이 정말 짧고 간단한 코드로 이루어져 있었다. 처음 보는 방식의 코딩컨벤션도 있었다.

    progress.addEventListener('mousemove',(e)=> mousedown && scrub(e))

이런 방식으로, mousedown이 참인 경우만 scrub(e)함수를 실행한다는 컨텍스트를 처음 보았다.
이외에도, 내 코드보다 훨씬 짧게 코딩한 경우는, 같은 메소드를 사용하는 경우, 각각 이벤트리스너를 준게 아니라, dom 엘리먼트를 불러올때 아예 노드리스트로 불러와서 forEach()를 통해 부여한 경우이다. 훨씬 직관적이고 깔끔해보였다.

    skipButtons.forEach(button => button.addEventListener('click', skip))


이외에도 알게 된 사실이나 중요한 부분들을 짧게 메모하겠다.

* data-* attr에 숫자를 넣으면 나중에 쓸때 parseInt나 parseFloat 해줘야함
* textContent를 쓰는게 좋다. innerHTMl은 파싱에 의한 성능상의 단점, xss이슈등이 있고, innerText는 스타일링이 되어 레이아웃이 변할수도 있다.
* querySelector는 대상이 여러개 있을 시 맨 앞줄의 것만 셀렉팅된다.



***


12. key sequence detection


이번 문제는 딱히 많은 내용이 없었다. splice를 사용하는 솔루션의 방식 보다, 내 방식이 코드는 한줄 더 길지만, 직관적이고 이해하기 쉬운 듯 하였다. 

    //솔루션
    pressed.splice(-secretCode.length-1, pressed.length - secretCode.length)


    //내방식
    if(pressed.length == secretCode.length+1){
        pressed.splice(0,1)
    }



***

13. slide in on scroll


이번 문제를 풀면서 윈도우의 위치 관련 프로퍼티들이 헷갈리는게 많았다.
innerHeight, innerWidth는 말그대로 브라우져 윈도우의 내경을 뜻하며,
outerHeight, outerWidth는 외경이다.
scrollY 는 윈도우 내경의 위끝부터 스크롤한 위치이며, pageYOffset과 설명상 차이는 없는 듯 싶다.
또한 내부 엘리먼트의 offsetTop은 top과 내경의 위끝의 거리차이다.


그리고 디바운서 함수를 사용했는데, 이는 일정 시간차를 두고 함수를 실행하는 방식으로,
프론트엔드에서는 주로 ajax 요청시 너무 많은 데이터를 요청하는 것을 방지하기 위하여 쓴다.
예를 들면 검색어 자동완성에서 마 키다운시 리퀘스트를 보내게 되면 트래픽이 상당히 늘어날 것이다.



***

14. javascript reference vs. copy


이번 문제는 자바스크립트의 근본적인 이야기였는데, 참조와 복사에 관한 내용이였다.
어떤 타입의 변수를 만들고, 그 변수를 다른 변수에 지정해 줬을때,


number, string, boolean 타입은 복사가 되어서, 지정한 변수를 변경해도 원본 변수의 값은 변하지 않는다.


그러나 array와 object 타입은 복사가 아닌 참조가 되어서, 지정한 변수를 변경하면 원본 변수의 값도 변하는 일이 생긴다.


불변성을 유지시켜 주기 위해 배열에서는 다음과 같은 방법이 쓰인다.

    original.slice()
    [].concat(original)
    [...original]
    Array.from(original)

객체에서는 다음과 같은 방법을 쓴다.

     Object.assign({}, original, {toChange : 3})
     //이 경우는 1레벨 뎁스밖에 커버하지 못한다. 이를 피하기 위해 JSON 객체를 이용한다.
     JSON.parse(JSON.stringify(original))


***


15. localstorage and event delegation


이번 문제는 이벤트 위임과 로컬스토리지에 대한 문제였다.
웹 브라우져가 데이터를 저장하는 곳은 3가지가 있는데, 쿠키, 로컬스토리지, 세션스테이지가 있다. 처음 나왔던 것은 쿠키인데, 쿠키는 4kb짜리 데이터 저장소로, 용량이슈(너무 작다), 성능이슈(매 http요청마다 같이 날라간다), 보안이슈(따로 암호화를 거치지 않는다)가 있어서 문제가 되어 왔다. 이것의 단점을 보완한 것이 스토리지로, 로컬스토리지의 경우는 따로 지우지 않는 한 영구적으로 저장되고, 세션스토리지의 경우는 브라우져 창을 닫게되면 삭제된다.


이번 문제를 풀면서, 이런 것처럼 데이터가 자주 변하는 페이지를 할 때는, 바닐라 자바스크립트로도 구현이 가능하지만, 매 이벤트 발생 마다, itemsList dom 을 전체적으로 렌더링 하게 된다. 이는 성능상에 있어서 문제가 될 수 있다. 리액트의 경우, 컴포넌트 단위로 렌더링 한다는 것의 이점을 여기서 찾아볼 수 있다. 


***


16. mouse-move-shadow


이번 문제는 마우스 이동에 따른 텍스트 그림자 변화인데, 텍스트 엘리먼트의 offsetTop, offsetLeft 와 마우스의 offsetX, offsetY를 이용해서 비율처리해서 style.textShadow 에 템플릿리터럴로 넣어주면 되는 문제다.


여기서 주의할 것은 이벤트 발생 시, e prop의 this는 이벤트리스너가 부여된 엘리먼트 something.addEventListener의 경우 something에 해당하고, e.target은 해당 이벤트가 발생한 엘리먼트로, 캡쳐링(옵션에 따라 버블링)에 의해 자식엘리먼트(혹은 부모엘리먼트) 중 하나가 될 수도 있다.


***


17. sort without article


이번 문제는 배열을 소팅하는 문제인데, 배열의 요소에 the, a, an 등의 접두사를 제외하고 나머지를 알파벳 순으로 정렬하는 것이 문제였다. 
내 방식은 for문을 통해 배열의 각 요소에 the, a, an 이 있는지 각각 확인하고, 있다면 새로운 배열에 이 부분을 제거하고 넣은 뒤, 루프를 다 돌고 완성된 배열을 알파벳 순으로 정렬하여, 이것을 ul태그의 innerHTML에 넣어주었다.


그러나 이 방식에는 치명적인 것이 있었는데, 바로 정렬된 요소는 the, an, a가 제거된 상태였다는 것이다. 빼고 정렬하는 것에 집중한 나머지, 원본을 유지하는 것을 잊고 말았다. 


솔루션의 경우는, 그렇게 위의 the, a, an을 뺴는 것을 함수로 만들고, 소팅하는 과정에서 요소에 함수를 입혀 비교하는 방식으로, 원본이 유지되는 방식이였다.

어떤 문제를 해결함에 있어, 주어진 문제를 어떻게 해결하는 가도 중요하지만, 그것이 최종적으로 어떻게 보여질 지를 한번 더 생각해 봐야 한다.



***


18. adding up times with reduce


이번 문제는 별로 어렵지 않았다. 배열의 reduce메소드를 사용하여 총합을 구하는 문제였다. 

여기서 얻어가는 것은 map()의 용법에서 map()의 인수로 함수를 바로 호출할 수 있다는 것이다. map(parseFloat)이런 식으로 하면 배열의 각 요소에 이 함수를 호출한 결과가 저장된다.

또한 역시 디스트럭쳐링 구문을 이용하는 것이 훨씬 간단한 정의가 되는 경우였다.
```
const [ mins, secs ] = timeCode.split(':').map(parseFloat)
```

이 경우를 보면 2:34 인경우 mins, secs 에 각각의 숫자가 들어간다.


내 방식의 풀이도 에러가 있지는 않고, 예외처리의 면에서는 더 나은 코드라고 볼 수 있으나, 그 깔끔함은 솔루션에 비할 바 못하다고 생각한다.
이런 식으로 모던하게 짤 수 있도록 더 노력해야 겠다. es6의 문법을 통해 더 간단하게 표현될 수 있는데, 배웠는데도 불구하고 쓰지 못하는 것은 숙련의 문제이다. 더 공부해야 겠다.

***


19. webcam-fun


이번 문제는 웹캠을 이용하는 것이였다. 나는 웹 API중 navigator객체의 속성을 통해, 브라우져가 클라이언트의 디바이스에 접근할 수 있다는 것을 처음 알게 되었다. navigator.mediaDevices.getUserMedia() 메소드는 프로미스를 반환하며, MediaStream이라는 객체를 디바이스 미디어 인풋 결과로 받는다. 
해당 문제의 URL.createObjectURL()은 곳 deprecated될 것이기 때문에, 다음과 같이 써주는 것이 좋다.

```javascript
try{
    video.srcObject = localMediaStream
}catch(e){
    video.src = window.URL.createObjectURL(localMediaStream)
}
```

또한 HTML 태그의 download 어트리뷰트는 처음 사용해 보았으며, insertBefore(some, other.firstChild)를 통해 첫번째 자식엘리먼트로 넣는 방법도 사용해 보았다.
canplay 이벤트는 비디오나 오디오 태그에서 브라우져가 재생할 준비가 되면 발생하는 이벤트이다.

픽셀의 경우 data로 표현될 때, unit8ClampedArray 의 형태로 받아지며, 배열의 메소드는 사용할 수 없는 유사배열이다. 
[ rgbargba.... ] 의 순서로 반복되는 형태를 지니고 있다.



***


20. speech-detection



이번 문제는 언어 인식에 관한 웹api의 사용이였다. speechRecognition 객체를 사용했다.

```javascript
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
```
웹킷을 쓰는 파이어폭스와 크롬에서는 뒤의 구문을 써야한다.

생각보다 음성인식을 구현하기에는 내장객체를 활용해서 쉽게 만들었지만, 실제 구현한 결과를 보았을 때, 인식률이 뛰어나지 않았다. 그냥 기본적인 원리를 배운 느낌이였다.





***

21. geolocation


이번 문제는 navigator객체의 geolocation 프로퍼티의 메소드를 활용하여, 나침반과 속도계를 만드는 것이였다.
예제에서는 xcode의 시뮬레이터 기능을 활용하여, geolocation.watchPosition() 메소드의 결과로 heading, speed데이터를 받을 수 있었지만, 그러나 최근 배포된 버전의 xcode는 이런저런 말이 많아 사용하지 않고 있어서, 그냥 시뮬레이션 기능 없이 이 데이터에 이러한 값을 받을 수 있구나 정도만 알고 넘어갔다.

navigator 객체는 브라우져의 정보를 가지고 있는 객체라고 알고 있었고, 실제로 가장 많이 쓰이는 프로퍼티는 userAgent였다. (저번에 language 프로퍼티를 한번 보았다.) geolocation 객체가 위치정보를 받아올 수 있다는 것을 알게 되었고, 만약 모바일로 접근하여, 기기의 gyro센서와 속도센서를 활용한다면 이 기능들을 사용할 수 있어 보인다. 



***

22. follow-along-link-highlighter


이번 문제는 a 태그의 커서를 올렸을 경우, 전에 위치했던 자리에 있던 하이라이트가 따라 움직이는 기능을 구현하는 것이였다. 사실 처음 보았을 때, mouseenter 이벤트시 classList.add를 하여 추가하면 될거라 생각했지만, 이렇게 되면 따라 이동하는 것이 아니라 원래 것은 유지되면서 새로 나타나는 것이 된다. 원래거야 지워주면 된다지만, 탐색이 들어가 코드량이 많아지고, 또한 의도했던 '따라 움직이는' 듯한 애니메이션이 나오지 않는다. 이를 애니메이션 하려면 위치를 옮겨줘야 하는데,

여기서 Element.getBoundingClientRect() 메소드가 사용된다. 이 메소드는 엘리먼트의 크기와 위치정보 데이터를 반환하는데, 각 a 태그에 이 정보를 사용해서 z-index가 -1인(하위인) 새 inline 태그 (ex. span)을 사용하여 그 위치에 덮는 것이다.(z-index가 상위면 글자를 덮는다.)


또한 나는 디폴트값으로 home에 이 하이라이트가 가 있는 것이 뭔가 사용자경험에 더 맞다고 생각하여 이 기능을 추가했다.


***


23. speech-synthesis


이번 문제에서는 웹 speech Api의 speechSynthesis 객체를 이용하여, 텍스트리더 기능을 추가하는 것을 배웠다. 
우선 SpeechSynthesisUtterance 생성자를 통해 인스턴스를 만든 다음, 인스턴스의 text, pitch, rate, voice 를 정하는 것이였다.


솔루션에 있던 문제는, setVoice() 함수를 만들 때, msg.voice 에 this.value 를 넣었는데, 이 값은 Alex (en, EN) 이런 형식으로 되어있어서, 제대로 voice를 인식하지 못하는 문제였다. 따라서 다음과 같이 바꿔줌으로써 문제를 해결하였다.

```javascript
msg.voice = voices.find(voice => voice.name === this.value.split(' ')[0])
```

***



24. sticky-nav



이번 문제는 sticky navigator 를 만드는 문제였다.
처음에 내 방식대로 했을 때는 스티키 메뉴에 FOUC가 생겼었다. 이후 수정하긴 했지만, 이 원인은 addEventListener의 콜백함수 내부 조건문에서, nav.offsetTop과 window.scrollY를 비교했는데, 이 경우 scroll이벤트가 발생할때마다 nav.offsetTop을 불러오는 과정에서 비동기적으로 진행되다 보니 그런 것 같다. 먼저 계산해서 결과값을 내버리는 것이다. 따라서 이 경우 const 로 상수 하나를 만들어내어, 그것과 window.scrollY를 비교하니 해결되었다.
<br />
<br />
또한 솔루션에서는 nav태그에 position: fixed를 주고 이것으로 바뀌었을때, body의 padding-top을 nav.offsetHeight 만큼 주는 방식으로 구현했다. 하지만 position: sticky 를 사용하면 이 과정을 거치지 않아도 된다.
<br />
<br />
그리고 자바스크립트로 css를 제어하여 애니메이션을 만들 때, something -> none이나 auto로 바꾸면 애니메이션이 진행되지 않는다. something -> the other(특정한 값) 으로 바꿔줘야 애니메이션이 적용된다.

또한 width를 변화시키는 것도 효과가 없으며, max-width 를 사용해야 한다.

***



25. event-propagation


이번 문제는 이벤트의 전파. 캡처링, 버블링에 대해 살펴본 것이다.


기존에 이 부분은 공부해서 익혔던 부분이라 다시 되짚는 개념으로 보았지만, 새로 알게 된 것은 addEventListener의 3번째 아규먼트에 capturing 뿐만 아니라 once라는 옵션이 있다는 것이다!!


저번에 개인적으로 공부하면서 뭐 만들 때, addEventListener 만들고 removeEventListener로 일일이 지워줬었는데, 이를 미리 알았으면 좋았을 뻔 했다..


또 e.stopPropagation 을 주고, capturing: true 로 주었을 때, 가장 밖에 있는 이벤트가 발생하고 캡쳐링이 되지 않는다는 것은 되짚어볼만 했다.

***



26. stripe-follow-among-dropdown


이번 문제는 저번에 했던 22번 문제의 연장이였다. 22번 문제에서 드롭다운 메뉴를 호버링 했을때 나타나는 애니메이션을 추가하는 것이였다. opacity: 0; display:none; 을 각각 1과 block 인 class 선택자를 만들고, 그것을 mouseenter 이벤트 발생시 classList.add()메소드를 통해 추가하고, mouseleave이벤트 시 classList.remove()메소드를 통해 제거하면 되는 것이였다.


다만 주의할 점은, getBoundingClientRect()메소드를 통해 해당 노드의 위치-크기정보를 불러왔을 때, 이것은 해당 노드의 절대값이고, 스타일링 값에 넣을 때에는, 해당 부모 엘리먼트를 기준으로 적용되기 때문에, 부모 엘리먼트의 위치를 빼줘야 제대로된 위치에 들어간다는 점이다.


```javascript
        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top,
            left: dropdownCoords.left - navCoords.left
        }
```


***


27. click-and-drag



이번 문제는 클릭한 후 드래그로 스크롤을 움직이는 기능을 구현했다. 이 기능은 핸드폰 등의 터치디바이스의 발달로 인해 필요해진 기능인 것 같다. 이벤트리스너를 통해 간단하게 구현할 수 있었다.


내 방식과 솔루션의 차이는 나는 액티브된 상태의 스타일변화를 하지 않았고, 또한 mouseleave이벤트시 드래그가 끊기지 않게 해놨다. 
하지만 솔루션에서는 그러지 않았다. 또한 나는 scrollBy메소드를 통해 스크롤을 이동하였는데, 솔루션에서는 scrollLeft에 값을 주는 방식으로 스크롤을 움직였다.


***


28. video-speed-control



이번 문제는 비디오 재생속도 바컨트롤로 컨트롤하는 문제였다. 이전에 했던 비디오 컨트롤 문제와 저번에 했던 드래그에 따른 스타일 변화를 합친 문제였다.

***

29. countdown-timer


이번 문제는 기본적인 타이머 앱을 만드는 것이였다.

이번문제를 통해 알게 된 것은 
new Date()와 Date.now()의 차이인데, new Date()는 타임스탬프를 생성하는 생성자 함수이고, Date.now()는 지금 시점을 밀리초로 나타내는 것이다.



또한 submit 이벤트는 발생하면 url에 쿼리로 ?(input태그 name 어트리뷰트)=value 이런식으로 들어간다.


또한 input 태그의 메소드로 .reset()이 있는데 이는 그 안의 값을 초기화 시켜주는 메소드다.



***


30. what-a-mole



대망의 마지막 문제다.

이번 문제는 두더지잡기 게임이였다.


isTrusted 라는 웹api를 처음 보았는데, 이는 이벤트가 user action에 의하여 발생했을 때만 true 값이 반환된다. 이를 이용하여 클릭시 점수가 추가되는 로직이 사용되었다.

그러나 이 로직에는 한계가 있는데, 이는 클릭이 두더지가 올라오지 않은 곳을 클릭해도 점수가 올라간다는 점이다. 
다른 방법이 무엇이 있는지 더 찾아봐야 할 것이다.