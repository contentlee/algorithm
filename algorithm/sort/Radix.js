// not comparison sort
// time complexity : O(nk)

const sort = (arr, n) => {
  let flag = true;
  let array = Array.from({ length: 10 }, () => []);

  const res = arr
    .reduce((acc, cur) => {
      if (cur > n) flag = false;
      const val = Math.floor((cur % (n * 10)) / n);
      acc[val].push(cur);
      return acc;
    }, array)
    .reduce((acc, cur) => [...acc, ...cur], []);

  if (flag) return res;
  return sort(res, n * 10);
};
const array = [5, 14, 20, 1, 2, 8, 5];

console.log(sort(array, 1));

// 강의

const getDigit = (val, digit) => {
  return Math.floor((Math.abs(val) / 10 ** digit) % 10);
};

const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

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
