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
        avatarContainer.innerHTML = `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${data.profile.avatarSeed}&backgroundColor=f43f5e" alt="Avatar" class="hero-avatar">`;
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
            <i class="${skill.icon}" style="color: ${skill.color || 'var(--text-muted)'}"></i>
            <span class="skill-name">${skill.name}</span>
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
        <div class="project-card" ${project.link !== '#' ? `onclick="window.open('${project.link}', '_blank')"` : ''}>
            <div class="project-number">${project.id}</div>
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                ${project.link !== '#' ? `<a href="${project.link}" class="btn btn-outline" style="margin-top: 1.5rem" target="_blank" onclick="event.stopPropagation()">Learn More</a>` : ''}
            </div>
        </div>
    `).join('');

    // 5b. Bootcamp
    const bootcampGrid = document.getElementById('bootcamp-grid');
    if (bootcampGrid && data.bootcamp) {
        bootcampGrid.innerHTML = data.bootcamp.map(item => `
            <div class="bootcamp-card" onclick="window.open('${item.link}', '_blank')">
                <div class="bootcamp-img-container">
                    <img src="${item.image}" alt="${item.title}" class="bootcamp-img">
                </div>
                <div class="bootcamp-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="view-project-link" target="_blank" onclick="event.stopPropagation()">
                        View Project <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // 5c. Websites
    const websitesGrid = document.getElementById('websites-grid');
    if (websitesGrid && data.websites) {
        websitesGrid.innerHTML = data.websites.map(item => `
            <div class="website-card" onclick="window.open('${item.link}', '_blank')">
                <div class="website-img-container">
                    <img src="${item.image}" alt="${item.title}" class="website-img">
                </div>
                <div class="website-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="view-project-link" target="_blank" onclick="event.stopPropagation()">
                        Visit Site <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // 6. Certifications
    const certsGrid = document.getElementById('certs-grid');
    let certifications = JSON.parse(localStorage.getItem('portfolio_certifications'));
    if (!certifications || (certifications.length > 0 && !certifications[0].image)) {
        certifications = data.certifications;
        localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
    }
    
    window.renderCertificationsList = () => {
        let certs = JSON.parse(localStorage.getItem('portfolio_certifications')) || data.certifications;
        certsGrid.innerHTML = certs.map(cert => {
            const hasValidLink = cert.link && cert.link !== '#';
            return `
                <div class="cert-card" ${hasValidLink ? `onclick="window.open('${cert.link}', '_blank')"` : ''}>
                    <div class="cert-img-container">
                        <img src="${cert.image}" alt="${cert.title}" class="cert-img">
                    </div>
                    <div class="cert-info">
                        <div class="cert-header">
                            <i class="fas fa-certificate accent-text"></i>
                            <span class="cert-date">${cert.date}</span>
                        </div>
                        <h3>${cert.title}</h3>
                        <p class="issuer">${cert.issuer}</p>
                        ${hasValidLink ? `
                            <a href="${cert.link}" class="view-cert" target="_blank" onclick="event.stopPropagation()">View Credential <i class="fas fa-external-link-alt"></i></a>
                        ` : `
                            <a href="javascript:void(0)" class="view-cert no-link" onclick="event.stopPropagation(); alert('No credential link provided for this certification.')">No Credential Link <i class="fas fa-link-slash"></i></a>
                        `}
                    </div>
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
                value: "#f43f5e"
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
                color: "#f43f5e",
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
                if (typeof window.unlockAIControls === 'function') {
                    window.unlockAIControls();
                }
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
                <button class="tab-btn" onclick="switchDashboardTab('ai-history-tab', this)"><i class="fas fa-history"></i> AI Chat History</button>
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

                <!-- AI Chat History Tab Panel -->
                <div id="ai-history-tab" class="tab-panel">
                    <div style="overflow-x: auto;" id="ai-history-container">
                        <!-- Injected via JS -->
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
    } else if (tabId === 'ai-history-tab') {
        renderAIHistoryList();
    }
};

