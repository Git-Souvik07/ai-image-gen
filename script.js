// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.querySelector('i').classList.toggle('fa-sun', savedTheme === 'light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLightTheme = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light-theme' : '');
    themeToggle.querySelector('i').classList.toggle('fa-sun', isLightTheme);
    themeToggle.querySelector('i').classList.toggle('fa-moon', !isLightTheme);
});

// Auth Button
document.querySelector('.auth-button').addEventListener('click', () => {
    // Add your authentication logic here
    console.log('Auth button clicked');
});

// Form Handling
const form = document.querySelector('.prompt-form');
const promptInput = document.querySelector('textarea[name="prompt-input"]');
const generateBtn = document.querySelector('.Generate-btn');
const galleryGrid = document.querySelector('.gallery-grid');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const prompt = promptInput.value.trim();
    const model = document.querySelector('.custom-select').value;
    const imageCount = document.querySelectorAll('.custom-select')[1].value;
    const aspectRatio = document.querySelectorAll('.custom-select')[2].value;

    if (!prompt) return;

    // Clear previous results
    galleryGrid.innerHTML = '';

    // Create loading cards
    for (let i = 0; i < imageCount; i++) {
        const card = document.createElement('div');
        card.className = 'img-card loading';
        card.innerHTML = `
            <div class="status-container">
                <div class="spinner"></div>
                <p class="status-text">Generating...</p>
            </div>
        `;
        galleryGrid.appendChild(card);
    }

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        // Clear loading states
        galleryGrid.innerHTML = '';
        
        // Create result cards
        for (let i = 0; i < imageCount; i++) {
            const card = document.createElement('div');
            card.className = 'img-card';
            card.innerHTML = `
                <img src="test.png" class="result-img">
                <div class="img-overlay">
                    <button class="img-download-btn">
                        <i class="fa-solid fa-download"></i>
                    </button>
                </div>
            `;
            galleryGrid.appendChild(card);
        }

        // Add download handlers to new images
        addDownloadListeners();
    }, 3000);
});

// Random Prompt Generator (Dice button)
document.querySelector('.prompt-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const randomPrompts = [
        'A futuristic cityscape at sunset with flying cars',
        'A mystical forest with glowing creatures and ancient ruins',
        'A steampunk airship sailing through cloudy skies',
        'A cybernetic samurai standing in a neon-lit Tokyo street',
        'A surreal landscape where mountains float above the ocean'
    ];
    promptInput.value = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
});

// Download Functionality
function addDownloadListeners() {
    document.querySelectorAll('.img-download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const imgSrc = btn.closest('.img-card').querySelector('img').src;
            const link = document.createElement('a');
            link.download = 'generated-image.png';
            link.href = imgSrc;
            link.click();
        });
    });
}

// Initial download listeners
addDownloadListeners();