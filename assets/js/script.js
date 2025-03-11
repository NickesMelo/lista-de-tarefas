const ulList = document.querySelector('#task-list-ul');
const btnAdd = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const btnSaveTask = document.querySelector('#btn-save-task');
const btnCloseTask = document.querySelector('#btn-close-modal');
const modal = document.querySelector('#modal'); 

function init() {
    openModal();
}

function openModal() {
    modal.classList.add('visible');
    taskInput.focus();
}

function closeModal() {
    modal.classList.remove('visible');
}

function saveTask() {
    if (taskInput.value.trim() === '') {
        alert('Informe uma tarefa');
        return;
    } else {
        createNewElement();
        taskInput.value = '';
        closeModal();
    }
}

function createNewElement() {
    let li = document.createElement('li');
    let inputCheckbox = document.createElement('input');
    let inputText = document.createElement('input');

    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('aria-label', 'Marcar tarefa como concluída');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('disabled', 'true');

    inputText.value = capitalizeFirstLetter(taskInput.value);

    let btnSalvar = document.createElement('button');
    let btnExcluir = document.createElement('button');
    let btnEditar = document.createElement('button');
    let btnCancelar = document.createElement('button');

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
    li.appendChild(btnSalvar);
    li.appendChild(btnCancelar);
    ulList.appendChild(li);

    btnEditar.addEventListener("click", function () {
        editSaveTask(btnEditar, btnSalvar, btnCancelar, btnExcluir);
    });

    btnSalvar.addEventListener("click", function () {
        editSaveTask(btnEditar, btnSalvar, btnCancelar, btnExcluir);
    });

    btnCancelar.addEventListener("click", function () {
        editSaveTask(btnEditar, btnSalvar, btnCancelar, btnExcluir);
    });

    btnExcluir.addEventListener("click", function () {
        ulList.removeChild(li);
    });
}

function editSaveTask(btnEditar, btnSalvar, btnCancelar, btnExcluir) {
    if (btnEditar.classList.contains('hidden')) {
        // Volta ao modo normal: mostra Editar e Excluir, esconde Salvar e Cancelar
        btnSalvar.classList.add('hidden');
        btnCancelar.classList.add('hidden');
        btnEditar.classList.remove('hidden');
        btnExcluir.classList.remove('hidden');
    } else {
        // Modo de edição: esconde Editar e Excluir, mostra Salvar e Cancelar
        btnEditar.classList.add('hidden');
        btnExcluir.classList.add('hidden');
        btnSalvar.classList.remove('hidden');
        btnCancelar.classList.remove('hidden');
    }
}

function capitalizeFirstLetter(value) {
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

btnCloseTask.addEventListener("click", function () {
    closeModal();
});

btnSaveTask.addEventListener("click", function() {
    saveTask();
});