/**
 * Hides fullscreen icons on mobile devices.
 * 
 * @param {HTMLElement} enterFullscreenIcon - The icon for entering fullscreen mode.
 * @param {HTMLElement} exitFullscreenIcon - The icon for exiting fullscreen mode.
 */
function handleMobileMode(enterFullscreenIcon, exitFullscreenIcon) {
    if (isMobileDevice()) {
        enterFullscreenIcon.classList.add('d-none');
        exitFullscreenIcon.classList.add('d-none');
    }
}

/**
 * Checks the device orientation and displays an overlay if the device is in portrait mode.
 */
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