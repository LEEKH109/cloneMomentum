const images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const backImg = document.createElement("img"); //html에 없는 태그를 생성 할 때 사용

backImg.src = `img/${chosenImage}`;
backImg.id = "backImg";
document.body.appendChild(backImg); //html에 추가해주기
