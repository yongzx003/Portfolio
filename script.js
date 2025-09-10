// =========================
// Typing Effect
// =========================
const roles = ["AI Engineer", "Software Developer", "Machine Learning Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 120);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 80);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 200);
  }
}
document.addEventListener("DOMContentLoaded", typeRole);


document.querySelector(".about-text .btn").addEventListener("click", (e) => {
  e.preventDefault();
  window.open("docs/YongZhenXing_CoverLetter.pdf", "_blank");
});

// =========================
// Projects → GitHub Links
// =========================
document.querySelectorAll(".project-card").forEach((card) => {
    if (card.dataset.link) {
      card.style.cursor = "pointer"; // clickable
    } else {
      card.style.cursor = "default"; // not clickable
    }
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  const link = card.dataset.link;
  if (link) window.open(link, "_blank");
});


// =========================
// Contact Form Validation
// =========================
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const customCode = document.getElementById("custom-code").value.trim();
    const countryCode = document.getElementById("country-code").value;

    // Simple validation
    if (!name || !email || !message) {
        showAlert("Please fill in all required fields.", "error");
        return;
    }

    // Email regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
        showAlert("Please enter a valid email address.", "error");
        return;
    }

    // Mobile number (optional but if filled must be valid)
    if (mobile && !/^\d{8,15}$/.test(mobile)) {
        showAlert("Please enter a valid mobile number", "error");
        return;
    }

    // Pick correct dialing code
    let dialingCode = countryCode === "other" ? customCode : countryCode;

    // Send email via EmailJS
    emailjs.send("service_o957r58", "template_jbhzdj9", {
        from_name: name,
        from_email: email,
        phone: `${dialingCode} ${mobile}`,
        message: message
    })
    .then(() => {
        showAlert("Message sent successfully!", "success");
        contactForm.reset(); // clear form
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        showAlert("Failed to send message. Please try again later.", "error");
    });
});


// =========================
// Navbar Active Highlight
// =========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
        history.replaceState(null, null, "#" + current); 
      }
  });
});


function showAlert(message, type = "info") {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");

  // Set message
  alertMessage.textContent = message;

  // Change background color depending on type
  if (type === "error") {
    alertBox.style.background = "#ff4d4d"; // red
  } else if (type === "success") {
    alertBox.style.background = "#28a745"; // green
  } else {
    alertBox.style.background = "#00d9ff"; // blue
  }

  alertBox.classList.remove("hidden");

  // Auto close after 3 seconds
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
}

function closeAlert() {
  document.getElementById("custom-alert").classList.add("hidden");
}


const countryCode = document.getElementById("country-code");
const customCode = document.getElementById("custom-code");

countryCode.addEventListener("change", function () {
if (this.value === "other") {
    customCode.style.display = "block";
    customCode.required = true; // force user to enter if they choose "Other"
} else {
    customCode.style.display = "none";
    customCode.required = false;
    customCode.value = ""; // clear when hidden
}
});




