// Initialize AngularJS App
var app = angular.module("EmployeeApp", []);
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
app.controller("EmployeeController", function ($scope) {
    // Supabase Config
    const supabaseUrl = "https://hpcqtizgiexxfmcojklu.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3F0aXpnaWV4eGZtY29qa2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzU4MTgsImV4cCI6MjA1NTM1MTgxOH0.KvvTSNl-bt6-03A4JpT21AOkOa4PKAiORTmXf-NDXOY";
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Fetch Employees
    $scope.fetchEmployees = async function () {
        let { data, error } = await supabase.from("EmployeesTable").select("*");
        if (error) {
            console.error("Error fetching employees:", error);
        } else {
            $scope.employees = data;
            $scope.$apply();
        }
    };

    // Add Employee
    $scope.addEmployee = async function () {
        let { data, error } = await supabase.from("EmployeesTable").insert([
            {
                Name: $scope.newEmployee.name,
                Email: $scope.newEmployee.email,
                Role: $scope.newEmployee.role,
                Attendance: $scope.newEmployee.attendance
            }
        ]);
        if (error) {
            console.error("Error adding employee:", error);
        } else {
            alert("Employee added successfully!");
            $scope.fetchEmployees();
        }
    };

    // Update Employee
    $scope.updateEmployeeData = async function () {
        let { data, error } = await supabase
            .from("EmployeesTable")
            .update({
                Name: $scope.updateEmployee.name,
                Email: $scope.updateEmployee.email,
                Role: $scope.updateEmployee.role,
                Attendance: $scope.updateEmployee.attendance
            })
            .eq("ID", $scope.updateEmployee.id);
        if (error) {
            console.error("Error updating employee:", error);
        } else {
            alert("Employee updated successfully!");
            $scope.fetchEmployees();
        }
    };

    // Delete Employee
    $scope.deleteEmployee = async function () {
        let { data, error } = await supabase
            .from("EmployeesTable")
            .delete()
            .eq("ID", $scope.deleteEmployeeId);
        if (error) {
            console.error("Error deleting employee:", error);
        } else {
            alert("Employee deleted successfully!");
            $scope.fetchEmployees();
        }
    };

    // Load Employees on Page Load
    $scope.fetchEmployees();
});
