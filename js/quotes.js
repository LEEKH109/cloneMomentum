// 명언을 랜덤으로 선택하여 화면에 표시하는 함수
function displayRandomQuote(quotes) {
  const quoteElement = document.querySelector("#quote span:first-child");
  const authorElement = document.querySelector("#quote span:last-child");
  const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.innerText = todaysQuote.quote;
  authorElement.innerText = todaysQuote.author;
}

// quotes.json 파일을 불러옴
fetch("./json/quotes.json") //명언은 따로 json 파일로 관리
  .then((response) => response.json())
  .then((quotes) => {
    displayRandomQuote(quotes);
    // 10초마다 명언을 바꿔 화면에 표시
    setInterval(() => {
      displayRandomQuote(quotes);
    }, 60_000); // 60초마다 명언 교체
  })
  .catch((error) => console.error("Error loading quotes:", error));
