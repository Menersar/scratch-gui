const appTarget = document.getElementById('app');

// !!!
// Fix for 'macOS Safari 'Save Page As' issue: Remove everything from target
while (appTarget.firstChild) {
    appTarget.removeChild(appTarget.firstChild);
}

document.body.classList.add('sidekick-loaded');

export default appTarget;
