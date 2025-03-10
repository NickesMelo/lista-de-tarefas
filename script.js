const ulList = document.querySelector('#task-list-ul');
const btnAdd = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const btnSalvarTarefa = document.querySelector('#btn-salvar-tarefa');
const btnFecharTarefa = document.querySelector('#btn-fechar-modal');
const modal = document.querySelector('#modal'); 

function init() {
    openModal();
}

function openModal() {
    modal.classList.add('visible')
}

function closeModal() {
    modal.classList.remove('visible')
}

function salvarTarefa () {

    if (taskInput.value.trim() === '') {
        alert('Informe uma tarefa')
        return;
    } else {
        criaElemento();
        taskInput.value = '';
        closeModal();
    }
}

function criaElemento() {

    let li = document.createElement('li');
    let inputCheckbox = document.createElement('input');
    let inputText = document.createElement('input');
    
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('aria-label', 'Marcar tarefa como concluída');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('disabled', 'true');

    inputText.value = taskInput.value;

    li.appendChild(inputCheckbox);
    li.appendChild(inputText);
    ulList.appendChild(li);
}

btnAdd.addEventListener("click", function() {
    init();
});
btnFecharTarefa.addEventListener("click", function (event) {
    event.preventDefault();
    closeModal();
});
btnSalvarTarefa.addEventListener("click", function() {
    salvarTarefa();
})