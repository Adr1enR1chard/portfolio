// Project Detail Page JavaScript

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load and display project details
async function loadProjectDetail() {
    const contentContainer = document.getElementById('project-content');

    if (!projectId) {
        contentContainer.innerHTML = `
            <div class="project-detail-header">
                <h1>Project Not Found</h1>
                <p>The requested project could not be found.</p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        const project = data.projects.find(p => p.id === projectId);

        if (!project) {
            contentContainer.innerHTML = `
                <div class="project-detail-header">
                    <h1>Project Not Found</h1>
                    <p>The requested project could not be found.</p>
                </div>
            `;
            return;
        }

        // Build project detail HTML
        let mediaHtml = '';
        if (project.media && project.media.length > 0) {
            mediaHtml = `
                <div class="project-media-carousel">
                    <div class="carousel-container">
                        <div class="carousel-slides">
                            ${project.media.map((item, index) => {
                let content = '';
                if (item.type === 'image') {
                    content = `<img src="${item.url}" alt="${item.caption || project.title}">`;
                } else if (item.type === 'video') {
                    content = `
                                        <video controls>
                                            <source src="${item.url}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    `;
                } else if (item.type === 'youtube') {
                    content = `
                                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                                            <iframe 
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;"
                                                src="https://www.youtube.com/embed/${item.videoId}" 
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
                                        </div>
                                    `;
                }
                return `
                                    <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                                        ${content}
                                        ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ''}
                                    </div>
                                `;
            }).join('')}
                        </div>
                        ${project.media.length > 1 ? `
                            <button class="carousel-btn carousel-prev" onclick="changeSlide(-1)">❮</button>
                            <button class="carousel-btn carousel-next" onclick="changeSlide(1)">❯</button>
                            <div class="carousel-indicators">
                                ${project.media.map((_, index) => `
                                    <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        let linksHtml = '';
        if (project.links && project.links.length > 0) {
            linksHtml = `
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" target="_blank" class="btn btn-primary">
                            ${link.label}
                        </a>
                    `).join('')}
                </div>
            `;
        }

        contentContainer.innerHTML = `
            <div class="project-section">
                <div class="project-header-container">
                    <div class="project-header-left">
                        <h1 class="project-detail-title">${project.title}</h1>
                        <div class="project-detail-meta">
                            ${project.year ? `<span> ${project.year}</span>` : ''}
                            ${project.platform ? `<span> ${project.platform}</span>` : ''}
                            ${project.role ? `<span> ${project.role}</span>` : ''}
                            ${project.teamSize ? `<span> ${project.teamSize}</span>` : ''}
                        </div>
                        <h4>Technologies Used</h4>
                        <div class="skill-list">
                                ${project.technologies.map(tech => `
                                    <span class="skill-tag">${tech}</span>
                                `).join('')}
                        </div>
                    </div>
                    ${linksHtml}
                </div>
            </div>


            <div class="project-detail-description">
                <p>${project.fullDescription || project.shortDescription}</p>
            </div>

            ${mediaHtml}

            <div id="detailed-discussion-container"></div>

            ${project.features ? `
                <div class="project-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

        `;

        // Load detailed discussion from external HTML file
        loadDetailedDiscussion(project.id);

    } catch (error) {
        console.error('Error loading project:', error);
        contentContainer.innerHTML = `
            <div class="project-detail-header">
                <h1>Error Loading Project</h1>
                <p>There was an error loading the project details. Please try again later.</p>
            </div>
        `;
    }
}

// Load detailed discussion from external HTML file
async function loadDetailedDiscussion(projectId) {
    try {
        const response = await fetch(`data/discussions/${projectId}.html`);
        if (response.ok) {
            const discussionHtml = await response.text();
            const container = document.getElementById('detailed-discussion-container');
            if (container && discussionHtml.trim()) {
                container.innerHTML = `
                    <div class="project-section">
                        <div class="detailed-discussion">
                            ${discussionHtml}
                        </div>
                    </div>
                `;

                // Apply syntax highlighting to code blocks in the loaded content
                if (typeof Prism !== 'undefined') {
                    // Highlight only the newly loaded content
                    container.querySelectorAll('pre code').forEach((block) => {
                        Prism.highlightElement(block);
                    });
                }
            }
        }
    } catch (error) {
        // Silently fail if discussion file doesn't exist
        console.log(`No detailed discussion found for ${projectId}`);
    }
}

// Mobile Navigation Toggle (same as main.js)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Carousel functionality
let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Initialize touch support for mobile swipe
function initCarouselTouchSupport() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            changeSlide(1); // Swipe left - next slide
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Lightbox functionality for full-size image viewing
let lightboxImages = [];
let currentLightboxIndex = 0;

function createLightbox() {
    // Create lightbox HTML if it doesn't exist
    if (document.querySelector('.lightbox')) return;

    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
                <button class="lightbox-prev" onclick="changeLightboxImage(-1)">&#10094;</button>
                <button class="lightbox-next" onclick="changeLightboxImage(1)">&#10095;</button>
                <img class="lightbox-image" id="lightbox-image" alt="Full size image">
                <div class="lightbox-caption" id="lightbox-caption" style="display: none;"></div>
                <div class="lightbox-counter" id="lightbox-counter"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

function initLightbox() {
    createLightbox();

    // Collect all clickable images from the project detail page
    const imageSelectors = [
        '.project-media img',
        '.carousel-slide img',
        '.detailed-discussion img',
        '.project-section img'
    ];

    lightboxImages = [];
    const allImages = document.querySelectorAll(imageSelectors.join(', '));

    allImages.forEach((img, index) => {
        // Skip very small images (likely icons)
        if (img.naturalWidth < 100 || img.naturalHeight < 100) return;

        lightboxImages.push({
            src: img.src,
            alt: img.alt,
            caption: img.title || img.alt || ''
        });

        img.addEventListener('click', () => {
            openLightbox(lightboxImages.length - 1); // Use the correct index
        });

        // Update the index after pushing
        img.dataset.lightboxIndex = lightboxImages.length - 1;
    });

    // Re-attach click handlers with correct indices
    allImages.forEach((img) => {
        if (img.dataset.lightboxIndex !== undefined) {
            img.onclick = null; // Remove previous handler
            img.addEventListener('click', () => {
                openLightbox(parseInt(img.dataset.lightboxIndex));
            });
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeLightboxImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeLightboxImage(1);
            }
        }
    });

    // Close lightbox when clicking outside the image
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Touch support for lightbox
    initLightboxTouchSupport();
}

function openLightbox(index) {
    if (lightboxImages.length === 0) return;

    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    lightboxImage.src = lightboxImages[currentLightboxIndex].src;
    lightboxImage.alt = lightboxImages[currentLightboxIndex].alt;

    // Show caption if available
    if (lightboxImages[currentLightboxIndex].caption) {
        lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
        lightboxCaption.style.display = 'block';
    } else {
        lightboxCaption.style.display = 'none';
    }

    // Update counter
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;

    // Show/hide navigation buttons
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (lightboxImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function changeLightboxImage(direction) {
    if (lightboxImages.length === 0) return;

    currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;

    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // Fade out
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = lightboxImages[currentLightboxIndex].src;
        lightboxImage.alt = lightboxImages[currentLightboxIndex].alt;

        if (lightboxImages[currentLightboxIndex].caption) {
            lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
            lightboxCaption.style.display = 'block';
        } else {
            lightboxCaption.style.display = 'none';
        }

        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;

        // Fade in
        lightboxImage.style.opacity = '1';
    }, 150);
}

function initLightboxTouchSupport() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleLightboxSwipe();
    }, { passive: true });

    function handleLightboxSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            changeLightboxImage(1); // Swipe left - next image
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            changeLightboxImage(-1); // Swipe right - previous image
        }
    }
}

// Load project when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetail().then(() => {
        currentSlide = 0; // Reset carousel position
        initCarouselTouchSupport(); // Initialize touch support

        // Initialize lightbox after content is loaded
        setTimeout(() => {
            initLightbox();
        }, 500); // Give time for images to load
    });
});
