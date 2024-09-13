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


<br/>
<br/>

#### #5. 데이터 구조에 대한 평가시점을 최대한 뒤로 미루어 처리한다.

```javascript
_map = _curryr(_map);

function _identity(val) {
    return val;
}

var _values = _map(_identity);

console.log(_values(users[2])); // [3, 'JM', 32]
```

- 데이터 구조 평가 시점을 뒤로 미룰수록 다형성이라는 이점이 취해진다.
- 즉 어떤 데이터가 오든 일단 로직들이 먼저 오고 만들어진 로직에 데이터를 마지막에 넣는 것이다.
- 여기서 중요한 함수가 바로 `curryr` 과 같은 함수다.
- 인자값으로 (데이터,함수)가 들어오면 `curryr`이 내부에 있으면 먼저 함수부터 넣고 일급시민으로 가지고 있다가 마지막 실제 활용할 때 데이터를 넣는다. 

<br/>
<br/>


#### #6. 컬렉션 중심 프로그래밍에는 대표적으로 4가지 유형 함수가 있다.

1. 수집하는 함수 - `map`, `values`, `pluck`
2. 거르는 함수 - `filter`, `reject`, `compact`, `without`
3. 찾아내는 함수 - `find`, `some`, `every`
4. 접는 함수 - `reduce`, `min`, `max`, `group_by`, `count_by`

- 위의 함수일수록 추상화 레벨이 높다.
- 특히 어떻게든 들어오는 어떤 데이터 구조에 대응하기 위해서 별것 아닌것처럼 보였던 identity 함수 사용이 중요했다.
- 위 4가지 유형에 유의하여 어떤 문제를 만났을 경우, 데이터를 어떻게 "수집하여", "거르고", "찾아내어", "접어버릴건지" 사고하는게 중요하다.

<br/>
<br/>

#### #7. go함수를 통해 파이프라인을 구축해서 로직을 저장하고 쓸 수 있다.

```javascript
// go 함수 구현
const go = (...args) => args.reduce((acc, fn) => fn(acc));

// 예제 데이터
const numbers = [1, 2, 3, 4, 5];

// 파이프라인으로 숫자 처리하기
const result = go(
numbers,
nums => nums.map(num => num * 2),     // 모든 숫자를 2배로
nums => nums.filter(num => num > 5),  // 5보다 큰 숫자만 필터링
nums => nums.reduce((a, b) => a + b)  // 남은 숫자의 합 구하기
);

console.log(result);  // 36
```
- 마치 피라미드를 쌓듯이 작은 조건 순수함수들을 가지고 더 큰 로직들을 파이프라이닝을 통해 구축할 수 있다.
- 이렇게 파이프라인 함수형 프로그래밍은 데이터 처리를 일련의 함수들로 연결하여, 데이터를 순차적으로 변환한다.

<br/>
<br/>

#### #8. 끝을 내는 함수들 (take, some, every, find) 을 사용할 때 지연평가를 하면 연산횟수를 줄일 수 있다.

```javascript
// 지연 평가용 go 함수 정의 (제너레이터 기반)
const goLazy = (...args) => args.reduce((acc, fn) => fn(acc));

// 제너레이터를 사용한 지연 평가 map 구현
function* lazyMap(iterable, mapper) {
    for (const value of iterable) {
        yield mapper(value);
    }
}

// 제너레이터를 사용한 지연 평가 filter 구현
function* lazyFilter(iterable, predicate) {
    for (const value of iterable) {
        if (predicate(value)) {
            yield value;
        }
    }
}

// 지연 평가로 n개의 요소만 반환하는 take 구현
function* lazyTake(iterable, n) {
    let count = 0;
    for (const value of iterable) {
        if (count++ >= n) return;
        yield value;
    }
}

// 데이터를 처리하는 지연 평가 함수
function processDataLazy(numbers) {
    return goLazy(
        numbers,
        nums => lazyMap(nums, n => n * 2),                // 각 숫자를 두 배로
        nums => lazyFilter(nums, n => n % 3 === 0),       // 3의 배수만 필터링
        nums => lazyTake(nums, 5)                         // 앞 5개만 가져오기
    );
}

const numbersLazy = Array.from({ length: 1000 }, (_, i) => i + 1);

// 결과 출력 (지연 평가)
console.log([...processDataLazy(numbersLazy)]);  // 출력: [6, 12, 18, 24, 30]
```

- 예를들어 어떤 배열이 맵 -> 필터 -> take 연산을 거친다고 생각해보자
- 이전 고차함수에서는 전체 배열을 맵하고, 또 전체 배열을 필터링하고 필터링된 전체 값중에서 take하는 방식이였다.
- 지연평가 개념을 사용하게 되면 원소 하나씩 맵 -> 필터 -> take를 거침으로써 만약 take(5)라면 최소 5번만에 연산을 끝내버린다.
- 이러한 연산이 가능한 이유는 함수들이 오직 순수함수로 짜여져있기 때문이다.
- 기존 전체데이터를 처리하고 -> 또 다음 로직을 실행하고 라는 연산 순서에서 부분부분을 주어진 로직에 직렬적으로 통과시키는 게 중요한 이유는 단순히 연산 순서를 줄어주는 것 뿐만 아니라 데이터 병렬처리에서 엄청나게 큰 이점을 가져다 준다. 예를들어 구글의 map-reduce같은 대용량 처리방식도 데이터를 쪼개고 각 쪼개진 데이터를 분산처리하고 이를 합치는 방법을 자바스크립트(혹은 다른언어도)에서도 지연평가를 통해 이를 간결하게 표현할 수 있게되는 것이다.

