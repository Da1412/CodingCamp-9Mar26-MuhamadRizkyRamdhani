// Time & Greeting
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    document.getElementById('date-time').textContent = now.toLocaleDateString() + ' | ' + hours + ':' + minutes + ':' + seconds;
    document.getElementById('greeting').textContent = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
}
setInterval(updateTime,1000);
updateTime();

// Focus Timer
let timer, timeLeft = 25*60;
function updateTimerDisplay() {
    const m = String(Math.floor(timeLeft/60)).padStart(2,'0');
    const s = String(timeLeft%60).padStart(2,'0');
    document.getElementById('timer').textContent = `${m}:${s}`;
}
document.getElementById('start').addEventListener('click', ()=>{
    if(!timer) timer = setInterval(()=>{
        if(timeLeft>0){timeLeft--; updateTimerDisplay();}
        else{clearInterval(timer); timer=null; timeLeft=25*60; updateTimerDisplay(); alert("Focus session ended 🎯");}
    },1000);
});
document.getElementById('stop').addEventListener('click', ()=>{clearInterval(timer); timer=null;});
document.getElementById('reset').addEventListener('click', ()=>{clearInterval(timer); timer=null; timeLeft=25*60; updateTimerDisplay();});
updateTimerDisplay();

// To-Do List
let tasks = JSON.parse(localStorage.getItem('tasks'))||[];
const taskList = document.getElementById('task-list');
function saveTasks(){localStorage.setItem('tasks',JSON.stringify(tasks)); renderTasks();}
function renderTasks(){
    taskList.innerHTML='';
    tasks.forEach((t,i)=>{
        const li=document.createElement('li');
        li.className=t.done?'done':'';
        li.innerHTML=`<span>${t.text}</span><div><button onclick="toggleDone(${i})">✔️</button><button onclick="editTask(${i})">✏️</button><button class="delete-task" onclick="deleteTask(${i})">🗑️</button></div>`;
        taskList.appendChild(li);
    });
}
function toggleDone(i){tasks[i].done=!tasks[i].done; saveTasks();}
function editTask(i){const txt=prompt("Edit task:",tasks[i].text); if(txt){tasks[i].text=txt; saveTasks();}}
function deleteTask(i){tasks.splice(i,1); saveTasks();}
document.getElementById('add-task').addEventListener('click',()=>{
    const val=document.getElementById('new-task').value.trim();
    if(val){tasks.push({text:val,done:false}); document.getElementById('new-task').value=''; saveTasks();}
});
renderTasks();

// Quick Links
let links = JSON.parse(localStorage.getItem('links'))||[];
const linkList = document.getElementById('link-list');
function saveLinks(){localStorage.setItem('links',JSON.stringify(links)); renderLinks();}
function renderLinks(){
    linkList.innerHTML='';
    links.forEach((l,i)=>{
        const div=document.createElement('div');
        div.className='link-pill';
        div.innerHTML=`${l.name} <button class="remove-link" onclick="deleteLink(${i})">×</button>`;
        linkList.appendChild(div);
    });
}
function deleteLink(i){links.splice(i,1); saveLinks();}
document.getElementById('add-link').addEventListener('click',()=>{
    const n=document.getElementById('new-link-name').value.trim();
    const u=document.getElementById('new-link-url').value.trim();
    if(n&&u){links.push({name:n,url:u}); document.getElementById('new-link-name').value=''; document.getElementById('new-link-url').value=''; saveLinks();}
});
renderLinks();