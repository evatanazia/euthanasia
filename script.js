const DISCORD_ID = '1236667665762746470';

async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await res.json();
        
        const statusElement = document.getElementById('discord-status');
        if (statusElement) {
            const s = data.discord_status;
            statusElement.innerText = `Status: ${s.charAt(0).toUpperCase() + s.slice(1)}`;
            statusElement.style.color = (s === 'online' || s === 'dnd' || s === 'idle') ? '#ffffff' : '#888888';
        }
    } catch (e) { 
        console.error("Lanyard error:", e); 
        const statusElement = document.getElementById('discord-status');
        if (statusElement) statusElement.innerText = "Status: Unknown";
    }
}

function copyAddr(text) {
    navigator.clipboard.writeText(text);
    const popup = document.getElementById('copy-popup');
    popup.style.display = 'block';
    
    if(window.copyTimeout) clearTimeout(window.copyTimeout);
    
    window.copyTimeout = setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    setInterval(updateStatus, 15000);
});