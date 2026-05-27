/* script.js */

// Helper function to render sections
const renderPortfolio = () => {
    const data = window.portfolioData;
    if (!data) return;

    // 1. Profile / Hero
    document.getElementById('logo-text').textContent = data.profile.logoName;
    document.getElementById('hero-name').textContent = data.profile.name;
    document.getElementById('resume-link').href = data.profile.resumeLink;
    const avatarContainer = document.getElementById('avatar-root');
    if (data.profile.heroImg && data.profile.heroImg !== "") {
        avatarContainer.innerHTML = `<img src="${data.profile.heroImg}" alt="Profile" class="hero-avatar">`;
    } else {
        avatarContainer.innerHTML = `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${data.profile.avatarSeed}&backgroundColor=ef4444" alt="Avatar" class="hero-avatar">`;
    }

    // 2. About
    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('profile-img').src = data.profile.profileImg;
    const aboutList = document.getElementById('about-points');
    aboutList.innerHTML = data.about.points.map(point => `
        <li><i class="fas fa-circle accent-bullet"></i> ${point}</li>
    `).join('');

    // 3. Skills
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = data.skills.map(skill => `
        <div class="skill-item" title="${skill.name}">
            <i class="${skill.icon}"></i>
        </div>
    `).join('');

    // 4. Stats
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = data.codingStats.map(stat => `
        <div class="stat-card">
            <h3>${stat.platform}</h3>
            ${stat.rating ? `<p class="stat-value">Rating : ${stat.rating}</p>` : ''}
            <p class="stat-desc">${stat.details}</p>
            <a href="${stat.link}" class="btn btn-outline" target="_blank">View Profile</a>
        </div>
    `).join('');

    // 5. Projects
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = data.projects.map(project => `
        <div class="project-card">
            <div class="project-number">${project.id}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            ${project.link !== '#' ? `<a href="${project.link}" class="btn btn-outline" style="margin-top: 1.5rem" target="_blank">Learn More</a>` : ''}
        </div>
    `).join('');

    // 6. Certifications
    const certsGrid = document.getElementById('certs-grid');
    let certifications = JSON.parse(localStorage.getItem('portfolio_certifications'));
    if (!certifications) {
        certifications = data.certifications;
        localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
    }
    
    window.renderCertificationsList = () => {
        let certs = JSON.parse(localStorage.getItem('portfolio_certifications')) || data.certifications;
        certsGrid.innerHTML = certs.map(cert => {
            const hasValidLink = cert.link && cert.link !== '#';
            return `
                <div class="cert-card">
                    <div class="cert-header">
                        <i class="fas fa-certificate accent-text"></i>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.issuer}</p>
                    ${hasValidLink ? `
                        <a href="${cert.link}" class="view-cert" target="_blank">View Credential <i class="fas fa-external-link-alt"></i></a>
                    ` : `
                        <a href="javascript:void(0)" class="view-cert no-link" onclick="alert('No credential link provided for this certification.')">No Credential Link <i class="fas fa-link-slash"></i></a>
                    `}
                </div>
            `;
        }).join('');
    };
    window.renderCertificationsList();


    // 6b. Education Timeline
    const timelineGrid = document.getElementById('timeline-grid');
    if (timelineGrid && data.education) {
        timelineGrid.innerHTML = data.education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-dot"><i class="${edu.icon}"></i></div>
                <div class="timeline-card">
                    <h3>${edu.degree}</h3>
                    <span class="timeline-badge">${edu.period}</span>
                    <p class="timeline-institution">${edu.institution}</p>
                    <p class="timeline-score">${edu.score}</p>
                </div>
            </div>
        `).join('');
    }

    // 7. Contact
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
        <div class="contact-details-list">
            <div class="contact-detail-item">
                <i class="fas fa-envelope detail-icon"></i>
                <a href="mailto:${data.social.email}">${data.social.email}</a>
            </div>
            <div class="contact-detail-item">
                <i class="fas fa-phone detail-icon"></i>
                <span>${data.contact.phone}</span>
            </div>
            <div class="contact-detail-item">
                <i class="fas fa-map-marker-alt detail-icon"></i>
                <span>${data.contact.address}</span>
            </div>
        </div>
    `;

    // 8. Footer
    const footerContent = document.getElementById('footer-content');
    footerContent.innerHTML = `
        <div class="footer-social-wrapper">
            <div class="footer-social-links">
                <a href="${data.social.linkedin}" target="_blank" class="social-circle"><i class="fab fa-linkedin-in"></i></a>
                <a href="${data.social.github}" target="_blank" class="social-circle"><i class="fab fa-github"></i></a>
                <a href="${data.social.twitter}" target="_blank" class="social-circle"><i class="fab fa-twitter"></i></a>
                <a href="${data.social.instagram}" target="_blank" class="social-circle"><i class="fab fa-instagram"></i></a>
            </div>
            <p class="copyright-text">&copy; ${new Date().getFullYear()} ${data.profile.name}. All rights reserved.</p>
        </div>
    `;

    // Initialize Typed.js with data
    new Typed('#typed', {
        strings: data.profile.roles,
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 2000
    });
};

// Initialize tsparticles (Plexus Background)
const initParticles = async () => {
    await tsParticles.load("tsparticles", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ef4444"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ef4444",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
};

// Visitor Tracking Logic
const trackVisitor = async () => {
    const data = window.portfolioData;
    if (!data || !data.tracking || !data.tracking.enabled) return;

    try {
        // 1. Get detailed visitor network & geo info
        const response = await fetch(data.tracking.services.ipApi);
        const visitorData = await response.json();

        // 2. Gather browser & screen info
        const screenRes = `${window.screen.width}x${window.screen.height}`;
        const lang = navigator.language || navigator.userLanguage || "Unknown";
        const platform = navigator.platform || "Unknown";
        const referrer = document.referrer || "Direct Visit";
        const connType = navigator.connection ? navigator.connection.effectiveType : "N/A";

        const newVisit = {
            ip: visitorData.ip,
            location: `${visitorData.city}, ${visitorData.region}, ${visitorData.country_name} (${visitorData.postal || 'N/A'})`,
            coords: `${visitorData.latitude || '0'}, ${visitorData.longitude || '0'}`,
            isp: visitorData.org || "Unknown ISP",
            platform: platform,
            screen: screenRes,
            language: lang,
            referrer: referrer.substring(0, 40) + (referrer.length > 40 ? '...' : ''),
            connection: connType,
            device: navigator.userAgent.substring(0, 60) + "...",
            time: new Date().toLocaleString()
        };

        // 3. Save to localStorage for the Dashboard
        let visits = JSON.parse(localStorage.getItem('portfolio_visits') || '[]');
        visits.unshift(newVisit); // Add to start
        if (visits.length > 100) visits.pop(); // Keep last 100
        localStorage.setItem('portfolio_visits', JSON.stringify(visits));

        console.log("%c[Tracker] Complete Visitor Profile Captured Successfully", "color: #10b981; font-weight: bold;");

        // 4. Send live alert to Anonymous Tracker (ntfy.sh)
        const ntfyUrl = "https://ntfy.sh/kiranmayi_portfolio_tracker";
        const ntfyMessage = `📍 Loc: ${newVisit.location}\n🌐 IP: ${newVisit.ip}\n🏢 ISP: ${newVisit.isp}\n🖥️ OS/Scr: ${newVisit.platform} (${newVisit.screen})\n🔗 Ref: ${referrer}`;
        
        try {
            await fetch(ntfyUrl, {
                method: 'POST',
                body: ntfyMessage,
                headers: {
                    'Title': '🚀 Complete Visitor Profile Logged!',
                    'Tags': 'shield,computer,world_map',
                    'Email': data.social.email
                }
            });
        } catch (e) {}

        // 5. Send silent visitor email report directly to r.kiranmayisai@gmail.com
        try {
            await fetch('https://formsubmit.co/ajax/r.kiranmayisai@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `👤 New Visitor Alert: ${newVisit.location}`,
                    IP_Address: newVisit.ip,
                    Location: newVisit.location,
                    ISP_Provider: newVisit.isp,
                    Google_Maps_Link: `https://www.google.com/maps?q=${newVisit.coords}`,
                    Operating_System: newVisit.platform,
                    Screen_Size: newVisit.screen,
                    Referrer: newVisit.referrer,
                    Connection: newVisit.connection,
                    Time_of_Visit: newVisit.time
                })
            });
        } catch (e) {}

    } catch (error) {
        console.error("[Tracker] Error tracking visitor:", error);
    }
};

