/* =========================================================
   BULLETPROOF NAVIGATION & UI SCRIPT (INTEGRATED)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mouse Ambient Glow Tracking Effect
    const mouseGlow = document.getElementById("mouseGlow");
    if (mouseGlow) {
        window.addEventListener("mousemove", (e) => {
            mouseGlow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        });
    }

    // 2. Mobile Navigation Drawer Toggle
    const menuTrigger = document.getElementById("menuTrigger");
    const mobileDrawer = document.getElementById("mobileDrawer");

    if (menuTrigger && mobileDrawer) {
        menuTrigger.addEventListener("click", () => {
            mobileDrawer.classList.toggle("open");
            const icon = menuTrigger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Close drawer when clicking any drawer item
        mobileDrawer.querySelectorAll(".mobile-jump-link, .drawer-cta").forEach(link => {
            link.addEventListener("click", () => {
                mobileDrawer.classList.remove("open");
                const icon = menuTrigger.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // 3. Absolute Jump Navigation Fix
    const jumpTriggers = document.querySelectorAll(".nav-jump-btn, .mobile-jump-link, .footer-jump-link");
    
    jumpTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target") || "overview";
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (targetId === "overview") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }

            // Update active state if it's a desktop nav button
            if (btn.classList.contains("nav-jump-btn")) {
                jumpTriggers.forEach(jt => jt.classList.remove("active-link"));
                btn.classList.add("active-link");
            }
        });
    });

    // 4. Committee Interactive Tabs Controller
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.getAttribute("data-target");
            tabPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });
        });
    });

    // 5. Modal Logic Handling (Agenda & Standard Modals)
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".custom-modal");
    const closeButtons = document.querySelectorAll(".close-modal-btn");

    modalTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add("active");
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".custom-modal");
            if (modal) {
                modal.classList.remove("active");
                // Clean up fullscreen state on close
                modal.classList.remove("fullscreen-mode");
                const expandIcon = modal.querySelector(".fullscreen-pdf-btn i");
                if (expandIcon) {
                    expandIcon.classList.remove("fa-compress");
                    expandIcon.classList.add("fa-expand");
                }
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                modal.classList.remove("fullscreen-mode");
                const expandIcon = modal.querySelector(".fullscreen-pdf-btn i");
                if (expandIcon) {
                    expandIcon.classList.remove("fa-compress");
                    expandIcon.classList.add("fa-expand");
                }
            }
        });
    });

    // 6. PDF Modal Fullscreen Toggle Logic
    const pdfFullscreenButtons = document.querySelectorAll(".fullscreen-pdf-btn");

    pdfFullscreenButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".custom-modal");
            if (modal) {
                modal.classList.toggle("fullscreen-mode");
                const icon = btn.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-expand");
                    icon.classList.toggle("fa-compress");
                }
            }
        });
    });
});