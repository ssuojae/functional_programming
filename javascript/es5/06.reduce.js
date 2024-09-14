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

// ====================================
// POINT 04. Reduce
// ====================================

function _reduce2(list, iter, memo) {
    return iter(iter(iter(0, 1), 2), 3);
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list)
    }
    _each(list, function(val) {
        memo = iter(memo, val);
    });
    return memo
}

// Array는 아니지만 ArrayLike 객체도 다룰 수 있는 함수 만들기
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

console.log(
    _reduce([1, 2, 3], function (a, b) {
        return a + b;
    }, 0));

// memo = add(0, 1)
// memo = add(memo, 2)
// memo = add(memo, 3)
// return memo