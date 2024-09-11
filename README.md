## Category Theory for Programmer

- [이론 살펴보기](https://github.com/ssuojae/functional_programming/blob/main/category_theory.md)

<br/>

## Fundamental

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
- 절차형은 평가시점에 따라 결과값이 달라진다.

<br/>

```javascript
function add(a, b) {
    return a + b;
}

console.log(add2(10, 2)); // 32
console.log(add2(10, 2)); // 32
```
- 반면 순수함수로된 FP는 평가시점과 관계없이 결과값이 같다.
- "데이터 구조"가 먼저 선언되는 것이 아닌 "함수"가 중심이 되어야한다.
- 위와 같이 평가시점이 결과에 영향을 미치지 않기 때문에 조합성을 증대시킨다.

<br/>
<br/>

#### #2. 함수내에서 조건에 따른 처리를 함수 인자를 통해 처리한다.

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

<br/>

```javascript
var users = [
    {id: 1, name: 'ID', age: 36},
    {id: 9, name: 'DI', age: 23},
];

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

#### #3 .함수 내부에서는 데이터 구조가 드러나서는 안된다.

```javascript
var users = [
    {id: 1, name: 'ID', age: 36},
    {id: 9, name: 'DI', age: 23},
];

function _map(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}

var over_30 = _filter(users, function (user) {
    return user.age >= 30;
});

console.log(over_30);

var names = _map(over_30, function (user) {
    return user.name;
});

console.log(names);
```
- 기존 절차형에서는 함수에서 데이터 구조를 알고 구조에 따른 조건을 걸어 처리했다.
- 반면 함수형은 함수 내부에서 들어오는 데이터에 구조를 알아서는 안된다.
- `map`함수의 내부에서는 `list`가 어떤 데이터 구조인지 알 수 없다.
- 단지 "데이터"와 어떻게 처리할지에 대한 "함수"를 인자로 받는다.

<br/>

<img src="img_1.png" width="450"><br/>
(Grokking Simplicity - 에릭 노먼드) 
<br/>
- 이렇게 되다보니 자연스럽게 함수들 사이에 계층구조가 생기게 된다.
- `map`, `filter` 에서는 함수를 인자로 받아 조건을 처리해주었었다.
- 이러한 고차함수는 가장 상위 함수 계층에 위치하게 된다.
- 함수 본인은 또다른 함수에 들어가 얼마나 구체적인 동작/조건을 처리해주냐에 따라 계층이 만들어진다.


<br/>
<br/>

#### #4. 함수와 메서드는 다르다. 엄격하게 말하자면 메서드는 FP에 위반된다.



#### #5. 데이터 구조에 대한 평가시점을 최대한 뒤로 미루어 처리한다.


