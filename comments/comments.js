const comments = document.getElementById("comment-box");
const inputName = document.getElementById("input-name");
const inputText = document.getElementById("textarea-text");
const inputDate = document.getElementById("input-date");
const but = document.getElementById("input-button");
const likeBut = document.querySelector(".like-button");

const comments_arr = [];

let date = new Date();
let dateMinutes = date.getMinutes();

if (dateMinutes < 10) {
  dateMinutes = "0" + dateMinutes;
}
const hoursAndMinutes = date.getHours() + ":" + dateMinutes;

function todayDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;

  return (today = yy + "-" + mm + "-" + dd);
}

todayDate(date);

function yesterdayDate(date) {
  let dd = date.getDate() - 1;
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;

  return (yesterday = yy + "-" + mm + "-" + dd);
}

yesterdayDate(date);

const display_comments = () => {
  let list = "";
  comments_arr.forEach((comment, index) => {
    if (today == comment.date) {
      date = "Сегодня";
    } else if (yesterday == comment.date) {
      date = "Вчера";
    } else {
      date = comment.date;
    }
    list += `
    <div class="container_comment">
        <div class="comment_name">Имя пользователя: ${comment.name}</div>
        <div class="comment_text"> Текст отзыва: <br>${comment.text}</div>
        <div class="comment_time">Дата: ${date}, ${hoursAndMinutes}</div>
        <img src="./pictures/main/trash.png" id="delete" onclick="delIndex(${index})">
        <img src=${comment.like} id="delete" onclick="likeBu(${index})">
    </div>
    `;
  });
  comments.innerHTML += list;
};

but.onclick = function (event) {
  event.preventDefault();

  if (!inputDate.value) {
    inputDate.value = today;
  }

  if (inputName.value.length < 2) {
    let text = "Поле не должно содержать меньше 2 букв";
    document.getElementById("name-err").innerHTML = text;
  } else if (inputText.value.length < 10) {
    document.getElementById("name-err").innerHTML = null;
    let text = "Поле не должно содержать меньше 10 букв";
    document.getElementById("text-err").innerHTML = text;
  } else {
    comments.innerHTML = "";
    const content = {
      name: inputName.value,
      text: inputText.value,
      date: inputDate.value,
      like: "like-button",
    };
    comments_arr.push(content);
    document.getElementById("text-err").innerHTML = null;
    inputName.value = "";
    inputText.value = "";
    inputDate.value = "";
    display_comments();
  }
};

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    if (!inputDate.value) {
      inputDate.value = today;
    }

    if (inputName.value.length < 2) {
      let text = "Поле не должно содержать меньше 2 букв";
      document.getElementById("name-err").innerHTML = text;
    } else if (inputText.value.length < 10) {
      document.getElementById("name-err").innerHTML = null;
      let text = "Поле не должно содержать меньше 10 букв";
      document.getElementById("text-err").innerHTML = text;
    } else {
      comments.innerHTML = "";
      const content = {
        name: inputName.value,
        text: inputText.value,
        date: inputDate.value,
        like: "./pictures/main/unlike.png",
      };
      comments_arr.push(content);
      document.getElementById("text-err").innerHTML = null;
      document.getElementById("name-err").innerHTML = null;
      inputName.value = "";
      inputText.value = "";
      inputDate.value = "";
      display_comments();
    }
  }
});

function likeBu(index) {
  comments.innerHTML = "";
  comments_arr.map((el, i) => {
    if (i === index) {
      comments_arr[i].like === "./pictures/main/unlike.png"
        ? (comments_arr[i].like = "./pictures/main/like.png")
        : (comments_arr[i].like = "./pictures/main/unlike.png");
    }
  });
  display_comments();
}

function delIndex(index) {
  comments.innerHTML = "";
  comments_arr.splice(index, 1);
  display_comments();
}

display_comments();
