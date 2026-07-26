// Core bootstrapper and UI runtime module code definition
document.addEventListener("DOMContentLoaded", () => {
  initPremiumIntroLoader();
  initNavbarBehavior();
  initMobileMenuBehavior();
  initMenuManagement();
  initFAQAccordion();
  initOrderDrawer();
  initContactFormValidation();
  initPremiumReviewsSlider();
  initSmartFloatingContacts();
});

/**
 * Premium Cinematic Traditional Pot Loader Engine
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
      
      const duration = 2.0 + Math.random() * 1.5;
      const size = 16 + Math.random() * 24;
      const leftOffset = -15 + Math.random() * 30;
      
      steamEl.style.setProperty("--steam-duration", `${duration}s`);
      steamEl.style.width = `${size}px`;
      steamEl.style.height = `${size}px`;
      steamEl.style.left = `calc(50% + ${leftOffset}px - ${size/2}px)`;
      
      steamContainer.appendChild(steamEl);
      
      setTimeout(() => {
        steamEl.remove();
      }, duration * 1000);
    }, 200);
  }, 1000); // Trigger when lid-slow-open is partially revealed

  // Step 2: Floating gold aroma sparkles
  setTimeout(() => {
    sparkleInterval = setInterval(() => {
      if (!steamContainer) return;
      
      const sparkle = document.createElement("div");
      sparkle.className = "absolute bottom-2 w-1.5 h-1.5 bg-[#D99A2B]/40 rounded-full filter blur-[0.5px] aroma-particle";
      
      const duration = 1.8 + Math.random() * 1.2;
      const driftX = -30 + Math.random() * 60;
      const leftOffset = -20 + Math.random() * 40;
      
      sparkle.style.setProperty("--particle-duration", `${duration}s`);
      sparkle.style.setProperty("--drift-x", `${driftX}px`);
      sparkle.style.left = `calc(50% + ${leftOffset}px)`;
      
      steamContainer.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, duration * 1000);
    }, 150);
  }, 1200);

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
        percentage += Math.floor(Math.random() * 12) + 8; // Random smooth increments
        if (percentage >= 100) {
          percentage = 100;
          clearInterval(progressInterval);
          statusText.textContent = statusStates[2];
          
          // Trigger exit shortly after 100% (Aiming at 3.9s total timeline)
          setTimeout(exitLoader, 400);
        } else if (percentage > 50) {
          statusText.textContent = statusStates[1];
        }
        
        if (progressBar) progressBar.style.width = `${percentage}%`;
        if (percentageEl) percentageEl.textContent = `${percentage}%`;
      }, 100);
    }
  }, 1600);
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
          t.classList.remove("active", "bg-[#5B4A42]", "text-white");
          t.classList.add("text-[#8C7A70]");
        });
        
        toggle.classList.add("active", "bg-[#5B4A42]", "text-white");
        toggle.classList.remove("text-[#8C7A70]");
        
        // Update price display
        const portion = toggle.getAttribute("data-portion");
        // Normalize lookup keys: data attribute is 500g/1Kg, keys are 500g/1Kg or 500g/1kg
        const lookupPortion = portion === "1Kg" && !prices["1Kg"] && prices["1kg"] ? "1kg" : portion;
        priceDisplay.textContent = `₹${prices[lookupPortion]}`;
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
      
      // Open in a new tab securely and bypass popup blockers
      const tempLink = document.createElement("a");
      tempLink.href = redirectUrl;
      tempLink.target = "_blank";
      tempLink.rel = "noopener noreferrer";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

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

/**
 * Premium Dynamic Reviews Slider Engine
 * Controls rotation, key events, and swipe navigation without dependencies.
 */
