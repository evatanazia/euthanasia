const DISCORD_ID = '1236667665762746470';

const butterfly = document.getElementById('butterfly');
const heroContainer = document.querySelector('.hero-image-container');
let angle = 0;

function moveButterfly() {
    // Butterfly circles over the nick near the cat's paw
    const x = Math.cos(angle) * 85;
    const y = -40 + Math.sin(angle * 1.5) * 30; 
    
    butterfly.style.left = `calc(50% + ${x}px)`;
    butterfly.style.top = `calc(50% + ${y}px)`;
    
    const scaleX = Math.sin(angle * 1.5) > 0 ? -1 : 1;
    butterfly.style.transform = `translate(-50%, -50%) scaleX(${scaleX})`;
    
    // Pollen effect
    if (Math.random() > 0.6) {
        createTrail(butterfly.style.left, butterfly.style.top);
    }
    
    angle += 0.03;
    requestAnimationFrame(moveButterfly);
}

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = x;
    trail.style.top = y;
    heroContainer.appendChild(trail);
    setTimeout(() => trail.remove(), 1200);
}

async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await res.json();
        document.getElementById('steam-name').innerText = data.discord_user.global_name || data.discord_user.username;
        document.getElementById('steam-activity').innerText = data.discord_status === 'online' ? 'status: online' : 'status: offline';
        document.getElementById('status-indicator').className = 'indicator ' + data.discord_status;
    } catch (e) { console.error(e); }
}

function init() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = `${now.toLocaleTimeString('en-US')} (Europe/Belarus)`;
    }, 1000);
    updateStatus();
    moveButterfly();
}

function copyAddr(text) {
    navigator.clipboard.writeText(text);
    const popup = document.getElementById('copy-popup');
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 1500);
}

document.addEventListener('DOMContentLoaded', init);