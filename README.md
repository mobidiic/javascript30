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
