// ===== MATERIAL DESIGN 3 MOTION SYSTEM =====
const MD3_MOTION = {
    duration: {
        short1: 100,
        short2: 200,
        short3: 250,
        short4: 300,
        medium1: 400,
        medium2: 500,
        medium3: 600,
        medium4: 700,
        long1: 800,
        long2: 900,
        long3: 1000,
        long4: 1100
    },
    easing: {
        linear: 'cubic-bezier(0, 0, 1, 1)',
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)'
    }
};

// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
    
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }
    }, 3000);
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (!href || href === '#') {
            return;
        }
        
        // Skip if this is a dropdown toggle
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FADE IN ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Remove fadeout class when card comes into view
            entry.target.classList.remove('fadeout');
        } else {
            // Add fadeout class when card goes out of view
            if (entry.target.classList.contains('menu-card') || 
                entry.target.classList.contains('testimonial-card') || 
                entry.target.classList.contains('gallery-item') || 
                entry.target.classList.contains('stat-item')) {
                entry.target.classList.add('fadeout');
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all card components
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.menu-card, .testimonial-card, .gallery-item, .stat-item');
    cards.forEach(card => {
        observer.observe(card);
        
        // Add click animation with Material Design 3 timing
        card.addEventListener('click', function() {
            this.style.transition = `opacity ${MD3_MOTION.duration.short2}ms ${MD3_MOTION.easing.standard}`;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, MD3_MOTION.duration.short2);
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
// Removed custom navbar handling - using Bootstrap's native functionality only

// ===== MOBILE MENU TOGGLE =====
// Removed custom mobile menu handling - using Bootstrap's native functionality only

// ===== DROPDOWN MENU TOGGLE =====
// Removed custom dropdown handling - using Bootstrap's native functionality only

// ===== MENU CATEGORY FILTERING (Main Page) =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on main page where menu items are in one section
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const menuItems = document.querySelectorAll('.menu-item');
        
        if (categoryButtons.length > 0 && menuItems.length > 0) {
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter menu items with Material Design 3 timing
                    menuItems.forEach(item => {
                        item.style.transition = `all ${MD3_MOTION.duration.medium2}ms ${MD3_MOTION.easing.standard}`;
                        
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                            item.style.display = 'block';
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, MD3_MOTION.duration.medium2);
                        }
                    });
                });
            });
        }
    }
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== RESERVATION FORM =====
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');
    
    // Calculate minimum date (tomorrow) for date input
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    if (dateInput) {
        dateInput.min = minDate;
        dateInput.value = minDate;
    }
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const reservationData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                guests: formData.get('guests'),
                date: formData.get('date'),
                time: formData.get('time'),
                specialRequests: formData.get('special-requests'),
                terms: formData.get('terms')
            };
            
            if (validateReservationForm(reservationData)) {
                showReservationSuccess(reservationData);
                this.reset();
                if (dateInput) dateInput.value = minDate;
            }
        });
    }
});

