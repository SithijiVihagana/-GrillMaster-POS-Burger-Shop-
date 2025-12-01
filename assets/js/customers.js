if (document.getElementById("customerForm")) {
  const form = document.getElementById("customerForm");
  const table = document.getElementById("customersTable");
  const idField = document.getElementById("cust_id");
  const nameField = document.getElementById("cust_name");
  const phoneField = document.getElementById("cust_phone");

  function renderCustomers() {
    const list = read(DB.customersKey);
    table.innerHTML = "";
    list.forEach(c => {
      const item = document.createElement("div");
      item.className = "list-group-item d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div>
          <div class="fw-bold">${c.name}</div>
          <div class="small-muted">${c.phone || ""}</div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary me-1" data-edit="${c.id}">Edit</button>
          <button class="btn btn-sm btn-outline-danger" data-del="${c.id}">Delete</button>
        </div>
      `;
      table.appendChild(item);
    });
  }

  table.addEventListener("click", (e) => {
    if (e.target.dataset.edit) {
      const id = e.target.dataset.edit;
      const customers = read(DB.customersKey);
      const c = customers.find(x=>x.id === id);
      idField.value = c.id;
      nameField.value = c.name;
      phoneField.value = c.phone;
    } else if (e.target.dataset.del) {
      const id = e.target.dataset.del;
      let customers = read(DB.customersKey);
      customers = customers.filter(x => x.id !== id);
      write(DB.customersKey, customers);
      renderCustomers();
    }
  });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let customers = read(DB.customersKey);
    const id = idField.value;
    const obj = {
      id: id || uid("c_"),
      name: nameField.value.trim(),
      phone: phoneField.value.trim()
    };
    if (id) {
      customers = customers.map(x=> x.id === id ? obj : x);
    } else {
      customers.push(obj);
    }
    write(DB.customersKey, customers);
    form.reset();
    idField.value = "";
    renderCustomers();
  });

  renderCustomers();
}

// helper to populate select on POS
function populateCustomerSelect(selectId = "selectCustomer") {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const customers = read(DB.customersKey);
  sel.innerHTML = `<option value="">Walk-in</option>`;
  customers.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name}${c.phone ? " - " + c.phone : ""}`;
    sel.appendChild(opt);
  });
}
