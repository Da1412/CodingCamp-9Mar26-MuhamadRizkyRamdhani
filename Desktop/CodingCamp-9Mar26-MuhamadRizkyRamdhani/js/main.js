// ======= Time & Greeting =======
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const date = now.toLocaleDateString();
    document.getElementById('date-time').textContent = `${date} | ${hours}:${minutes}:${seconds}`;

    const greeting = hours < 12 ? "Good Morning!" :
                     hours < 18 ? "Good Afternoon!" : "Good Evening!";
    document.getElementById('greeting').textContent = greeting;
}

setInterval(updateTime, 1000);
updateTime();

// ======= Focus Timer =======
let timer;
let timeLeft = 25 * 60; // 25 minutes

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

document.getElementById('start').addEventListener('click', () => {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                alert("Focus session ended! 🎯");
                timeLeft = 25*60;
                updateTimerDisplay();
            }
        }, 1000);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 25*60;
    updateTimerDisplay();
});

updateTimerDisplay();

// ======= To-Do List =======
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('task-list');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleDone(${index})">✔️</button>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

document.getElementById('add-task').addEventListener('click', () => {
    const newTask = document.getElementById('new-task').value.trim();
    if (newTask) {
        tasks.push({text: newTask, done: false});
        document.getElementById('new-task').value = '';
        saveTasks();
    }
});

renderTasks();

// ======= Quick Links =======
let links = JSON.parse(localStorage.getItem('links')) || [];
const linkList = document.getElementById('link-list');

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
}

function renderLinks() {
    linkList.innerHTML = '';
    links.forEach((link, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${link.url}" target="_blank">${link.name}</a>
            <button onclick="deleteLink(${index})">🗑️</button>
        `;
        linkList.appendChild(li);
    });
}

function deleteLink(index) {
    links.splice(index, 1);
    saveLinks();
}

document.getElementById('add-link').addEventListener('click', () => {
    const name = document.getElementById('new-link-name').value.trim();
    const url = document.getElementById('new-link-url').value.trim();
    if (name && url) {
        links.push({name, url});
        document.getElementById('new-link-name').value = '';
        document.getElementById('new-link-url').value = '';
        saveLinks();
    }
});

renderLinks();