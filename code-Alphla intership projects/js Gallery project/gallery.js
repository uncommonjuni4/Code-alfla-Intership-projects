const filterBtns = document.querySelectorAll('.filter-btn');
const categoryBoxes = document.querySelectorAll('.category-box');
const cards = Array.from(document.querySelectorAll('.card'));
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lightbox-img');

// This list will ONLY hold images that are visible after filtering
let activeCards = [...cards]; 
let currentIndex = 0;

// 1. FILTER LOGIC
filterBtns.forEach(btn => {
    btn.onclick = () => {
        // Change button UI
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        const selectedCat = btn.dataset.cat;

        // Show/Hide the Section Boxes
        categoryBoxes.forEach(box => {
            if (selectedCat === 'all' || box.dataset.category === selectedCat) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });

        // IMPORTANT FIX: Update activeCards to ONLY include visible images
        // This stops the lightbox from showing "all records"
        activeCards = cards.filter(card => {
            return selectedCat === 'all' || card.dataset.cat === selectedCat;
        });
    };
});

// 2. LIGHTBOX LOGIC
const openLightbox = (index) => {
    currentIndex = index;
    lbImg.src = activeCards[currentIndex].querySelector('img').src;
    lightbox.style.display = 'flex';
};

// Set click event for every card
cards.forEach(card => {
    card.onclick = () => {
        // Find where this card is in the CURRENT visible list
        const idx = activeCards.indexOf(card);
        if (idx !== -1) {
            openLightbox(idx);
        }
    };
});

// NEXT BUTTON: Now only cycles through activeCards
document.querySelector('.next').onclick = () => {
    if (activeCards.length > 0) {
        currentIndex = (currentIndex + 1) % activeCards.length;
        lbImg.src = activeCards[currentIndex].querySelector('img').src;
    }
};

// PREV BUTTON: Now only cycles through activeCards
document.querySelector('.prev').onclick = () => {
    if (activeCards.length > 0) {
        currentIndex = (currentIndex - 1 + activeCards.length) % activeCards.length;
        lbImg.src = activeCards[currentIndex].querySelector('img').src;
    }
};

// Close Logic
document.querySelector('.close-btn').onclick = () => lightbox.style.display = 'none';
lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.style.display = 'none'; };




// code for my footer arrow 
// Back to Top functionality
const topBtn = document.getElementById('backToTop');

topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};






// firo transition 



