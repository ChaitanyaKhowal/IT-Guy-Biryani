// Core bootstrapper and UI runtime module code definition
document.addEventListener("DOMContentLoaded", () => {
  initPremiumIntroLoader();
  initNavbarBehavior();
  initMobileMenuBehavior();
  initMenuManagement();
  initFAQAccordion();
  initOrderDrawer();
  initContactFormValidation();
});

/**
 * Premium Cinematic Clay Pot Loader Engine
 * Handles organic steam creation, glint reflections, brand fading, and exit transitions.
 */
function initPremiumIntroLoader() {
  const loader = document.getElementById("intro-loader");
  const brandContainer = document.getElementById("loader-brand-container");
  const steamContainer = document.getElementById("steam-container");
  const skipBtn = document.getElementById("skip-loader-btn");
  
  if (!loader) return;

  // Optimize visit sequence: play only once per session
  if (sessionStorage.getItem("loader-played") === "true") {
    loader.remove();
    return;
  }

  // Prevent double scrolling during load state
  document.body.classList.add("overflow-hidden");

  let steamInterval = null;
  let sparkleInterval = null;
  let progressInterval = null;

  const exitLoader = () => {
    // Flag session storage so loader doesn't repeat on reload/navigation
    sessionStorage.setItem("loader-played", "true");
    
    // Clear all interval handlers
    if (steamInterval) clearInterval(steamInterval);
    if (sparkleInterval) clearInterval(sparkleInterval);
    if (progressInterval) clearInterval(progressInterval);
    
    loader.classList.add("opacity-0");
    document.body.classList.remove("overflow-hidden");
    
    setTimeout(() => {
      loader.remove();
    }, 1000);
  };

  // Skip actions mapping
  if (skipBtn) {
    skipBtn.addEventListener("click", exitLoader);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      exitLoader();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  // Step 1: Real-time organic steam particle loop (triggers after pot slides in and lid opens)
  setTimeout(() => {
    steamInterval = setInterval(() => {
      if (!steamContainer) return;
      
      const steamEl = document.createElement("div");
      steamEl.className = "absolute bottom-0 w-12 h-12 bg-white/10 rounded-full filter blur-md steam-cloud";
      
      const duration = 3.5 + Math.random() * 2;
      const size = 16 + Math.random() * 32;
      const leftOffset = -20 + Math.random() * 40;
      
      steamEl.style.setProperty("--steam-duration", `${duration}s`);
      steamEl.style.width = `${size}px`;
      steamEl.style.height = `${size}px`;
      steamEl.style.left = `calc(50% + ${leftOffset}px - ${size/2}px)`;
      
      steamContainer.appendChild(steamEl);
      
      setTimeout(() => {
        steamEl.remove();
      }, duration * 1000);
    }, 300);
  }, 1600); // Trigger when lid-slow-open is partially revealed

  // Step 2: Floating gold aroma sparkles
  setTimeout(() => {
    sparkleInterval = setInterval(() => {
      if (!steamContainer) return;
      
      const sparkle = document.createElement("div");
      sparkle.className = "absolute bottom-2 w-1.5 h-1.5 bg-orange/40 rounded-full filter blur-[0.5px] aroma-particle";
      
      const duration = 2.5 + Math.random() * 2;
      const driftX = -40 + Math.random() * 80;
      const leftOffset = -30 + Math.random() * 60;
      
      sparkle.style.setProperty("--particle-duration", `${duration}s`);
      sparkle.style.setProperty("--drift-x", `${driftX}px`);
      sparkle.style.left = `calc(50% + ${leftOffset}px)`;
      
      steamContainer.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, duration * 1000);
    }, 200);
  }, 1800);

  // Step 3: Delayed branding fade-in (matches slide-in curve settling at center)
  setTimeout(() => {
    if (brandContainer) {
      brandContainer.classList.remove("opacity-0", "translate-y-4");
      
      // Step 3.5: Animate progress bar values dynamically
      const progressBar = document.getElementById("loader-progress-bar");
      const percentageEl = document.getElementById("loader-percentage");
      const statusText = document.getElementById("loader-status-text");
      
      let percentage = 0;
      const statusStates = ["Preparing...", "Dum Cooking...", "Ready!"];
      
      progressInterval = setInterval(() => {
        percentage += Math.floor(Math.random() * 8) + 3; // Random smooth increments
        if (percentage >= 100) {
          percentage = 100;
          clearInterval(progressInterval);
          statusText.textContent = statusStates[2];
          
          // Trigger exit shortly after 100%
          setTimeout(exitLoader, 800);
        } else if (percentage > 50) {
          statusText.textContent = statusStates[1];
        }
        
        if (progressBar) progressBar.style.width = `${percentage}%`;
        if (percentageEl) percentageEl.textContent = `${percentage}%`;
      }, 120);
    }
  }, 1800);
}


