const galleryItems = [
    { type: 'image', src: 'assets/artworks/quase1.png', alt: 'Quase1' },
    { type: 'image', src: 'assets/artworks/quase2.png', alt: 'Quase2' },
    { type: 'image', src: 'assets/artworks/quase3.png', alt: 'Quase3' },
    { type: 'image', src: 'assets/artworks/quase4.png', alt: 'Quase4' },
    { type: 'image', src: 'assets/artworks/quase5.png', alt: 'Quase5' },
    { type: 'image', src: 'assets/artworks/eco1.png', alt: 'eco1' },
    { type: 'image', src: 'assets/artworks/eco2.png', alt: 'eco2' },
    { type: 'image', src: 'assets/artworks/eco3.png', alt: 'eco3' },
    { type: 'image', src: 'assets/artworks/eco4.png', alt: 'eco4' },
    { type: 'image', src: 'assets/artworks/eco5.png', alt: 'eco5' },
    { type: 'image', src: 'assets/artworks/esse1.gif', alt: 'esse1' },
    { type: 'image', src: 'assets/artworks/esse2.gif', alt: 'esse2' },
    { type: 'image', src: 'assets/artworks/esse3.gif', alt: 'esse3' },
    { type: 'image', src: 'assets/artworks/esse4.gif', alt: 'esse4' },
    { type: 'image', src: 'assets/artworks/esse5.gif', alt: 'esse5' },
    { type: 'image', src: 'assets/artworks/pseudo1.png', alt: 'pseudo1' },
    { type: 'image', src: 'assets/artworks/pseudo2.png', alt: 'pseudo2' },
    { type: 'image', src: 'assets/artworks/pseudo3.png', alt: 'pseudo3' },
    { type: 'image', src: 'assets/artworks/pseudo4.png', alt: 'pseudo4' },
    { type: 'image', src: 'assets/artworks/pseudo5.png', alt: 'pseudo5' },
    { type: 'image', src: 'assets/artworks/apofenia.gif', alt: 'apofenia' },
    { type: 'image', src: 'assets/artworks/hydraexperiment1.gif', alt: 'hydraexperiment1' },
    { type: 'image', src: 'assets/artworks/hydraexperiment2.gif', alt: 'hydraexperiment2' },
    { type: 'image', src: 'assets/artworks/hydraexperiment3.gif', alt: 'hydraexperiment3' },
    { type: 'image', src: 'assets/artworks/hydraexperiment4.gif', alt: 'hydraexperiment4' },
    { type: 'image', src: 'assets/artworks/behind.jpg', alt: 'behind' },
    { type: 'image', src: 'assets/artworks/watching.gif', alt: 'watching' },
    { type: 'image', src: 'assets/artworks/sunrise.gif', alt: 'sunrise' },
    { type: 'image', src: 'assets/artworks/collapse.gif', alt: 'collapse' },
    { type: 'image', src: 'assets/artworks/starzoom.gif', alt: 'starzoom' },
    { type: 'image', src: 'assets/artworks/starbirth.gif', alt: 'starbirth' },
    { type: 'image', src: 'assets/artworks/starlight.gif', alt: 'starlight' },
    { type: 'image', src: 'assets/artworks/staragony.gif', alt: 'staragony' },
];

let currentIndex = 0;
const itemsPerLoad = 10;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomSize() {
    const sizes = ['wide', 'tall', 'large', 'extra-large'];
    const weights = [35, 35, 20, 10]; // Ajustado para favorecer itens maiores
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < sizes.length; i++) {
        if (random < weights[i]) {
            return sizes[i];
        }
        random -= weights[i];
    }
    
    return 'large'; // Fallback para garantir que nenhuma imagem fique pequena demais
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const size = getRandomSize();
    div.classList.add(size);

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src; // Carregue a imagem imediatamente
        img.alt = item.alt;
        div.appendChild(img);

        div.addEventListener('click', () => showPopup(item.src));
    } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src; // Carregue o vídeo imediatamente
        video.title = item.title;
        video.controls = true;
        video.muted = true;
        video.loop = true;
        div.appendChild(video);
    }

    return div;
}

function loadGalleryItems() {
    const gallery = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < itemsPerLoad && currentIndex < galleryItems.length; i++) {
        const item = galleryItems[currentIndex];
        const galleryItem = createGalleryItem(item);
        fragment.appendChild(galleryItem);
        currentIndex++;
    }

    gallery.appendChild(fragment);
}

function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 500) {
        loadGalleryItems();
    }
}

function showPopup(src) {
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');

    popupImage.src = '';
    popupImage.onload = function() {
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;

        const widthRatio = maxWidth / this.naturalWidth;
        const heightRatio = maxHeight / this.naturalHeight;
        const scale = Math.min(widthRatio, heightRatio, 1);

        this.style.width = `${this.naturalWidth * scale}px`;
        this.style.height = `${this.naturalHeight * scale}px`;

        popup.style.display = 'flex';
    };

    popupImage.src = src;
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function initGallery() {
    shuffleArray(galleryItems);
    loadGalleryItems();
    
    // Carregue mais itens até que haja scroll ou todos os itens sejam carregados
    while (document.documentElement.scrollHeight <= window.innerHeight && currentIndex < galleryItems.length) {
        loadGalleryItems();
    }

    window.addEventListener('scroll', handleScroll);

    const popup = document.getElementById('popup');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });
}

window.addEventListener('load', initGallery);
window.addEventListener('resize', () => {
    const popup = document.getElementById('popup');
    if (popup.style.display === 'flex') {
        const popupImage = document.getElementById('popup-image');
        showPopup(popupImage.src);
    }

    // Verifique se é necessário carregar mais itens após o redimensionamento
    if (document.documentElement.scrollHeight <= window.innerHeight && currentIndex < galleryItems.length) {
        loadGalleryItems();
    }
});