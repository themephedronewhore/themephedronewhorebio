// modal window code removed; only menu toggle remains

document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('[data-target]');
    const panels = document.querySelectorAll('.menu-panel');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetPanel = document.getElementById(targetId);

            panels.forEach(panel => {
                if (panel !== targetPanel) {
                    panel.classList.remove('active');
                }
            });

            targetPanel.classList.toggle('active');
        });
    });

    document.querySelectorAll('.menu-panel a').forEach(link => {
        link.addEventListener('click', () => {
            panels.forEach(panel => panel.classList.remove('active'));
        });
    });

    // Scroll effect for h1
    const h1 = document.querySelector('h1');
    if (h1) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight * 0.5; // start shrinking earlier
            const scale = Math.max(0.4, 1 - (scrollY / maxScroll) * 0.6); // scale from 1 to 0.4
            h1.style.transform = `scale(${scale})`;
        });
    }

});
