// ============================================
// NEW: Prevent image saving/dragging via
// right-click and drag (backup to CSS protection)
// ============================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

// ============================================
// EmailJS Configuration
// Updated to use: bamboomatchakyoto@gmail.com
// ============================================
const EMAILJS_CONFIG = {
    serviceId: 'service_l8softl',           // ✅ Gmail service (bamboomatchakyoto@gmail.com) - Toshi's account
    templateId: 'template_tcdfeie',         // ✅ Your template ID
    publicKey: 'BiMz3YZd_tAfzMUYq'          // ✅ Your public key
};

// Initialize EmailJS when page loads
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized successfully');
    } else {
        console.error('❌ EmailJS SDK not loaded. Add SDK script to HTML.');
    }
})();

// ============================================
// Navigation & Scroll Functionality
// ============================================

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                const matchingLink = document.querySelector('header nav a[href*=' + id + ']');
                if (matchingLink) matchingLink.classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    // Fixed condition to show footer animation earlier
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight - 100);
}

// ============================================
// Bamboo Quote Widget
// ============================================
const bambooTrigger = document.getElementById('bambooTrigger');
const bambooIcon = bambooTrigger ? bambooTrigger.querySelector('.bamboo-icon') : null;
const quoteOverlay = document.getElementById('quoteOverlay');
const quoteText = document.getElementById('quoteText');

if (bambooTrigger && quoteOverlay) {
    function createFloatingLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'bamboo-leaf';
        leaf.style.left = bambooTrigger.offsetLeft + 30 + 'px';
        leaf.style.top = bambooTrigger.offsetTop + 30 + 'px';
        leaf.style.animation = 'floatLeaf 2s ease-out forwards';
        document.body.appendChild(leaf);
        setTimeout(() => leaf.remove(), 2000);
    }

    function animateQuoteText() {
        const text = quoteText.textContent.trim();
        const words = text.split(/\s+/); // Split by any whitespace
        quoteText.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.animationDelay = `${index * 0.05}s`;
            quoteText.appendChild(span);
            
            // Add space after each word except the last one
            if (index < words.length - 1) {
                quoteText.appendChild(document.createTextNode(' '));
            }
        });
    }

    bambooTrigger.addEventListener('click', () => {
        bambooTrigger.classList.add('rustling');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFloatingLeaf(), i * 100);
        }
        setTimeout(() => {
            quoteOverlay.classList.add('active');
            animateQuoteText();
        }, 400);
        setTimeout(() => bambooTrigger.classList.remove('rustling'), 600);
    });

    quoteOverlay.addEventListener('click', () => {
        quoteOverlay.classList.remove('active');
    });

    document.querySelector('.quote-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ============================================
    // NEW: 3D tactile tilt — the ball responds to
    // cursor position like a real object you could
    // reach out and turn in your hand.
    // ============================================
    if (bambooIcon && window.matchMedia('(hover: hover)').matches) {
        const MAX_TILT = 18; // degrees

        bambooTrigger.addEventListener('mousemove', (e) => {
            const rect = bambooTrigger.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = (e.clientX - centerX) / (rect.width / 2);
            const offsetY = (e.clientY - centerY) / (rect.height / 2);

            const rotateY = Math.max(-1, Math.min(1, offsetX)) * MAX_TILT;
            const rotateX = Math.max(-1, Math.min(1, offsetY)) * -MAX_TILT;

            bambooIcon.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        bambooTrigger.addEventListener('mouseleave', () => {
            bambooIcon.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
}

// ============================================
// Contact Form Handler with EmailJS
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            console.log('🔍 Form submission started');
            
            // Get form elements
            const submitBtn = event.target.querySelector('.btn');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data based on language
            // Works for both English and Japanese forms
            const nameInput = event.target.querySelector('input[placeholder="Full Name"], input[placeholder="お名前"]');
            const emailInput = event.target.querySelector('input[placeholder="Email"], input[placeholder="メールアドレス"]');
            const phoneInput = event.target.querySelector('input[placeholder="Mobile Number"], input[placeholder="電話番号"]');
            const subjectInput = event.target.querySelector('input[placeholder="Email Subject"], input[placeholder="件名"]');
            const messageInput = event.target.querySelector('textarea');
            
            // Prepare template parameters
            const templateParams = {
                name: nameInput ? nameInput.value : '',
                email: emailInput ? emailInput.value : '',
                phone: phoneInput ? phoneInput.value : '',
                subject: subjectInput ? subjectInput.value : '',
                message: messageInput ? messageInput.value : ''
            };
            
            console.log('📧 Sending email with params:', templateParams);
            
            // Send email using EmailJS
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            )
            .then(function(response) {
                console.log('✅ SUCCESS!', response.status, response.text);
                
                // Success message (bilingual support)
                const successMessage = nameInput && nameInput.placeholder.includes('お名前') 
                    ? 'メッセージが正常に送信されました！ ✓'
                    : 'Message sent successfully! ✓';
                
                alert(successMessage);
                
                // Reset form
                event.target.reset();
                
                // Restore button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
            }, function(error) {
                console.error('❌ FAILED!', error);
                
                // Error message (bilingual support)
                const errorMessage = nameInput && nameInput.placeholder.includes('お名前')
                    ? 'メッセージの送信に失敗しました。もう一度お試しください。'
                    : 'Failed to send message. Please try again.';
                
                alert(errorMessage);
                
                // Restore button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    } else {
        console.error('❌ Contact form not found');
    }
});