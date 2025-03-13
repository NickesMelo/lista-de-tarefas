const taskListContainer = document.querySelector('#task-list-ul');
const btnAddTask = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const btnSave = document.querySelector('#btn-save-task');
const btnCloseModal = document.querySelector('#btn-close-modal');
const modal = document.querySelector('#modal');

function initializeTaskApp() {
    showTaskModal();
}

function showTaskModal() {
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
        createTaskElement();
        taskInput.value = '';
        closeModal();
    }
}

function createTaskElement() {
    let li = document.createElement('li');
    let inputCheckbox = document.createElement('input');
    let inputText = document.createElement('input');

    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('aria-label', 'Marcar tarefa como concluída');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('disabled', 'true');

    inputText.value = capitalizeFirstLetter(taskInput.value);

    let btnSaveTask = document.createElement('button');  // Renomeado para evitar conflito
    let btnDelete = document.createElement('button');
    let btnEdit = document.createElement('button');
    let btnCancel = document.createElement('button');

    btnSaveTask.classList.add('hidden', 'background-green');
    btnCancel.classList.add('hidden', 'background-yellow');

    btnEdit.classList.add('background-green');
    btnDelete.classList.add('background-red');

    btnSaveTask.innerHTML = 'Salvar';
    btnEdit.innerHTML = 'Editar';
    btnDelete.innerHTML = 'Excluir';
    btnCancel.innerHTML = 'Cancelar';

    li.appendChild(inputCheckbox);
    li.appendChild(inputText);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    li.appendChild(btnSaveTask);
    li.appendChild(btnCancel);
    taskListContainer.appendChild(li);

    btnEdit.addEventListener("click", function () {
        toggleEditSaveTask(btnEdit, btnSaveTask, btnCancel, btnDelete);
    });

    btnSaveTask.addEventListener("click", function () {
        toggleEditSaveTask(btnEdit, btnSaveTask, btnCancel, btnDelete);
    });

    btnCancel.addEventListener("click", function () {
        toggleEditSaveTask(btnEdit, btnSaveTask, btnCancel, btnDelete);
    });

    btnDelete.addEventListener("click", function () {
        taskListContainer.removeChild(li);
    });
}

function toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete) {
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

document.addEventListener("click", function (event) {
    if (modal.classList.contains('visible') && !modal.contains(event.target) && event.target !== btnAddTask) {
        closeModal();
    }
});

btnAddTask.addEventListener("click", function () {
    initializeTaskApp();
});

btnCloseModal.addEventListener("click", function () {
    closeModal();
});

btnSave.addEventListener("click", function () {
    saveTask();
});