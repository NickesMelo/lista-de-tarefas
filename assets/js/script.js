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

    let btnSave = document.createElement('button');
    let btnDelete = document.createElement('button');
    let btnEdit = document.createElement('button');
    let btnCancel = document.createElement('button');

    btnSave.classList.add('hidden', 'background-green');
    btnCancel.classList.add('hidden', 'background-yellow');

    btnEdit.classList.add('background-green');
    btnDelete.classList.add('background-red')

    btnSave.innerHTML = 'Salvar';
    btnEdit.innerHTML = 'Editar';
    btnDelete.innerHTML = 'Excluir';
    btnCancel.innerHTML = 'Cancelar';

    li.appendChild(inputCheckbox);
    li.appendChild(inputText);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    li.appendChild(btnSave);
    li.appendChild(btnCancel);
    ulList.appendChild(li);

    btnEdit.addEventListener("click", function () {
        editSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnSave.addEventListener("click", function () {
        editSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnCancel.addEventListener("click", function () {
        editSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnDelete.addEventListener("click", function () {
        ulList.removeChild(li);
    });
}

function editSaveTask(btnEdit, btnSave, btnCancel, btnDelete) {
    if (btnEdit.classList.contains('hidden')) {
        // Volta ao modo normal: mostra Editar e Excluir, esconde Salvar e Cancelar
        btnSave.classList.add('hidden');
        btnCancel.classList.add('hidden');
        btnEdit.classList.remove('hidden');
        btnDelete.classList.remove('hidden');
    } else {
        // Modo de edição: esconde Editar e Excluir, mostra Salvar e Cancelar
        btnEdit.classList.add('hidden');
        btnDelete.classList.add('hidden');
        btnSave.classList.remove('hidden');
        btnCancel.classList.remove('hidden');
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