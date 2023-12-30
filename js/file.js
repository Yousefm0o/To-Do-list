let input = document.querySelector("[name='task-name']");
let btn = document.querySelector("[type='submit']");
let screen = document.querySelector(".screen ul");

let li = document.createElement("li");
let parag = document.createElement("p");
let delBtn = document.createElement("button");
let taskTitle = document.createTextNode("");
let delBtns = document.querySelectorAll(".screen ul li button");

parag.append(taskTitle)
delBtn.innerText = "x";
li.append(parag, delBtn);

if (sessionStorage.getItem("text")) {
  input.value = sessionStorage.text;
}

let i = 1;
if (localStorage.length != 0) {
  screen.parentElement.style.display = "block"
  let oldTasks = Object.keys(localStorage).sort((a, b) => a.slice(5) - b.slice(5));
  for (let j of oldTasks) {
    if (j !== `Task-${i}`) {
        let difference = +j.slice(5) - i;
      for (let k = 0; k < difference; k++) {
          i++; 
      }
    }
    taskTitle.textContent = JSON.parse(localStorage.getItem(j))["task"];
    parag.appendChild(taskTitle);
    let newLi = li.cloneNode(true);
    screen.append(newLi)
    newLi.children[1].setAttribute("id", (i))
    newLi.children[1].addEventListener("click", (e) => {
      e.target.parentElement.remove();
      localStorage.removeItem(`Task-${e.target.id}`);
      if (localStorage.length != 0) {
        screen.parentElement.style.display = "block";
      } else {
        screen.parentElement.style.display = "none";
      }
    })
  }
} else {
  screen.parentElement.style.display = "none";
  i = 0;
}


input.addEventListener("input", (e) => {
  sessionStorage.text = e.target.value;
})

let obj = {
  id: i,
  task: "",
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("text")) {
    taskTitle.nodeValue = input.value;
    parag.appendChild(taskTitle)
    let newLi = li.cloneNode(true);
    newLi.children[1].setAttribute("id", (++obj.id))
    newLi.children[1].addEventListener("click", (e) => {
      e.target.parentElement.remove();
      localStorage.removeItem(`Task-${e.target.id}`);
      if (localStorage.length != 0) {
        screen.parentElement.style.display = "block";
      } else {
        screen.parentElement.style.display = "none";
      }
    })
    screen.append(newLi);
    obj.task = sessionStorage.text;
    input.value = "";
    sessionStorage.text = "";
    localStorage.setItem(`Task-${obj.id}`, JSON.stringify(obj));
  }
  if (localStorage.length != 0) {
    screen.parentElement.style.display = "block";
  } else {
    screen.parentElement.style.display = "none"
  }
})
// localStorage.clear() => Used to clear all tasks (but remember to write it in the console)