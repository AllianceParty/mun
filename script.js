console.log("JS is running");
/* =========================================================

   MUN WEBSITE - SCRIPT.JS
   PART 1: CORE INITIALIZATION
========================================================= */

/* =======================
   LOADER CONTROL
======================= */

/* =======================
   CURSOR SYSTEM
======================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    cursorDot.style.left = x + "px";
    cursorDot.style.top = y + "px";
});

/* Cursor hover effects */
document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.6)";
        cursor.style.borderColor = "#00d4ff";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.borderColor = "rgba(255,255,255,0.4)";
    });
});

/* =======================
   SCROLL PROGRESS BAR
======================= */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
});

/* =======================
   NAVBAR SCROLL EFFECT
======================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* =======================
   BACK TO TOP BUTTON
======================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* =======================
   SECTION REVEAL ON SCROLL
======================= */

const sections = document.querySelectorAll(".section");

const revealSections = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealSections);
revealSections();

/* =======================
   MODAL SYSTEM (OPEN)
======================= */

const learnButtons = document.querySelectorAll(".learn-btn");

learnButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.classList.add("active");
        }
    });
});

/* =======================
   MODAL SYSTEM (CLOSE)
======================= */

const modals = document.querySelectorAll(".modal");

modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal") ||
            e.target.classList.contains("close-modal")) {
            modal.classList.remove("active");
        }
    });
});

/* =======================
   SMOOTH NAV SCROLL
======================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
/* =========================================================
   MUN WEBSITE - SCRIPT.JS
   PART 2: GSAP + THEMES + SCROLL MAGIC
========================================================= */

/* =======================
   GSAP REGISTER
======================= */

gsap.registerPlugin(ScrollTrigger);

/* =======================
   HERO INTRO ANIMATION
======================= */

gsap.from(".hero-title", {
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power4.out"
});

gsap.from(".powered", {
    opacity: 0,
    y: 40,
    delay: 0.3,
    duration: 1
});

gsap.from(".hero-description", {
    opacity: 0,
    y: 40,
    delay: 0.5,
    duration: 1
});

gsap.from(".hero-buttons", {
    opacity: 0,
    scale: 0.8,
    delay: 0.7,
    duration: 1
});

/* =======================
   SECTION REVEAL ANIMATIONS
======================= */

gsap.utils.toArray(".section").forEach((section) => {

    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
        }
    });

});

/* =======================
   COMMITTEE CARDS ANIMATION
======================= */

gsap.utils.toArray(".committee-grid").forEach((grid) => {

    gsap.from(grid.querySelectorAll(".committee-image"), {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: grid,
            start: "top 75%"
        }
    });

    gsap.from(grid.querySelectorAll(".committee-content"), {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: grid,
            start: "top 75%"
        }
    });

});

/* =======================
   TIMELINE ANIMATION
======================= */

gsap.from(".timeline-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%"
    }
});

/* =======================
   CREDITS ANIMATION
======================= */

gsap.from(".credit-card", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
        trigger: ".credits-grid",
        start: "top 85%"
    }
});

/* =======================
   THEME SWITCH SYSTEM
   (BASED ON SCROLL POSITION)
======================= */

const backgrounds = document.querySelectorAll(".bg");

const themes = {
    hero: 0,
    unsc: 1,
    unhrc: 2,
    ipc: 3,
    timeline: 4,
    credits: 5
};

function setTheme(index) {

    backgrounds.forEach(bg => bg.classList.remove("active"));

    if (backgrounds[index]) {
        backgrounds[index].classList.add("active");
    }

}

/* Scroll-based theme detection */
window.addEventListener("scroll", () => {

    let currentIndex = 0;

    sections.forEach((section, i) => {

        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2) {
            currentIndex = i;
        }

    });

    setTheme(currentIndex);

});

/* =======================
   NAV LINK ACTIVE HIGHLIGHT
======================= */

const navLinks = document.querySelectorAll("#navbar ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

/* =======================
   PARALLAX BACKGROUND SHIFT
======================= */

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    document.querySelectorAll(".bg").forEach(bg => {
        bg.style.transform = `scale(1.1) translateY(${scrollY * 0.02}px)`;
    });

});

/* =======================
   MAGNETIC BUTTON EFFECT
======================= */

document.querySelectorAll("button, .primary-btn, .secondary-btn, .register-nav")
.forEach(btn => {

    btn.addEventListener("mousemove", (e) => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.transform = `translate(${(x - rect.width / 2) * 0.1}px,
                                          ${(y - rect.height / 2) * 0.1}px)`;

    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });

});
/* =========================================================
   MUN WEBSITE - SCRIPT.JS
   PART 3: POLISH + PARTICLES + FINAL SYSTEMS
========================================================= */

/* =======================
   SIMPLE PARTICLE SYSTEM
   (lightweight canvas-less version)
======================= */

const particleContainer = document.getElementById("particles");

function createParticles(count = 60) {

    for (let i = 0; i < count; i++) {

        const p = document.createElement("div");

        p.className = "particle";

        const size = Math.random() * 3 + 1;

        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.position = "absolute";

        p.style.background = "rgba(255,255,255,0.6)";
        p.style.borderRadius = "50%";

        p.style.top = Math.random() * 100 + "%";
        p.style.left = Math.random() * 100 + "%";

        p.style.opacity = Math.random();

        p.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;

        particleContainer.appendChild(p);
    }
}

createParticles();

/* =======================
   SMOOTH CURSOR FOLLOW (EASING)
======================= */

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function smoothCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
    }

    requestAnimationFrame(smoothCursor);
}

smoothCursor();

/* =======================
   OPTIONAL HERO TEXT GLITCH EFFECT
======================= */

const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {

    setInterval(() => {

        heroTitle.style.textShadow =
            `${Math.random() * 10}px ${Math.random() * 10}px 20px rgba(0,212,255,0.3)`;

        setTimeout(() => {
            heroTitle.style.textShadow = "0 0 30px rgba(0,212,255,0.3)";
        }, 150);

    }, 3000);
}

/* =======================
   NAVBAR HIDE ON SCROLL DOWN
   SHOW ON SCROLL UP
======================= */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});

/* =======================
   ACTIVE SECTION SMOOTHER FIX
======================= */

function updateActiveSections() {

    document.querySelectorAll(".section").forEach(sec => {

        const rect = sec.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.7 &&
            rect.bottom > window.innerHeight * 0.3) {

            sec.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveSections);
updateActiveSections();

/* =======================
   PREVENT MODAL SCROLL JUMP
======================= */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("wheel", (e) => {
        e.stopPropagation();
    });

});

/* =======================
   PERFORMANCE OPTIMIZATION
======================= */

let ticking = false;

function optimizedScroll() {

    if (!ticking) {

        window.requestAnimationFrame(() => {

            // lightweight scroll-based updates can go here

            ticking = false;
        });

        ticking = true;
    }
}

window.addEventListener("scroll", optimizedScroll);

/* =======================
   FINAL BOOT COMPLETION LOG
======================= */

console.log("%cMUN WEBSITE LOADED", "color:#00d4ff;font-size:16px;font-weight:bold;");
console.log("Powered by Alliance Group");

/* =========================================================
  FIX
========================================================= */
window.addEventListener("scroll", () => {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.add("active");
    });
});