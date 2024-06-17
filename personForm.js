const personForm = document.getElementById("personForm");
const nameInput = document.getElementById("personName");
const ageInput = document.getElementById("personAge");
const addPersonBtn = document.getElementById("addPersonBtn");

// const people = JSON.parse(localStorage.getItem("people")) || [];
let people = JSON.parse(localStorage.getItem("people"));
if (!people) {
  people = [];
} else {
  createTable();
}

// Function to create a table with header using properties as column and people as row.
function createTable() {
  // Get property names
  let cols = Object.getOwnPropertyNames(people[0]);
  const body = document.getElementsByTagName('body');
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  // Create header row and append to table
  for (const col of cols) {
      const tableHeader = document.createElement('th');
      tableHeader.innerHTML = col;
      tableHeader.style.border = '1px solid black';
      headerRow.appendChild(tableHeader);
  }
  table.appendChild(headerRow);
  body[0].appendChild(table);

  table.style.marginTop = '10px';
  table.style.border = '1px solid black';

  // Create rows for existing people in localstorage
  for (let i = 0; i < people.length; i++) {
    cols =  Object.getOwnPropertyNames(people[i]);
    let row = document.createElement('tr');
    for (const col of cols) {
      const tableData = document.createElement('td');
      tableData.innerHTML = people[i][col];
      tableData.style.border = '1px solid black';
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
}

personForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //   return;
  const newPerson = {
    id: uuidv4(),
    name: nameInput.value,
    age: Number(ageInput.value),
  };

  // Update localstorage
  people.push(newPerson);
  localStorage.setItem('people', JSON.stringify(people));
  
  // If this is the first person, create the table
  if (people.length === 1) {
    createTable();
  // Else insert the row
  } else {
    const row = document.createElement('tr');
    const table = document.getElementsByTagName('table');
    const cols =  Object.getOwnPropertyNames(newPerson);
    for (const col of cols) {
      const tableData = document.createElement('td');
      tableData.innerHTML = newPerson[col];
      tableData.style.border = '1px solid black';
      row.appendChild(tableData);
    }
    table[0].appendChild(row);
  }

  
  nameInput.value = '';
  ageInput.value = '';
});