/**
 * Manages sticky navbar scroll transitions
 */
function initNavbarBehavior() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const scrollThreshold = 40;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("glass-nav", "shadow-lg");
      navbar.classList.remove("bg-transparent");
    } else {
      navbar.classList.remove("glass-nav", "shadow-lg");
      navbar.classList.add("bg-transparent");
    }
  });
  
  // Set initial state
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add("glass-nav");
  }
}

/**
 * Manages mobile drawer toggle animations and state changes
 */
function initMobileMenuBehavior() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const menuDrawer = document.getElementById("mobile-menu-drawer");
  const iconPath = document.getElementById("menu-icon-path");
  if (!menuBtn || !menuDrawer) return;

  const burgerPath = "M4 6h16M4 12h16M4 18h16";
  const closePath = "M6 18L18 6M6 6l12 12";

  menuBtn.addEventListener("click", () => {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    
    // Toggle state
    menuBtn.setAttribute("aria-expanded", !isExpanded);
    menuDrawer.classList.toggle("hidden");
    
    // Animate hamburger to close cross icon
    if (isExpanded) {
      iconPath.setAttribute("d", burgerPath);
    } else {
      iconPath.setAttribute("d", closePath);
    }
  });

  // Close drawer when link item selection happens
  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuDrawer.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
      iconPath.setAttribute("d", burgerPath);
    });
  });
}

/**
 * Manages portions selections & dynamic pricing updates
 */
function initMenuManagement() {
  const cards = document.querySelectorAll("[data-menu-item]");
  
  cards.forEach(card => {
    const toggles = card.querySelectorAll("[data-portion-toggle]");
    const priceDisplay = card.querySelector("[data-price-display]");
    const prices = JSON.parse(card.getAttribute("data-prices"));
    
    toggles.forEach(toggle => {
      toggle.addEventListener("click", () => {
        // Toggle UI status class rules
        toggles.forEach(t => {
          t.classList.remove("active", "bg-borderGray", "text-white");
          t.classList.add("text-muted");
        });
        
        toggle.classList.add("active", "bg-borderGray", "text-white");
        toggle.classList.remove("text-muted");
        
        // Update price based on toggled parameter
        const portion = toggle.getAttribute("data-portion");
        priceDisplay.textContent = `₹${prices[portion]}`;
      });
    });
  });
}

/**
 * Manages FAQ system collapsible accordion nodes
 */
function initFAQAccordion() {
  const toggles = document.querySelectorAll("[data-faq-toggle]");
  
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const svg = toggle.querySelector("svg");
      
      const isHidden = content.classList.contains("hidden");
      
      // Close all other instances first (optional, accordion behavior)
      document.querySelectorAll("[data-faq-content]").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll("[data-faq-toggle] svg").forEach(s => s.classList.remove("rotate-180"));
      
      if (isHidden) {
        content.classList.remove("hidden");
        svg.classList.add("rotate-180");
      } else {
        content.classList.add("hidden");
        svg.classList.remove("rotate-180");
      }
    });
  });
}

/**
 * Order Configuration Drawer Operations and WhatsApp Integration
 */
