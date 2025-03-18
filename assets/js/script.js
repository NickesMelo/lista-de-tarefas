const taskListContainer = document.querySelector('#task-list-ul');
const btnAddTask = document.querySelector('#btn-add');
const btnSaveTask = document.querySelector('#btn-save-task');
const btnCloseModal = document.querySelector('#btn-close-modal');
const modal = document.querySelector('#modal');
const taskInput = document.querySelector('#task-input');

function initApp() {
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

    const newTask = createTaskElement()
    taskConcluded(newTask);

    taskInput.value = '';
    closeModal();
    getCurrentDate()
}

function taskConcluded (taskElement) {
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    
    if(!checkbox){
        console.log("Checkbox não encontrado");
    }
    
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            checkbox.disabled = true;
            
            const btnEdit = taskElement.querySelector('#edit');
            if(btnEdit) btnEdit.disabled = true;
        }
    });
}

function createTaskElement() {
    const li = document.createElement('li');
    li.appendChild(createCheckbox());
    
    let p = createP();
    li.appendChild(p);
    p.innerHTML = getCurrentDate();

    const inputText = createTaskInput(taskInput.value);
    li.appendChild(inputText);
    
    const btnEdit = createButton('Editar', 'background-green');
    const btnDelete = createButton('Excluir', 'background-red');
    const btnSave = createButton('Salvar', 'background-green', true);
    const btnCancel = createButton('Cancelar', 'background-yellow', true);

    btnEdit.setAttribute('id', 'edit');
    btnDelete.setAttribute('id', 'delete');
    btnSave.setAttribute('id', 'save');
    btnCancel.setAttribute('id', 'cancel');

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    li.appendChild(btnSave);
    li.appendChild(btnCancel);
    
    taskListContainer.appendChild(li);

    addTaskEvents(btnEdit, btnDelete, btnSave, btnCancel, inputText, li);
    return li;
}

function createCheckbox() {
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.disabled = false;
    inputCheckbox.setAttribute('aria-label', 'Marcar tarefa como concluída')
    return inputCheckbox;
}

function createTaskInput(value) {
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.disabled = true;
    inputText.value = capitalizeFirstLetter(value);
    inputText.setAttribute('maxlength', '50');
    inputText.setAttribute('placeholder', 'Máximo 50 caracteres');
    return inputText;
}

function toggleInputState(inputText, isDisabled) {
    if (isDisabled) {
        inputText.setAttribute('disabled', 'true');
    } else {
        inputText.removeAttribute('disabled');
        inputText.focus();
    }
}

function createButton(label, className, hidden = false) {
    const button = document.createElement('button');

    button.textContent = label;
    button.classList.add(className);

    if (hidden) button.classList.add('hidden');
    return button;
}

function createP() {
    const paragraph = document.createElement('p');
    return paragraph;
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

function isPrioritySelected() {
    const selectedPriority = document.querySelector('input[name="priority"]:checked');

    if (!selectedPriority) {
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

function getCurrentDate() {
    return new Date().toLocaleDateString();
}

btnAddTask.addEventListener("click", initApp);

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