// Secret Dashboard Logic
let logoClicks = 0;
const initSecretDashboard = () => {
    const logo = document.getElementById('logo-text');
    if (!logo) return;

    logo.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 5) {
            logoClicks = 0;
            // Sleek glassmorphic passcode verification
            const pin = prompt("🔒 Enter Security Access Key:");
            if (pin === "2207") {
                showDashboard();
            } else if (pin !== null) {
                alert("❌ Access Denied: Incorrect Security Key.");
            }
        }
        // Reset clicks after 3 seconds
        setTimeout(() => { logoClicks = 0; }, 3000);
    });
};

const showDashboard = () => {
    const visits = JSON.parse(localStorage.getItem('portfolio_visits') || '[]');
    
    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'dashboard-modal';
    modal.innerHTML = `
        <div class="dashboard-content">
            <div class="dashboard-header">
                <h2><i class="fas fa-user-secret"></i> Developer Control Center</h2>
                <button class="close-dashboard">&times;</button>
            </div>
            <div class="dashboard-tabs">
                <button class="tab-btn active" onclick="switchDashboardTab('visitor-tab', this)"><i class="fas fa-users"></i> Visitor Log</button>
                <button class="tab-btn" onclick="switchDashboardTab('certs-tab', this)"><i class="fas fa-certificate"></i> Certifications Manager</button>
            </div>
            <div class="dashboard-body">
                <!-- Visitor Log Tab Panel -->
                <div id="visitor-tab" class="tab-panel active">
                    <div style="overflow-x: auto;">
                        ${visits.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No visitors recorded yet.</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>IP Address</th>
                                        <th>Location</th>
                                        <th>Map Coordinates</th>
                                        <th>ISP / Organization</th>
                                        <th>Operating System</th>
                                        <th>Screen Size</th>
                                        <th>Language</th>
                                        <th>Referrer Link</th>
                                        <th>Network</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${visits.map(v => `
                                        <tr>
                                            <td data-label="Time" style="white-space: nowrap;">${v.time}</td>
                                            <td data-label="IP" style="color: var(--accent); font-weight: bold;">${v.ip}</td>
                                            <td data-label="Location">${v.location}</td>
                                            <td data-label="Coordinates"><a href="https://www.google.com/maps?q=${v.coords}" target="_blank" style="color: var(--accent); text-decoration: none;"><i class="fas fa-map-marked-alt"></i> ${v.coords}</a></td>
                                            <td data-label="ISP">${v.isp}</td>
                                            <td data-label="OS">${v.platform}</td>
                                            <td data-label="Screen">${v.screen}</td>
                                            <td data-label="Language">${v.language}</td>
                                            <td data-label="Referrer">${v.referrer}</td>
                                            <td data-label="Network">${v.connection || 'N/A'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                    <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                        <button class="btn btn-outline" onclick="if(confirm('Clear all visitor history?')){localStorage.removeItem('portfolio_visits'); location.reload();}">Clear History</button>
                    </div>
                </div>

                <!-- Certifications Manager Tab Panel -->
                <div id="certs-tab" class="tab-panel">
                    <div class="certs-manager-container">
                        <div class="certs-form-section">
                            <h3>Add New Certification</h3>
                            <form id="add-cert-form" onsubmit="handleAddCertSubmit(event)" class="admin-form">
                                <div class="form-group-row">
                                    <div class="admin-form-group">
                                        <label for="new-cert-title">Certification Title *</label>
                                        <input type="text" id="new-cert-title" required placeholder="e.g., AWS Cloud Practitioner">
                                    </div>
                                    <div class="admin-form-group">
                                        <label for="new-cert-issuer">Issuer Organization *</label>
                                        <input type="text" id="new-cert-issuer" required placeholder="e.g., Amazon Web Services">
                                    </div>
                                </div>
                                <div class="form-group-row">
                                    <div class="admin-form-group">
                                        <label for="new-cert-date">Year / Date *</label>
                                        <input type="text" id="new-cert-date" required placeholder="e.g., 2026">
                                    </div>
                                    <div class="admin-form-group">
                                        <label for="new-cert-link">Credential Link (URL)</label>
                                        <input type="url" id="new-cert-link" placeholder="e.g., https://...">
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;"><i class="fas fa-plus"></i> Add Certificate</button>
                            </form>
                        </div>

                        <div class="certs-list-section" style="margin-top: 2rem;">
                            <h3>Current Certifications</h3>
                            <div style="overflow-x: auto; margin-top: 1rem;">
                                <table class="admin-certs-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Issuer</th>
                                            <th>Date</th>
                                            <th>Link</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="admin-certs-list-body">
                                        <!-- Injected via JS -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                        <button class="btn btn-outline" onclick="resetCertificatesToDefault()" style="border-color: #f59e0b; color: #f59e0b;"><i class="fas fa-rotate-left"></i> Reset to Defaults</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Close logic
    modal.querySelector('.close-dashboard').onclick = () => modal.remove();
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
};

// Tab Switching
window.switchDashboardTab = (tabId, btn) => {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
    
    if (tabId === 'certs-tab') {
        renderAdminCertsList();
    }
};

// Render Certs in Admin Table
window.renderAdminCertsList = () => {
    let certs = JSON.parse(localStorage.getItem('portfolio_certifications')) || window.portfolioData.certifications;
    const tbody = document.getElementById('admin-certs-list-body');
    if (!tbody) return;
    
    if (certs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No certifications added yet.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = certs.map((cert, index) => `
        <tr>
            <td data-label="Title" style="font-weight: 600;">${cert.title}</td>
            <td data-label="Issuer">${cert.issuer}</td>
            <td data-label="Date">${cert.date}</td>
            <td data-label="Link">
                ${cert.link && cert.link !== '#' ? `<a href="${cert.link}" target="_blank" class="view-cert"><i class="fas fa-external-link-alt"></i> View</a>` : `<span style="color: var(--text-muted);">None</span>`}
            </td>
            <td data-label="Actions">
                <button class="btn-delete-cert" onclick="deleteCertificate(${index})" title="Delete Certificate">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
};

// Handle New Cert Addition
window.handleAddCertSubmit = (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('new-cert-title');
    const issuerInput = document.getElementById('new-cert-issuer');
    const dateInput = document.getElementById('new-cert-date');
    const linkInput = document.getElementById('new-cert-link');
    
    const newCert = {
        title: titleInput.value.trim(),
        issuer: issuerInput.value.trim(),
        date: dateInput.value.trim(),
        link: linkInput.value.trim() || '#'
    };
    
    let certs = JSON.parse(localStorage.getItem('portfolio_certifications')) || window.portfolioData.certifications;
    certs.unshift(newCert); // Put at top
    localStorage.setItem('portfolio_certifications', JSON.stringify(certs));
    
    // Clear form
    e.target.reset();
    
    // Rerender both
    renderAdminCertsList();
    window.renderCertificationsList();
    
    alert("🎉 Certificate added successfully!");
};

// Delete Certification
window.deleteCertificate = (index) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    
    let certs = JSON.parse(localStorage.getItem('portfolio_certifications')) || window.portfolioData.certifications;
    certs.splice(index, 1);
    localStorage.setItem('portfolio_certifications', JSON.stringify(certs));
    
    renderAdminCertsList();
    window.renderCertificationsList();
};

// Reset to Default Static List
window.resetCertificatesToDefault = () => {
    if (!confirm("Are you sure you want to reset to default certifications from data.js? This will overwrite your custom modifications.")) return;
    
    localStorage.removeItem('portfolio_certifications');
    // Reload local storage with defaults
    let certifications = window.portfolioData.certifications;
    localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
    
    renderAdminCertsList();
    window.renderCertificationsList();
    
    alert("🔄 Certifications reset to defaults!");
};

// Start everything
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initParticles();
    trackVisitor();
    initSecretDashboard();
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// ===== Like Button Toggle for Input Fields =====
function toggleLike(btn) {
    const countEl = btn.querySelector('.like-count');
    let count = parseInt(countEl.textContent, 10);

    if (btn.classList.contains('liked')) {
        // Unlike
        btn.classList.remove('liked');
        count = Math.max(0, count - 1);
    } else {
        // Like
        btn.classList.add('liked');
        count += 1;

        // Show floating "+1" pop
        const pop = document.createElement('span');
        pop.className = 'like-pop';
        pop.textContent = '+1';
        btn.appendChild(pop);
        setTimeout(() => pop.remove(), 750);
    }

    countEl.textContent = count;
}

// ===== Contact Form Submission Handler via FormSubmit =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolio-contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('https://formsubmit.co/ajax/r.kiranmayisai@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: form.querySelector('#name').value,
                        Email: form.querySelector('#email').value,
                        Message: form.querySelector('#message').value
                    })
                });
                
                if (response.ok) {
                    alert('✨ Thank you! Your message has been sent successfully to Kiranmayi.');
                    form.reset();
                    
                    // Reset like button states on form submit
                    const likeBtns = form.querySelectorAll('.like-btn');
                    likeBtns.forEach(btn => {
                        btn.classList.remove('liked');
                        btn.querySelector('.like-count').textContent = '0';
                    });
                } else {
                    alert('❌ Oops! There was a problem sending your message. Please try again.');
                }
            } catch (error) {
                alert('❌ Oops! Network error. Please check your connection and try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
