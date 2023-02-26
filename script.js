const tablo = document.getElementById('tbody');
const input = document.getElementById('girdi');




const ekle = document.getElementById('ekle');
ekle.addEventListener('click', myfunction);
input.addEventListener('keypress',control);

function control(e) {
    if(e.keyCode == '13'){
        myfunction();
    }
}

function myfunction() {
    if(!input.value){
        alert("Lutfen alani bos birakmayiniz");
        exit();
    }
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.classList.add('col-md-1');

    const checkBox = document.createElement('input');
    checkBox.id = 'checkleBro';
    checkBox.type = 'checkbox';

    const td2 = document.createElement('td');
    td2.classList.add('col-md-11');
    const label = document.createElement('label');
    label.htmlFor = 'checkleBro';

    const p = document.createElement('p');
    p.id = 'toDo';
    p.innerText = input.value;

    tablo.appendChild(tr);
    tr.appendChild(td1);
    td1.appendChild(checkBox);
    tr.appendChild(td2);
    td2.appendChild(label);
    label.appendChild(p);
    input.value = '';
}

const sil = document.getElementById('sil');
sil.addEventListener('click',myfunction2)

function myfunction2() {
    const trler = document.getElementsByTagName('tr');
    for(var i=0;i<trler.length;i++){
        trler[i].remove();
    }
}