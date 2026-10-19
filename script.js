// ====== SETTINGS ======
const WHATSAPP_NUMBER = "2349165107679";
const TEXTMEBOT_APIKEY = "tfc4zgVSgk6j";
const COOLDOWN_MS = 30000;
// ======================

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");
const btn = document.getElementById("submitBtn");
let lastSent = 0;

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Honeypot: bots fill the hidden field
    if (document.getElementById("website").value) return;

    // Cooldown
    if (Date.now() - lastSent < COOLDOWN_MS) {
      statusEl.style.color = "red";
      statusEl.textContent = "Please wait a moment before sending again.";
      return;
    }

    btn.disabled = true;
    statusEl.style.color = "";
    statusEl.textContent = "Sending...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const text =
      "*New Message from Website*\n\n" +
      "*Name:* " + name + "\n" +
      "*Email:* " + email + "\n" +
      "*Subject:* " + subject + "\n" +
      "*Message:* " + message;

    const url =
      "https://api.textmebot.com/send.php" +
      "?recipient=" + encodeURIComponent(WHATSAPP_NUMBER) +
      "&apikey=" + encodeURIComponent(TEXTMEBOT_APIKEY) +
      "&text=" + encodeURIComponent(text);

    try {
      // no-cors: the request is sent, but the reply can't be read
      await fetch(url, { method: "GET", mode: "no-cors" });
      lastSent = Date.now();
      statusEl.textContent = "Message sent successfully!";
      statusEl.style.color = "limegreen";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.style.color = "red";
    } finally {
      btn.disabled = false;
    }
  });
}
