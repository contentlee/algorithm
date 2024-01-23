// not comparison sort
// time complexity : O(nk)
// 자릿수에 따라 값을 비교하여 정렬

// const sort = (arr, n) => {
//   let flag = true;
//   let array = Array.from({ length: 10 }, () => []);

//   const res = arr
//     .reduce((acc, cur) => {
//       if (cur > n) flag = false;
//       const val = Math.floor((cur % (n * 10)) / n);
//       acc[val].push(cur);
//       return acc;
//     }, array)
//     .reduce((acc, cur) => [...acc, ...cur], []);

//   if (flag) return res;
//   return sort(res, n * 10);
// };
// const array = [5, 14, 20, 1, 2, 8, 5];

// console.log(sort(array, 1));

// 자릿수에 따른 값을 반환
const getDigit = (val, digit) => {
  return Math.floor((Math.abs(val) / 10 ** digit) % 10);
};

// 자릿수 계산
const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

// 가장 큰 자릿수 계산
const mostDigits = (arr) => {
  return arr.reduce((acc, cur) => {
    const digit = digitCount(cur);
    if (acc < digit) return digit;
    else return acc;
  }, 0);
};

const solution = (arr) => {
  const max = mostDigits(arr);

  for (let i = 0; i < max; i++) {
    // 정렬을 위한 주머니
    const array = Array.from({ length: 10 }, () => []);
    arr = [...arr]
      .reduce((acc, cur) => {
        acc[getDigit(cur, i)].push(cur);
        return acc;
      }, array)
      .reduce((acc, cur) => [...acc, ...cur], []);
  }

  return arr;
};

console.log(solution(array));
