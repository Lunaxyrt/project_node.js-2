document.addEventListener("DOMContentLoaded", () => {
    /* Показать/скрыть пароль */
    const password = document.getElementById("password");
    const toggleEye = document.getElementById("toggleEye");

    toggleEye.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            toggleEye.textContent = "🙈";
        } else {
            password.type = "password";
            toggleEye.textContent = "👁️";
        }
    });

    /* Частицы */
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const PARTICLE_COUNT = 80;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});
