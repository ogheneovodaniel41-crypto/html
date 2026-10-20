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


/* ===== Profile image popup for both landing-page images ===== */
(function () {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const profileImages = document.querySelectorAll(".gidoti img, .about-img img");

  if (!lightbox || !lightboxImage) return;

  let previouslyFocused = null;

  function openLightbox(image) {
    previouslyFocused = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Expanded image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
    previouslyFocused?.focus();
  }

  profileImages.forEach(function (image) {
    image.addEventListener("click", function () {
      openLightbox(image);
    });
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
