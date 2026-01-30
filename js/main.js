// Main JavaScript for Portfolio

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load Professional Experience
async function loadProfessionalExperience() {
    try {
        const response = await fetch('data/experiences.json');
        const data = await response.json();
        const container = document.getElementById('professional-experience');

        if (data.professional && data.professional.length > 0) {
            container.innerHTML = data.professional.map(exp => `
                <div class="timeline-item">
                    <div class="timeline-header">
                        <h3 class="timeline-title">${exp.title}</h3>
                        <span class="timeline-date">${exp.startDate} - ${exp.endDate}</span>
                    </div>
                    <p class="timeline-company">${exp.company}</p>
                    <p class="timeline-description">${exp.description}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No professional experience added yet.</p>';
        }
    } catch (error) {
        console.error('Error loading professional experience:', error);
        document.getElementById('professional-experience').innerHTML =
            '<p>Error loading professional experience.</p>';
    }
}

// Load Academic Experience
async function loadAcademicExperience() {
    try {
        const response = await fetch('data/experiences.json');
        const data = await response.json();
        const container = document.getElementById('academic-experience');

        if (data.academic && data.academic.length > 0) {
            container.innerHTML = data.academic.map(exp => `
                <div class="timeline-item">
                    <div class="timeline-header">
                        <h3 class="timeline-title">${exp.degree}</h3>
                        <span class="timeline-date">${exp.startDate} - ${exp.endDate}</span>
                    </div>
                    <p class="timeline-company">${exp.institution}</p>
                    <p class="timeline-description">${exp.description}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No academic experience added yet.</p>';
        }
    } catch (error) {
        console.error('Error loading academic experience:', error);
        document.getElementById('academic-experience').innerHTML =
            '<p>Error loading academic experience.</p>';
    }
}

// Load Skills
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();
        const container = document.getElementById('skills-container');

        if (data.categories && data.categories.length > 0) {
            container.innerHTML = data.categories.map(category => `
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        ${category.icon ? category.icon : '🔧'}
                        ${category.name}
                    </h3>
                    <div class="skill-list">
                        ${category.skills.map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No skills added yet.</p>';
        }
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skills-container').innerHTML =
            '<p>Error loading skills.</p>';
    }
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        const container = document.getElementById('projects-container');

        if (data.projects && data.projects.length > 0) {
            // Sort projects by year (newest first)
            const sortedProjects = data.projects.sort((a, b) => {
                const yearA = parseInt(a.year) || 0;
                const yearB = parseInt(b.year) || 0;
                return yearB - yearA;
            });

            // Group projects by year
            const projectsByYear = sortedProjects.reduce((acc, project) => {
                const year = project.year || 'N/A';
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(project);
                return acc;
            }, {});

            // Generate HTML for each year group (sorted newest to oldest)
            const sortedYears = Object.entries(projectsByYear).sort(([yearA], [yearB]) => {
                const numYearA = parseInt(yearA) || 0;
                const numYearB = parseInt(yearB) || 0;
                return numYearB - numYearA;
            });

            container.innerHTML = sortedYears.map(([year, projects]) => `
                <div class="project-timeline-item">
                    <div class="project-year">${year}</div>
                    <div class="project-year-group">
                        ${projects.map(project => `
                            <a href="project.html?id=${project.id}" class="project-card">
                                <img src="${project.thumbnail}" alt="${project.title}" class="project-image" 
                                     onerror="this.style.display='none'">
                                <div class="project-content">
                                    <h3 class="project-title">${project.title}</h3>
                                    <p class="project-description">${project.shortDescription}</p>
                                    <div class="project-tags">
                                        ${project.tags.map(tag => `
                                            <span class="project-tag">${tag}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No projects added yet.</p>';
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML =
            '<p>Error loading projects.</p>';
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Load all dynamic content
    loadProfessionalExperience();
    loadAcademicExperience();
    loadSkills();
    loadProjects();
});
