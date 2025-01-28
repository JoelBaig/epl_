function handleMobileMode(enterFullscreenIcon, exitFullscreenIcon) {
    if (isMobileDevice()) {
        enterFullscreenIcon.classList.add('d-none');
        exitFullscreenIcon.classList.add('d-none');
    }
}


function checkOrientation() {
    const overlay = document.getElementById('rotate-device-overlay');

    if (window.innerWidth <= 900 && window.innerHeight > window.innerWidth) {
        overlay.style.display = 'flex';
        hideAllScreens();
    } else {
        overlay.style.display = 'none';
        showCurrentView();
    }
}