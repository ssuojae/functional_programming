//// ====================================
// // POINT 04. Currying
// // ====================================
function _filter(list, predi) {
    var new_list = [];
    _each(list, function (value) {
        if (predi(value)) new_list.push(value);
    })
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function (value) {
        new_list.push(mapper(value));
    })

    return new_list;
}

// For문이라는 명령형대신 _each를 통한 선언형 사용
function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
}
var users = [
    {id: 1, name: 'ID', age: 36},
    {id: 2, name: 'BJ', age: 32},
    {id: 3, name: 'JM', age: 32},
    {id: 4, name: 'PJ', age: 27},
    {id: 5, name: 'JE', age: 36},
    {id: 6, name: 'HA', age: 25},
    {id: 7, name: 'HI', age: 26},
    {id: 8, name: 'MP', age: 31},
    {id: 9, name: 'DI', age: 23},
];

function _curry(fn) {
    return function (a) {
        // 첫 번째 인자를 받으면 두 번째 인자를 기다리는 함수 반환
        return function (b) {
            return fn(a, b); // 두 번째 인자를 받으면 본체 함수 실행
        }
    };
}

// curryr을 활용하면 순서를 바꿀 수 있다.
// 실제 사용할 경우 유저의 이름 찾는 함수를 먼저 선언하고
// 다음에 어떤 유저 데이터를 넣어도 수행함으로써 변하는 데이터를 이후에 평가하는 함수형 특징
function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2
            ? fn(a, b)
            : function (b) {
                return fn(b, a)
            }
    }
}


// 커링은 본체 함수를 값으로 들고 있다가 원하는 시점에 최종적으로 평가한다.
var add = _curry(function (a, b) {
    return a + b;
});

var add10 = add(10);
console.log(add10(5)); // 15
console.log(add(5)(3)); // 8

var sub = _curry(function (a, b) {
    return a - b;
});

console.log(sub(10)(5)); // 5
var sub10 = sub(10);
console.log(sub10(5)); // 5


var sub2 = _curryr(function (a, b) {
    return a - b;
})

console.log(sub2(10)(5)); //-5

// get함수 OOP에서 FP로
function _get2(obj, key) {
    return obj == null
        ? undefined
        : obj[key];
}

var user1 = users[0];
console.log(user1);
console.log(_get2(users[10], 'name'));

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
})


// 다형성이 적용되는 구조는 최대한 평가시점을 늦춰야한다는 발상이 중요하다.
// 이는 cuuryr을 통해 순서를 바꿈으로써 적용가능
var get_name = _get('name');
console.log(get_name(users[2]));
console.log(get_name(users[3]));


// 기존에 map을 이용했던 코드도 훨씬 간결하게 표현 가능
console.log(
    _map(
        _filter(users, function (user) {
            return user.age >= 30;
        }),
        function (user) {
            return user.name;
        }
    )
)

console.log(
    _map(
        _filter(users, function (user) {
            return user.age >= 30;
        }),
        _get('name')
    )
)
