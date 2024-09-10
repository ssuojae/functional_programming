//// ====================================
// // POINT 03. 다형성
// // ====================================

// 함수와 메서드의 차이
// 이전에 만들었던건 함수, 아래 함수는 메서드
// 메서드는 순수함수가 아니다. 객체의 상태에 따라 달라진다.
// map과 filter는 array 클래스에 구현된 메서드라 다른 클래스에서는 사용이 불가하다.
// 따라서 객체지향에서는 다형성 구현이 어려워진다.
// 반면 함수형에서는 함수를 먼저 만든 후 어떤 데이터가 와도 로직이 처리되어 다형성 구현이 용이하다.
// 즉 OOP는 데이터가 먼저 나오고 다음에 메서드
// FP는 함수가 먼저고 다음이 데이터
// 따라서 OOP는 평가시점이 중요해지고 FP는 평가시점으로부터 자유로워진다.

//OOP
console.log(
    [1, 2, 3].map(function(val) {
        return val * 2;
    })
);

console.log(
    [1, 2, 3, 4].filter(function(val) {
        return val % 2;
    })
);

// console.log(
//     _map(document.querySelectorAll('*'), function(node) {
//         return node.nodeName;
//     })
// ) //에러 발생
//
// //FP
// console.log(document.querySelectorAll('*'))
//
//
// console.log(
//     _map(document.querySelectorAll('*'), function(node) {
//         return node.nodeName;
//     })
// )

// 객체지향에서는 뒤에 들어간 함수를 전부 콜백함수라 부르는 경향이 있음
// 함수형에서는 함수의 역할에 따라 다양한 이름을 가지는 것이 중요함 (predicate, filter, map..)
console.log(
_map([1, 2, 3, 4], function(v) {
    return v+10;
}));



//==================================================
//==================================================
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