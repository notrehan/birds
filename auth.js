import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
    'https://ahrjqzrtwoipcjeeouum.supabase.co',
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpxenJ0d29pcGNqZWVvdXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDQ5MTUsImV4cCI6MjA4MjY4MDkxNX0.6D22QSdNixY8lEX_qhIR7aYl_PMDfAg-H1u_QocK0Xw"
);

function getUser(username) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return query;
}

// 🔐 login function
window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        window.location.href = "main.html";
    }
};

// 🔒 auto redirect if already logged in
async function checkSession() {
    const autoLogin = false; // toggle this

    if (autoLogin) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            window.location.href = "main.html";
        }
    }
}

checkSession();