// effects.js
(function () {
    // Add optional aura overlay element (kept subtle)
    const aura = document.createElement("div");
    aura.className = "aura-field";
    document.body.appendChild(aura);

    // If user prefers reduced motion, keep things calm.
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!reduceMotion) {
        document.body.classList.add("magical");
    }

    // Palette accents (style guide)
    const ACCENTS = [
        { name: "Aura Cyan", hex: "#7095B7", alt: "#8C7699" },
        { name: "Mist Lavender", hex: "#8C7699", alt: "#C0A990" },
        { name: "Halo Gold", hex: "#C0A990", alt: "#7095B7" },
        { name: "Dusk Violet", hex: "#4A4B78", alt: "#8C7699" },
        { name: "Midnight Indigo", hex: "#293656", alt: "#7095B7" }
    ];

    // Deterministic-ish randomness per load (so refresh feels like a new “shuffle”)
    const rand = (n) => Math.floor(Math.random() * n);

    // Assign each button its own accent.
    // Assign each button its own accent.
    const buttons = document.querySelectorAll(".btn.btn--accent");
    buttons.forEach((btn) => {
        // If it's the primary button, force Halo Gold
        if (btn.classList.contains("primary")) {
            // Halo Gold is index 2 in ACCENTS based on previous map, or we can just set it directly.
            // Looking at ACCENTS array: 2 -> Halo Gold
            const halo = ACCENTS.find(a => a.name === "Halo Gold") || ACCENTS[2];
            btn.style.setProperty("--accent", halo.hex);
            btn.style.setProperty("--accent2", halo.alt);
        } else {
            const pick = ACCENTS[rand(ACCENTS.length)];
            btn.style.setProperty("--accent", pick.hex);
            btn.style.setProperty("--accent2", pick.alt);
        }
    });

    // Interactive Aura (Mouse movement)
    document.addEventListener("mousemove", (e) => {
        if (!aura) return;

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Subtle shift opposite to mouse
        const moveX = (x - 0.5) * 20; // -10 to 10px
        const moveY = (y - 0.5) * 20;

        aura.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // Footer year
    const y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());
})();
