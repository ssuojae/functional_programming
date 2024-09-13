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

function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2
            ? fn(a, b)
            : function (b) {
                return fn(b, a);
            };
    };
}

var _map = _curryr(_map),
    _filter = _curryr(_filter);

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
}

// function _reduce(list, iter, memo) {
//     if (arguments.length == 2) {
//         memo = list[0]; // 첫 번째 요소를 memo로 설정
//         list = _rest(list); // 나머지 요소로 리스트를 재설정
//     }
//     _each(list, function (val) {
//         memo = iter(memo, val);
//     });
//     return memo;
// }

var slice = Array.prototype.slice;

function _rest(list, num) {
    return slice.call(list, num || 1);
}

// 파이프라인 만들기 - 함수를 다루는 함수
function _pipe() {
    var fns = arguments;
    return function (arg) {
        return _reduce(fns, function (arg, fn) {
            return fn(arg);
        }, arg); // 초기 memo 값을 arg로 설정
    };
}

function _filter(list, predi) {
    var new_list = [];
    _each(list, function (value) {
        if (predi(value)) new_list.push(value);
    })
    return new_list;
}


// go도 파이프 함수지만 즉시 실행되는 함수 (결과 바로 만드는 함수)
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

// pipe 함수 테스트
var f1 = _pipe(
    function (a) {
        return a + 1;
    },
    function (a) {
        return a * 2;
    }
);

//================================
// 컬렉션 중심 프로그래밍
//================================

// 컬렉션 중심 프로그래밍 4가지 유형과 함수
// 추상순위가 높을수록 앞에배치

// 1. 수집하기 - map, values, pluck 등
// 2. 거르기 - filter, reject, compact, without 등
// 3. 찾아내기 - find, some, every 등
// 4. 접기 - reduce, min, max, group_by, count_by

// 1. 수집하기
function _values2(data) {
    var keys = Object.keys(data);
    return _map(keys, function (key) {
        return data[key];
    });
}

console.log(_values2(users[1]))


function _identity(val) {
    return val;
}

var a = 10
console.log(_identity(a));

// 아이덴티티 함수를 사용하면 value함수를 더 간결하게 만들 수 있다.
function _values(data) {
    return _map(data, _identity)
}

console.log(_identity(users[0]));

// _map 에 curryr이 적용되어있으면 인자에 함수만 넣음으로써 값을 마지막에 넣을 수 있다.
function _map(data, mapper) {
    var new_list = [];
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            new_list.push(mapper(data[i]));
        }
    } else {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                new_list.push(mapper(data[key]));
            }
        }
    }
    return new_list;
}

_map = _curryr(_map);

function _identity(val) {
    return val;
}

var _values = _map(_identity);

console.log(_values(users[2])); // [3, 'JM', 32]


function _pluck(data, key) {
    return _map(data, function (obj) {
        return obj[key];
    })
}

console.log(_pluck(users, 'age'))


function _reject(data, predi) {
    return _filter(data, function (val) {
        return !predi(val);
    })
}

console.log(_reject(users, function (user) {
    return user.age > 30;
}))

function _negate(func) {
    return function (val) {
        return !func(val);
    }
}

function _reject2(data, predi) {
    return _filter(data, _negate(predi));
}

console.log(_reject(users, function (user) {
    return user.age < 30;
}))


var _compact = _filter(_identity);