// Render AI Chat History in Dashboard
window.renderAIHistoryList = () => {
    const container = document.getElementById('ai-history-container');
    if (!container) return;

    const history = JSON.parse(localStorage.getItem('panda_chat_history') || '[]');

    if (history.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 3rem; color: var(--text-muted);">
                <i class="fas fa-comments" style="font-size:3rem; margin-bottom:1rem; display:block; opacity:0.3;"></i>
                <p>No chat history yet. Start a conversation with Panda!</p>
            </div>`;
        return;
    }

    // Group consecutive messages into sessions (gap > 30 min = new session)
    const sessions = [];
    let currentSession = [];
    for (let i = 0; i < history.length; i++) {
        if (i === 0) {
            currentSession.push(history[i]);
        } else {
            const prev = new Date(history[i - 1].timestamp);
            const curr = new Date(history[i].timestamp);
            if (curr - prev > 30 * 60 * 1000) {
                sessions.push(currentSession);
                currentSession = [];
            }
            currentSession.push(history[i]);
        }
    }
    if (currentSession.length > 0) sessions.push(currentSession);

    const formatTime = (iso) => {
        const d = new Date(iso);
        return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    };

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
                <h3 style="margin:0; color:var(--accent);"><i class="fas fa-history"></i> AI Chat History</h3>
                <p style="margin:0.25rem 0 0; font-size:0.85rem; color:var(--text-muted);">${history.length} messages across ${sessions.length} session${sessions.length !== 1 ? 's' : ''}</p>
            </div>
            <button onclick="clearAIChatHistory()" style="background: rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#f87171; padding:0.4rem 1rem; border-radius:0.5rem; cursor:pointer; font-size:0.85rem;">
                <i class="fas fa-trash"></i> Clear History
            </button>
        </div>
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
            ${[...sessions].reverse().map((session, si) => `
                <div style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:1rem; overflow:hidden;">
                    <div style="background: rgba(var(--accent-rgb, 139,92,246),0.15); padding:0.6rem 1rem; font-size:0.8rem; color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.06);">
                        <i class="fas fa-clock"></i> Session ${sessions.length - si} &nbsp;·&nbsp; ${formatTime(session[0].timestamp)}
                    </div>
                    <div style="padding:1rem; display:flex; flex-direction:column; gap:0.6rem;">
                        ${session.map(msg => `
                            <div style="display:flex; gap:0.75rem; align-items:flex-start; flex-direction:${msg.sender === 'user' ? 'row-reverse' : 'row'};">
                                <div style="width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:0.8rem;
                                    background:${msg.sender === 'user' ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#06b6d4,#3b82f6)'}; color:#fff;">
                                    <i class="fas fa-${msg.sender === 'user' ? 'user' : 'robot'}"></i>
                                </div>
                                <div style="max-width:75%;">
                                    <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.2rem; text-align:${msg.sender === 'user' ? 'right' : 'left'};">
                                        ${msg.sender === 'user' ? 'You' : '🐼 Panda'} · ${formatTime(msg.timestamp)}
                                    </div>
                                    <div style="background:${msg.sender === 'user' ? 'rgba(99,102,241,0.2)' : 'rgba(6,182,212,0.12)'};
                                        border:1px solid ${msg.sender === 'user' ? 'rgba(99,102,241,0.35)' : 'rgba(6,182,212,0.25)'};
                                        border-radius:${msg.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0'};
                                        padding:0.6rem 0.9rem; font-size:0.9rem; line-height:1.5; word-break:break-word;">
                                        ${msg.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>`;
};

// Clear AI Chat History
window.clearAIChatHistory = () => {
    if (!confirm('Clear all AI chat history? This cannot be undone.')) return;
    localStorage.removeItem('panda_chat_history');
    renderAIHistoryList();
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
    
    // Initialize Panda Chat
    initPandaChat();
});

// ===== Panda AI Chatbot Logic =====
const initPandaChat = () => {
    const chatBtn = document.getElementById('panda-chat-btn');
    const chatWindow = document.getElementById('panda-chat-window');
    const closeBtn = document.getElementById('panda-close-btn');
    const settingsBtn = document.getElementById('panda-settings-btn');
    const settingsPanel = document.getElementById('panda-settings-panel');
    const apiKeyInput = document.getElementById('panda-api-key');
    const saveKeyBtn = document.getElementById('panda-save-key-btn');
    const chatForm = document.getElementById('panda-chat-form');
    const chatInput = document.getElementById('panda-chat-input');
    const chatMessages = document.getElementById('panda-chat-messages');
    const badge = chatBtn.querySelector('.panda-notification-badge');

    const voiceBtn = document.getElementById('panda-voice-btn');
    let isVoiceEnabled = true;
    let hasSpokenGreeting = false;
    const greetText = "Hi, my name is Panda. I am the personal AI assistant of reddy kiranmayi. How can I help you today?";

    // Load saved API key
    if (localStorage.getItem('panda_gemini_key')) {
        apiKeyInput.value = localStorage.getItem('panda_gemini_key');
    }

    const speakText = (text, isGreeting = false) => {
        if (!isVoiceEnabled) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            // Clean content to speak smoothly
            const cleanText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // remove links markdown
                                  .replace(/https?:\/\/\S+/g, 'link') // replace raw urls with "link"
                                  .replace(/B\.Tech/g, 'B Tech')
                                  .replace(/CGPA/g, 'C G P A')
                                  .replace(/CSE/g, 'C S E');

            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.15; // cute panda pitch tone

            if (isGreeting) {
                utterance.onstart = () => {
                    hasSpokenGreeting = true;
                    cleanupInteractionListeners();
                    removeVoicePrompt();
                };
                utterance.onend = () => {
                    hasSpokenGreeting = true;
                };
                utterance.onerror = (event) => {
                    console.warn("Panda speech error:", event.error);
                    if (event.error === 'not-allowed' || event.error === 'interrupted') {
                        // Keep hasSpokenGreeting = false so fallback can try again
                    } else {
                        hasSpokenGreeting = true;
                        cleanupInteractionListeners();
                        removeVoicePrompt();
                    }
                };
            }
            
            window.speechSynthesis.speak(utterance);
        }
    };

    const triggerGreetingSpeech = () => {
        if (hasSpokenGreeting || (window.speechSynthesis && window.speechSynthesis.speaking)) return;
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.addEventListener('voiceschanged', () => {
                    if (!hasSpokenGreeting && !window.speechSynthesis.speaking) {
                        speakText(greetText, true);
                    }
                }, { once: true });
            } else {
                speakText(greetText, true);
            }
        }
    };

    const removeVoicePrompt = () => {
        const promptEl = document.getElementById('panda-voice-prompt');
        if (promptEl) {
            promptEl.style.opacity = '0';
            setTimeout(() => {
                promptEl.remove();
            }, 400);
        }
    };

    // Expose unlock function globally so the logo click passcode check can trigger it
    window.unlockAIControls = () => {
        const settingsBtn = document.getElementById('panda-settings-btn');
        if (settingsBtn) {
            settingsBtn.style.setProperty('display', 'flex', 'important');
        }
    };

    // Auto-open chat window instantly on page load
    setTimeout(() => {
        chatWindow.classList.add('active');
        if (badge) {
            badge.style.display = 'none';
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Inject voice prompt dynamically to let the user know they can click anywhere to play audio
        if (!hasSpokenGreeting) {
            const voicePrompt = document.createElement('div');
            voicePrompt.className = 'panda-voice-prompt';
            voicePrompt.id = 'panda-voice-prompt';
            voicePrompt.innerHTML = '<i class="fas fa-volume-up pulse-icon"></i> Click anywhere to unmute Panda! 🐼🔊';
            chatWindow.insertBefore(voicePrompt, chatMessages);
        }
        
        // Try speaking greeting
        triggerGreetingSpeech();
    }, 100);

    // Fallback: If autoplay policies blocked, trigger speaking on first user interaction of any type
    const interactionEvents = ['click', 'touchstart', 'mousemove', 'scroll', 'mouseover', 'mouseenter', 'keydown', 'wheel'];
    
    const handleFirstInteraction = () => {
        triggerGreetingSpeech();
    };

    const cleanupInteractionListeners = () => {
        interactionEvents.forEach(evt => {
            document.removeEventListener(evt, handleFirstInteraction);
        });
    };

    interactionEvents.forEach(evt => {
        document.addEventListener(evt, handleFirstInteraction, { passive: true });
    });

    // Toggle Voice state
    voiceBtn.addEventListener('click', () => {
        isVoiceEnabled = !isVoiceEnabled;
        if (isVoiceEnabled) {
            voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            voiceBtn.title = "Mute Voice";
            speakText(greetText);
            removeVoicePrompt();
        } else {
            voiceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            voiceBtn.title = "Unmute Voice";
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            removeVoicePrompt();
        }
    });

    // Toggle Chat Window
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (badge) {
            badge.style.display = 'none'; // Clear notification badge
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Toggle Settings Panel
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });

    // Save API key
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('panda_gemini_key', key);
            alert('Gemini API key saved! Panda is now powered by Gemini AI.');
        } else {
            localStorage.removeItem('panda_gemini_key');
            alert('API key cleared. Panda will use local knowledge base.');
        }
        settingsPanel.classList.remove('active');
    });

    // Add message helper
    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `panda-message ${sender}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Speak bot messages
        if (sender === 'bot') {
            speakText(text);
        }

        // Log to chat history in localStorage
        const history = JSON.parse(localStorage.getItem('panda_chat_history') || '[]');
        history.push({
            sender,
            text,
            timestamp: new Date().toISOString()
        });
        // Keep last 200 messages
        if (history.length > 200) history.splice(0, history.length - 200);
        localStorage.setItem('panda_chat_history', JSON.stringify(history));
    };

    // Add typing indicator helper
    const showTypingIndicator = () => {
        const indDiv = document.createElement('div');
        indDiv.className = 'panda-typing-indicator';
        indDiv.id = 'panda-typing';
        indDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indDiv;
    };

    const removeTypingIndicator = () => {
        const ind = document.getElementById('panda-typing');
        if (ind) ind.remove();
    };

    // Initial message (Do not speak greeting again in addMessage since we handle it via fallback)
    const initMessageDiv = document.createElement('div');
    initMessageDiv.className = "panda-message bot";
    initMessageDiv.innerText = greetText;
    chatMessages.appendChild(initMessageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Local knowledge base search logic
    const getLocalResponse = (query) => {
        const q = query.toLowerCase();
        const data = window.portfolioData;
        if (!data) return "I'm sorry, I couldn't load Reddy Kiranmayi's portfolio data right now.";

        if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
            return "Hello! How can I help you learn more about Reddy Kiranmayi today?";
        }

        // 1. Specific category: Bootcamp
        if (q.includes("bootcamp") || q.includes("boot camp")) {
            const bootcampList = data.bootcamp.map(b => `- ${b.title}: ${b.description}`).join("\n\n");
            return `Here are some of Kiranmayi's Bootcamp projects:\n\n${bootcampList}`;
        }

        // 2. Specific category: Websites
        if (q.includes("website") || q.includes("web site") || q.includes("site") || q.includes("app") || q.includes("wedsit") || q.includes("web")) {
            const websitesList = data.websites.map(w => `- ${w.title}: ${w.description}`).join("\n\n");
            return `Here are the websites Kiranmayi has built:\n\n${websitesList}`;
        }

        // 3. Specific category: Projects
        if (q.includes("project") || q.includes("work") || q.includes("develop")) {
            const projectsList = data.projects.map(p => `- ${p.title}: ${p.description}`).join("\n\n");
            return `Here are some of Kiranmayi's key projects:\n\n${projectsList}\n\nAsk me about a specific project to learn more!`;
        }

        // 4. Specific category: Skills
        if (q.includes("skill") || q.includes("languages") || q.includes("coding") || q.includes("technology") || q.includes("java")) {
            const skillsList = data.skills.map(s => s.name).join(", ");
            return `Kiranmayi is skilled in: ${skillsList}. Her main languages are Java and web development technologies.`;
        }

        // 5. Specific category: Individual projects details
        if (q.includes("calculator")) {
            return "Simple Calculator: A console-based program developed in C Language that performs basic arithmetic operations. Understands logic building and modular programming.";
        }
        if (q.includes("crime") || q.includes("hotspot")) {
            return "Crime Hotspot Detection using Crowdsourced Data: Developed a data analysis system to identify crime-prone areas using Pandas, Matplotlib, and Seaborn heatmaps.";
        }
        if (q.includes("segmentation") || q.includes("customer")) {
            return "Customer Segmentation: A Python machine learning project using K-Means clustering in Scikit-learn to group customers based on purchasing behavior.";
        }
        if (q.includes("sales") || q.includes("dashboard") || q.includes("dashboard")) {
            return "Global Sales Performance Dashboard: An interactive Power BI dashboard visualising worldwide regions, regional sales, products, and temporal trends.";
        }

        // 6. Specific category: Education
        if (q.includes("college") || q.includes("ace") || q.includes("university") || q.includes("study") || q.includes("education") || q.includes("marks") || q.includes("cgpa")) {
            const eduList = data.education.map(e => `- ${e.degree} at ${e.institution} (${e.period}): ${e.score}`).join("\n");
            return `Here is Kiranmayi's educational background:\n\n${eduList}`;
        }

        // 7. Specific category: Contact
        if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("address") || q.includes("reach")) {
            return `You can contact Reddy Kiranmayi at:\n- Email: ${data.social.email}\n- Phone: ${data.contact.phone}\n- Location: ${data.contact.address}`;
        }

        // 8. Specific category: Resume
        if (q.includes("resume") || q.includes("cv")) {
            return `You can view Kiranmayi's professional resume by clicking this link: ${data.profile.resumeLink}`;
        }

        // 9. Specific category: CP coding stats
        if (q.includes("leetcode") || q.includes("codechef") || q.includes("gfg") || q.includes("geeksforgeeks") || q.includes("rank")) {
            const stats = data.codingStats.map(s => `- ${s.platform}: Rating/Rank ${s.rating || s.details} (${s.details})`).join("\n");
            return `Kiranmayi is very active in competitive programming. Here are her stats:\n\n${stats}`;
        }

        // 10. Specific category: Certifications
        if (q.includes("certification") || q.includes("cert")) {
            const certs = data.certifications.map(c => `- ${c.title} (Issued by ${c.issuer}, ${c.date})`).join("\n");
            return `Kiranmayi holds the following certifications:\n\n${certs}`;
        }

        // 11. General chatbot name/identity
        if (q.includes("name") || q.includes("who are you") || q.includes("who is panda")) {
            return "My name is Panda, and I am Reddy Kiranmayi's personal AI assistant! Ask me about her projects, skills, intermediate marks, or college.";
        }

        // 12. General "Kiranmayi" Bio/Profile Query (Checks for specific kiranmayi query strings)
        if (q.includes("kiranmayi") || q.includes("reddy") || q.includes("kiran") || q.includes("who is she") || q.includes("about her") || q.includes("bio") || q.includes("profile")) {
            return `Reddy Kiranmayi (Kiran) is a Computer Science Engineering student at ACE Engineering College. She is a 2-star coder on CodeChef and ranked 2nd at her college on GeeksForGeeks.

Here is a summary of what she has accomplished:
• Projects: Crime Hotspot Detection, Customer Segmentation, Student Marks Data Visualization, Simple Calculator, and Global Sales Performance Dashboard.
• Websites: AI-powered tools for Brain Tumor, Plant Disease, and Skin Cancer classification, a Finance Tracker, Weather app, and E-commerce page.
• Bootcamp: GenAI exercises, Heart Disease analysis, and multiple machine learning models using Decision Trees.
• Certifications: Scaler DSA, NPTEL Operating Systems, ACE Multimodal AI, Salesforce Agent Blazer, and Deloitte Data Analytics.

Ask me about any specific project, website, or bootcamp to learn more!`;
        }

        return `I can tell you all about Reddy Kiranmayi's projects, skills, contact, and education! If you want to ask general questions (like ChatGPT/Gemini), please click the gear icon in my header to add a free Gemini API Key.`;
    };

    // Chat form submit
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        const typingIndicator = showTypingIndicator();

        const apiKey = localStorage.getItem('panda_gemini_key');
        if (apiKey) {
            try {
                // System instructions and payload
                const payload = {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `System Prompt: You are Panda, a friendly and cute personal AI assistant of Reddy Kiranmayi, a CSE B.Tech student. Keep answers concise, helpful, and maintain your Panda persona. Portfolio Data context: ${JSON.stringify(window.portfolioData)}.
                                    User question: ${text}`
                                }
                            ]
                        }
                    ]
                };

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const resData = await response.json();
                removeTypingIndicator();

                if (resData.candidates && resData.candidates[0].content.parts[0].text) {
                    addMessage(resData.candidates[0].content.parts[0].text, 'bot');
                } else {
                    console.error(resData);
                    addMessage("I encountered an issue generating a response from Gemini. Please check if your API key is correct or valid.", "bot");
                }
            } catch (err) {
                console.error(err);
                removeTypingIndicator();
                addMessage("I was unable to connect to Gemini AI. Using local backup: " + getLocalResponse(text), "bot");
            }
        } else {
            // No API key, use local knowledge base
            setTimeout(() => {
                removeTypingIndicator();
                addMessage(getLocalResponse(text), 'bot');
            }, 600);
        }
    });

    // Speech Recognition setup (Voice Input)
    const micBtn = document.getElementById('panda-mic-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let isListening = false;

        micBtn.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Failed to start speech recognition:", e);
                }
            }
        });

        recognition.onstart = () => {
            isListening = true;
            micBtn.classList.add('listening');
            micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            chatInput.placeholder = "Listening...";
        };

        recognition.onend = () => {
            isListening = false;
            micBtn.classList.remove('listening');
            micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            chatInput.placeholder = "Ask me about Kiranmayi...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            
            // Automatically submit the form to get a response!
            chatForm.dispatchEvent(new Event('submit'));
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === 'not-allowed') {
                alert("Microphone access was denied. Please allow microphone permissions in your browser settings to speak to Panda.");
            }
        };
    } else if (micBtn) {
        // Hide mic button if browser doesn't support Web Speech API
        micBtn.style.display = 'none';
    }
};
