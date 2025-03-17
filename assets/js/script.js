const taskListContainer = document.querySelector('#task-list-ul');
const btnAddTask = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const btnSaveTask = document.querySelector('#btn-save-task');
const btnCloseModal = document.querySelector('#btn-close-modal');
const modal = document.querySelector('#modal');

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
    }

    if (!isPrioritySelected()) {
        return;
    }

    createTaskElement();
    taskInput.value = '';
    closeModal();
}

function createTaskElement() {
    const li = document.createElement('li');
    li.appendChild(createCheckbox());

    const inputText = createTaskInput(taskInput.value);
    li.appendChild(inputText);

    const btnEdit = createButton('Editar', 'background-green');
    const btnDelete = createButton('Excluir', 'background-red');
    const btnSave = createButton('Salvar', 'background-green', true);
    const btnCancel = createButton('Cancelar', 'background-yellow', true);

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    li.appendChild(btnSave);
    li.appendChild(btnCancel);

    taskListContainer.appendChild(li);

    addTaskEvents(btnEdit, btnDelete, btnSave, btnCancel, inputText, li);

}

function createCheckbox() {
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.setAttribute('aria-label', 'Marcar tarefa como concluída')
    return inputCheckbox;
}

function createTaskInput(value) {
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.disabled = true;
    inputText.value = capitalizeFirstLetter(value);
    return inputText;
}

function createButton(label, className, hidden = false) {
    const button = document.createElement('button');

    button.textContent = label;
    button.classList.add(className);

    if (hidden) button.classList.add('hidden');
    return button;
}

function toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete) {
    if (btnEdit.classList.contains('hidden')) {
        btnSave.classList.add('hidden');
        btnCancel.classList.add('hidden');
        btnEdit.classList.remove('hidden');
        btnDelete.classList.remove('hidden');
    } else {
        btnEdit.classList.add('hidden');
        btnDelete.classList.add('hidden');
        btnSave.classList.remove('hidden');
        btnCancel.classList.remove('hidden');
    }
}

function capitalizeFirstLetter(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function toggleInputState(inputText, isDisabled) {
    if (isDisabled) {
        inputText.setAttribute('disabled', 'true');
    } else {
        inputText.removeAttribute('disabled');
    }
}

function isPrioritySelected() {
    const lowPriority = document.querySelector('#low');
    const middlePriority = document.querySelector('#middle');
    const highPriority = document.querySelector('#high');

    const priorityRadios = [lowPriority, middlePriority, highPriority]

    let isSelected = priorityRadios.some(radio => radio.checked);

    if (!isSelected) {
        alert('Selecione uma prioridade');
        return false;
    }
    return true;
}

function addTaskEvents(btnEdit, btnDelete, btnSave, btnCancel, inputText, li) {
    btnEdit.addEventListener("click", function () {
        toggleInputState(inputText, false);
        toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnSave.addEventListener("click", function () {
        toggleInputState(inputText, true);
        toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnCancel.addEventListener("click", function () {
        toggleInputState(inputText, true);
        toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete);
    });

    btnDelete.addEventListener("click", function () {
        taskListContainer.removeChild(li);
    });
}

btnAddTask.addEventListener("click", showTaskModal);

btnCloseModal.addEventListener("click", function () {
    closeModal();
});

btnSaveTask.addEventListener("click", function () {
    saveTask();
});

document.addEventListener("click", function (event) {
    if (modal.classList.contains('visible') && !modal.contains(event.target) && event.target !== btnAddTask) {
        closeModal();
    }
});