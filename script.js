// script.js

// -------- Falling Hearts Animation --------
const fallingHeartsContainer = document.getElementById('falling-hearts');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Random size between 10px and 20px
    const size = Math.random() * 10 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';

    // Random horizontal start position
    heart.style.left = Math.random() * window.innerWidth + 'px';

    // Random animation duration between 5s and 10s
    const duration = Math.random() * 5 + 5;
    heart.style.animationDuration = duration + 's';

    // Random delay so hearts don't all start at once
    heart.style.animationDelay = (Math.random() * 5) + 's';

    fallingHeartsContainer.appendChild(heart);

    // Remove heart after animation ends to keep DOM clean
    setTimeout(() => {
        heart.remove();
    }, (duration + 5) * 1000);
}

// Create hearts continuously
setInterval(createHeart, 300);

// Initial batch
for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 300);
}

// -------- Photo Album Book Flip --------
const book = document.getElementById('book');
const pages = Array.from(book.querySelectorAll('.page'));
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

let currentPage = 0;

// Initialize pages: only show the first page, others hidden behind
function updatePages() {
    pages.forEach((page, index) => {
        if (index < currentPage) {
            // Flipped pages - rotate Y 180deg to left
            page.style.transform = 'rotateY(-180deg)';
            page.style.zIndex = index;
        } else if (index === currentPage) {
            // Current page - front facing
            page.style.transform = 'rotateY(0deg)';
            page.style.zIndex = pages.length + 1;
        } else {
            // Pages to the right - no rotation
            page.style.transform = 'rotateY(0deg)';
            page.style.zIndex = pages.length - index;
        }
    });

    // Disable buttons at edges
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    }
});

// Initialize on load
updatePages();

// -------- Background Music Auto Play & Unmute --------
const bgMusic = document.getElementById('bg-music');

// Some browsers block autoplay with sound, so unmute on first user interaction
function enableSound() {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        bgMusic.play();
    }
    window.removeEventListener('click', enableSound);
    window.removeEventListener('touchstart', enableSound);
}

window.addEventListener('click', enableSound);
window.addEventListener('touchstart', enableSound);
