document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isActive);
        // Toggle icon between ☰ (bars) and ✖ (close)
        hamburger.textContent = isActive ? '✖' : '☰';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            navMenu.classList.remove('active'); // Close menu on mobile
            hamburger.textContent = '☰'; // Reset to bars when menu closes
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    // Contact form submission with WhatsApp redirect
    const contactForm = document.getElementById('contactForm');
    const errorElement = document.getElementById('error');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            errorElement.textContent = '';

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Construct WhatsApp message
            const whatsappMessage = `Hi Simon, I'm ${name} (${email}). ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/254112585214?text=${encodedMessage}`;

            try {
                // Log the submission for debugging/analytics
                console.log('Form submitted, redirecting to WhatsApp:', { name, email, message });

                // Redirect to WhatsApp
                window.open(whatsappUrl, '_blank');

                // Show success message and reset form
                errorElement.style.color = 'green';
                errorElement.textContent = 'Redirecting to WhatsApp...';
                contactForm.reset();
            } catch (error) {
                errorElement.style.color = 'red';
                errorElement.textContent = 'Error redirecting to WhatsApp. Please try again.';
                console.error('WhatsApp redirect error:', error);
            }
        });
    }
});