function initPremiumReviewsSlider() {
  const target = document.getElementById("review-card-target");
  const prevBtn = document.getElementById("review-prev-btn");
  const nextBtn = document.getElementById("review-next-btn");
  const dotsContainer = document.getElementById("review-dots-container");
  const container = document.getElementById("reviews-slider-container");

  if (!target || !dotsContainer) return;

  const reviewsData = [
    {
      name: "Rajshree Writes",
      rating: 5,
      review: "Super tasty, wordless, indescribable taste. Literally enjoyed every single bite of it. I can't believe that a person who often works on computer can cook better than many restaurants here. I ordered thrice in a week and loved all the time.",
      monthsAgo: "a month ago",
      source: "Google Review"
    },
    {
      name: "Amey Zare",
      rating: 5,
      review: "Never eating biryani at any other place ever again! There's a reason why this guy has 5-star reviews from everyone.",
      monthsAgo: "2 months ago",
      source: "Google Review"
    },
    {
      name: "Sanjana Gadhekar",
      rating: 5,
      review: "Hands down, best biryani ever! Authentic flavours, top-notch quality and super generous portions. A taste explosion in every bite.",
      monthsAgo: "3 months ago",
      source: "Google Review"
    },
    {
      name: "Tara Dandge",
      rating: 5,
      review: "Amazing biryani! Great balance of spices, tender meat, fragrant rice, fresh, hygienic and full of authentic taste.",
      monthsAgo: "4 months ago",
      source: "Google Review"
    },
    {
      name: "Prajwal Gadhekar",
      rating: 5,
      review: "The rice was perfectly cooked, flavours were balanced and the portion size was generous. Definitely worth trying.",
      monthsAgo: "5 months ago",
      source: "Google Review"
    },
    {
      name: "Bhumika Dandge",
      rating: 5,
      review: "One of the best biryanis I've had. Perfectly cooked rice, great spices and amazing taste.",
      monthsAgo: "5 months ago",
      source: "Google Review"
    },
    {
      name: "Sanjeeth Patel",
      rating: 5,
      review: "Delicious biryani. Different from other biryanis and extremely tasty.",
      monthsAgo: "6 months ago",
      source: "Google Review"
    },
    {
      name: "Pranjal Patidar",
      rating: 5,
      review: "The biryani is so perfect that I order it twice every week.",
      monthsAgo: "6 months ago",
      source: "Google Review"
    }
  ];

  let currentIndex = 0;
  let autoPlayTimer = null;
  const autoPlayDelay = 6000;

  // Render dots
  dotsContainer.innerHTML = "";
  reviewsData.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#A65A2E] ${
      index === 0 ? "bg-[#A65A2E] w-4" : "bg-[#8C7A70]/40"
    }`;
    dot.setAttribute("aria-label", `Go to review slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function renderActiveReview() {
    const data = reviewsData[currentIndex];
    target.classList.remove("review-slide-active");
    // Trigger reflow to restart CSS animation smoothly
    void target.offsetWidth;
    
    const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

    target.innerHTML = `
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-1.5 text-xs font-sans text-yellow-500 font-bold">
          <span class="text-sm">${stars}</span>
          <span class="text-[#8C7A70] font-semibold font-mono">// ${data.source}</span>
        </div>
        <!-- Google Colored G Icon representation -->
        <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      <blockquote class="text-[#2E2018] text-sm md:text-base italic font-body leading-relaxed flex-1">
        "${data.review}"
      </blockquote>

      <div class="flex justify-between items-center border-t border-borderGray/50 pt-4 text-xs font-sans">
        <span class="font-bold text-[#2E2018] tracking-wide uppercase">${data.name}</span>
        <span class="text-[#8C7A70] font-semibold">${data.monthsAgo}</span>
      </div>
    `;

    target.classList.add("review-slide-active");

    // Sync dots UI active state
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.className = "w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#A65A2E] bg-[#A65A2E] w-4";
      } else {
        dot.className = "w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#A65A2E] bg-[#8C7A70]/40";
      }
    });
  }

  function goToSlide(index) {
    currentIndex = (index + reviewsData.length) % reviewsData.length;
    renderActiveReview();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Bind side controls
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoPlay(); });

  // Key Event triggers for accessibility
  target.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Touch Swipe Support layout
  let touchStartX = 0;
  let touchEndX = 0;

  target.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  target.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      nextSlide();
      resetAutoPlay();
    } else if (touchEndX - touchStartX > threshold) {
      prevSlide();
      resetAutoPlay();
    }
  }

  // Auto play handlers
  function startAutoPlay() {
    // Respect system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery && mediaQuery.matches) return;

    autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Auto rotation controls binding hover sequences
  container.addEventListener("mouseenter", stopAutoPlay);
  container.addEventListener("mouseleave", startAutoPlay);

  // Pause rotation when tab goes out of focus
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Initial draw trigger
  renderActiveReview();
  startAutoPlay();
}

/**
 * Smart Floating Contacts Behavior:
 * Hides floating buttons when footer is visible (>= 75%) to avoid duplicate actions.
 */
function initSmartFloatingContacts() {
  const container = document.getElementById("floating-contacts-container");
  const footer = document.getElementById("footer");

  if (!container || !footer) return;

  const threshold = 0.75; // Approximately 75% footer entry

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const isFooterVisible = entry.intersectionRatio >= threshold;

      // Handle system prefers-reduced-motion configuration
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isFooterVisible) {
        // Smoothly hide
        container.style.opacity = "0";
        if (!prefersReducedMotion) {
          container.style.transform = "translateY(20px)";
        }
        container.style.pointerEvents = "none";
        
        // Hide child anchors from tab accessibility sequence while hidden
        container.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
      } else {
        // Smoothly show
        container.style.opacity = "1";
        if (!prefersReducedMotion) {
          container.style.transform = "translateY(0)";
        }
        container.style.pointerEvents = "auto";

        // Restore tab accessibility sequence
        container.querySelectorAll("a").forEach(a => a.removeAttribute("tabindex"));
      }
    });
  }, {
    threshold: [0, threshold]
  });

  observer.observe(footer);
}
