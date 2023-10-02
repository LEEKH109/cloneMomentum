const clock = document.querySelector("h2#clock");

clock.innerText = "test";
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0"); // 숫자인 시간은 문자로 바꿔주고 문자열로 자리수 보정
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분도 동일하게
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초도 동일하게
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);
