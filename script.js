// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Menu Toggle Functionality
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }
  
  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Enhanced Background Animation
  function createDynamicParticles() {
    const animatedBg = document.querySelector('.animated-bg');
    
    if (!animatedBg) return;
    
    // Create additional particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle dynamic-particle';
      
      // Random positioning and size
      const size = Math.random() * 5 + 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation duration
      const duration = Math.random() * 20 + 10;
      particle.style.animation = `particle ${duration}s linear infinite`;
      
      // Add to background
      animatedBg.appendChild(particle);
    }
  }
  
  // Initialize dynamic particles
  createDynamicParticles();
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const shapes = document.querySelectorAll('.floating-shape');
  
  if (hero && shapes.length) {
    window.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 20;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }
  
  // Animate stats counters when in view
  const stats = document.querySelectorAll('.stat-item h3');
  
  if (stats.length) {
    const animateStats = function() {
      const statsSection = document.querySelector('.stats-banner');
      if (!statsSection) return;
      
      const sectionTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 100) {
        stats.forEach(stat => {
          if (stat.dataset.animated) return;
          
          const target = parseInt(stat.textContent);
          let current = 0;
          const increment = Math.ceil(target / 100);
          const duration = 2000; // 2 seconds
          const interval = Math.floor(duration / (target / increment));
          
          stat.dataset.animated = true;
          
          const counter = setInterval(() => {
            current += increment;
            
            if (current >= target) {
              stat.textContent = target + '+';
              clearInterval(counter);
            } else {
              stat.textContent = current + '+';
            }
          }, interval);
        });
        
        window.removeEventListener('scroll', animateStats);
      }
    };
    
    window.addEventListener('scroll', animateStats);
    // Initial check
    animateStats();
  }

  // Tab functionality for Academics section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Add click event to each tab button
  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Get the tab ID from data attribute
          const tabId = button.getAttribute('data-tab');
          
          // Remove active class from all buttons and contents
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          button.classList.add('active');
          document.getElementById(`${tabId}-tab`).classList.add('active');
      });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Existing code...
  
  // Enhanced gallery item interactions
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length) {
    galleryItems.forEach(item => {
      // Add subtle animation when mouse enters/leaves
      item.addEventListener('mouseenter', function() {
        this.style.zIndex = "5";
      });
      
      item.addEventListener('mouseleave', function() {
        setTimeout(() => {
          this.style.zIndex = "1";
        }, 300);
      });
    });
  }
  
});

