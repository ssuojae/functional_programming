// 문제 코드
// func에서 데이터를 직접 수정하는 방식은 원본 데이터를 변경하는 부작용을 초래
//

// 비순수한 _map 함수 (func에서 데이터 수정)
function _map(data, func) {
    var new_list = [];
    for (var i = 0; i < data.length; i++) {
        new_list.push(func(data[i]));  // func에서 데이터를 직접 수정
    }
    return new_list;
}

// func에서 데이터를 직접 수정하는 비순수 함수
function modifyFunc(item) {
    item.modified = true;  // 원본 데이터를 직접 수정
    return item;
}

var users = [{ name: 'Alice' }, { name: 'Bob' }];

// _map 호출
var updatedUsers = _map(users, modifyFunc);

console.log(updatedUsers);  // 수정된 데이터
// 출력: [{ name: 'Alice', modified: true }, { name: 'Bob', modified: true }]

console.log(users);  // 원본 데이터도 수정됨 (비순수)
// 출력: [{ name: 'Alice', modified: true }, { name: 'Bob', modified: true }]



// 문제 해결
// _extend 함수를 사용해 원본 데이터를 변경하지 않고 새로운 객체를 반환하는 방식

// _extend 함수: 기존 객체에 새로운 속성을 추가하면서 불변성을 유지
const _extend = (obj, props) => ({
    ...obj,  // 기존 객체의 모든 속성을 복사
    ...props // 새로운 속성을 추가
});

// 순수한 _map 함수 (func에서 데이터 수정 없이 새로운 객체 반환)
function _map(data, func) {
    var new_list = [];
    for (var i = 0; i < data.length; i++) {
        new_list.push(func(data[i]));  // 새로운 객체를 반환하는 함수 적용
    }
    return new_list;
}

// func에서 새로운 객체를 반환하는 순수 함수
function pureFunc(item) {
    return _extend(item, { modified: true });  // 원본 객체를 수정하지 않고 확장
}

var users = [{ name: 'Alice' }, { name: 'Bob' }];

// _map 호출
var updatedUsers = _map(users, pureFunc);

console.log(updatedUsers);  // 새로운 데이터 반환
// 출력: [{ name: 'Alice', modified: true }, { name: 'Bob', modified: true }]

console.log(users);  // 원본 데이터는 수정되지 않음
// 출력: [{ name: 'Alice' }, { name: 'Bob' }]