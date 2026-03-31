import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
    'https://ahrjqzrtwoipcjeeouum.supabase.co',
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpxenJ0d29pcGNqZWVvdXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDQ5MTUsImV4cCI6MjA4MjY4MDkxNX0.6D22QSdNixY8lEX_qhIR7aYl_PMDfAg-H1u_QocK0Xw"
);

async function protectPage() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        window.location.href = "auth.html";
    }
}

protectPage();
// 🚨 INTENTIONALLY VULNERABLE DEMO CODE

async function getBirdFacts() {
  const birdInput = document.getElementById("birdInput");
  const resultDiv = document.getElementById("result");

  const bird = birdInput.value;

  resultDiv.innerHTML = "Loading...";

  // 🚨 EXPOSED API KEY (for vulnerability demo)
  const API_KEY = "sk-test-EXPOSED-KEY-123456";

  try {
    // 🔥 Fake API request (goes to a real harmless endpoint)
    await fakeApiCall(bird, API_KEY);

    // 🔥 Fake AI response
    const fakeResponse = generateFakeFacts(bird);

    // ❌ Vulnerability: XSS possible
    resultDiv.innerHTML = fakeResponse;

  } catch (error) { 
    resultDiv.innerHTML = "Request failed.";
    console.error(error);
  }
}


// 🔥 Sends request to a real endpoint so it shows in Network tab
async function fakeApiCall(bird, apiKey) {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`, // 🚨 visible leak
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      input: `Give facts about ${bird}`
    })
  });
}


// 🧠 Fake AI response generator
function generateFakeFacts(bird) {
  if (!bird || bird.trim() === "") {
    return "Please enter a bird name.";
  }

  return `
    <strong>Facts about ${bird}:</strong><br><br>
    1. ${bird} has unique feather patterns.<br>
    2. It can adapt to different climates.<br>
    3. Some species of ${bird} migrate thousands of kilometers.<br>
    4. ${bird} has excellent vision and navigation skills.<br>
    5. They play an important role in maintaining ecosystems.
  `;
}

function showMessage(input) {
  document.getElementById("output").innerHTML = input;
}