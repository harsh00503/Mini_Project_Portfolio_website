
const words = ["Web Developer", "Frontend Designer", "UI/UX Enthusiast", "Programmer"];
let i = 0, j = 0;
let isDeleting = false;

function type() {
    const typingElement = document.getElementById("typing");
    const currentWord = words[i];
    
    if (!isDeleting && j < currentWord.length) {
        typingElement.textContent = currentWord.substring(0, j + 1);
        j++;
        setTimeout(type, 100);
    } else if (isDeleting && j > 0) {
        typingElement.textContent = currentWord.substring(0, j - 1);
        j--;
        setTimeout(type, 50);
    } else if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 500);
    }
}
function updateScrollProgress() {
    const scrollProgress = document.getElementById("scrollProgress");
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
}

function handleHeaderScroll() {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById("header").offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                const nav = document.getElementById("nav");
                const menuToggle = document.getElementById("menuToggle");
                if (nav.classList.contains("active")) {
                    nav.classList.remove("active");
                    menuToggle.classList.remove("active");
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Animate skill progress bars
                // if (entry.target.classList.contains("skill-item")) {
                //     const progressBar = entry.target.querySelector(".skill-progress");
                //     const percent = progressBar.getAttribute("data-percent");
                //     setTimeout(() => {
                //         progressBar.style.width = percent + "%";
                //     }, 200);
                // }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        ".section-title, .about-content, .skill-item, .project-card, .contact-form"
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    
    menuToggle.addEventListener("click", function() {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
    
    document.addEventListener("click", function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });
}

function initBackToTop() {
    const backToTop = document.getElementById("backToTop");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });
    
    backToTop.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };
        
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all required fields.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert("Thank you for your message! I'll get back to you soon.");
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function initParallax() {
    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector(".hero-img");
        
        if (heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}
function initCursorEffect() {
    const cursor = document.createElement("div");
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX - 10 + "px";
        cursor.style.top = e.clientY - 10 + "px";
        cursor.style.display = "block";
    });
    
    document.querySelectorAll("a, button, .project-card").forEach(element => {
        element.addEventListener("mouseenter", function() {
            cursor.style.transform = "scale(1.5)";
            cursor.style.borderColor = "var(--secondary-color)";
        });
        
        element.addEventListener("mouseleave", function() {
            cursor.style.transform = "scale(1)";
            cursor.style.borderColor = "var(--primary-color)";
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {

    type();
    
    initSmoothScroll();
    initMobileMenu();
    initIntersectionObserver();
    initBackToTop();
    createParticles();
    initContactForm();
    initParallax();
    
    window.addEventListener("scroll", function() {
        updateScrollProgress();
        handleHeaderScroll();
        updateActiveNavLink();
    });
    
    updateScrollProgress();
    handleHeaderScroll();
    updateActiveNavLink();
    
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s";
        document.body.style.opacity = "1";
    }, 100);
});

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        const nav = document.getElementById("nav");
        const menuToggle = document.getElementById("menuToggle");
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
    }
});

let ticking = false;

function optimizedScroll() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateScrollProgress();
            handleHeaderScroll();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", optimizedScroll);
