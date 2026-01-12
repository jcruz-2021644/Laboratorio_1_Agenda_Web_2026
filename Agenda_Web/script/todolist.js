// ====== ELEMENTOS ======
const addContactModal = document.getElementById("addContactModal");
const viewTaskModal = document.getElementById("viewTaskModal");
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const sortSelect = document.getElementById("sort-difficulty");

// ====== CARGAR TAREAS DESDE LOCALSTORAGE ======
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasks);

// ====== FILTRAR POR DIFICULTAD ======
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

// ====== MODAL AGREGAR ======
window.openAddContactModal = function () {
  addContactModal.classList.add("show");
};

window.closeAddContactModal = function () {
  addContactModal.classList.remove("show");
  taskForm.reset();
};

// Botón cancelar
document.getElementById("cancelAddTask").addEventListener("click", () => {
  closeAddContactModal();
});

// ====== AGREGAR TAREA ======
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    id: Date.now(), // ID único
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

// ====== RENDERIZAR TAREAS ======
function renderTasks(taskArray) {
  tasksList.innerHTML = "";

  taskArray.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

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
    `;

    tasksList.appendChild(taskItem);
  });
}

// ====== GUARDAR EN LOCALSTORAGE ======
function guardarTareas() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ====== MODAL VER TAREA ======
function openViewTaskModal() {
  viewTaskModal.classList.add("show");
}

function closeViewTaskModal() {
  viewTaskModal.classList.remove("show");
}

// ====== VER TAREA ======
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

// ====== ELIMINAR TAREA ======
function deleteTask(id) {
  const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarea?");
  if (!confirmDelete) return;

  tasks = tasks.filter(task => task.id !== id);
  guardarTareas();
  renderTasks(tasks);
}