function initOrderDrawer() {
  const drawer = document.getElementById("order-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const closeBtn = document.getElementById("close-drawer-btn");
  const orderButtons = document.querySelectorAll("[data-order-button]");
  
  const drawerItemName = document.getElementById("drawer-item-name");
  const drawerItemPortion = document.getElementById("drawer-item-portion");
  const drawerItemCost = document.getElementById("drawer-item-cost");
  
  const form = document.getElementById("drawer-form");
  
  const openDrawer = (itemName, portion, price) => {
    drawerItemName.textContent = itemName;
    drawerItemPortion.textContent = portion;
    drawerItemCost.textContent = `₹${price}`;
    drawer.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };
  
  const closeDrawer = () => {
    drawer.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };
  
  orderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-menu-item]");
      const itemName = btn.getAttribute("data-item");
      const activePortionBtn = card.querySelector("[data-portion-toggle].active");
      const portion = activePortionBtn.getAttribute("data-portion");
      const prices = JSON.parse(card.getAttribute("data-prices"));
      const price = prices[portion];
      
      openDrawer(itemName, portion, price);
    });
  });
  
  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  
  // Drawer form validation & compiler redirection
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("drawer-name");
    const mobileInput = document.getElementById("drawer-mobile");
    const addressInput = document.getElementById("drawer-address");
    const timeSelect = document.getElementById("drawer-time");
    
    const nameError = document.getElementById("drawer-name-error");
    const mobileError = document.getElementById("drawer-mobile-error");
    const addressError = document.getElementById("drawer-address-error");
    const timeError = document.getElementById("drawer-time-error");
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
    }
    
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileInput.value.trim())) {
      mobileError.classList.remove("hidden");
      isValid = false;
    } else {
      mobileError.classList.add("hidden");
    }
    
    if (!addressInput.value.trim()) {
      addressError.classList.remove("hidden");
      isValid = false;
    } else {
      addressError.classList.add("hidden");
    }
    
    if (!timeSelect.value) {
      timeError.classList.remove("hidden");
      isValid = false;
    } else {
      timeError.classList.add("hidden");
    }
    
    if (isValid) {
      const waNumber = "+917276336896";
      const messageTemplate = 
`--- NEW RESERVATION ---
Item: ${drawerItemName.textContent}
Portion: ${drawerItemPortion.textContent}
Price: ${drawerItemCost.textContent}
Delivery Time: ${timeSelect.value}
Name: ${nameInput.value.trim()}
Address: ${addressInput.value.trim()}
------------------------
Please confirm my slot.`;

      const redirectUrl = `https://wa.me/${waNumber.replace("+", "")}?text=${encodeURIComponent(messageTemplate)}`;
      window.open(redirectUrl, "_blank");
      closeDrawer();
      form.reset();
    }
  });
}

/**
 * Standard Contact Form parameter compilation operations
 */
function initContactFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("contact-name");
    const mobileInput = document.getElementById("contact-mobile");
    const messageInput = document.getElementById("contact-message");
    
    const nameError = document.getElementById("name-error");
    const mobileError = document.getElementById("mobile-error");
    const messageError = document.getElementById("message-error");
    const successMsg = document.getElementById("form-success");
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
    }
    
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileInput.value.trim())) {
      mobileError.classList.remove("hidden");
      isValid = false;
    } else {
      mobileError.classList.add("hidden");
    }
    
    if (!messageInput.value.trim()) {
      messageError.classList.remove("hidden");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
    }
    
    if (isValid) {
      successMsg.classList.remove("hidden");
      const waNumber = "+917276336896";
      const messageText = 
`--- CONTACT TRANSMISSION ---
Name: ${nameInput.value.trim()}
Mobile: ${mobileInput.value.trim()}
Message: ${messageInput.value.trim()}`;

      const redirectUrl = `https://wa.me/${waNumber.replace("+", "")}?text=${encodeURIComponent(messageText)}`;
      setTimeout(() => {
        window.open(redirectUrl, "_blank");
        form.reset();
        successMsg.classList.add("hidden");
      }, 1500);
    }
  });
}
