/* =========================================================
   SEPTEMBER WEBSITE - STATIONERY STORE
   PART 4 - JAVASCRIPT

   Functions:
   1. Hamburger menu
   2. Desktop dropdowns
   3. Mobile dropdowns
   4. Dark mode
   5. RTL mode
   6. Local storage
   7. Outside click
   8. Escape key
   9. Accessibility
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const body = document.body;
const html = document.documentElement;


/* ---------- Hamburger ---------- */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");


/* ---------- Desktop Dropdowns ---------- */

const desktopDropdownToggles =
    document.querySelectorAll(".main-navigation .dropdown-toggle");

const desktopDropdownItems =
    document.querySelectorAll(".main-navigation .nav-item-dropdown");


/* ---------- Mobile Dropdowns ---------- */

const mobileDropdownToggles =
    document.querySelectorAll(".mobile-dropdown-toggle");

const mobileDropdownItems =
    document.querySelectorAll(".mobile-dropdown");


/* ---------- RTL ---------- */

const rtlToggleBtn =
    document.getElementById("rtlToggleBtn");

const mobileRtlToggleBtn =
    document.getElementById("mobileRtlToggleBtn");


/* ---------- Dark Mode ---------- */

const themeToggleBtn =
    document.getElementById("themeToggleBtn");

const mobileThemeToggleBtn =
    document.getElementById("mobileThemeToggleBtn");


/* =========================================================
   2. LOCAL STORAGE KEYS
========================================================= */

const THEME_STORAGE_KEY = "stationery-theme";
const RTL_STORAGE_KEY = "stationery-direction";


/* =========================================================
   3. HAMBURGER MENU
========================================================= */

function openMobileMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.add("is-active");

    mobileMenu.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    body.classList.add("menu-open");
}


function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.remove("is-active");

    mobileMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    body.classList.remove("menu-open");
}


function toggleMobileMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    const isOpen =
        mobileMenu.classList.contains("is-open");

    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* =========================================================
   4. DESKTOP DROPDOWNS
========================================================= */