// Image Viewer Functionality
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.sports-gallery-grid .gallery-item');
  const imageViewer = document.getElementById('imageViewer');
  const expandedImg = document.getElementById('expandedImg');
  const imgCaption = document.getElementById('imgCaption');
  const closeBtn = document.querySelector('.close-viewer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentIndex = 0;
  const totalImages = galleryItems.length;
  
  // Gallery images data
  const galleryData = [
    { 
      src: 'assets/sportchair.jpg', 
    
    },
    { 
      src: 'assets/sport2.jpg', 
     
    },
    { 
      src: 'assets/sport.jpg', 
      
    }
  ];

  // Click event for gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      openImageViewer(index);
    });
    
    // Add fancy entrance animation with random delay
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 + index * 150);
  });
  
  // Open image viewer
  function openImageViewer(index) {
    expandedImg.src = galleryData[index].src;
    imgCaption.textContent = galleryData[index].caption;
    imageViewer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add animation classes
    setTimeout(() => {
      expandedImg.classList.add('active');
    }, 100);
  }
  
  // Close image viewer
  function closeImageViewer() {
    imageViewer.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
    
    // Give time for the fade-out animation
    setTimeout(() => {
      if (!imageViewer.classList.contains('active')) {
        imageViewer.style.display = 'none';
      }
    }, 300);
  }
  
  // Navigation functions
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    expandedImg.classList.remove('active');
    
    setTimeout(() => {
      expandedImg.src = galleryData[currentIndex].src;
      imgCaption.textContent = galleryData[currentIndex].caption;
      expandedImg.classList.add('active');
    }, 200);
  }
  
  function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    expandedImg.classList.remove('active');
    
    setTimeout(() => {
      expandedImg.src = galleryData[currentIndex].src;
      imgCaption.textContent = galleryData[currentIndex].caption;
      expandedImg.classList.add('active');
    }, 200);
  }
  
  // Event listeners for controls
  closeBtn.addEventListener('click', closeImageViewer);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Close when clicking outside the image
  imageViewer.addEventListener('click', function(e) {
    if (e.target === imageViewer) {
      closeImageViewer();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!imageViewer.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeImageViewer();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });
  
  // Additional hover effects for gallery items
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const otherItems = [...galleryItems].filter(i => i !== item);
      otherItems.forEach(other => {
        other.style.opacity = '0.7';
        other.style.transform = 'scale(0.95)';
      });
    });
    
    item.addEventListener('mouseleave', function() {
      galleryItems.forEach(other => {
        other.style.opacity = '1';
        other.style.transform = 'scale(1)';
      });
    });
  });
  
  // Initialize with all items initially hidden
  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('show');
    });
  }
  
  // Academic Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to current button and content
      this.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Sports Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.sports-gallery-grid .gallery-item');
  const imageViewer = document.getElementById('imageViewer');
  const mediaContainer = document.querySelector('.media-container');
  const imgCaption = document.getElementById('imgCaption');
  const closeViewer = document.querySelector('.close-viewer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentIndex = 0;
  const galleryData = [];
  
  // Collect data from all gallery items
  galleryItems.forEach((item, index) => {
    const isVideo = item.classList.contains('video-item');
    
    if (isVideo) {
      const video = item.querySelector('video');
      const videoSrc = video.querySelector('source').getAttribute('src');
      const caption = item.querySelector('.gallery-caption span')?.textContent || '';
      
      galleryData.push({
        type: 'video',
        src: videoSrc,
        caption: caption
      });
    } else {
      const img = item.querySelector('img');
      const imgSrc = img.getAttribute('src');
      const caption = item.querySelector('.gallery-caption span')?.textContent || '';
      
      galleryData.push({
        type: 'image',
        src: imgSrc,
        caption: caption
      });
    }
    
    // Add click event listener to each gallery item
    item.addEventListener('click', function() {
      openImageViewer(index);
    });
  });
  
  // Open image viewer function
  function openImageViewer(index) {
    currentIndex = index;
    const item = galleryData[currentIndex];
    
    // Clear previous content
    mediaContainer.innerHTML = '';
    
    // Create appropriate media element
    if (item.type === 'video') {
      const videoElement = document.createElement('video');
      videoElement.controls = true;
      videoElement.autoplay = false;
      
      const source = document.createElement('source');
      source.src = item.src;
      source.type = 'video/mp4';
      
      videoElement.appendChild(source);
      mediaContainer.appendChild(videoElement);
    } else {
      const imgElement = document.createElement('img');
      imgElement.src = item.src;
      imgElement.alt = 'Sports activity';
      mediaContainer.appendChild(imgElement);
    }
    
    // Set caption
    imgCaption.textContent = item.caption;
    
    // Show viewer
    imageViewer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Update navigation buttons
    updateNavButtons();
  }
  
  // Update navigation buttons visibility
  function updateNavButtons() {
    prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentIndex < galleryData.length - 1 ? 'block' : 'none';
  }
  
  // Close image viewer
  function closeImageViewer() {
    imageViewer.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling again
    
    // If there's a video playing, pause it
    const videoElement = mediaContainer.querySelector('video');
    if (videoElement) {
      videoElement.pause();
    }
  }
  
  // Navigation functions
  function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      openImageViewer(currentIndex);
    }
  }
  
  function showNextImage() {
    if (currentIndex < galleryData.length - 1) {
      currentIndex++;
      openImageViewer(currentIndex);
    }
  }
  
  // Event listeners for controls
  closeViewer.addEventListener('click', closeImageViewer);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Close when clicking outside the content
  imageViewer.addEventListener('click', function(e) {
    if (e.target === imageViewer) {
      closeImageViewer();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!imageViewer.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeImageViewer();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });
  
  // Add hover effects for gallery items
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
      this.style.zIndex = '5';
      
      const caption = this.querySelector('.gallery-caption');
      if (caption) {
        caption.style.opacity = '1';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.zIndex = '1';
      
      const caption = this.querySelector('.gallery-caption');
      if (caption) {
        caption.style.opacity = '0';
      }
    });
  });
});
  // Form submission with validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Basic validation
      const formFields = this.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          field.style.borderColor = 'red';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Form is valid - would normally submit to server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop;
        
        window.scrollTo({
          top: offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
        }
      }
    });
  });
});

// Hostel Image Viewer Functionality
let currentHostelImageIndex = 1;
const hostelImages = [
  { src: "assets/h4.jpeg", caption: "Hostel Building" },
  { src: "assets/h2.jpeg", caption: "Hostel Rooms" },
  { src: "assets/h3.jpeg", caption: "Hostel Beds" },
  { src: "assets/h1.jpeg", caption: "Hostel Dinning Area" }
];

