const tablo = document.getElementById('tbody');
const input = document.getElementById('girdi');

let count = 0;

const ekle = document.getElementById('ekle');
ekle.addEventListener('click', myfunction);
input.addEventListener('keypress', control);



tablo.addEventListener('click', e => {
    if (e.target.matches('input')) {
        // console.log(e.target.checked)
        verileriCek(e.target.checked, e.target.id)
    }
});



function control(e) {
    if (e.keyCode == '13') {
        myfunction();
    }
}

let tasks = [];
checkStorage();


function checkStorage() {
    tasks = localStorage.getItem("tasks");
    if (tasks === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
}

function myfunction() {

    if (!input.value) {
        alert("Lutfen alani bos birakmayiniz");
        exit();
    }


    const task = input.value;
    const bool = false;
    tasks.push([task, bool, `checkleBro${count + 1}`]);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    hazirBirRow(input.value, false);

    input.value = '';
}


storagedenCagir();
function storagedenCagir() {
    let gorevler = JSON.parse(localStorage.getItem('tasks'))
    if (gorevler) {
        gorevler.forEach(element => {
            hazirBirRow(element[0], element[1]);
        });
    }
}


function hazirBirRow(yazi, bool) {
    count++;
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.classList.add('col-md-1');

    const checkBox = document.createElement('input');
    checkBox.classList.add('checkleBro')
    checkBox.id = `checkleBro${count}`;
    checkBox.type = 'checkbox';

    const td2 = document.createElement('td');
    td2.classList.add('col-md-9');
    const label = document.createElement('label');
    label.htmlFor = `checkleBro${count}`;


    const td3 = document.createElement('td');
    td3.classList.add('col-md-1')
    const button = document.createElement('button');
    button.classList.add('px-3');
    button.classList.add('py-2');
    button.classList.add('mt-1');
    button.classList.add('btn-danger');
    button.classList.add('btn');
    button.textContent = 'X';
    button.name = 'silTek';
    button.id = `checkleBro${count}`;


    const p = document.createElement('p');
    p.id = 'toDo';
    p.innerText = yazi;


    if (bool === true) {
        checkBox.checked = true;
        p.style.textDecoration = 'line-through';
    } else {
        checkBox.checked = false;
        p.style.removeProperty;
    }

    tablo.appendChild(tr);
    tr.appendChild(td1);
    td1.appendChild(checkBox);
    tr.appendChild(td2);
    td2.appendChild(label);
    label.appendChild(p);
    tr.appendChild(td3);
    td3.appendChild(button);
}



const sil = document.getElementById('sil');
sil.addEventListener('click', hepsiniSil)

function hepsiniSil() {

    const trler = document.querySelectorAll('tr');
    for (let i = 0; i < trler.length; i++) {
        trler[i].remove();
    }
    localStorage.clear();
    checkStorage();
}

function verileriCek(deger, id) {

    for (let i = 0; i < tasks.length; i++) {
        if (id === tasks[i][2]) {
            tasks[i][1] = deger;
            localStorage.setItem('tasks', JSON.stringify(tasks))
            location.reload();
        }

    }
}



// Tek tek silme tusunun islevini saglayan kod satiri



const tekSil = document.getElementsByName('silTek');
tekSil.forEach(element => {
    addEventListener('click', tekTekSil)
});

function tekTekSil(e) {
    
    if (e.target.matches('button')) {
        if(tasks.length <= 1){
            hepsiniSil();
        }else{
            for (let i = 0; i < tasks.length; i++) {
                if (e.target.id == tasks[i][2]) {
                    // console.log(tasks[i])
                    tasks.splice(i, 1);
                    
                }
                localStorage.setItem('tasks', JSON.stringify(tasks));
                location.reload();
            }
        }
    }
}