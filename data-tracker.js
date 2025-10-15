const labelInput = document.getElementById("labelInput");
const valueInput = document.getElementById("valueInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const backBtn = document.getElementById("backBtn");
const dataTable = document.getElementById("dataTable").querySelector("tbody");

let data = JSON.parse(localStorage.getItem("dataTracker")) || [];

function renderTable() {
  dataTable.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.label}</td>
      <td>${item.value}</td>
      <td><button class="deleteBtn" data-index="${index}">🗑️</button></td>
    `;
    dataTable.appendChild(row);
  });

  // Handle delete buttons
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      data.splice(index, 1);
      saveAndRender();
    });
  });
}

function saveAndRender() {
  localStorage.setItem("dataTracker", JSON.stringify(data));
  renderTable();
}

addBtn.addEventListener("click", () => {
  const label = labelInput.value.trim();
  const value = parseFloat(valueInput.value);
  if (label && !isNaN(value)) {
    data.push({ label, value });
    saveAndRender();
    labelInput.value = "";
    valueInput.value = "";
  } else {
    alert("Please enter both label and numeric value.");
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all data?")) {
    data = [];
    saveAndRender();
  }
});

backBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // Change this to your portfolio page
});

// Initial render
renderTable();
