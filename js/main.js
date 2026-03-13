// =====================================
//   LUXURY HOTEL - MAIN JAVASCRIPT
// =====================================

document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY NAVBAR ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- MOBILE HAMBURGER MENU ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- GALLERY LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img').src;
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // --- BOOKING MODAL ---
  const bookingModal = document.getElementById('booking-modal');
  const modalClose = document.querySelector('.modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal');

  if (bookingModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeModal = () => {
      bookingModal.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (modalClose) modalClose.addEventListener('click', closeModal);
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // --- HERO BOOKING WIDGET ---
  const heroBookingForm = document.getElementById('hero-booking-form');
  if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkin = heroBookingForm.querySelector('[name="checkin"]').value;
      const checkout = heroBookingForm.querySelector('[name="checkout"]').value;
      const guests = heroBookingForm.querySelector('[name="guests"]').value;
      if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates.');
        return;
      }
      if (bookingModal) {
        bookingModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        const checkinModal = bookingModal.querySelector('[name="modal-checkin"]');
        const checkoutModal = bookingModal.querySelector('[name="modal-checkout"]');
        const guestsModal = bookingModal.querySelector('[name="modal-guests"]');
        if (checkinModal) checkinModal.value = checkin;
        if (checkoutModal) checkoutModal.value = checkout;
        if (guestsModal) guestsModal.value = guests;
      }
    });
  }

  // --- CONTACT FORM SUBMIT (WHATSAPP REDIRECT) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const subject = formData.get('subject') || 'General Inquiry';
      const messageBody = formData.get('message') || '';

      // Format Message
      const fullMessage = `*New Contact Inquiry - Hotel Sunrise*%0A%0A` +
                          `*Name:* ${name}%0A` +
                          `*Email:* ${email}%0A` +
                          `*Phone:* ${phone}%0A` +
                          `*Subject:* ${subject}%0A%0A` +
                          `*Message:* ${messageBody}`;

      // WhatsApp URL
      const whatsappURL = `https://wa.me/919078706996?text=${fullMessage}`;

      // Visual feedback
      const btn = contactForm.querySelector('.submit-btn');
      if (btn) {
        btn.textContent = 'Opening WhatsApp... ✓';
        btn.style.background = '#27ae60';
      }

      // Redirect after a short delay
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        if (btn) {
          btn.textContent = 'Send Message';
          btn.style.background = '';
        }
        contactForm.reset();
      }, 1500);
    });
  }

  // --- BOOKING FORM SUBMIT (WHATSAPP REDIRECT) ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect values
      const name = bookingForm.querySelector('[name*="name"]').value;
      const phone = bookingForm.querySelector('[name*="phone"]').value;
      const checkin = bookingForm.querySelector('[name*="checkin"]')?.value || 'Not specified';
      const checkout = bookingForm.querySelector('[name*="checkout"]')?.value || 'Not specified';
      const room = bookingForm.querySelector('[name*="room"]')?.value || 'Standard';

      // Format Message
      const message = `*Room Booking Request - Hotel Sunrise*%0A%0A` +
                      `*Name:* ${name}%0A` +
                      `*Phone:* ${phone}%0A` +
                      `*Check-in:* ${checkin}%0A` +
                      `*Check-out:* ${checkout}%0A` +
                      `*Room Type:* ${room}`;

      // WhatsApp URL
      const whatsappURL = `https://wa.me/919078706996?text=${message}`;

      // Visual feedback
      const btn = bookingForm.querySelector('.submit-btn');
      if (btn) {
        btn.textContent = 'Opening WhatsApp... ✓';
        btn.style.background = '#27ae60';
      }

      // Redirect after a short delay
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        if (bookingModal) {
          bookingModal.classList.remove('open');
          document.body.style.overflow = '';
        }
        if (btn) {
          btn.textContent = 'Confirm Booking';
          btn.style.background = '';
        }
      }, 1500);
    });
  }

  // --- ACTIVE NAV LINK ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
    if (currentPage === '' && link.getAttribute('href') === 'index.html') link.classList.add('active');
  });

  // --- MIN DATE FOR DATE INPUTS ---
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
  });

  // --- STAGGERED CARD DELAYS ---
  document.querySelectorAll('.rooms-grid .room-card, .services-grid .amenity-card, .testimonials-grid .testimonial-card, .attractions-grid .attraction-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

});
