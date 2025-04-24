const taskListContainer = document.querySelector("#task-list-ul");
const btnAddTask = document.querySelector("#btn-add");
const btnSaveTask = document.querySelector("#btn-save-task");
const btnCloseModal = document.querySelector("#btn-close-modal");
const modal = document.querySelector("#modal");
const taskInput = document.querySelector("#task-input");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Atualizar estatísticas
function updateStats() {
    const totalTasks = document.querySelectorAll("#task-list-ul li").length;
    const completedTasks = document.querySelectorAll(".task-concluded").length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById("total-tasks").textContent = totalTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
    document.getElementById("pending-tasks").textContent = pendingTasks;

    // Mostrar/esconder estado vazio
    const emptyState = document.getElementById("empty-state");
    if (totalTasks === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}

function initApp() {
    modal.classList.add("visible");
    taskInput.focus();
}

function closeModal() {
    modal.classList.remove("visible");
}

function saveTask() {
    if (taskInput.value.trim() === "") {
        alert("Informe uma tarefa");
        return;
    }

    const selectedPriority = isPrioritySelected();
    if (!selectedPriority) return;

    const newTask = createTaskElement();
    addClassPriority(selectedPriority, newTask);

    taskConcluded(newTask);
    taskInput.value = "";
    resetPriority();
    closeModal();
    getCurrentDate();
    updateStats();

    return newTask;
}

function taskConcluded(taskElement) {
    const checkbox = taskElement.querySelector('input[type="checkbox"]');

    if (!checkbox) {
        console.log("Checkbox não encontrado");
    }

    checkboxEvent(checkbox, taskElement);
}

function createTaskElement() {
    const li = document.createElement("li");
    const checkbox = createCheckbox();
    checkbox.setAttribute("name", "checkbox");
    li.appendChild(checkbox);

    let p = createP();
    li.appendChild(p);
    p.innerHTML = getCurrentDate();

    const inputText = createTaskInput(taskInput.value);
    inputText.setAttribute("name", "taskDescription");
    li.appendChild(inputText);

    const btnEdit = createButton("Editar", "background-green");
    const btnDelete = createButton("Excluir", "background-red");
    const btnSave = createButton("Salvar", "background-green", true);
    const btnCancel = createButton("Cancelar", "background-yellow", true);

    btnEdit.setAttribute("id", "edit");
    btnDelete.setAttribute("id", "delete");
    btnSave.setAttribute("id", "save");
    btnCancel.setAttribute("id", "cancel");

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    li.appendChild(btnSave);
    li.appendChild(btnCancel);

    taskListContainer.appendChild(li);

    addTaskEvents(btnEdit, btnDelete, btnSave, btnCancel, inputText, li);
    return li;
}

function createCheckbox() {
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.disabled = false;
    inputCheckbox.setAttribute("aria-label", "Marcar tarefa como concluída");
    return inputCheckbox;
}

function createTaskInput(value) {
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.disabled = true;
    inputText.value = capitalizeFirstLetter(value);
    inputText.setAttribute("maxlength", "50");
    inputText.setAttribute("placeholder", "Máximo 50 caracteres");
    return inputText;
}

function toggleInputState(inputText, isDisabled) {
    if (isDisabled) {
        inputText.setAttribute("disabled", "true");
    } else {
        inputText.removeAttribute("disabled");
        inputText.focus();
    }
}

function createButton(label, className, hidden = false) {
    const button = document.createElement("button");

    button.textContent = label;
    button.classList.add(className);

    if (hidden) button.classList.add("hidden");
    return button;
}

function createP() {
    const paragraph = document.createElement("p");
    return paragraph;
}

function toggleEditSaveTask(btnEdit, btnSave, btnCancel, btnDelete) {
    if (btnEdit.classList.contains("hidden")) {
        btnSave.classList.add("hidden");
        btnCancel.classList.add("hidden");
        btnEdit.classList.remove("hidden");
        btnDelete.classList.remove("hidden");
    } else {
        btnEdit.classList.add("hidden");
        btnDelete.classList.add("hidden");
        btnSave.classList.remove("hidden");
        btnCancel.classList.remove("hidden");
    }
}

function capitalizeFirstLetter(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function isPrioritySelected() {
    const selectedPriority = document.querySelector(
        'input[name="priority"]:checked'
    );

    if (!selectedPriority) {
        alert("Selecione uma prioridade");
        return null;
    }

    return selectedPriority;
}

function addClassPriority(priority, taskElement) {
    if (priority.id === "high") {
        taskElement.classList.add("high-priority");
    }
    if (priority.id === "medium") {
        taskElement.classList.add("medium-priority");
    }
    if (priority.id === "low") {
        taskElement.classList.add("low-priority");
    }
}

function resetPriority() {
    document.querySelector('input[name="priority"]:checked').checked = false;
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
        updateStats();
    });
}

function checkboxEvent(checkbox, taskElement) {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            checkbox.disabled = true;

            resetTaskButtons(taskElement);

            toggleInputState(
                taskElement.querySelector('input[name="taskDescription"]'),
                true
            );

            taskElement.classList.add("task-concluded");
            updateStats();
        }
    });
}

function resetTaskButtons(taskElement) {
    const btnSave = taskElement.querySelector("#save");
    const btnEdit = taskElement.querySelector("#edit");
    const btnCancel = taskElement.querySelector("#cancel");
    const btnDelete = taskElement.querySelector("#delete");

    if (btnSave && btnEdit && btnCancel && btnDelete) {
        btnSave.classList.add("hidden");
        btnCancel.classList.add("hidden");
        btnEdit.classList.remove("hidden");
        btnDelete.classList.remove("hidden");

        btnEdit.disabled = true;
    }
}

function getCurrentDate() {
    return new Date().toLocaleDateString();
}

function checkSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        const currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
        updateThemeIcon(currentTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

// Event listeners
btnAddTask.addEventListener("click", initApp);

btnCloseModal.addEventListener("click", function () {
    closeModal();
});

btnSaveTask.addEventListener("click", function () {
    saveTask();
});

document.addEventListener("click", function (event) {
    if (
        modal.classList.contains("visible") &&
        !modal.contains(event.target) &&
        event.target !== btnAddTask
    ) {
        closeModal();
    }
});

// Inicializar estatísticas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    updateStats();
    checkSavedTheme()
});

themeToggle.addEventListener("click", toggleTheme);
