const works = [
    {
        title: "QUASE",
        description: "'Quase' blurs the line between human and machine in a mesmerizing code-based art piece. Using particles, the code transforms simple shapes into intricate, almost 'organic' forms. The result is a dynamic artwork that sparks contemplation on the harmonious collaboration between human creativity and the machine's execution. It highlights the similarities between humans and machines-both capable of choices, adaptation, and information processing, though in different ways. The abstract nature of 'Quase' invites subjective interpretation, allowing viewers to engage with the artwork on a personal level. Made with p5js.",
        media: "assets/video/QUASE-12.mp4",
        type: "video",
        link: "https://256art.com/project/quase-3"
    },
    {
        title: "PSEUDO",
        description: "In 'Pseudo' I continue my exploration of abstract aesthetics, aiming to create a visual experience that evokes familiarity without being completely definable. The interplay of particle movement lies at the core of this artwork, forming a dynamic canvas where the viewer becomes an integral part of the creative process. Made with p5js.",
        media: "assets/artworks/pseudo1.png",
        type: "image",
        link: "https://prohibition.art/project/pseudo"
    },
    {
        title: "ESSE",
        description: "'esse' is an exploration of the intersection between typography and symmetry, delving into palindromes and symbols. Each result seeks to challenge the viewer's perception, inviting them to try to place meaning into something abstract. Made with hydra-synth.",
        media: "assets/artworks/esse2.gif",
        type: "image",
        link: "https://www.fxhash.xyz/generative/30740"
    },
    {
        title: "ECO",
        description: "eco is a long-form generative art project that uses a grid system to create patterns within a composition. The algorithm allocates cells of different sizes within the grid and inserts patterns into each one. The allocation of patterns is done using flow fields to enhance distribution dynamism. It features 14 color palettes. Made with p5js.",
        media: "assets/artworks/eco1.png",
        type: "image",
        link: "https://beta.koda.art/base/drops/eco"
    },
    {
        title: "APOFENIA",
        description: "Apofenia is a short film directed by me with sound design by NAGUAL555. The image captures were taken during the SEED x BOSQUE GRACIAS artistic residency (2024), documenting various moments and works by different artists. Hydra-synth sound visualizers + pos-production.",
        media: "assets/artworks/apofenia.gif",
        type: "image",
        link: "https://zora.co/collect/zora:0xd5fa58b8ce342c89e7864e01f18233fc07983e78/116"
    },

];

let currentIndex = 0;

function updateContent() {
    const work = works[currentIndex];
    document.getElementById('work-title').textContent = work.title;
    document.getElementById('work-description').textContent = work.description;
    
    const mediaLink = document.getElementById('work-link');
    const imageElement = document.getElementById('work-image');
    const videoElement = document.getElementById('work-video');

    mediaLink.href = work.link;
    
    if (work.type === 'image') {
        imageElement.src = work.media;
        imageElement.style.display = 'block';
        videoElement.style.display = 'none';
    } else if (work.type === 'video') {
        videoElement.src = work.media;
        videoElement.style.display = 'block';
        imageElement.style.display = 'none';
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % works.length;
    updateContent();
});

// Initial content update
updateContent();