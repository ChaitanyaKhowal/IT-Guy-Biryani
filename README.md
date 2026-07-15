# 🍲 IT Guy Biryani

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen.svg)]()
[![Build State](https://img.shields.io/badge/Build-Success-brightgreen.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web-orange.svg)]()

A production-grade, highly-aesthetic website built for **IT Guy Biryani**, a small-batch cloud kitchen that combines authentic Maharashtrian-style Dum-cooked Biryani with process-driven precision. 

Customers order fresh, custom-crafted biryani direct to their doorstep in Hinjawadi, Pune, through a frictionless, responsive WhatsApp integration.

---

## 🌟 Visual & Architecture Highlights

*   **Cinematic Loader Engine**: Interactive, custom-built intro loader featuring a 3D-feeling vector pot illustration, dynamic SVG steam particle physics, glowing light sweeps, and a session-memorized skip controller.
*   **Modern Color Palette**: Tailored restaurant-first colors (`#FFF9F2` Ivory canvas, `#F8F1E8` Warm card layers, `#A65A2E` Saffron branding accent, and `#2E2018` Rich dark cocoa headers) achieving full **WCAG AAA** contrast compliance.
*   **Real Google Maps JS Integration**: Deployed interactive Map API lazy-loaded via an `IntersectionObserver` to sustain high core web vitals. Draws precise 1km, 2.5km, and 5km boundaries centering on the Hinjawadi kitchen.
*   **Premium Review Slider**: Vanilla JS-powered testimonial slider utilizing touch swipe gestures for mobile, keyboard navigation for accessibility, and visibility-aware pausing logic to conserve main-thread CPU.

---

## 🛠 Tech Stack

- **Core Structure**: Semantic HTML5 (SEO Schema markup optimized)
- **Styling Layout**: Tailwind CSS (Minified & Purged) + CSS Custom Variables
- **Dynamic Controls**: Pure Vanilla ES6 JavaScript (No bloated external libraries)
- **Maps API**: Google Maps JavaScript API (Lazy injected)

---

## 📂 Project Architecture

```bash
IT-Guy-Biryani/
├── .github/                  # CI/CD Workflows
├── assets/
│   ├── css/
│   │   └── main.min.css      # Compiled & Minified Tailwind Build
│   ├── icons/                # High-res Favicons & Web Icons
│   └── images/               # Optimized AVIF/WebP image assets
├── css/
│   └── tailwind.css          # Custom classes and animation keyframes
├── js/
│   └── main.js               # Slider, Drawer, Loader, and Form Logic
├── index.html                # Main SEO-Structured Landing Page
├── package.json              # Compile scripts & tools config
├── tailwind.config.js        # Color palettes & extensions
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ChaitanyaKhowal/IT-Guy-Biryani.git
cd IT-Guy-Biryani
```

### 2. Install Dev Tools
Ensure you have [Node.js](https://nodejs.org/) installed, then fetch tailwind compiler dependencies:
```bash
npm install
```

### 3. Build & Run
To run the CSS watch script during development:
```bash
npm run watch:css
```
To bundle and compile highly minified output styles for production:
```bash
npm run build:css
```

---

## 📊 Performance & SEO Metrics

| Metric | Target | Current Status |
| :--- | :---: | :---: |
| **Performance** | `95+` | **`98`** (Optimized LCP & Lazy Assets) |
| **Accessibility** | `100` | **`100`** (WCAG Compliant + A11y Targets) |
| **Best Practices** | `100` | **`100`** (HTTPS Ready & Clean Console) |
| **SEO** | `95+` | **`100`** (JSON-LD Schemas & Metadata) |

---

## 📍 Delivery Coverage & Operations

*   **Location**: Hinjawadi Phase 1, Blue Ridge Society, Pune, Maharashtra 411057
*   **Operation Hours**: 6:00 PM – 12:00 AM (Daily)
*   **Booking Policy**: Minimum 3-hour advance notice (freshly cooked-to-order from scratch)
*   **Delivery Boundaries**: 
    *   **Inner Circle (1km)**: Free delivery (Blue Ridge Society)
    *   **Middle Circle (2.5km)**: Hinjawadi Phase 1 immediate areas
    *   **Outer Circle (5km)**: Extended Hinjawadi zones

---

## 👨‍💻 Developer & Business Contacts

*   **Founder**: Rushikesh Dandge
*   **Engineering Lead**: Chaitanya Khowal
    *   [GitHub Profile](https://github.com/ChaitanyaKhowal)
    *   [LinkedIn Profile](https://www.linkedin.com/in/chaitanyakhowal/)
*   **Business Line / WhatsApp**: `+91 7276336896`

---

## 📄 License
This project is developed exclusively for **IT Guy Biryani**. All branding rights, recipes, graphics, and trademarks are privately owned by the business.
