const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;
const clueURL = `${baseURL}/clue`;

const userConfig = {
  email: "alexandrr@uia.no",
  nick: "Alexandra",
  pin: "1013"
};

let token = null;

// small wait helper for the 20 requests/minute limit
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// start session
async function startSession() {
  const response = await fetch(startURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userConfig)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Start failed: ${JSON.stringify(data)}`);
  }

  token = data.token;
  console.log("Start response:", data);
  console.log("Token:", token);
  return data;
}

// get current challenge
async function getStatus() {
  const response = await fetch(statusURL, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": token
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Status failed: ${JSON.stringify(data)}`);
  }

  console.log("Status response:", data);
  return data;
}

// get clue
async function getClue() {
  const response = await fetch(clueURL, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": token
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Clue failed: ${JSON.stringify(data)}`);
  }

  console.log("Clue response:", data);
  return data;
}

// submit answer
async function submitAnswer(answer, extra = {}) {
  const response = await fetch(submitURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      answer,
      ...extra
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Submit failed: ${JSON.stringify(data)}`);
  }

  console.log("Submit response:", data);
  return data;
}

async function main() {
  try {
    // start / resume session
    await startSession();

    await wait(3100);

    // get current challenge
    const status = await getStatus();

    await wait(3100);

    // get a clue
    const clue = await getClue();

    // submit an answer
    await wait(3100);
    const submitResult = await submitAnswer("my answer here");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

await main();