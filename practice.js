function FrequencyCounter(array1, array2) {
  if (array1.length !== array2.length) return false;

  // 중첩루프를 사용하게 됨
  // let index = 0;

  // for(let number of array1){
  //     index = array2.findIndex(value => value === number**2)
  //     if(index !== -1){
  //         array2[index] = -1;
  //     } else {
  //         return false;
  //     }
  // }

  // Frequency Counter
  let 객체1 = {};
  let 객체2 = {};

  for (let number of array1) {
    객체1[number ** 2] = (객체1[number ** 2] || 0) + 1;
  }
  for (let number of array2) {
    객체2[number] = (객체2[number] || 0) + 1;
  }

  for (let key in 객체1) {
    if (!(key in 객체2)) {
      return false;
    }
    if (객체1[key] !== 객체2[key]) {
      return false;
    }
  }

  return true;
}

// console.log(FrequencyCounter([1,2,3], [4,1,9]));
// console.log(FrequencyCounter([1,2,3], [1,9]));
// console.log(FrequencyCounter([1,2,1], [4,4,1]));

function anagram(string1, string2) {
  if (string1.length !== string2.length) return false;

  let array1 = [...string1];
  let array2 = [...string2];

  // let obj1 = {};
  // let obj2 = {};

  // for(let word of array1){
  //     obj1[word] = (obj1[word] | 0) + 1;
  // }
  // for(let word of array2){
  //     obj2[word] = (obj2[word] | 0) + 1;
  // }

  // for(let key in obj1) {
  //     if(!(key in obj2)){
  //         return false;
  //     }
  //     if(obj1[key] !== obj2[key]){
  //         return false;
  //     }
  // }

  let obj = {};

  for (let word of array1) {
    obj[word] = (obj[word] | 0) + 1;
  }

  for (let word of array2) {
    if (!obj[word]) {
      return false;
    } else {
      obj[word]--;
    }
  }

  return true;
}

// console.log(anagram('', '')) // true
// console.log(anagram('aaz', 'zza')) // false
// console.log(anagram('anagram', 'nagaram')) // true
// console.log(anagram("rat","car")) // false)
// console.log(anagram('awesome', 'awesom')) // false
// console.log(anagram('amanaplanacanalpanama', 'acanalmanplanpamana')) // false
// console.log(anagram('qwerty', 'qeywrt')) // true
// console.log(anagram('texttwisttime', 'timetwisttext')) // true

function MultiplePointer(array) {
  let left = 0;
  let right = array.length - 1;

  while (left !== right) {
    if (array[left] + array[right] === 0) {
      return [array[left], array[right]];
    } else if (array[left] + array[right] > 0) {
      right--;
    } else {
      left++;
    }
  }
}

// console.log(MultiplePointer([-4,-3,-2,-1,0,1,3,5]));

function CountUniqueValues(array) {
  if (array.length === 0) {
    return 0;
  }

  let index1 = 0;
  let index2 = 1;
  let result = 1;

  while (index2 < array.length) {
    if (array[index1] !== array[index2]) {
      index1 = index2;
      index2 = index2++;
      result++;
    } else {
      index2++;
    }
  }

  return result;
}

// console.log(CountUniqueValues([1, 1, 1, 1, 1, 2])); // 2
// console.log(CountUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
// console.log(CountUniqueValues([])); // 0
// console.log(CountUniqueValues([-2, -1, -1, 0, 1])); // 4

function maxSubarraySum(array, count) {
  if (array.length === 0) {
    return null;
  }

  let index1 = 0;
  let max = 0;

  for (let i = 0; i < count; i++) {
    max += array[i];
  }

  for (let j = count; j < array.length; j++) {
    let temp = max;
    temp = temp - array[index1] + array[j];
    max = Math.max(max, temp);
    index1++;
  }

  return max;
}

// console.log(maxSubarraySum([0, 1, 2, 3, 4], 2));

//과제

function sameFrequency(number1, number2) {
  const array1 = [...`${number1}`];
  const array2 = [...`${number2}`];

  if (array1.length !== array2.length) {
    return false;
  }

  let object = {};
  let result = true;

  array1.forEach((element) => {
    object[element] = (object[element] | 0) + 1;
  });

  for (let num of array2) {
    if (object[num]) {
      object[num]--;
    } else {
      result = false;
      break;
    }
  }

  return result;
}

// console.log(sameFrequency(182, 281));
// console.log(sameFrequency(43, 14));
// console.log(sameFrequency(22, 222));
// console.log(sameFrequency(3589578, 5879385));

function areThereDuplicates(array) {
  /// first
  // let result = false;
  // let object = {};
  // for (let number of array) {
  //   object[number] = (object[number] | 0) + 1;

  //   if (object[number] > 1) {
  //     result = true;
  //     break;
  //   }
  // }
  // return result;

  /// second
  return new Set(array).size !== array.length;
}
// console.log(areThereDuplicates([1, 2, 3])); // false
// console.log(areThereDuplicates([1, 2, 2])); // true
// console.log(areThereDuplicates(["a", "b", "c", "a"])); // true

