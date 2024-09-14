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

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0]; // 첫 번째 요소를 memo로 설정
        list = _rest(list); // 나머지 요소로 리스트를 재설정
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    });
    return memo;
}

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

console.log(f1(1)); // 4, (1 + 1) * 2 = 4

// go 함수 테스트
_go(1,
    function (a) {
        return a + 1;
    },
    function (a) {
        return a * 2;
    },
    function (a) {
        return a * 2;
    },
    console.log // 최종 결과는 콘솔에 출력됨
);

// go를 활용한 간결한 표현 만들기
var _map = _curryr(_map),
    _filter = _curryr(_filter);

_go(users,
    _filter(function (user) {
        return user.age >= 30;
    }),
    function (user) {
        return _map(users, _get('name'))
    },
    console.log);

_go(users,
    _filter(user => user.age < 30),
    _map(_get('age')),
    console.log);

// _each의 다형성 높이기

// 1. each에 null 넣어도 에러 안나게
_get('length')

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
})

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
    var keys = _keys(list, iter)
    for (var i = 0, len = keys.length; i < len; i++) {
        iter(list[keys[i]]);
    }
}

_each({
    13: 'ID',
    19: 'HD',
    29: 'YD',
}, function(name) {
    console.log(name);
})