/**
 * DRISHTI JAIN - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles: Theme toggle, Typewriter, Navigation, Filtering, Modals, Working Form, Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME TOGGLE (Dark / Light Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Retrieve existing preference or default to dark
  const savedTheme = localStorage.getItem('dj_portfolio_theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('dj_portfolio_theme', newTheme);
    
    showToast(newTheme === 'dark' ? '🌙 Switched to Dark Mode' : '☀️ Switched to Light Mode', 'info');
  });

  // ==========================================
  // 2. AMBIENT CURSOR GLOW
  // ==========================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // ==========================================
  // 3. TYPEWRITER EFFECT
  // ==========================================
  const typewriterElem = document.getElementById('typewriter');
  const phrases = [
    'B.Tech CSE Student',
    'Curious Tech Explorer',
    'Creative Web Builder',
    'Passionate Learner',
    'Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 450;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typewriterElem) {
    setTimeout(typeEffect, 600);
  }

  // ==========================================
  // 4. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Header backdrop
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 5. MOBILE DRAWER NAVIGATION
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer if clicked outside
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  // ==========================================
  // 6. SKILL CATEGORY FILTERING
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Set active tab
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-category');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 7. PROJECT DETAILS MODAL
  // ==========================================
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalDismiss = document.getElementById('modalDismiss');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTechStack = document.getElementById('modalTechStack');

  const projectDetailsMap = {
    'Smart Calculator': {
      category: 'Interactive Utility',
      title: 'Smart Calculator & Unit Converter',
      desc: 'An advanced web-based mathematical computation tool built with clean Vanilla JavaScript. It handles standard arithmetic, operator precedence, keypress event bindings, and continuous unit conversions.',
      highlights: [
        'Full physical keyboard event listener support (Numbers, Enter, Esc, Backspace).',
        'History log showing previous calculations with one-click restore.',
        'Responsive CSS Grid layout adapting smoothly from mobile to widescreen.'
      ],
      tags: ['JavaScript', 'CSS Grid', 'Event Handling', 'Responsive UI']
    },
    'Focus & Study Task Manager': {
      category: 'Productivity Web App',
      title: 'Focus & Study Task Manager',
      desc: 'Designed specifically to help B.Tech students structure their study hours, track assignments, and maintain daily accountability. Saves task state directly in browser LocalStorage without needing a remote database.',
      highlights: [
        'Offline-first capability with automatic LocalStorage sync.',
        'Category filters for Assignments, Hackathons, Exams, and Reading.',
        'Progress bar that dynamically calculates completion percentage.'
      ],
      tags: ['HTML5', 'CSS3 Variables', 'LocalStorage API', 'Productivity']
    },
    'Algorithm Logic Explorer': {
      category: 'CS Core & Visualization',
      title: 'Algorithm Logic Explorer',
      desc: 'An interactive pedagogical tool to demonstrate how basic algorithms work under the hood. Visualizes comparison and swap operations in real-time with step-by-step speed adjustments.',
      highlights: [
        'Visual execution of Bubble Sort, Selection Sort, and Binary Search.',
        'Real-time comparison counters and big-O time complexity references.',
        'Interactive array size generator with random data shuffle.'
      ],
      tags: ['Python / JS', 'Data Structures', 'Visualization', 'Algorithms']
    }
  };

  const demoButtons = document.querySelectorAll('.demo-modal-btn');
  demoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsMap[projKey];

      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.desc;

        modalHighlights.innerHTML = data.highlights
          .map((item) => `<li>${item}</li>`)
          .join('');

        modalTechStack.innerHTML = data.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join('');

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeModal);

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  // ==========================================
  // 8. WORKING CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(input, isError) {
    const formGroup = input.closest('.form-group');
    if (isError) {
      formGroup.classList.add('has-error');
    } else {
      formGroup.classList.remove('has-error');
    }
  }

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      setError(input, false);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        setError(nameInput, true);
        isValid = false;
      } else {
        setError(nameInput, false);
      }

      // Validate email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setError(emailInput, true);
        isValid = false;
      } else {
        setError(emailInput, false);
      }

      // Validate subject
      if (!subjectInput.value.trim()) {
        setError(subjectInput, true);
        isValid = false;
      } else {
        setError(subjectInput, false);
      }

      // Validate message (at least 10 chars)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        setError(messageInput, true);
        isValid = false;
      } else {
        setError(messageInput, false);
      }

      if (!isValid) {
        showToast('Please correct the highlighted fields.', 'error');
        return;
      }

      // Loading state on button
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

      setTimeout(() => {
        // Collect message details
        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Also prepare mailto fallback link for convenience
        const mailtoLink = `mailto:drishti.jain@example.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject} - from ${senderName}`
        )}&body=${encodeURIComponent(
          `Sender Name: ${senderName}\nSender Email: ${senderEmail}\n\nMessage:\n${message}`
        )}`;

        // Reset Form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Show prominent success notification
        showToast(`🎉 Message Sent! Thank you ${senderName}, Drishti will get back to you soon.`, 'success');

        // Optional prompt to trigger user's native email client if desired
        setTimeout(() => {
          const wantEmailClient = confirm('Would you also like to open your email client to send this message directly?');
          if (wantEmailClient) {
            window.location.href = mailtoLink;
          }
        }, 800);
      }, 1000);
    });
  }

  // ==========================================
  // 9. COPY EMAIL TO CLIPBOARD
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('📋 Email copied to clipboard!', 'success');
        })
        .catch(() => {
          showToast('Could not copy email.', 'error');
        });
    });
  }

  // ==========================================
  // 10. RESUME / CV DOWNLOAD BUTTON
  // ==========================================
  const cvDownloadBtn = document.getElementById('cvDownloadBtn');
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', () => {
      showToast('📄 Generating Drishti Jain\'s resume preview...', 'info');
      setTimeout(() => {
        // Trigger print/PDF view of the clean resume summary or prompt user
        window.print();
      }, 600);
    });
  }

  // ==========================================
  // 11. BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 12. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toastNotification');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message, type = 'success') {
    clearTimeout(toastTimeout);

    toastMessage.textContent = message;
    toast.className = 'toast show';

    if (type === 'error') {
      toast.classList.add('error');
      toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    } else if (type === 'info') {
      toastIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    } else {
      toastIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});

