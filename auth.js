const users = [
    { username: "admin", password: "admin123", role: "Admin" },
    { username: "manager", password: "manager123", role: "Manager" },
    { username: "employee", password: "employee123", role: "Employee" }
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Login successful as ${user.role}`);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function checkAccess() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Access Denied. Please login first.");
        window.location.href = "index.html";
    } else {
        document.getElementById("welcome").innerText = `Welcome, ${user.username} (${user.role})`;
    }
}
const supabaseUrl = "https://hpcqtizgiexxfmcojklu.supabase.co/auth/v1/callback";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3F0aXpnaWV4eGZtY29qa2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzU4MTgsImV4cCI6MjA1NTM1MTgxOH0.KvvTSNl-bt6-03A4JpT21AOkOa4PKAiORTmXf-NDXOY"; // Keep private in .env
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loginWithGitHub() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin + "/dashboard.html",  // Adjust as needed
            }
        });

        if (error) {
            console.error("GitHub Login Failed:", error.message);
        } else {
            console.log("GitHub Login Started...");
        }
    } catch (err) {
        console.error("Error during GitHub login:", err);
    }
}
