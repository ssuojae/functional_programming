// 무한한 숫자 시퀀스를 생성하는 제너레이터
function* infinity() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

// n개의 값만 가져오는 제너레이터
function* limit(iterable, n) {
    let count = 0;
    for (const value of iterable) {
        if (count++ >= n) return;
        yield value;
    }
}

// 홀수만 필터링하는 제너레이터
function* odds(iterable) {
    for (const value of iterable) {
        if (value % 2 !== 0) {
            yield value;
        }
    }
}

// 무한한 숫자 시퀀스 생성
const infiniteNumbers = infinity();

// 무한 시퀀스에서 홀수만 필터링하고, 5개 값만 출력
const limitedOdds = limit(odds(infiniteNumbers), 5);

console.log([...limitedOdds]);  // 출력: [1, 3, 5, 7, 9]
