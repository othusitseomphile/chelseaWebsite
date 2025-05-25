document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Dropdown menu toggle for mobile
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Feedback form handling
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const formMessage = document.createElement('p');
            formMessage.className = 'form-message';

            // Clear previous messages
            const existingMessage = feedbackForm.querySelector('.form-message');
            if (existingMessage) existingMessage.remove();

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate inputs
            if (!nameInput.value.trim()) {
                formMessage.textContent = 'Please enter your full name.';
                formMessage.classList.add('error');
                feedbackForm.appendChild(formMessage);
                nameInput.focus();
                return;
            }

            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.classList.add('error');
                feedbackForm.appendChild(formMessage);
                emailInput.focus();
                return;
            }

            if (!messageInput.value.trim()) {
                formMessage.textContent = 'Please enter your feedback message.';
                formMessage.classList.add('error');
                feedbackForm.appendChild(formMessage);
                messageInput.focus();
                return;
            }

            // Prepare email
            const subject = encodeURIComponent('Chelsea FC Website Feedback');
            const body = encodeURIComponent(
                `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nFeedback:\n${messageInput.value}`
            );
            const mailtoLink = `mailto:fbda24-017@thuto.bac.ac.bw?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show delivery success message
            formMessage.textContent = 'Feedback delivered successfully! Your message has been sent.';
            formMessage.classList.add('success');
            feedbackForm.appendChild(formMessage);

            // Reset form
            feedbackForm.reset();

            // Auto-clear success message after 5 seconds
            setTimeout(() => {
                formMessage.remove();
            }, 5000);
        });
    }

    // Read More/Read Less Toggle for Men's Team, Women's Team, and Technical Team
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.id.split('-')[2]; // Extract number from 'read-more-X'
            // Try to find men's, women's, or technical team content
            const mensContent = document.getElementById(`mens-full-content-${id}`);
            const playerContent = document.getElementById(`player-full-content-${id}`);
            const staffContent = document.getElementById(`staff-full-content-${id}`);
            const content = mensContent || playerContent || staffContent;
            if (content) {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                    link.textContent = 'Read More';
                } else {
                    content.classList.add('show');
                    link.textContent = 'Read Less';
                }
            } else {
                console.warn(`No content found for ID ${id}`);
            }
        });
    });
});