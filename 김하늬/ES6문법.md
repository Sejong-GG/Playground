```js
var name = "glovar var";

function home() {
	var homevar = "homevar";
	for(var i=0; i<100; i++){

	}
	console.log(i);
}
home();
// var와 다르게 let은 블럭스코프(블럭 안에서만 유효)이다.
```
정리
- const를 기보능로 사용한다.(상수)
- 그런데 변경될 수 있는 변수는 let을 사용한다.
- var는 사용하지 않는다.

```js
function home() [
	const list = ["a", "b", "c"];
	list.push("lol");
	console.log(list); // ["a", "b", "c", "lol"]
]
```
- const: 불변의미? x , 재할당만 불가능!

```js
function home() [
	const list = ["a", "b", "c"];
	list2 = [].concat(list, "lol");
	console.log(list, list2);
	console.log(liust === list2); 
	// ["a", "b", "c"]
	// ["a", "b", "c", "lol"]
]
```
- immutable array만들기 (ex:뒤로가기, 앞으로가기)
