// effects_aura.js
(function () {
    // Smoother Aura Field
    const aura = document.createElement("div");
    aura.className = "aura-field";
    document.body.appendChild(aura);

    // Mouse flow
    let mouseX = 0, mouseY = 0;
    let auraX = 0, auraY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth lerp
        auraX += (mouseX - auraX) * 0.05;
        auraY += (mouseY - auraY) * 0.05;

        // Gentle counter-movement/flow based on position
        const offsetX = (auraX / window.innerWidth - 0.5) * -40;
        const offsetY = (auraY / window.innerHeight - 0.5) * -40;

        aura.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Footer Year
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // Switch Logic (if on index_aura.html)
    const toggle = document.getElementById("design-toggle");
    if (toggle) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            // Check current file and swap
            if (window.location.pathname.includes("index_aura.html")) {
                window.location.href = "index.html";
            } else {
                window.location.href = "index_aura.html";
            }
        });
    });
}

    // Carousel Auto-Scroll
    const carousel = document.querySelector(".carousel-grid");
if (carousel) {
    window.addEventListener("scroll", () => {
        // Only run if we can scroll
        if (carousel.scrollWidth <= carousel.clientWidth) return;

        const rect = carousel.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start scrolling when top of carousel hits middle of screen
        const startOffset = viewportHeight * 0.6; // Started a bit lower (0.6) so it catches earlier
        const endOffset = -rect.height * 0.5; // End when it's half past the top

        const totalDistance = startOffset - endOffset;
        const currentPos = startOffset - rect.top;
        let progress = currentPos / totalDistance;

        // Clamp 0-1
        progress = Math.max(0, Math.min(1, progress));

        // Map to scrollLeft
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollLeft = maxScroll * progress;
    });
}
}) ();
