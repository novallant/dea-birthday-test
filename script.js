/* =====================================================
   SETTINGS
===================================================== */

/*
   GANTI TANGGAL DI SINI

   Contoh:
   20 September 2026 pukul 00:00 WIB
*/

const targetDate =
    "2026-09-19T10:00:00+07:00";



/* =====================================================
   ELEMENTS
===================================================== */

const countdownScreen =
    document.getElementById(
        "countdownScreen"
    );

const experience =
    document.getElementById(
        "experience"
    );

const startButton =
    document.getElementById(
        "startButton"
    );

const countdownMessage =
    document.getElementById(
        "countdownMessage"
    );

const music =
    document.getElementById(
        "music"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );



/* =====================================================
   COUNTDOWN
===================================================== */

let unlocked = false;


function updateCountdown() {

    const now =
        Date.now();

    const target =
        new Date(
            targetDate
        ).getTime();

    const diff =
        target - now;


    if (diff <= 0) {

        unlocked = true;


        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";


        startButton.disabled =
            false;

        startButton.textContent =
            "💗 Buka Surprise";


        countdownMessage.textContent =
            "it's time ♡";


        return;

    }


    const days =
        Math.floor(
            diff / 86400000
        );


    const hours =
        Math.floor(
            diff %
            86400000 /
            3600000
        );


    const minutes =
        Math.floor(
            diff %
            3600000 /
            60000
        );


    const seconds =
        Math.floor(
            diff %
            60000 /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2,"0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2,"0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2,"0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2,"0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   START
===================================================== */

startButton.addEventListener(
    "click",
    async () => {

        if (!unlocked) {
            return;
        }


        countdownScreen.classList.add(
            "hidden"
        );


        experience.classList.remove(
            "hidden"
        );


        musicButton.style.display =
            "block";


        try {

            await music.play();

            musicButton.textContent =
                "♫";

            musicButton.classList.add(
                "playing"
            );

        } catch {

            musicButton.textContent =
                "♪";

        }


        startFloatingHearts();

        updateProgress(1);

    }
);



/* =====================================================
   PROGRESS
===================================================== */

const totalSteps = 7;


function updateProgress(
    step
) {

    const progressText =
        document.getElementById(
            "progressText"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );


    progressText.textContent =
        `${String(step).padStart(2,"0")} / 07`;


    progressFill.style.width =
        `${(step / totalSteps) * 100}%`;

}


function goToStep(
    stepNumber
) {

    document
        .querySelectorAll(
            ".step"
        )
        .forEach(
            step => {

                step.classList.remove(
                    "active"
                );

            }
        );


    const step =
        document.getElementById(
            `step${stepNumber}`
        );


    step.classList.add(
        "active"
    );


    updateProgress(
        stepNumber
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =====================================================
   STEP 1
   TAP HEART
===================================================== */

const mainHeart =
    document.getElementById(
        "mainHeart"
    );


mainHeart.addEventListener(
    "click",
    () => {

        mainHeart.classList.remove(
            "pop"
        );

        void mainHeart.offsetWidth;

        mainHeart.classList.add(
            "pop"
        );


        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        setTimeout(
            () => {

                goToStep(2);

                startHeartGame();

            },
            550
        );

    }
);



/* =====================================================
   STEP 2
   COLLECT 3 HEARTS
===================================================== */

const heartArena =
    document.getElementById(
        "heartArena"
    );

const heartCount =
    document.getElementById(
        "heartCount"
    );

const heartNext =
    document.getElementById(
        "heartNext"
    );


let collectedHearts = 0;


function startHeartGame() {

    collectedHearts = 0;

    heartCount.textContent = "0";

    heartNext.disabled = true;

    heartNext.textContent =
        "Kumpulin Dulu Sayangg ♡";


    heartArena.innerHTML = "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        createArenaHeart();

    }

}


function createArenaHeart() {

    const heart =
        document.createElement(
            "button"
        );


    heart.className =
        "arena-heart";


    heart.innerHTML =
        Math.random() > .5
            ? "♥"
            : "♡";


    const arenaWidth =
        heartArena.clientWidth;


    const arenaHeight =
        heartArena.clientHeight;


    const x =
        Math.random() *
        (arenaWidth - 70);


    const y =
        Math.random() *
        (arenaHeight - 70);


    heart.style.left =
        `${x}px`;


    heart.style.top =
        `${y}px`;


    heart.addEventListener(
        "click",
        () => {

            collectedHearts++;


            heartCount.textContent =
                collectedHearts;


            createBurst(
                heart.getBoundingClientRect().left,
                heart.getBoundingClientRect().top
            );


            heart.remove();


            if (
                collectedHearts >= 3
            ) {

                heartNext.disabled =
                    false;

                heartNext.textContent =
                    "Yeayyy semuanya ketemu →";

            }

        }
    );


    heartArena.appendChild(
        heart
    );

}



/* NEXT */

heartNext.addEventListener(
    "click",
    () => {

        if (
            collectedHearts < 3
        ) {

            return;

        }


        goToStep(3);

    }
);



/* =====================================================
   STEP 3
   ENVELOPE
===================================================== */

const envelope =
    document.getElementById(
        "envelope"
    );


let envelopeOpened = false;


envelope.addEventListener(
    "click",
    () => {

        if (envelopeOpened) {
            return;
        }


        envelopeOpened = true;


        envelope.classList.add(
            "open"
        );


        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        setTimeout(
            () => {

                goToStep(4);

            },
            1000
        );

    }
);



/* =====================================================
   STEP 4
   LETTER
===================================================== */

const letterNext =
    document.getElementById(
        "letterNext"
    );


letterNext.addEventListener(
    "click",
    () => {

        goToStep(5);

    }
);



/* =====================================================
   STEP 5
   PHOTO
===================================================== */

const photoCards =
    document.querySelectorAll(
        ".photo-card"
    );

const photoMessage =
    document.getElementById(
        "photoMessage"
    );

const photoNext =
    document.getElementById(
        "photoNext"
    );


let photoSelected = false;


photoCards.forEach(
    photo => {

        photo.addEventListener(
            "click",
            () => {

                photoCards.forEach(
                    p =>
                        p.classList.remove(
                            "selected"
                        )
                );


                photo.classList.add(
                    "selected"
                );


                photoSelected = true;


                photoMessage.textContent =
                    photo.dataset.message;


                photoNext.disabled =
                    false;

                photoNext.textContent =
                    "Oke, Lanjut Sayangg→";


                const image =
                    photo.querySelector(
                        "img"
                    );


                previewImage.src =
                    image.src;


                lightbox.classList.add(
                    "show"
                );

            }
        );

    }
);



/* NEXT */

photoNext.addEventListener(
    "click",
    () => {

        if (!photoSelected) {
            return;
        }


        goToStep(6);

    }
);



/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const previewImage =
    document.getElementById(
        "previewImage"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


closeLightbox.addEventListener(
    "click",
    () => {

        lightbox.classList.remove(
            "show"
        );

    }
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            lightbox.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   STEP 6
   GIFT
===================================================== */

const gift =
    document.getElementById(
        "gift"
    );

const giftButton =
    document.getElementById(
        "giftButton"
    );


giftButton.addEventListener(
    "click",
    () => {

        gift.classList.add(
            "open"
        );


        createConfetti();


        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        giftButton.textContent =
            "♡";


        setTimeout(
            () => {

                goToStep(7);

                createConfetti();

                createBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );

            },
            1100
        );

    }
);



/* =====================================================
   FLOATING HEARTS
===================================================== */

let heartsStarted = false;


function startFloatingHearts() {

    if (heartsStarted) {
        return;
    }


    heartsStarted = true;


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        setTimeout(
            createFloatingHeart,
            i * 280
        );

    }


    setInterval(
        createFloatingHeart,
        850
    );

}


function createFloatingHeart() {

    const container =
        document.getElementById(
            "floatingHearts"
        );


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "float-heart";


    const types = [
        "♡",
        "♥",
        "♡",
        "♡"
    ];


    heart.textContent =
        types[
            Math.floor(
                Math.random() *
                types.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}vw`;


    heart.style.fontSize =
        `${12 + Math.random() * 22}px`;


    heart.style.animationDuration =
        `${7 + Math.random() * 6}s`;


    heart.style.animationDelay =
        `${Math.random() * 1.2}s`;


    container.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        15000
    );

}



/* =====================================================
   BURST HEART
===================================================== */

function createBurst(
    x,
    y
) {

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.textContent =
            Math.random() > .5
            ? "♥"
            : "♡";


        item.style.position =
            "fixed";


        item.style.left =
            `${x}px`;


        item.style.top =
            `${y}px`;


        item.style.color =
            "#d96587";


        item.style.fontSize =
            `${14 + Math.random() * 18}px`;


        item.style.pointerEvents =
            "none";


        item.style.zIndex =
            "500";


        document.body.appendChild(
            item
        );


        const randomX =
            (Math.random() - .5) *
            350;


        const randomY =
            (Math.random() - .5) *
            350;


        const animation =
            item.animate(

                [

                    {
                        transform:
                            "translate(-50%,-50%) scale(.4)",

                        opacity:
                            1

                    },

                    {

                        transform:
                            `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) scale(1.2)`,

                        opacity:
                            0

                    }

                ],

                {

                    duration:
                        850 +
                        Math.random() * 450,

                    easing:
                        "ease-out",

                    fill:
                        "forwards"

                }

            );


        animation.onfinish =
            () => {

                item.remove();

            };

    }

}



/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        item.style.position =
            "fixed";


        item.style.left =
            `${Math.random() * 100}vw`;


        item.style.top =
            "-30px";


        item.style.color =
            Math.random() > .5
                ? "#d96587"
                : "#f0a7bd";


        item.style.fontSize =
            `${12 + Math.random() * 18}px`;


        item.style.zIndex =
            "999";


        item.style.pointerEvents =
            "none";


        document.body.appendChild(
            item
        );


        const duration =
            1800 +
            Math.random() * 2500;


        const x =
            (Math.random() - .5) *
            300;


        const animation =
            item.animate(

                [

                    {

                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity:
                            1

                    },

                    {

                        transform:
                            `translate(${x}px, 110vh) rotate(720deg)`,

                        opacity:
                            0

                    }

                ],

                {

                    duration:
                        duration,

                    easing:
                        "ease-out",

                    fill:
                        "forwards"

                }

            );


        animation.onfinish =
            () => {

                item.remove();

            };

    }

}



/* =====================================================
   MUSIC
===================================================== */

musicButton.addEventListener(
    "click",
    async () => {

        if (
            music.paused
        ) {

            try {

                await music.play();

                musicButton.textContent =
                    "♫";

                musicButton.classList.add(
                    "playing"
                );

            } catch {

                console.log(
                    "Music blocked by browser."
                );

            }

        } else {

            music.pause();

            musicButton.textContent =
                "♪";

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);



/* =====================================================
   ESCAPE LIGHTBOX
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            lightbox.classList.remove(
                "show"
            );

        }

    }
);
