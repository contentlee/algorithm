// 문제 설명
// 앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬(palindrome)이라고 합니다.
// 문자열 s가 주어질 때, s의 부분문자열(Substring)중 가장 긴 팰린드롬의 길이를 return 하는 solution 함수를 완성해 주세요.
// 예를들면, 문자열 s가 "abcdcba"이면 7을 return하고 "abacde"이면 3을 return합니다.

// 제한사항
// 문자열 s의 길이 : 2,500 이하의 자연수
// 문자열 s는 알파벳 소문자로만 구성

// 예시

// s	        answer
// "abcdcba"	7
// "abacde"	  3

function solution(s) {
  let answer = 1;
  let length = s.length;

  while (length > 0) {
    let flag = false;

    // iter 는 반복의 횟수를 결정한다. length는 계속해서 줄어들며, 비교 string의 짧아진 길이만큼 반복할 수 있도록 해준다.
    const iter = s.length - length;

    for (let i = 0; i <= iter; i++) {
      const middle = Math.floor(length / 2);
      const str1 = s.slice(i, middle + i);
      // 짝수와 홀수일 경우 모두를 고려해야 한다.
      const str2 = s.slice(length % 2 === 0 ? middle + i : middle + i + 1, i + length);
      for (let j = 0; j < str1.length; j++) {
        if (str1[j] !== str2.at(-j - 1)) {
          flag = false;
          break;
        } else {
          // 최초 flag를 true로 주지 않은 이유는 for문이 돌지 않는 경우가 발생할 때 true로 아래의 조건문들이 실행되기 때문이다.
          flag = true;
        }
      }
      if (flag) break;
    }

    if (flag) {
      answer = length;
      break;
    }

    length--;
  }

  return answer;
}

// 가장 긴 경우로부터 짧은 경우까지 탐색하는 방법을 선택했다.
// 길이가 2,500 이지만 log n 의 시간복잡도를 갖기에 시간이 문제가 되지는 않는다.
