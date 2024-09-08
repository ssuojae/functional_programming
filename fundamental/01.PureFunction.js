// ====================================
// POINT 01. 순수함수는 평가시점이 중요하지 않다.
// ====================================

// 참조투명성이 깨진 예시 - 평가시점에 따라 결과값이 달라진다.
var c = 10;
function add2(a, b) {
    return a + b + c;
}

// 평가 시점에 따라 값이 다른다는 것을 알 수 있다.
console.log(add2(10, 2)); // 22
c = 20
console.log(add2(10, 2)); // 33

// 순수 함수 예시 - 평가시점이 결과에 영향을 미치지 않기 때문에 조합성을 증대시킨다.
function add(a, b) {
    return a + b;
}

console.log(add2(10, 2)); // 32
console.log(add2(10, 2)); // 32

// 일급 함수 정의: 자바스크립트에서는 함수를 값으로 다룰 수 있다.
var f1 = function (a) { return a * a };
console.log(f1)

var f2 = add;
console.log(f2);

// 일급 함수의 특징: 함수가 함수를 인자로 받을 수 있다.
function f3(f) {
    return f()
}

console.log(f3(function () { return 10; }));
console.log(f3(function () { return 20; }));

// 함수를 리턴하는 함수 - 일급함수와 클로저 함께 사용하기
function add_maker(a) {
    return function(b) {
        return a + b;
    }
}

var add10 = add_maker(10);
console.log(add10(20));

function f4(f1, f2, f3) {
    return f3(f1()+f2());
}
console.log(
f4(
    function() { return 2; },
    function() { return 1; },
    function(a) { return a * a; }));