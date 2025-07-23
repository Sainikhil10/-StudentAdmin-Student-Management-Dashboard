let students = JSON.parse(localStorage.getItem("students")) || [];

function renderStudents(data) {
  const container = document.getElementById("student-list");
  container.innerHTML = "";

  data.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${s.name} (${s.roll})</h3>
      <p>Dept: ${s.dept}</p>
      <p>Year: ${s.year}</p>
      <button onclick="deleteStudent(${i})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const dept = document.getElementById("dept").value.trim();
  const year = document.getElementById("year").value.trim();

  if (!name || !roll || !dept || !year) return alert("All fields are required!");

  students.push({ name, roll, dept, year });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents(students);
  clearForm();
}

function clearForm() {
  ["name", "roll", "dept", "year"].forEach(id => document.getElementById(id).value = "");
}

function deleteStudent(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents(students);
  }
}

function filterStudents() {
  const dept = document.getElementById("dept-filter").value;
  const year = document.getElementById("year-filter").value;

  const filtered = students.filter(s => {
    return (dept === "All" || s.dept === dept) &&
           (year === "All" || s.year === year);
  });

  renderStudents(filtered);
}

renderStudents(students);
