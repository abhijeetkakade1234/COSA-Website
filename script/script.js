// Loader logic
window.addEventListener("load", () => {
  document.body.classList.add("loaded"); // Hides the loader
  document.getElementById("main-content").classList.remove("hidden"); // Shows the main content
});
// Navbar logic
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.getElementById("overlay");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    overlay.style.display = navLinks.classList.contains("active")
      ? "block"
      : "none";
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", () => {
    navLinks.classList.remove("active");
    overlay.style.display = "none";
  });

  // Close menu when clicking a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      overlay.style.display = "none";
    });
  });

  // Add close button functionality
  const closeBtn = document.querySelector(".nav-close");
  closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("active");
    overlay.style.display = "none";
  });

  // Toggle dropdowns in game cards
  document.querySelectorAll(".btn-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active class on button
      this.classList.toggle("active");

      // Get the associated dropdown content
      const dropdownContent = this.nextElementSibling;
      dropdownContent.classList.toggle("active");

      // Close other dropdowns in the SAME card only
      const currentCard = this.closest(".game-buttons");
      currentCard.querySelectorAll(".btn-toggle").forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.classList.remove("active");
        }
      });

      // Load content if not already loaded
      if (!dropdownContent.innerHTML.trim()) {
        const contentType = this.dataset.content;
        let content = "";

        if (contentType.includes("rules")) {
          content = getRulesContent(this.closest(".game-card").dataset.event);
        } else if (contentType.includes("time")) {
          content = getTimeDateContent(
            this.closest(".game-card").dataset.event
          );
        } else if (contentType.includes("labs")) {
          content = getLabsContent(this.closest(".game-card").dataset.event);
        }

        dropdownContent.innerHTML = content;
      }
    });
  });
});

// Dummy content retrieval functions (replace with your actual logic)
function getRulesContent(eventName) {
  switch (eventName) {
    case "project":
      return `• Physical project and implementation of software hardware project 
      • Any kind of project allowed !
      • Note: 1) Maximum 4 Members, original project 2) Bring your own laptop for PPT and Project purposes
      
      `;
    case "coding":
      return `• Individual participation only
• Three rounds: MCQ, Coding, DSA
• Languages: C++, Java, Python
• No external libraries allowed
• Time limit strictly enforced`;
    case "neoncricket":
      return `• 5 players per team
• 4 overs per match
• Played in dark room with neon equipment
• Special scoring rules apply
• Safety equipment mandatory`;
    case "roadies":
      return `• In round 1 there will be top 10 teams that will be selected.
• In round 2 there will be top 6 teams that will be selected.
• In round 3 there will be 2 teams selected for final round.
• In round 4 which is final top 2 teams fight agains teach other.`;
    case "aiprompting":
      return `• Individual participation
• Three creative rounds
• Time limits per prompt
• Original content only
• Tools provided by organizers`;
    case "stumbleguys":
      return `• Single player tournament
• No mods or cheats allowed
• Multiple elimination rounds
• Fair play monitored
• Winners advance to finals`;
    default:
      return "Rules not available for this event.";
  }
}

function getTimeDateContent(eventName) {
  const dates = {
    project: "March 28, 2025",
    coding: "March 28, 2025",
    neoncricket: "March 28, 2025",
    roadies: "March 29, 2025",
    aiprompting: "March 29, 2025",
    stumbleguys: "March 28, 2025",
  };

  return `Date: ${dates[eventName]}
Time: 10 Am Onwards`;
}

// ############################## LABS CONTENT ############################## Kal logic dhekte 
function getLabsContent(eventName) {
  const venues = {
    project: "Library",
    coding: "3rd Floor Lab",
    neoncricket: "1st Floor classroom 106A",
    roadies: "Between canteen and main ground",
    aiprompting: "Network Lab",
    stumbleguys: "Deld Lab",
  };

  return `Venue: ${venues[eventName]}`;
}
