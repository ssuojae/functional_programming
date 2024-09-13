// ====================================
// POINT 04. Currying
// ====================================
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

// For문 대신 _each를 사용
function _each(list, iter) {
    for (var i = 0, len =_get(list); i < len; i++) {
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

// 커링 함수 정의
function _curry(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        }
    };
}

// curryr을 활용한 함수 정의
function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2
            ? fn(a, b)
            : function (b) {
                return fn(b, a);
            };
    };
}

// 커링 예시
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

console.log(sub2(10)(5)); // -5

// get 함수 OOP에서 FP로
function _get2(obj, key) {
    return obj == null ? undefined : obj[key];
}

var user1 = users[0];
console.log(user1);
console.log(_get2(users[10], 'name'));

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
})

// 다형성 적용
var get_name = _get('name');
console.log(get_name(users[2]));
console.log(get_name(users[3]));

// map과 filter를 커링과 함께 사용
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