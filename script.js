/* =========================================================
   MY LITTLE DIGITAL JOURNAL
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navMenu.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* =====================================================
       02. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .add("active");

                            revealObserver
                                .unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       03. SAFE IMAGE FALLBACK
    ====================================================== */

    const images =
        document.querySelectorAll(".safe-image");


    images.forEach(image => {

        image.addEventListener("error", () => {

            const wrapper =
                image.closest(".photo-wrap") ||
                image.parentElement;

            if (wrapper) {

                wrapper.classList
                    .add("image-missing");

            }

        });

    });


    /* =====================================================
       04. MUSIC PLAYER
    ====================================================== */

    const music =
        document.getElementById(
            "backgroundMusic"
        );

    const musicToggle =
        document.getElementById(
            "musicToggle"
        );

    const volumeControl =
        document.getElementById(
            "volumeControl"
        );

    const musicPlayer =
        document.querySelector(
            ".music-player"
        );


    if (music && musicToggle) {

        music.volume = 0.5;


        musicToggle.addEventListener(
            "click",
            () => {

                if (music.paused) {

                    music.play()
                        .then(() => {

                            musicToggle.textContent =
                                "❚❚";

                            musicToggle
                                .setAttribute(
                                    "aria-label",
                                    "หยุดเพลง"
                                );

                            if (musicPlayer) {

                                musicPlayer
                                    .classList
                                    .add("playing");

                            }

                        })
                        .catch(() => {

                            musicToggle.textContent =
                                "▶";

                        });

                } else {

                    music.pause();

                    musicToggle.textContent =
                        "▶";

                    musicToggle
                        .setAttribute(
                            "aria-label",
                            "เปิดเพลง"
                        );

                    if (musicPlayer) {

                        musicPlayer
                            .classList
                            .remove("playing");

                    }

                }

            }
        );


        if (volumeControl) {

            volumeControl.addEventListener(
                "input",
                () => {

                    music.volume =
                        volumeControl.value;

                }
            );

        }

    }


    /* =====================================================
       05. CUSTOM APPLE CURSOR
    ====================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (!isTouchDevice) {

        document.body
            .classList
            .add(
                "custom-cursor-enabled"
            );


        const cursor =
            document.createElement("div");

        cursor.className =
            "cursor-apple";

        cursor.textContent =
            "🍎";

        document.body.appendChild(cursor);


        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                createParticle(
                    mouseX,
                    mouseY
                );

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX)
                * 0.18;

            currentY +=
                (mouseY - currentY)
                * 0.18;


            cursor.style.left =
                `${currentX}px`;

            cursor.style.top =
                `${currentY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /* =================================================
           CURSOR PARTICLES
        ================================================== */

        const particleSymbols = [
            "✨",
            "⭐",
            "♡",
            "🌱"
        ];

        let lastParticleTime = 0;


        function createParticle(x, y) {

            const now =
                Date.now();

            if (
                now - lastParticleTime <
                90
            ) {
                return;
            }

            lastParticleTime =
                now;


            const particle =
                document.createElement("span");

            particle.className =
                "cursor-particle";

            particle.textContent =
                particleSymbols[
                    Math.floor(
                        Math.random()
                        * particleSymbols.length
                    )
                ];


            particle.style.left =
                `${x + (Math.random() * 12 - 6)}px`;

            particle.style.top =
                `${y + (Math.random() * 12 - 6)}px`;


            document.body.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 800);


            /* จำกัดจำนวน Particle */

            const particles =
                document.querySelectorAll(
                    ".cursor-particle"
                );

            if (particles.length > 20) {

                particles[0].remove();

            }

        }

    }


    /* =====================================================
       06. BUTTON MICRO INTERACTION
    ====================================================== */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener(
                "mousedown",
                () => {

                    button.style.transform =
                        "scale(.97)";

                }
            );


            button.addEventListener(
                "mouseup",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       07. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !navMenu ||
                !menuToggle
            ) {
                return;
            }


            const clickedInsideMenu =
                navMenu.contains(
                    event.target
                );

            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navMenu.classList
                    .remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       08. IMAGE HOVER EFFECT
    ====================================================== */

    document
        .querySelectorAll(
            ".polaroid, .scrap-photo, .memory-photo"
        )
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.zIndex =
                        "20";

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.zIndex =
                        "";

                }
            );

        });


    /* =====================================================
       09. CURRENT YEAR
    ====================================================== */

    const year =
        new Date().getFullYear();


    document
        .querySelectorAll(
            ".footer-bottom"
        )
        .forEach(element => {

            element.innerHTML =
                element.innerHTML.replace(
                    "2026",
                    year
                );

        });

});
