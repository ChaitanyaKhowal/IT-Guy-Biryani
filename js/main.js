// Core bootstrapper and UI runtime module code definition
document.addEventListener("DOMContentLoaded", () => {
  initNavbarBehavior();
  initMobileMenuBehavior();
  initMenuManagement();
  initFAQAccordion();
  initOrderDrawer();
  initContactFormValidation();
});

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
