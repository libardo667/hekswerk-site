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
    }
})();
