# Prototype, Constructor
> https://velog.io/@surim014/JavaScript-prototype-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-eck1t3u85q

생성자 함수란?
- 함수임 & JS에선 함수도 객체다. & 객체는 key, value를 가질 수 있다. (JS는 null과 undefined외엔 모두 객체로 취급함)
- 즉, key,value를 갖는 함수임.

함수에 key, value?
- 모든 함수엔 항상 prototype이란 속성이 자동 탑재돼있음.
    ex. 배열 생성시에도 arr1로 생성하는 경우도 내부적으론 arr를 거쳐 생성된다.
	```js
	var arr1 = [];
	var arr2 = new Array();
	```
	ex. 함수 생성도 생성자 함수를 이용해서 만드는 것과 같은 효과가 난다.
	```js
	function foo1(){};
	var foo2 = new Function();
	```

prototype?
- JS에서 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있으며 이것은 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 `Prototype`이라 한다.
- JavaScript에서의 모든 객체는 항상 생성자 함수를 이용해서 만들어지는 것과 같다고 볼 수 있다. 숫자나 문자열, boolean 등 또한 객체는 아니지만 JavaScript 내부적으로 생성자 함수를 통해 만들어지는 것처럼 효과를 나타나게끔 해준다. (new Number(), new Boolean()과 사실상 동일한 효과)

new로 instance생성
- new로 생성된 모든 인스턴스는 prototype에 탑재된 기능을 사용할 수 있게 생성된다.

---
> https://www.nextree.co.kr/p7323/


1. new로 객체 생성:    
   ㄴ Person 프로토타입 객체 내부의 constructor 속성이용
	```js
	var joon = new Person();
	```

2. 프로토타입 객체의 멤버 참조하여 수정하기:  
   ![image1](https://www.nextree.co.kr/content/images/2021/01/hjkwon-140324-prototype-03.png)   
   ㄴ Person 내부의 prototype 속성 이용  
   ㄴ Person.prototype.getType으로 값 가져오기/수정 가능
	```js
	Person.prototype.getType = function() {
		return "인간";
	}	
   	console.log(joon.getType()); // 인간
	```
   ㄴ getType 함수 추가하기 이전에 생성된 joon에서도 getType사용가능!!

3. 생성된 객체의 멤버 참조하여 수정하기:  
	![image2](https://www.nextree.co.kr/content/images/2021/01/hjkwon-140324-prototype-05.png)   
    ```js
	var jisoo = new Person();
	joon.getType = function(){
		return "준";
	}
	console.log(joon.getType()); // 준
	console.log(jisoo.getType()); // 인간
	```
	ㄴ joon객체에 '추가'된 getType() 호출한 것.

4. 생성된 객체에서 프로토타입 참조:
    ![image3](https://www.nextree.co.kr/content/images/2021/01/hjkwon-140324-prototype-06-1.png)  
	ㄴ joon객체의 멤버인 `__proto__`(비표준) 속성이 프로토타입 객체를 가리키는 숨은 링크임.

5. 코드 재사용(classical, prototypal방식)
**classical**
```js
function Person(name) {
	this.name = name || "하늬";	// name 없으면 "하늬"
}

Person.prototype.getName = function() {
	return this.name;
};

function Korean(name){}
Korean.prototype = new Person(); // 부모에 해당하는 함수 Person, 자식 Korean

var kor1 = new Korean();		// Person 프로토타입 객체의 생성자로 생성됨.
console.log(kor1.getName());	// 하늬

var kor2 = new Korean("지수");
console.log(kor2.getName()); 	// 하늬
```  
ㄴ 단점: 
- 부모 객체의 속성, 프로토타입 속성을 모두 물려받게 됨
- **자식 객체를 생성할 때 인자를 넘겨도 부모 객체를 생성할 때 인자를 넘겨주지 못함**(kor2에서 지수대신 기본값인 하늬가 출력되는 이유)

**prototypal (JS에서 선호)**  
부모 생성자를 한 번도 호출하지 않고 프로토타입 객체를 공유    
![image4](https://www.nextree.co.kr/content/images/2021/01/hjkwon-140324-prototype-10.png)
	

```js
function Person(name) {
	this.name = name || "하늬";	// name 없으면 "하늬"
}

Person.prototype.getName = function() {
	return this.name;
};

function Koream(name) {
	this.name = name;
}
Korean.prototype = Person.prototype;

var kor1 = new Korean("지수");
console.log(kor1.getName()); //지수;
```

**prototypal한 방식의 재사용**  
```js
// 부모 객체에 해당하는 person을 객체 리터럴 방식으로 생성
var person = { 
	type : "인간",
	getType : function(){
		return this.type;
	},
	getName : function(){
		return this.name;
	}
};

//자식 객체에 해당하는 han은 Object.create()함수의 첫 번째 매개변수로 person을 넘겨받아 부모객체의 속성을 물려받음.
var han = Object.create(person); 
han.name = "하늬";

console.log(han.getType()); // 인간
console.log(han.getName()); // 하늬
```