function openHostelViewer(index) {
  currentHostelImageIndex = index;
  const viewer = document.getElementById('hostelViewer');
  const img = document.getElementById('hostelExpandedImg');
  const caption = document.getElementById('hostelImgCaption');
  
  img.src = hostelImages[index-1].src;
  caption.innerHTML = hostelImages[index-1].caption;
  viewer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeHostelViewer() {
  document.getElementById('hostelViewer').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeHostelImage(n) {
  currentHostelImageIndex += n;
  if (currentHostelImageIndex > hostelImages.length) {
    currentHostelImageIndex = 1;
  } else if (currentHostelImageIndex < 1) {
    currentHostelImageIndex = hostelImages.length;
  }
  openHostelViewer(currentHostelImageIndex);
}

// Close viewer when clicking outside the image
document.getElementById('hostelViewer').addEventListener('click', function(e) {
  if (e.target === this) {
    closeHostelViewer();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const imageViewer = document.querySelector('.image-viewer');
  const mediaContainer = document.querySelector('.media-container');
  const imageCaption = document.querySelector('.image-caption');
  const closeViewer = document.querySelector('.close-viewer');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const galleryData = [];
  
  // Collect data from all gallery items
  galleryItems.forEach(item => {
    const index = parseInt(item.dataset.index);
    const isVideo = item.classList.contains('video-item');
    const src = isVideo 
      ? item.querySelector('video source').getAttribute('src')
      : item.querySelector('img').getAttribute('src');
    const caption = item.querySelector('.gallery-caption span')?.textContent || '';
    const alt = isVideo ? 'Video content' : item.querySelector('img').getAttribute('alt');
    
    galleryData.push({ index, src, caption, alt, isVideo });
    
    // Add click event to each gallery item
    item.addEventListener('click', function() {
      openViewer(index);
    });
  });
  
  // Open the viewer with the clicked item
  function openViewer(index) {
    currentIndex = galleryData.findIndex(item => item.index === index);
    updateMedia();
    imageViewer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }
  
  // Update the media content in the viewer
  function updateMedia() {
    const item = galleryData[currentIndex];
    
    mediaContainer.innerHTML = '';
    
    if (item.isVideo) {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = false;
      
      const source = document.createElement('source');
      source.src = item.src;
      source.type = 'video/mp4';
      
      video.appendChild(source);
      mediaContainer.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      mediaContainer.appendChild(img);
    }
    
    imageCaption.textContent = item.caption;
    
    // Update navigation buttons visibility
    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentIndex < galleryData.length - 1 ? 'flex' : 'none';
  }
  
  // Close the viewer
  function closeViewerFunc() {
    imageViewer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // If there's a video playing, pause it when closing
    const video = mediaContainer.querySelector('video');
    if (video) {
      video.pause();
    }
  }
  
  // Navigation functions
  function showPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
      updateMedia();
    }
  }
  
  function showNext() {
    if (currentIndex < galleryData.length - 1) {
      currentIndex++;
      updateMedia();
    }
  }
  
  // Event listeners for viewer controls
  closeViewer.addEventListener('click', closeViewerFunc);
  prevBtn.addEventListener('click', showPrevious);
  nextBtn.addEventListener('click', showNext);
  
  // Close on click outside the content
  imageViewer.addEventListener('click', function(e) {
    if (e.target === imageViewer) {
      closeViewerFunc();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!imageViewer.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeViewerFunc();
    } else if (e.key === 'ArrowLeft') {
      showPrevious();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
});

// Kids Carousel JavaScript Function
document.addEventListener('DOMContentLoaded', function() {
  // Kids section carousel functionality
  const kidsCarousel = document.querySelector('.kids-carousel');
  const kidsSlides = document.querySelectorAll('.kids-carousel-slide');
  const kidsDots = document.querySelector('.carousel-dots');
  
  if (kidsCarousel && kidsSlides.length) {
    let currentSlide = 0;
    const slideInterval = 50000; // 10 seconds
    let slideTimer;
    
    // Create dot indicators
    if (kidsDots) {
      kidsSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          goToSlide(index);
          resetTimer();
        });
        
        kidsDots.appendChild(dot);
      });
    }
    
    // Show specific slide
    function showSlide(index) {
      // Hide all slides
      kidsSlides.forEach(slide => {
        slide.style.opacity = 0;
        slide.style.zIndex = 0;
      });
      
      // Show current slide
      kidsSlides[index].style.opacity = 1;
      kidsSlides[index].style.zIndex = 1;
      
      // Update dots
      if (kidsDots) {
        const dots = kidsDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }
    
    // Go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % kidsSlides.length;
      showSlide(currentSlide);
    }
    
    // Start timer for automatic sliding
    function startTimer() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Reset timer
    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }
    
    // Initialize
    showSlide(currentSlide);
    startTimer();
    
    // Add swipe detection for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    kidsCarousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    kidsCarousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
        resetTimer();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        currentSlide = (currentSlide - 1 + kidsSlides.length) % kidsSlides.length;
        showSlide(currentSlide);
        resetTimer();
      }
    }
    
    // Pause on hover
    kidsCarousel.addEventListener('mouseenter', () => {
      clearInterval(slideTimer);
    });
    
    kidsCarousel.addEventListener('mouseleave', () => {
      startTimer();
    });
    
    // Arrow navigation
    const prevArrow = kidsCarousel.querySelector('.carousel-prev');
    const nextArrow = kidsCarousel.querySelector('.carousel-next');
    
    if (prevArrow) {
      prevArrow.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + kidsSlides.length) % kidsSlides.length;
        showSlide(currentSlide);
        resetTimer();
      });
    }
    
    if (nextArrow) {
      nextArrow.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }
  }
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = this;
  const formData = new FormData(form);
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Show success message
          document.getElementById('successMessage').style.display = 'block';
          form.reset();
      } else {
          alert('There was an error sending your message. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
  })
  .finally(() => {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
  });
});