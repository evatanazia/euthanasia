/**
 * Скрипт для сайта euthanasia
 */

// Тебе нужно просто зайти на сервер Discord Lanyard и твой ID подхватится


const DISCORD_ID = '1236667665762746470';

async function updateSteamStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();

        const avatarImg = document.getElementById('steam-avatar');
        const nameText = document.getElementById('steam-name');
        const activityText = document.getElementById('steam-activity');
        const indicator = document.getElementById('status-indicator');
        const gameSmallIcon = document.getElementById('game-small-icon');

        if (!avatarImg) return;

        // Твой основной аватар (если игры нет или иконка не найдена)
        const userAvatar = "src/imgs/avatar.jpg"; 

        // Ищем активную игру
        const game = data.activities.find(act => act.type === 0);
        indicator.className = 'indicator ' + data.discord_status;

        if (game) {
            nameText.innerText = game.name;
            activityText.innerText = game.details || "playing now";
            indicator.classList.add('in-game');

            // 1. Превращаем "Counter-Strike 2" в "counterstrike2"
            // Убираем всё, кроме букв и цифр, и переводим в нижний регистр
            const fileName = game.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const localPath = `src/imgs/games/${fileName}.png`;

            // Выводим в консоль, чтобы ты знал, какое имя файла ждет скрипт
            console.log(`Ожидаю файл: ${localPath}`);

            // 2. Проверяем наличие файла
            const testImg = new Image();
            testImg.src = localPath;

            testImg.onload = () => {
                avatarImg.src = localPath; // Нашли PNG — ставим его
                avatarImg.style.objectFit = "contain"; // Чтобы прозрачная иконка не растягивалась
            };

            testImg.onerror = () => {
                // Если PNG не найден — ставим твой обычный аватар
                avatarImg.src = userAvatar;
                avatarImg.style.objectFit = "cover";
            };

        } else {
            // Если игр нет
            nameText.innerText = data.discord_user.global_name || data.discord_user.username;
            avatarImg.src = userAvatar;
            avatarImg.style.objectFit = "cover";
            gameSmallIcon.style.display = 'none';
            
            const statusMap = {
                online: 'status: online',
                idle: 'status: away',
                dnd: 'status: dnd',
                offline: 'status: offline'
            };
            activityText.innerText = statusMap[data.discord_status] || 'status: unknown';
        }
    } catch (err) {
        console.error("Lanyard Error:", err);
    }
}

updateSteamStatus();
setInterval(updateSteamStatus, 15000);

function initTerminal() {
    const clockElement = document.getElementById('clock');
    const cursorElement = document.getElementById('cursor');

    // Обновление часов
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', {
            timeZone: 'Europe/Moscow',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        clockElement.innerText = `${timeStr} (Europe/Belarus) | euthanasia`;
    }

    // Мигание курсора
    function blinkCursor() {
        cursorElement.style.visibility = (cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden');
    }

    setInterval(updateTime, 1000);
    setInterval(blinkCursor, 550);
    
    updateTime(); // Сразу при загрузке
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initTerminal);

function copyFooterAddr(addr, el) {
  // Копирование в буфер
  navigator.clipboard.writeText(addr).then(() => {
    const notify = document.getElementById("footer-notify");

    // Показываем уведомление
    notify.style.display = "block";

    // Скрываем через секунду (время анимации)
    setTimeout(() => {
      notify.style.display = "none";
    }, 1000);
  });
}