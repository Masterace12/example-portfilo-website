const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const aboutMe = document.querySelector('#about p');
const editAboutButton = document.getElementById('edit-about');
const skillsGrid = document.querySelector('.skills-grid');
const addSkillForm = document.getElementById('add-skill-form');
const projectGrid = document.querySelector('.project-grid');
const addProjectForm = document.getElementById('add-project-form');

// Load from local storage
if (localStorage.getItem('theme')) {
    body.classList.add(localStorage.getItem('theme'));
}

if (localStorage.getItem('aboutMe')) {
    aboutMe.innerHTML = localStorage.getItem('aboutMe');
}

if (localStorage.getItem('skills')) {
    skillsGrid.innerHTML = localStorage.getItem('skills');
}

if (localStorage.getItem('projects')) {
    projectGrid.innerHTML = localStorage.getItem('projects');
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
});

// Edit about me
editAboutButton.addEventListener('click', () => {
    if (aboutMe.contentEditable === 'true') {
        aboutMe.contentEditable = 'false';
        editAboutButton.textContent = 'Edit';
        localStorage.setItem('aboutMe', aboutMe.innerHTML);
    } else {
        aboutMe.contentEditable = 'true';
        editAboutButton.textContent = 'Save';
        aboutMe.focus();
    }
});

// Add skill
addSkillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const skillName = document.getElementById('skill-name').value;

    const skillCard = document.createElement('div');
    skillCard.classList.add('skill-card');
    skillCard.innerHTML = `
        <span>${skillName}</span><button class="remove-skill">x</button>
    `;

    skillsGrid.appendChild(skillCard);
    localStorage.setItem('skills', skillsGrid.innerHTML);

    addSkillForm.reset();
});

// Remove skill
skillsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-skill')) {
        e.target.parentElement.remove();
        localStorage.setItem('skills', skillsGrid.innerHTML);
    }
});

// Add project
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const technologies = document.getElementById('project-technologies').value;
    const link = document.getElementById('project-link').value;
    const image = document.getElementById('project-image').value;

    const techTags = technologies.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('');

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.innerHTML = `
        <img src="${image}" alt="Project Image">
        <div class="project-card-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="technologies">${techTags}</div>
            <a href="${link}" target="_blank">View Project</a>
            <button class="remove-project">Remove</button>
        </div>
    `;

    projectGrid.appendChild(projectCard);
    localStorage.setItem('projects', projectGrid.innerHTML);

    addProjectForm.reset();
});

// Remove project
projectGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-project')) {
        e.target.parentElement.remove();
        localStorage.setItem('projects', projectGrid.innerHTML);
    }
});

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});
