const ulList = document.querySelector('#task-list-ul');
const btnAdd = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const btnSalvarTarefa = document.querySelector('#btn-salvar-tarefa');
const btnFecharTarefa = document.querySelector('#btn-fechar-modal');
const modal = document.querySelector('#modal'); 

let btnSalvar = document.createElement('button');
let btnExcluir = document.createElement('button');
let btnEditar = document.createElement('button');
let btnCancelar = document.createElement('button');

function init() {
    openModal();
}

function openModal() {
    modal.classList.add('visible')
    taskInput.focus();
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

    inputText.value = capitalizeFirstlLetter(taskInput.value)
    
    btnSalvar.classList.add('hidden');
    btnCancelar.classList.add('hidden');

    btnSalvar.innerHTML = 'Salvar';
    btnEditar.innerHTML = 'Editar';
    btnExcluir.innerHTML = 'Excluir';
    btnCancelar.innerHTML = 'Cancelar';

    li.appendChild(inputCheckbox);
    li.appendChild(inputText);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);
    ulList.appendChild(li);
}

function capitalizeFirstlLetter(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

document.addEventListener("click", function(event) {
    if (modal.classList.contains('visible') && !modal.contains(event.target) && event.target !== btnAdd) {
        closeModal();
    }
});
btnAdd.addEventListener("click", function() {
    init();
});
btnFecharTarefa.addEventListener("click", function () {
    closeModal();
});
btnSalvarTarefa.addEventListener("click", function() {
    salvarTarefa();
})