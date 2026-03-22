class Student {
  constructor(name) {
    this.name = name;
    this.isPresent = null;
  }
}

const studentInput = document.getElementById("studentInput");
const addBtn = document.getElementById("addBtn");
const attendanceList = document.getElementById("attendanceList");

addBtn.addEventListener("click", () => {
  const studentName = studentInput.value.trim();

  if (studentName !== "") {
    const newStudent = new Student(studentName);
    addStudentToDOM(newStudent);
    studentInput.value = "";
  } else {
    alert("Please enter a student name.");
  }
});

function addStudentToDOM(studentObj) {
  const li = document.createElement("li");

  const nameContainer = document.createElement("div");
  nameContainer.classList.add("name-container");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = studentObj.name;
  nameSpan.classList.add("student-name");

  const statusSpan = document.createElement("span");
  statusSpan.classList.add("status-text");

  nameContainer.appendChild(nameSpan);
  nameContainer.appendChild(statusSpan);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("action-buttons");

  const presentBtn = document.createElement("button");
  presentBtn.textContent = "Mark Present";
  presentBtn.classList.add("btn-present");

  presentBtn.addEventListener("click", () => {
    studentObj.isPresent = true;
    li.className = "is-present";
    statusSpan.textContent = "(Present)";
    statusSpan.className = "status-text text-present"; 
  });

  const absentBtn = document.createElement("button");
  absentBtn.textContent = "Mark Absent";
  absentBtn.classList.add("btn-absent");
  absentBtn.addEventListener("click", () => {
    studentObj.isPresent = false;
    li.className = "is-absent";
    statusSpan.textContent = "(Absent)";
    statusSpan.className = "status-text text-absent"; 
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-remove");
  removeBtn.addEventListener("click", () => {
    li.remove();
  });

  buttonsDiv.appendChild(presentBtn);
  buttonsDiv.appendChild(absentBtn);
  buttonsDiv.appendChild(removeBtn);

  li.appendChild(nameContainer);
  li.appendChild(buttonsDiv);

  attendanceList.appendChild(li);
}


// class Student {
//   constructor(name) {
//     this.name = name;
//     this.isPresent = null;
//   }
// }

// const studentInput = document.getElementById("studentInput");
// const addBtn = document.getElementById("addBtn");
// const attendanceList = document.getElementById("attendanceList");

// addBtn.addEventListener("click", handleAddStudent);

// function handleAddStudent() {
//   const studentName = studentInput.value.trim();

//   if (!studentName) {
//     alert("Please enter a student name.");
//     return;
//   }

//   const newStudent = new Student(studentName);
//   renderStudentToDOM(newStudent);

//   studentInput.value = "";
// }

// function renderStudentToDOM(studentObj) {
//   const li = document.createElement("li");

//   li.innerHTML = `
//         <div class="name-container">
//             <span class="student-name">${studentObj.name}</span>
//             <span class="status-text"></span>
//         </div>
//         <div class="action-buttons">
//             <button class="btn-present">Mark Present</button>
//             <button class="btn-absent">Mark Absent</button>
//             <button class="btn-remove">Remove</button>
//         </div>
//     `;

//   const statusSpan = li.querySelector(".status-text");
//   const presentBtn = li.querySelector(".btn-present");
//   const absentBtn = li.querySelector(".btn-absent");
//   const removeBtn = li.querySelector(".btn-remove");

//   presentBtn.addEventListener("click", () =>
//     updateStatus(li, statusSpan, studentObj, true),
//   );
//   absentBtn.addEventListener("click", () =>
//     updateStatus(li, statusSpan, studentObj, false),
//   );
//   removeBtn.addEventListener("click", () => li.remove());

//   attendanceList.appendChild(li);
// }

// function updateStatus(liElement, statusSpan, studentObj, isPresent) {
//   studentObj.isPresent = isPresent;

//   if (isPresent) {
//     liElement.className = "is-present";
//     statusSpan.textContent = "(Present)";
//     statusSpan.className = "status-text text-present";
//   } else {
//     liElement.className = "is-absent";
//     statusSpan.textContent = "(Absent)";
//     statusSpan.className = "status-text text-absent";
//   }
// }
