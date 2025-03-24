// Initialize Events
function initEvents(dept = 'all') {
    const container = document.getElementById('eventsContainer');

    fetch('events.json')
        .then(response => response.json())
        .then(events => {
            const filteredEvents = dept === 'all' ? events : events.filter(event => event.dept === dept);
            
            container.innerHTML = filteredEvents.map(event => `
                <div class="event-card" data-dept="${event.dept}">
                    <div class="event-header" data-event-id="${event.id}">
                        <h3 class="event-title">${event.title}</h3>
                        <button class="toggle-btn">+</button>
                    </div>
                    <div class="event-details" id="details-${event.id}">
                        <p>${event.details}</p>
                        <div class="event-meta">
                            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> ${event.time}</p> 
                            <p><strong>Entry Fee:</strong> ${event.entry_fee}</p>
                            
                            <p><strong>Coordinator:</strong> ${event.coordinator}</p>
                        </div>
                        
                    </div>
                    <a href="${event.link}" class="register-btn" target="_blank">
                            Register Now
                        </a>
                </div>
            `).join('');

             // Attach event listeners after the content is added
            filteredEvents.forEach(event => {
                const headerElement = document.querySelector(`[data-event-id="${event.id}"]`);
                if (headerElement) {
                    headerElement.addEventListener('click', () => {
                         toggleDetails(event.id);
                    });
                }
            });

        })
        .catch(error => console.error('Error fetching events:', error));
}

// Toggle Event Details
function toggleDetails(eventId) {
    const details = document.getElementById(`details-${eventId}`);
    if(!details) return;
    const toggleBtn = details.previousElementSibling.querySelector('.toggle-btn');
    details.classList.toggle('active');
    toggleBtn.textContent = details.classList.contains('active') ? '-' : '+';
}

// Filter Events
function filterEvents(dept) {
    document.querySelectorAll('.main-nav a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    initEvents(dept);
}

// Skip Intro
function skipIntro() {
    document.querySelector('.intro').style.animation = 'introFade 1s forwards';
    setTimeout(() => {
        document.querySelector('.intro').style.display = 'none';
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    
    // Navigation Event Listeners
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterEvents(link.dataset.dept);
        });
    });
    
    // Auto-skip intro after 5 seconds
    setTimeout(skipIntro, 5000);
});