function closeDesktopDropdowns() {

    desktopDropdownItems.forEach((item) => {

        item.classList.remove("is-open");

        const toggle =
            item.querySelector(".dropdown-toggle");

        if (toggle) {

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


desktopDropdownToggles.forEach((toggle) => {

    toggle.addEventListener("click", function (event) {

        event.preventDefault();

        const parentItem =
            this.closest(".nav-item-dropdown");

        if (!parentItem) {
            return;
        }

        const alreadyOpen =
            parentItem.classList.contains("is-open");


        /* Close other dropdowns */

        closeDesktopDropdowns();


        /* Open selected dropdown */

        if (!alreadyOpen) {

            parentItem.classList.add("is-open");

            this.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


/* =========================================================
   5. MOBILE DROPDOWNS
========================================================= */

function closeMobileDropdowns() {

    mobileDropdownItems.forEach((item) => {

        item.classList.remove("is-open");

        const toggle =
            item.querySelector(".mobile-dropdown-toggle");

        if (toggle) {

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


mobileDropdownToggles.forEach((toggle) => {

    toggle.addEventListener("click", function () {

        const parentItem =
            this.closest(".mobile-dropdown");

        if (!parentItem) {
            return;
        }

        const alreadyOpen =
            parentItem.classList.contains("is-open");


        /* Close other mobile dropdowns */

        closeMobileDropdowns();


        /* Open selected dropdown */

        if (!alreadyOpen) {

            parentItem.classList.add("is-open");

            this.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


/* =========================================================
   6. CLOSE MOBILE MENU WHEN NORMAL LINK IS CLICKED
========================================================= */

const mobileNormalLinks =
    document.querySelectorAll(
        ".mobile-nav-item > a"
    );


mobileNormalLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMobileMenu();

        closeMobileDropdowns();

    });

});


/* =========================================================
   7. DARK MODE
========================================================= */

function setDarkMode(enabled) {

    if (enabled) {

        body.classList.add("dark-mode");

        localStorage.setItem(
            THEME_STORAGE_KEY,
            "dark"
        );

    } else {

        body.classList.remove("dark-mode");

        localStorage.setItem(
            THEME_STORAGE_KEY,
            "light"
        );

    }

}


function toggleDarkMode() {

    const darkModeEnabled =
        body.classList.contains("dark-mode");

    setDarkMode(!darkModeEnabled);

}


if (themeToggleBtn) {

    themeToggleBtn.addEventListener(
        "click",
        toggleDarkMode
    );

}


if (mobileThemeToggleBtn) {

    mobileThemeToggleBtn.addEventListener(
        "click",
        toggleDarkMode
    );

}


/* =========================================================
   8. LOAD SAVED DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem(THEME_STORAGE_KEY);


if (savedTheme === "dark") {

    body.classList.add("dark-mode");

} else if (savedTheme === "light") {

    body.classList.remove("dark-mode");

}


/* =========================================================
   9. RTL MODE
========================================================= */

function setRTL(enabled) {

    if (enabled) {

        html.setAttribute("dir", "rtl");

        html.setAttribute("lang", "en");

        localStorage.setItem(
            RTL_STORAGE_KEY,
            "rtl"
        );

    } else {

        html.setAttribute("dir", "ltr");

        html.setAttribute("lang", "en");

        localStorage.setItem(
            RTL_STORAGE_KEY,
            "ltr"
        );

    }

}


function toggleRTL() {

    const currentDirection =
        html.getAttribute("dir");

    const rtlEnabled =
        currentDirection === "rtl";

    setRTL(!rtlEnabled);

}


if (rtlToggleBtn) {

    rtlToggleBtn.addEventListener(
        "click",
        toggleRTL
    );

}


if (mobileRtlToggleBtn) {

    mobileRtlToggleBtn.addEventListener(
        "click",
        toggleRTL
    );

}


/* =========================================================
   10. LOAD SAVED RTL SETTING
========================================================= */

const savedDirection =
    localStorage.getItem(RTL_STORAGE_KEY);


if (savedDirection === "rtl") {

    html.setAttribute("dir", "rtl");

} else {

    html.setAttribute("dir", "ltr");

}


/* =========================================================
   11. CLOSE DESKTOP DROPDOWN WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function (event) {

    const clickedInsideNavigation =
        event.target.closest(".main-navigation");

    if (!clickedInsideNavigation) {

        closeDesktopDropdowns();

    }

});


/* =========================================================
   12. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function (event) {

    if (!mobileMenu || !menuToggle) {
        return;
    }

    const clickedInsideMenu =
        event.target.closest(".mobile-menu");

    const clickedMenuButton =
        event.target.closest(".menu-toggle");


    if (
        mobileMenu.classList.contains("is-open") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        closeMobileMenu();

        closeMobileDropdowns();

    }

});


/* =========================================================
   13. ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    /* Close desktop dropdown */

    closeDesktopDropdowns();


    /* Close mobile dropdown */

    closeMobileDropdowns();


    /* Close hamburger */

    closeMobileMenu();


    /* Return focus to hamburger */

    if (menuToggle) {

        menuToggle.focus();

    }

});


/* =========================================================
   14. WINDOW RESIZE
========================================================= */

window.addEventListener("resize", function () {

    /*
       When moving from tablet/mobile back to desktop,
       remove mobile menu state.
    */

    if (window.innerWidth >= 1200) {

        closeMobileMenu();

        closeMobileDropdowns();

    }

});


/* =========================================================
   15. INITIAL ARIA STATE
========================================================= */

desktopDropdownToggles.forEach((toggle) => {

    toggle.setAttribute(
        "aria-expanded",
        "false"
    );

});


mobileDropdownToggles.forEach((toggle) => {

    toggle.setAttribute(
        "aria-expanded",
        "false"
    );

});


/* =========================================================
   16. PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
========================================================= */

function updateBodyScroll() {

    if (
        mobileMenu &&
        mobileMenu.classList.contains("is-open")
    ) {

        body.classList.add("menu-open");

    } else {

        body.classList.remove("menu-open");

    }

}


/* Observe mobile menu class changes */

if (mobileMenu) {

    const menuObserver =
        new MutationObserver(updateBodyScroll);

    menuObserver.observe(
        mobileMenu,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );

}


/* =========================================================
   17. FINAL INITIALIZATION
========================================================= */

closeDesktopDropdowns();

closeMobileDropdowns();

closeMobileMenu();




/***HOME1*******/

/* =========================================================
   DESKORA STATIONERY STORE
   HOME 1
   HERO SECTION
   PART 4 - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const heroSlider = document.getElementById("heroSlider");
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroIndicators = document.querySelectorAll(".hero-indicator");

    if (!heroSlider || heroSlides.length === 0) {
        return;
    }

    let currentSlide = 0;
    let heroTimer = null;

    const slideInterval = 5000;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showHeroSlide(index) {

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        if (index >= heroSlides.length) {
            index = 0;
        }

        currentSlide = index;


        /* Remove active state from all slides */

        heroSlides.forEach(function (slide) {
            slide.classList.remove("is-active");
        });


        /* Add active state to current slide */

        heroSlides[currentSlide].classList.add("is-active");


        /* Update indicators */

        heroIndicators.forEach(function (indicator, indicatorIndex) {

            const isActive = indicatorIndex === currentSlide;

            indicator.classList.toggle("is-active", isActive);

            if (isActive) {
                indicator.setAttribute("aria-current", "true");
            } else {
                indicator.removeAttribute("aria-current");
            }

        });

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextHeroSlide() {

        showHeroSlide(currentSlide + 1);

    }


    /* =====================================================
       START AUTO SLIDER
    ===================================================== */

    function startHeroSlider() {

        stopHeroSlider();

        heroTimer = setInterval(function () {

            nextHeroSlide();

        }, slideInterval);

    }


    /* =====================================================
       STOP AUTO SLIDER
    ===================================================== */

    function stopHeroSlider() {

        if (heroTimer !== null) {

            clearInterval(heroTimer);

            heroTimer = null;

        }

    }


    /* =====================================================
       INDICATOR CLICK
    ===================================================== */

    heroIndicators.forEach(function (indicator, index) {

        indicator.addEventListener("click", function () {

            showHeroSlide(index);

            startHeroSlider();

        });

    });


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    heroSlider.addEventListener("mouseenter", function () {

        stopHeroSlider();

    });


    /* =====================================================
       RESUME AFTER HOVER
    ===================================================== */

    heroSlider.addEventListener("mouseleave", function () {

        startHeroSlider();

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    heroSlider.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {

            showHeroSlide(currentSlide + 1);

            startHeroSlider();

        }

        if (event.key === "ArrowLeft") {

            showHeroSlide(currentSlide - 1);

            startHeroSlider();

        }

    });


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {

        stopHeroSlider();

    } else {

        startHeroSlider();

    }


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showHeroSlide(0);

});




/* =========================================================
   AUTH PAGES
   LOGIN + REGISTER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AUTH RTL CONTROL
    ===================================================== */

    const authRtlButtons =
        document.querySelectorAll(
            '[data-auth-control="rtl"]'
        );

    authRtlButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const currentDirection =
                document.documentElement.getAttribute("dir");

            setRTL(currentDirection !== "rtl");

        });

    });


    /* =====================================================
       AUTH DARK MODE CONTROL
    ===================================================== */

    const authDarkButtons =
        document.querySelectorAll(
            '[data-auth-control="dark"]'
        );

    authDarkButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            toggleDarkMode();

            updateAuthDarkButtons();

        });

    });


    function updateAuthDarkButtons() {

        const isDark =
            document.body.classList.contains("dark-mode");

        authDarkButtons.forEach(function (button) {

            button.setAttribute(
                "aria-pressed",
                isDark ? "true" : "false"
            );

            const icon = button.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-moon",
                    !isDark
                );

                icon.classList.toggle(
                    "fa-sun",
                    isDark
                );

            }

        });

    }

    updateAuthDarkButtons();


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    function setupPasswordToggle(
        inputId,
        toggleId
    ) {

        const input =
            document.getElementById(inputId);

        const toggle =
            document.getElementById(toggleId);

        if (!input || !toggle) {
            return;
        }

        toggle.addEventListener("click", function () {

            const isPassword =
                input.type === "password";

            input.type =
                isPassword ? "text" : "password";

            toggle.setAttribute(
                "aria-pressed",
                isPassword ? "true" : "false"
            );

            toggle.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

            const icon =
                toggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-eye",
                    !isPassword
                );

                icon.classList.toggle(
                    "fa-eye-slash",
                    isPassword
                );

            }

        });

    }


    /* =====================================================
       LOGIN PASSWORD
    ===================================================== */

    setupPasswordToggle(
        "loginPassword",
        "loginPasswordToggle"
    );


    /* =====================================================
       REGISTER PASSWORD
    ===================================================== */

    setupPasswordToggle(
        "registerPassword",
        "registerPasswordToggle"
    );


    /* =====================================================
       REGISTER CONFIRM PASSWORD
    ===================================================== */

    setupPasswordToggle(
        "registerConfirmPassword",
        "registerConfirmPasswordToggle"
    );


    /* =====================================================
       REGISTER PASSWORD MATCH
    ===================================================== */

    const registerPassword =
        document.getElementById(
            "registerPassword"
        );

    const registerConfirmPassword =
        document.getElementById(
            "registerConfirmPassword"
        );

    if (
        registerPassword &&
        registerConfirmPassword
    ) {

        function checkPasswordMatch() {

            if (
                registerConfirmPassword.value &&
                registerPassword.value !==
                registerConfirmPassword.value
            ) {

                registerConfirmPassword.setCustomValidity(
                    "Passwords do not match."
                );

            } else {

                registerConfirmPassword.setCustomValidity("");

            }

        }

        registerPassword.addEventListener(
            "input",
            checkPasswordMatch
        );

        registerConfirmPassword.addEventListener(
            "input",
            checkPasswordMatch
        );

    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (!loginForm.checkValidity()) {

                    loginForm.reportValidity();

                    return;

                }

                console.log(
                    "Login form submitted"
                );

            }
        );

    }


    /* =====================================================
       REGISTER FORM
    ===================================================== */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (!registerForm.checkValidity()) {

                    registerForm.reportValidity();

                    return;

                }

                if (
                    registerPassword &&
                    registerConfirmPassword &&
                    registerPassword.value !==
                    registerConfirmPassword.value
                ) {

                    registerConfirmPassword.setCustomValidity(
                        "Passwords do not match."
                    );

                    registerConfirmPassword.reportValidity();

                    return;

                }

                console.log(
                    "Register form submitted"
                );

            }
        );

    }


    /* =====================================================
       SOCIAL BUTTONS
    ===================================================== */

    const socialButtons =
        document.querySelectorAll(
            ".social-login-btn, .social-register-btn"
        );

    socialButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                console.log(
                    button.getAttribute(
                        "aria-label"
                    )
                );

            }
        );

    });

});





/* =========================================================
   SCROLL TO TOP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});