function averagePair(array, average) {
  let result = false;

  if (array.length === 0) return result;

  let index1 = 0;
  let index2 = array.length - 1;

  while (index1 < index2) {
    let temp = (array[index1] + array[index2]) / 2;
    if (temp === average) {
      result = true;
      break;
    } else if (temp < average) {
      index1++;
    } else {
      index2--;
    }
  }

  return result;
}

// console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
// console.log(averagePair([], 4)); // false

function isSubsequence(string1, string2) {
  // let result = true;

  // let index = 0;
  // const array1 = [...string1];
  // const array2 = [...string2];

  // array2.forEach((element) => {
  //   if (element === array1[index]) {
  //     index++;
  //   }
  // });

  // if (index !== string1.length) {
  //   result = false;
  // }

  // return result;

  /// 재귀
  if (string1.length === 0) return true;
  if (string2.length === 0) return false;
  if (string1[0] === string2[0]) return isSubsequence(string1.slice(1), string2.slice(1));
  return isSubsequence(string1, string2.slice(1));
}

// console.log(isSubsequence("hello", "hello world")); // true
// console.log(isSubsequence("sing", "sting")); // true
// console.log(isSubsequence("abc", "abracadabra")); // true
// console.log(isSubsequence("abc", "acb")); // false (order matters)

function maxSubarraySum(array, count) {
  if (array.length < count) return null;

  let result = 0;
  let total = 0;

  for (let i = 0; i < count; i++) {
    total = total + array[i];
  }

  result = total;

  for (let j = count; j < array.length; j++) {
    total = total - array[j - count] + array[j];
    result = Math.max(total, result);
  }

  return result;
}

// console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
// console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
// console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
// console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5
// console.log(maxSubarraySum([2, 3], 3)); // null

function minSubArrayLen(array, value) {
  let result = Infinity;
  let index1 = 0;
  let index2 = 1;
  let total = array[index1];

  while (index2 <= array.length) {
    if (value <= total) {
      result = Math.min(result, index2 - index1);
      total -= array[index1];
      index1++;
    } else {
      total += array[index2];
      index2++;
    }
  }

  if (result === Infinity) return 0;

  return result;
}

// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray
// console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray
// console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // 3
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)); // 5
// console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0

function findLongestSubstring(string) {
  if (string === "") return 0;
  if ((string.length === 1) | (new Set([...string]).size === 1)) return 1;

  let result = 0;
  let index = 0;
  let object = {};

  for (let i = 0; i < string.length; i++) {
    if (object[string[i]]) {
      index = Math.max(index, object[string[i]]);
    }

    result = Math.max(result, i - index + 1);
    object[string[i]] = i + 1;
  }

  // const array = [...string];

  // let index1 = 0;
  // let index2 = 1;

  // let object = {};
  // let result = 0;

  // object[array[0]] = true;

  // while (index2 < array.length) {
  //   if (!object[array[index2]]) {
  //     object[array[index2]] = true;
  //     result = Math.max(result, index2 - index1 + 1);
  //     index2++;
  //   } else {
  //     if (array[index2] === array[index1]) {
  //       index1++;
  //       result = Math.max(result, index2 - index1 + 1);
  //       index2++;
  //     } else {
  //       object[array[index1]] = false;
  //       index1++;
  //     }
  //   }
  // }
  return result;
}

// console.log(findLongestSubstring("")); // 0
// console.log(findLongestSubstring("rithmschool")); // 7
// console.log(findLongestSubstring("thisisawesome")); // 6
// console.log(findLongestSubstring("thecatinthehat")); // 7
// console.log(findLongestSubstring("bbbbbb")); // 1
// console.log(findLongestSubstring("longestsubstring")); // 8
// console.log(findLongestSubstring("thisishowwedoit")); // 6

function power(number, exponent) {
  if (exponent === 0) return 1;
  return number * power(number, exponent - 1);
}

// console.log(power(2, 0)); // 1
// console.log(power(2, 2)); // 4
// console.log(power(2, 4)); // 16

function factorial(number) {
  if (number === 1) return 1;
  return number * factorial(number - 1);
}

// console.log(factorial(1)); // 1
// console.log(factorial(2)); // 2
// console.log(factorial(4)); // 24
// console.log(factorial(7)); // 5040

function productOfArray(array) {
  if (array.length === 0) return 1;
  return array[0] * productOfArray(array.slice(1));
}

// console.log(productOfArray([1, 2, 3])); // 6
// console.log(productOfArray([1, 2, 3, 10])); // 60

function recursiveRange(number) {
  if (number === 0) return 0;
  return number + recursiveRange(number - 1);
}

// console.log(recursiveRange(6)); // 21
// console.log(recursiveRange(10)); // 55

