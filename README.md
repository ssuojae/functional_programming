## Category Theory for Programmers - Bartosz Milewski  


<img src="img.png" width="500">

<br/>
<br/>




<br/>

## Fundamental

<br/>

#### #1 .함수형 프로그래밍은 평가 시점으로부터 자유롭다.

```javascript
var c = 10;
function add2(a, b) {
    return a + b + c;
}

// 평가 시점에 따라 값이 다른다는 것을 알 수 있다.
console.log(add2(10, 2)); // 22
c = 20
console.log(add2(10, 2)); // 33
```
- 객체지향은 평가시점에 따라 결과값이 달라진다.

```javascript
function add(a, b) {
    return a + b;
}

console.log(add2(10, 2)); // 32
console.log(add2(10, 2)); // 32
```
- 반면 순수함수로된 FP는 평가시점과 관계없이 결과값이 같다.
- 근본적인 이유는 "데이터 구조"가 먼저 선언되는 것이 아닌 다양한 데이터 구조가 들어올 수 있는 "함수"가 먼저 선언되기 때문이다.
- 위와 같이 평가시점이 결과에 영향을 미치지 않기 때문에 조합성을 증대시킨다.

<br/>
<br/>

#### #2 .함수 내부에서는 데이터 구조가 드러나서는 안된다.

<br/>
<br/>

#### #3. 함수내에서 조건에 따른 처리를 함수 인자를 통해 처리한다.

```javascript
// 30세 이상 유저 뽑아내기
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);
```
- 기존 절차형에서는 함수 내에서 조건문을 위와같이 작성할 수 있다.

```javascript
//predi 함수에게 30세 기준 조건 위임하기 -> 이렇게 함수를 인자로 받는걸 응용형 프로그래밍이라고 함
function _filter(users, predi) {
    var new_list = [];
    for (var i = 0; i < users.length; i++) {
        if (predi(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}

console.log(
    _filter(users, function (users) {
        return users.age >= 30;
    })
);

console.log(
    _filter(users, function (users) {
        return users.age < 30;
    })
)
```


<br/>
<br/>

#### #4. 함수와 메서드는 다르다. 엄격하게 말하자면 메서드는 FP에 위반된다.



#### #5. 데이터 구조에 대한 평가시점을 최대한 뒤로 미루어 처리한다.


