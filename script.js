// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animated counter for stats
    const counters = document.querySelectorAll('.display-4');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 
                (counter.id === 'eventsCount' ? 42 : 
                 counter.id === 'participantsCount' ? 1250 : 
                 counter.id === 'clubsCount' ? 36 : 
                 counter.id === 'upcomingCount' ? 18 : 0);
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Start animation when stats section is in view
    const statsSection = document.querySelector('.bg-light');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    });
    
    observer.observe(statsSection);
    
    // Form validation example
    const newsletterForm = document.querySelector('.bg-dark form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const consentCheck = this.querySelector('#consentCheck');
            
            if (!emailInput.value) {
                e.preventDefault();
                alert('Please enter your email address');
                emailInput.focus();
                return false;
            }
            
            if (!consentCheck.checked) {
                e.preventDefault();
                alert('Please agree to receive emails');
                consentCheck.focus();
                return false;
            }
            
            // Form would submit here in a real application
            alert('Thank you for subscribing!');
            e.preventDefault();
        });
    }
});
