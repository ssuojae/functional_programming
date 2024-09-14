//// ====================================
// // POINT 02. 명령형 코드 함수형으로 전환하기
// // ====================================

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

//1. 명령형 코드

// [OOP] 1-1. 30세 이상인 users 거르기
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}

console.log(temp_users);

//1-2. 30세 이상인 users의 names를 수집하기
var name = [];
for (var i = 0; i < temp_users.length; i++) {
    name.push(temp_users[i].name);
}
console.log(name);

console.log('==============================================')

// 1-1, 1-2 함수형으로 바꿔보기
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

console.log(
    _filter([1, 2, 3, 4], function (num) {
        return num % 2
    })
);


console.log(
    _filter([1, 2, 3, 4], function (num) {
        return !(num % 2)
    })
)

console.log('=============================================')

//1-3. 30세 미만인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age < 30) {
        temp_users.push(users[i]);
    }
}

console.log(temp_users);

console.log('=============================================')

//1-4. 30세 미만인 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
    ages.push(temp_users[i].age);
}

console.log(ages);


//1-3, 1-4 함수형 프로그래밍으로 바꾸기
// 함수형 프로그래밍 특징: 함수 내부에서는 데이터 구조가 절대 드러나지 않는다!
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

var under_30 = _filter(users, function (user) {
    return user.age < 30;
});

console.log(under_30);

var age = _map(under_30, function(user) {
    return user.age
})

console.log(age);

console.log(_map([1, 2, 3], function(num) { return num * 2}));

_map(
    _filter(users, function(user) {
        return user.age >= 30;
    })
)