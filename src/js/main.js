document.addEventListener('DOMContentLoaded', function() {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500); // Matches CSS transition duration
        });
    }

    // --- AOS Initialization ---
    AOS.init({
        offset: 150, // Adjust this value to trigger animations earlier or later
        duration: 1000,
        once: true, // Only animate once
    });

    // --- Typing Animation (Hero Section) ---
    const typingTextElement = document.getElementById("typing-text");
    const typingText = "Baswara Hafizh Muttaqin";
    let index = 0;

    function type() {
        if (index < typingText.length) {
            if (typingTextElement) {
                typingTextElement.innerHTML += typingText.charAt(index);
            }
            index++;
            setTimeout(type, 100);
        } else {
            // Optional: loop animation or just stop
        }
    }

    // Ensure typing starts after preloader (or on load if no preloader)
    window.addEventListener('load', type);


    // --- Navbar Active Link Highlight ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Adjust the offset for better triggering
            if (window.pageYOffset >= sectionTop - sectionHeight * 0.3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active', 'text-blue-600', 'dark:text-blue-400');
            
            // Remove underline for all
            const underline = link.querySelector('span');
            if (underline) {
                underline.classList.remove('scale-x-100');
            }

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-blue-600', 'dark:text-blue-400');
                
                // Add underline for active
                if (underline) {
                    underline.classList.add('scale-x-100');
                }
            }
        });
    }

    // Run on scroll and once on load
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // --- Contact Form Validation & Submission ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    function validateName() {
        const nameError = document.getElementById('nameError');
        if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'Nama harus minimal 3 karakter.';
            nameError.classList.remove('hidden');
            return false;
        } else {
            nameError.classList.add('hidden');
            return true;
        }
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Masukkan alamat email yang valid.';
            emailError.classList.remove('hidden');
            return false;
        } else {
            emailError.classList.add('hidden');
            return true;
        }
    }

    function validateMessage() {
        const messageError = document.getElementById('messageError');
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Pesan harus minimal 10 karakter.';
            messageError.classList.remove('hidden');
            return false;
        } else {
            messageError.classList.add('hidden');
            return true;
        }
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                const formData = new FormData(contactForm);
                
                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        successMessage.classList.remove('hidden');
                        errorMessage.classList.add('hidden');
                        contactForm.reset();
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                        }, 5000); // Hide after 5 seconds
                    } else {
                        throw new Error('Terjadi kesalahan server.');
                    }
                } catch (error) {
                    errorMessage.textContent = 'Gagal mengirim pesan. Mohon coba lagi nanti. Detail: ' + error.message;
                    errorMessage.classList.remove('hidden');
                    successMessage.classList.add('hidden');
                    setTimeout(() => {
                        errorMessage.classList.add('hidden');
                    }, 5000); // Hide after 5 seconds
                }
            }
        });
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Set Current Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});