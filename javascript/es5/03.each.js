//// ====================================
// // POINT 02. 명령형 코드 함수형으로 전환하기
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