function fib(n) {
  // const array = [0, 1];
  // let sum = 0;
  // function helper(count) {
  //   if (count === number) return;
  //   sum = array[0] + array[1];
  //   array[0] = array[1];
  //   array[1] = sum;
  //   helper(count + 1);
  // }

  // helper(1);
  // return array[1];

  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// console.log(fib(4)); // 3
// console.log(fib(10)); // 55
// console.log(fib(28)); // 317811
// console.log(fib(35)); // 9227465

function reverse(string) {
  if (string.length === 1) return string[0];
  return reverse([...string].slice(1).join("")) + string[0];
}
// console.log(reverse("awesome")); // 'emosewa'
// console.log(reverse("rithmschool")); // 'loohcsmhtir'

function isPalindrome(string) {
  if (string.length <= 1) return true;
  if (string[0] !== string[string.length - 1]) return false;
  return isPalindrome([...string].slice(1, -1));
}

// console.log(isPalindrome("awesome")); // false
// console.log(isPalindrome("foobar")); // false
// console.log(isPalindrome("tacocat")); // true
// console.log(isPalindrome("amanaplanacanalpanama")); // true
// console.log(isPalindrome("amanaplanacanalpandemonium")); // false

const isOdd = (val) => val % 2 !== 0;
function someRecursive(array, fn) {
  if (array.length === 0) return false;
  if (fn(array[0])) return true;

  return someRecursive(array.slice(1), fn);
}

// console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// console.log(someRecursive([4, 6, 8, 9], isOdd)); // true
// console.log(someRecursive([4, 6, 8], isOdd)); // false
// console.log(someRecursive([4, 6, 8], (val) => val > 10)); // false

function flatten(array) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flatten(array[i]));
    } else {
      result.push(array[i]);
    }
  }

  return result;
}

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

function capitalizeFirst(array) {
  let word = [...array[0]];
  word[0] = word[0].toUpperCase();

  if (array.length === 1) {
    return [word.join("")];
  }
  return [word.join("")].concat(capitalizeFirst(array.slice(1)));
}
// console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']
var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

function nestedEvenSum(object) {
  let sum = 0;
  for (let key in object) {
    if (typeof object[key] === "object") {
      sum += nestedEvenSum(object[key]);
    }
    if (object[key] % 2 === 0) {
      sum += object[key];
    }
  }
  return sum;
}

// console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10

function stringifyNumbers(object) {
  for (let key in object) {
    if (typeof object[key] === "object") {
      stringifyNumbers(object[key]);
    }
    if (typeof object[key] === "number") {
      object[key] = `${object[key]}`;
    }
  }
  return object;
}

let obj = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};

// console.log(stringifyNumbers(obj));

function collectStrings(object) {
  let array = [];
  for (let key in object) {
    if (typeof object[key] === "string") {
      array.push(object[key]);
    }
    if (typeof object[key] === "object") {
      array.push(...collectStrings(object[key]));
    }
  }

  return array;
}

const obj23 = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

// console.log(collectStrings(obj23)); // ["foo", "bar", "baz"])

// function linearSearch(array, number) {
//   console.log(array.indexOf(number));
// }

// linearSearch([10, 15, 20, 25, 30], 15); // 1
// linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4); // 5
// linearSearch([100], 100); // 0
// linearSearch([1, 2, 3, 4, 5], 6); // -1
// linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10); // -1
// linearSearch([100], 200); // -1

function binarySearch(array, number) {
  let result = -1;

  let start = 0;
  let end = array.length - 1;
  let index = Math.floor((start + end) / 2);
  while (array[index] !== number && start < end) {
    if (array[index] > number) {
      end = index - 1;
    } else {
      start = index + 1;
    }
    index = Math.floor((start + end) / 2);
  }
  if (array[index] === number) {
    result = index;
  }
  return result;
}

// console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
// console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
// console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
// console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
// console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 10)); // 2
// console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 95)); // 16
// console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 100)); // -1

var func = [];
for (var i = 0; i < 3; i++) {
  func[i] = (function (id) {
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < func.length; j++) {
  console.dir(func[j]);
}

// function solution(a, b) {
//   const dic = Array.from({ length: a + 1 }, () => Array(b + 1).fill(0));
//   const dfs = (l, r) => {
//     if (l === r || r === 0) {
//       return 1;
//     } else {
//       if (dic[l - 1][r] === 0) dic[l - 1][r] = dfs(l - 1, r);
//       if (dic[l - 1][r - 1] === 0) dic[l - 1][r - 1] = dfs(l - 1, r - 1);
//       return dic[l - 1][r] + dic[l - 1][r - 1];
//     }
//   };

//   return dfs(a, b);
// }
// console.log(solution(8, 3));
console.log("helloworld!".match(/\!/));
console.log("31.23".match(/\d/));
console.log("at bas".match(/bs*/));
console.log("exampleasss".match(/(example)[a-z]*/));
console.log("apple, orange,".match(/apple,\sorange/));

console.log("apple");
console.log(["a", "b", "c", "b"].join(" ").replaceAll("b", "D").split(" "));
console.log(["a", "b", "c"].some((v) => v === "c"));