// ===== FORM VALIDATION =====
function validateReservationForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!data.guests) {
        showFieldError('guests', 'Please select number of guests');
        isValid = false;
    }
    
    if (!data.date) {
        showFieldError('date', 'Please select a date');
        isValid = false;
    }
    
    if (!data.time) {
        showFieldError('time', 'Please select a time');
        isValid = false;
    }
    
    if (!data.terms) {
        showFieldError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorDiv = field.parentNode.querySelector('.field-error') || createErrorElement();
    
    if (!field.parentNode.querySelector('.field-error')) {
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    field.classList.add('error');
}

function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.85rem; margin-top: 5px; display: none;';
    return errorDiv;
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SUCCESS MODAL =====
function showReservationSuccess(data) {
    const modal = document.createElement('div');
    modal.className = 'reservation-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="material-symbols-outlined success-icon">check_circle</span>
                <h3>Reservation Confirmed!</h3>
            </div>
            <div class="modal-body">
                <p>Thank you, <strong>${data.name}</strong>!</p>
                <p>Your reservation has been confirmed for:</p>
                <div class="reservation-details">
                    <div class="detail-item">
                        <span class="material-symbols-outlined">event</span>
                        <span>${formatDate(data.date)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="material-symbols-outlined">schedule</span>
                        <span>${data.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="material-symbols-outlined">groups</span>
                        <span>${data.guests} ${parseInt(data.guests) === 1 ? 'Person' : 'People'}</span>
                    </div>
                </div>
                <p class="confirmation-note">We'll send you a confirmation SMS to <strong>${data.phone}</strong> shortly.</p>
            </div>
            <div class="modal-footer">
                <button class="btn-close-modal">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    const closeBtn = modal.querySelector('.btn-close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Add keyboard support for closing modal
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal is closed
    const restoreScroll = () => {
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', restoreScroll);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            restoreScroll();
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// ===== TERMS MODAL =====
function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ===== MODAL EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('termsModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTermsModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeTermsModal();
            }
        });
    }
    
    // Menu navigation
    const viewFullMenuBtn = document.querySelector('.btn-menu-full');
    if (viewFullMenuBtn) {
        viewFullMenuBtn.addEventListener('click', function(e) {
            window.location.href = 'menu.html';
        });
    }
    
    // Menu page category filtering (only on menu.html)
    // Check if we're on the menu page by looking for menu-specific elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.menu-category-content');
    
    if (categoryBtns.length > 0 && categoryContents.length > 0) {
        console.log('Menu category filtering initialized:', categoryBtns.length, 'buttons,', categoryContents.length, 'content sections');
        
        // Initialize menu display based on active button
        function initializeMenuDisplay() {
            const activeButton = document.querySelector('.category-btn.active');
            console.log('Initializing menu display, active button:', activeButton);
            
            if (activeButton) {
                const category = activeButton.getAttribute('data-category');
                console.log('Active category:', category);
                
                if (category === 'all') {
                    categoryContents.forEach(c => c.classList.add('active'));
                    console.log('Showing all categories');
                } else {
                    categoryContents.forEach(c => c.classList.remove('active'));
                    const targetContent = document.getElementById(category);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        console.log('Showing category:', category);
                    }
                }
            } else {
                // Default to show all if no button is active
                categoryContents.forEach(c => c.classList.add('active'));
                console.log('No active button, showing all categories');
            }
        }
        
        // Initialize on page load - ensure DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMenuDisplay);
        } else {
            // If DOM is already loaded, initialize immediately
            setTimeout(initializeMenuDisplay, 100);
        }
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                console.log('Category button clicked:', category);
                
                // Remove active class from all buttons and contents
                categoryBtns.forEach(b => b.classList.remove('active'));
                categoryContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show selected category content
                if (category === 'all') {
                    categoryContents.forEach(c => c.classList.add('active'));
                    console.log('Showing all categories');
                } else {
                    const targetContent = document.getElementById(category);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        console.log('Showing category:', category);
                    } else {
                        console.log('Target content not found for category:', category);
                    }
                }
            });
        });
    }
});

// ===== CARD FADEOUT ON INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    // Add fadeout effect when cards are clicked or interacted with
    const cards = document.querySelectorAll('.menu-card, .testimonial-card, .gallery-item, .stat-item');
    
    cards.forEach(card => {
        // Add fadeout on click (optional effect)
        card.addEventListener('click', function() {
            this.classList.add('fadeout');
            setTimeout(() => {
                this.classList.remove('fadeout');
            }, 400);
        });
        
        // Add fadeout on hover out (optional effect)
        card.addEventListener('mouseleave', function() {
            if (!this.matches(':hover')) {
                this.classList.add('fadeout');
                setTimeout(() => {
                    this.classList.remove('fadeout');
                }, 200);
            }
        });
    });
});

// ===== IMAGE LAZY LOADING =====
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                
                // Add fade-in effect with Material Design 3 timing
                img.style.transition = `opacity ${MD3_MOTION.duration.medium2}ms ${MD3_MOTION.easing.standard}`;
                img.style.opacity = '1';
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
});

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.transition = `all ${MD3_MOTION.duration.medium2}ms ${MD3_MOTION.easing.standard}`;
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.transition = `all ${MD3_MOTION.duration.medium2}ms ${MD3_MOTION.easing.standard}`;
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }
});

// Add click functionality to scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===== ENHANCED CARD INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.menu-card, .testimonial-card, .gallery-item, .stat-item');
    
    cards.forEach(card => {
        // Add Material Design 3 state layer effects
        card.addEventListener('mouseenter', function() {
            this.style.transition = `all ${MD3_MOTION.duration.short3}ms ${MD3_MOTION.easing.standard}`;
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = `all ${MD3_MOTION.duration.short3}ms ${MD3_MOTION.easing.standard}`;
            this.style.transform = 'translateY(0)';
        });
        
        // Add touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transition = `all ${MD3_MOTION.duration.short1}ms ${MD3_MOTION.easing.standard}`;
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transition = `all ${MD3_MOTION.duration.short2}ms ${MD3_MOTION.easing.standard}`;
            this.style.transform = 'scale(1)';
        });
    });
});
