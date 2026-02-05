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
            <div class="project-detail-header">
                <div class="project-header-content">
                    <div class="project-header-left">
                        <h1 class="project-detail-title">${project.title}</h1>
                        <div class="project-detail-meta">
                            ${project.year ? `<span>📅 ${project.year}</span>` : ''}
                            ${project.platform ? `<span>💻 ${project.platform}</span>` : ''}
                            ${project.role ? `<span>👤 ${project.role}</span>` : ''}
                            ${project.teamSize ? `<span>👥 ${project.teamSize}</span>` : ''}
                        </div>
                    </div>
                    ${linksHtml}
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `
                        <span class="project-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>

            <div class="project-detail-description">
                <p>${project.fullDescription || project.shortDescription}</p>
            </div>

            ${mediaHtml}

            ${project.features ? `
                <div class="project-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            ${project.technologies ? `
                <div class="project-section">
                    <h3>Technologies Used</h3>
                    <div class="skill-list">
                        ${project.technologies.map(tech => `
                            <span class="skill-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${project.challenges ? `
                <div class="project-section">
                    <h3>Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                </div>
            ` : ''}
        `;

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

// Load project when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetail().then(() => {
        currentSlide = 0; // Reset carousel position
        initCarouselTouchSupport(); // Initialize touch support
    });
});
