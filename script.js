const DISCORD_ID = '1236667665762746470';

// 1. Анимация бабочки вокруг ASCII котика
const butterfly = document.getElementById('butterfly');
let angle = 0;

function moveButterfly() {
    // Бабочка летает по эллипсу над именем и перед котиком
    const x = 55 + Math.cos(angle) * 70;
    const y = -10 + Math.sin(angle * 1.5) * 15; // Подняли и добавили вертикальное колебание
    
    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;
    
    // Эффект взмаха крыльев через отражение
    const scaleX = Math.sin(angle * 10) > 0 ? 1 : -1;
    butterfly.style.transform = `scaleX(${scaleX})`;
    
    angle += 0.025;
    requestAnimationFrame(moveButterfly);
}

// 2. Статус Steam (Lanyard) - без изменений
async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await res.json();
        
        document.getElementById('steam-name').innerText = data.discord_user.global_name || data.discord_user.username;
        document.getElementById('steam-activity').innerText = data.discord_status === 'online' ? 'status: online' : 'status: offline';
        document.getElementById('status-indicator').className = 'indicator ' + data.discord_status;
    } catch (e) { console.error(e); }
}

// 3. Часы (обновлено для нового места) и Копирование
function init() {
    // Часы теперь без имени
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = `${now.toLocaleTimeString('ru-RU')} (Europe/Belarus)`;
    }, 1000);
    
    updateStatus();
    moveButterfly();
}

function copyAddr(text) {
    navigator.clipboard.writeText(text);
    const popup = document.getElementById('copy-popup');
    popup.style.display = 'block';
    popup.style.opacity = '1';
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.style.display = 'none', 300);
    }, 1500);
}

document.addEventListener('DOMContentLoaded', init);