// los elementos a usar que se traen del html
const addContactModal = document.getElementById("addContactModal");
const viewTaskModal = document.getElementById("viewTaskModal");
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const sortSelect = document.getElementById("sort-difficulty");

// cargamos las tareasen un array que este vacio o que tenga tareas guardadas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasks);

// hacemos nuestro filtro por dificultad
sortSelect.addEventListener("change", function () {
  const selectedDifficulty = this.value;

  if (selectedDifficulty === "all") {
    renderTasks(tasks);
  } else {
    const filteredTasks = tasks.filter(
      task => task.difficulty === selectedDifficulty
    );
    renderTasks(filteredTasks);
  }
});

// todo el modal de agregar tarea
window.openAddContactModal = function () {
  addContactModal.classList.add("show");
};
// para cerrar el modal
window.closeAddContactModal = function () {
  addContactModal.classList.remove("show");
  taskForm.reset();
};

// boton cancelar
document.getElementById("cancelAddTask").addEventListener("click", () => {
  closeAddContactModal();
});

// funcion para agregar la tarea
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    id: Date.now(),
    name: document.getElementById("taskName").value,
    start: document.getElementById("taskStartDate").value,
    end: document.getElementById("taskEndDate").value,
    difficulty: document.getElementById("taskDifficulty").value,
    objective: document.getElementById("taskObjective").value,
  };

  tasks.push(task);
  guardarTareas();
  renderTasks(tasks);
  closeAddContactModal();
});

// funcion para cargar las tareas
function renderTasks(taskArray) {
  tasksList.innerHTML = "";

  taskArray.forEach(task => {

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item", task.status);

    taskItem.innerHTML = `
      <div class="task-info">
        <div class="task-title">Nombre de la tarea: ${task.name}</div>

        <div class="task-meta">
          <span class="task-date">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64z"/>
            </svg>
            ${task.start} → ${task.end}
          </span>

          <span class="task-difficulty ${task.difficulty}">
            ${task.difficulty.toUpperCase()}
          </span>
        </div>
      </div>
      <div class="form-group">
      <div class="task-actions">
        <select 
  class="status-select ${task.status}" 
  onchange="changeStatus(${task.id}, this.value)">
          <option value="pendiente" ${task.status === "pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="proceso" ${task.status === "proceso" ? "selected" : ""}>En proceso</option>
          <option value="finalizada" ${task.status === "finalizada" ? "selected" : ""}>Finalizada</option>
        </select>
        
      
        <button class="cssbuttons-io-buttonVer" onclick="deleteTask(${task.id})">
          Eliminar
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M576 192C576 156.7 547.3 128 512 128L205.3 128C188.3 128 172 134.7 160 146.7L9.4 297.4C3.4 303.4 0 311.5 0 320C0 328.5 3.4 336.6 9.4 342.6L160 493.3C172 505.3 188.3 512 205.3 512L512 512C547.3 512 576 483.3 576 448L576 192z"/>
            </svg>
          </div>
        </button>

        <button class="cssbuttons-io-buttonVer" onclick="viewTask(${task.id})">
          Ver más
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
            </svg>
          </div>
        </button>

        <button class="cssbuttons-io-buttonVer" onclick="updateTask(${task.id})">
          Actualizar
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>
          </div>
        </button>
      </div>
    `;

    tasksList.appendChild(taskItem);
  });
}

// se guardan las tareas en el localstorage para que no se pierdan al salir
function guardarTareas() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// funciones para el modal de ver tarea
function openViewTaskModal() {
  viewTaskModal.classList.add("show");
}
// cerrar modal ver tarea
function closeViewTaskModal() {
  viewTaskModal.classList.remove("show");
}

// ver tarea
function viewTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById("viewTaskName").textContent = task.name;
  document.getElementById("viewTaskStart").textContent = task.start;
  document.getElementById("viewTaskEnd").textContent = task.end;
  document.getElementById("viewTaskObjective").textContent = task.objective;

  const diff = document.getElementById("viewTaskDifficulty");
  diff.textContent = task.difficulty.toUpperCase();
  diff.className = `difficulty-badge ${task.difficulty}`;

  openViewTaskModal();
}

// eliminar tarea 
function deleteTask(id) {
  const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarea?");
  if (!confirmDelete) return;

  tasks = tasks.filter(task => task.id !== id);
  guardarTareas();
  renderTasks(tasks);
}

// actualizar tarea
function updateTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById("updateTaskId").value = task.id;
  document.getElementById("updateTaskName").value = task.name;
  document.getElementById("updateTaskStart").value = task.start;
  document.getElementById("updateTaskEnd").value = task.end;
  document.getElementById("updateTaskDifficulty").value = task.difficulty;
  document.getElementById("updateTaskObjective").value = task.objective;

  document.getElementById("updateTaskModal").classList.add("show");
}

// manejar el formulario de actualizar tarea
document.getElementById("updateTaskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = Number(document.getElementById("updateTaskId").value);

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return;

  tasks[taskIndex] = {
    id,
    name: document.getElementById("updateTaskName").value,
    start: document.getElementById("updateTaskStart").value,
    end: document.getElementById("updateTaskEnd").value,
    difficulty: document.getElementById("updateTaskDifficulty").value,
    objective: document.getElementById("updateTaskObjective").value,
    status: tasks[taskIndex].status
  };

  guardarTareas();
  renderTasks(tasks);
  closeUpdateModal();
}); function closeUpdateModal() {
  document.getElementById("updateTaskModal").classList.remove("show");
}

// obtener datos de la nueva tarea
const task = {
  id: Date.now(),
  name: document.getElementById("taskName").value,
  start: document.getElementById("taskStartDate").value,
  end: document.getElementById("taskEndDate").value,
  difficulty: document.getElementById("taskDifficulty").value,
  objective: document.getElementById("taskObjective").value,
  status: "pendiente"
};

// cambiar el estado de la tarea
function changeStatus(id, newStatus) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.status = newStatus;
  guardarTareas();
  renderTasks(tasks);
}
