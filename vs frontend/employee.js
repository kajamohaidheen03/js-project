const SUPABASE_URL = "https://hpcqtizgiexxfmcojklu.supabase.co/rest/v1/employeestable";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3F0aXpnaWV4eGZtY29qa2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzU4MTgsImV4cCI6MjA1NTM1MTgxOH0.KvvTSNl-bt6-03A4JpT21AOkOa4PKAiORTmXf-NDXOY"; 

async function fetchEmployees() {
    try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            alert("Unauthorized! Please login.");
            window.location.href = "index.html";
            return;
        }

        const response = await fetch(`${SUPABASE_URL}?select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });

        const employees = await response.json();
        console.log("Employees:", employees);

        const tableBody = document.getElementById("employeeTable");
        tableBody.innerHTML = "";

        employees.forEach(emp => {
            const row = `<tr>
                            <td>${emp.id}</td>
                            <td>${emp.name}</td>
                            <td>${emp.email}</td>
                            <td>${emp.role}</td>
                            <td>${emp.attendance}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="updateEmployee(${emp.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${emp.id})">Delete</button>
                            </td>
                         </tr>`;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// Add Employee
async function addEmployee() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const attendance = document.getElementById("attendance").value;

    const data = { name, email, role, attendance };

    try {
        const response = await fetch(SUPABASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Employee added successfully!");
            fetchEmployees();
        } else {
            alert("Error adding employee.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Update Employee
async function updateEmployee(id) {
    const newattendance = prompt("Enter new attendance:");
    if (!newattendance) return;

    try {
        const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({ attendance: newattendance })
        });

        if (response.ok) {
            alert("Employee updated successfully!");
            fetchEmployees();
        } else {
            alert("Error updating employee.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Delete Employee
async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: "DELETE",
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });

        if (response.ok) {
            alert("Employee deleted successfully!");
            fetchEmployees();
        } else {
            alert("Error deleting employee.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
