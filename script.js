// ====== SETTINGS ======
const WHATSAPP_NUMBER = "2349165107679";
const COOLDOWN_MS = 30000;
// ======================

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");
let lastSent = 0;

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: bots fill the hidden field
    if (document.getElementById("website").value) return;

    if (Date.now() - lastSent < COOLDOWN_MS) {
      statusEl.style.color = "red";
      statusEl.textContent = "Please wait a moment before sending again.";
      return;
    }

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

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

    window.open(url, "_blank", "noopener");
    lastSent = Date.now();
    statusEl.style.color = "limegreen";
    statusEl.textContent = "WhatsApp opened. Tap Send to deliver your message.";
    form.reset();
  });
}
