// Monster Truck Arena – landing page behaviour.
// Everything here is decoration: the page reads the same with scripting off.

const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// The nav picks up its edge once the hero scrolls under it
const nav = document.getElementById("nav");

const markNav = () => nav.classList.toggle("nav--stuck", window.scrollY > 24);

markNav();
window.addEventListener("scroll", markNav, { passive: true });

// Sections rise in as they arrive
const revealed = document.querySelectorAll(".reveal");

if (calmMotion.matches) {
    revealed.forEach((element) => element.classList.add("is-in"));
} else {
    const watcher = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            watcher.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -12% 0px" });

    revealed.forEach((element) => watcher.observe(element));
}

// The steering demo only runs while it is on screen
const knob = document.querySelector("[data-steer-knob]");

if (knob && !calmMotion.matches) {
    const demo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => knob.classList.toggle("is-steering", entry.isIntersecting));
    });
    demo.observe(knob);
}

// The garage: each truck takes the four player colours, in the order players join
const paints = [
    { name: "Orange", face: "#FF963C", lip: "#EA5A32" },
    { name: "Blue", face: "#4DB8F3", lip: "#0093D7" },
    { name: "Yellow", face: "#FFDD31", lip: "#FFC000" },
    { name: "Green", face: "#B1FF3C", lip: "#6CEA32" },
];

document.querySelectorAll("[data-truck]").forEach((card) => {
    const truck = card.dataset.truck;
    const image = card.querySelector("[data-truck-image]");
    const swatches = card.querySelector(".swatches");
    const title = card.querySelector("h3").textContent;
    const shown = image.getAttribute("src").replace(`assets/trucks/${truck}`, "").replace(".png", "");

    paints.forEach((paint) => {
        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "swatch";
        swatch.style.setProperty("--face", paint.face);
        swatch.style.setProperty("--face-lip", paint.lip);
        swatch.setAttribute("aria-pressed", String(paint.name === shown));
        swatch.setAttribute("aria-label", `Paint the ${title} ${paint.name.toLowerCase()}`);

        swatch.addEventListener("click", () => {
            swatches.querySelectorAll(".swatch").forEach((other) => other.setAttribute("aria-pressed", "false"));
            swatch.setAttribute("aria-pressed", "true");
            paintTruck(image, truck, title, paint.name);
        });

        swatches.append(swatch);
    });
});

// Faded out and back, so the paint changes instead of the picture jumping
function paintTruck(image, truck, title, colorName) {
    const next = new Image();
    next.src = `assets/trucks/${truck}${colorName}.png`;
    image.classList.add("is-swapping");

    const apply = () => {
        image.src = next.src;
        image.alt = `The ${title} monster truck, painted ${colorName.toLowerCase()}`;
        image.classList.remove("is-swapping");
    };

    if (calmMotion.matches) {
        apply();
        return;
    }

    // Held until the fade is through as well, or a cached picture swaps with no fade at all
    const decoded = next.decode().catch(() => {});
    const faded = new Promise((resolve) => setTimeout(resolve, 180));
    Promise.all([decoded, faded]).then(apply);
}
