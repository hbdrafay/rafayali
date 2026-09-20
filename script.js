/* =========================================================
   RAFAY BIRTHDAY SCRAPBOOK
   MOBILE SAFE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pages = Array.from(document.querySelectorAll(".page"));
    const totalPages = pages.length;

    let currentPage = 0;
    let isAnimating = false;

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentPageDisplay = document.getElementById("currentPage");
    const progress = document.getElementById("progress");

    const pageNames = [
        "Cover",
        "Chapter I",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "Chapter II",
        "07",
        "08",
        "09",
        "10",
        "11",
        "Chapter III",
        "12",
        "13",
        "14",
        "15",
        "Chapter IV",
        "16",
        "17",
        "18",
        "19",
        "Chapter V",
        "20",
        "21",
        "22",
        "23",
        "Chapter VI",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "Chapter VII",
        "30",
        "31",
        "32",
        "33",
        "34",
        "Chapter VIII",
        "35",
        "36",
        "Chapter IX",
        "37",
        "38",
        "39",
        "Chapter X",
        "40",
        "41",
        "42",
        "Final Chapter",
        "43",
        "44",
        "45"
    ];

    /* =====================================================
       PAGE DISPLAY
    ===================================================== */

    function updatePageDisplay() {

        if (currentPageDisplay) {
            currentPageDisplay.textContent =
                pageNames[currentPage] || currentPage;
        }

        if (progress) {
            const percentage =
                totalPages > 1
                    ? (currentPage / (totalPages - 1)) * 100
                    : 0;

            progress.style.width = `${percentage}%`;
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.style.opacity =
                currentPage === 0 ? "0" : "1";

            prevBtn.style.pointerEvents =
                currentPage === 0 ? "none" : "auto";
        }

        if (nextBtn) {
            nextBtn.disabled =
                currentPage === totalPages - 1;

            nextBtn.style.display =
                currentPage === totalPages - 1
                    ? "none"
                    : "block";
        }
    }


    /* =====================================================
       SHOW PAGE
    ===================================================== */

    function showPage(index, direction = "next") {

        if (
            isAnimating ||
            index < 0 ||
            index >= totalPages ||
            index === currentPage
        ) {
            return;
        }

        isAnimating = true;

        const oldPage = pages[currentPage];
        const newPage = pages[index];

        if (oldPage) {
            oldPage.classList.remove(
                "active",
                "turn-next",
                "turn-prev"
            );
        }

        if (newPage) {
            newPage.classList.add("active");

            newPage.classList.add(
                direction === "next"
                    ? "turn-next"
                    : "turn-prev"
            );
        }

        currentPage = index;

        updatePageDisplay();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {

            if (newPage) {
                newPage.classList.remove(
                    "turn-next",
                    "turn-prev"
                );
            }

            isAnimating = false;

            triggerPageEffects();

        }, 650);
    }


    function nextPage() {
        if (currentPage < totalPages - 1) {
            showPage(currentPage + 1, "next");
        }
    }


    function previousPage() {
        if (currentPage > 0) {
            showPage(currentPage - 1, "prev");
        }
    }


    /* =====================================================
       COVER
    ===================================================== */

    const openBook = document.getElementById("openBook");

    if (openBook) {
        openBook.addEventListener("click", () => {

            createHearts(18);

            setTimeout(() => {
                nextPage();
            }, 350);

        });
    }


    /* =====================================================
       NAVIGATION BUTTONS
    ===================================================== */

    if (nextBtn) {
        nextBtn.addEventListener("click", nextPage);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", previousPage);
    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {
            event.preventDefault();
            nextPage();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousPage();
        }

    });


    /* =====================================================
       SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (event) => {

        if (
            event.changedTouches &&
            event.changedTouches.length
        ) {
            touchStartX =
                event.changedTouches[0].screenX;
        }

    }, { passive: true });


    document.addEventListener("touchend", (event) => {

        if (
            event.changedTouches &&
            event.changedTouches.length
        ) {
            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();
        }

    }, { passive: true });


    function handleSwipe() {

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {
            nextPage();
        } else {
            previousPage();
        }
    }


    /* =====================================================
       SNACKS
    ===================================================== */

    const snickers =
        document.getElementById("snickers");

    const lays =
        document.getElementById("lays");


    function snackAnimation(element) {

        if (!element) {
            return;
        }

        element.animate(
            [
                {
                    transform: "translateY(0) rotate(0)"
                },
                {
                    transform:
                        "translateY(-20px) rotate(-8deg)"
                },
                {
                    transform:
                        "translateY(0) rotate(0)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );
    }


    if (snickers) {
        snickers.addEventListener("click", () => {
            snackAnimation(snickers);
            createHearts(3);
        });
    }


    if (lays) {
        lays.addEventListener("click", () => {
            snackAnimation(lays);
            createHearts(3);
        });
    }


    /* =====================================================
       EXAM PHONE
    ===================================================== */

    const examPhone =
        document.getElementById("examPhone");

    if (examPhone) {

        examPhone.addEventListener("click", () => {

            const text =
                document.getElementById("internetText");

            if (!text) {
                return;
            }

            text.textContent = "TRYING AGAIN...";

            setTimeout(() => {
                text.textContent =
                    "STILL NO INTERNET";
            }, 1200);

            setTimeout(() => {
                text.textContent =
                    "I THINK WE JUST HAVE TO TALK";
            }, 2600);

        });

    }


    /* =====================================================
       ENVELOPE
    ===================================================== */

    const envelope =
        document.getElementById("envelope");

    const hiddenLetter =
        document.getElementById("hiddenLetter");


    if (envelope && hiddenLetter) {

        envelope.addEventListener("click", () => {

            envelope.classList.toggle("open");

            setTimeout(() => {
                hiddenLetter.classList.toggle("visible");
            }, 350);

        });

    }


    /* =====================================================
       INTERNET CARDS
    ===================================================== */

    const appCards =
        document.querySelectorAll(".app-card");

    const appPopup =
        document.getElementById("appPopup");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupText =
        document.getElementById("popupText");

    const closePopup =
        document.getElementById("closePopup");


    const appMemories = {

        Rave:
            "Movies together, late conversations, and pretending we were actually sitting next to each other.",

        WePlay:
            "A little bit of competition, a lot of laughing, and somehow always one more game.",

        "Free Fire":
            "Because apparently spending time together also meant trying to defeat each other."

    };


    appCards.forEach(card => {

        card.addEventListener("click", () => {

            const memory =
                card.dataset.memory;

            if (
                appPopup &&
                popupTitle &&
                popupText
            ) {

                popupTitle.textContent =
                    memory || "";

                popupText.textContent =
                    appMemories[memory] || "";

                appPopup.classList.add("show");
            }

        });

    });


    if (closePopup && appPopup) {

        closePopup.addEventListener("click", () => {
            appPopup.classList.remove("show");
        });

    }


    /* =====================================================
       MOVIE TICKETS
    ===================================================== */

    const tickets =
        document.querySelectorAll(
            ".movie-tickets button"
        );


    tickets.forEach(ticket => {

        ticket.addEventListener("click", () => {

            ticket.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 1
                    },
                    {
                        transform:
                            "translateY(-35px) rotate(-8deg)",
                        opacity: 0.3
                    },
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 1
                    }
                ],
                {
                    duration: 650,
                    easing: "ease-out"
                }
            );

            createHearts(2);

        });

    });


    /* =====================================================
       RAIN
    ===================================================== */

    function createRain() {

        const container =
            document.getElementById("rain");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        for (let i = 0; i < 65; i++) {

            const drop =
                document.createElement("span");

            drop.className = "rain-drop";

            drop.style.left =
                `${Math.random() * 100}%`;

            drop.style.top =
                `${Math.random() * -100}%`;

            drop.style.animationDuration =
                `${0.7 + Math.random() * 0.8}s`;

            drop.style.animationDelay =
                `${Math.random() * 2}s`;

            container.appendChild(drop);
        }

    }

    createRain();


    /* =====================================================
       COMPLIMENTS
    ===================================================== */

    const compliments = [

        "Your smile.",
        "Your stupid little expressions.",
        "Your hair.",
        "Your kindness.",
        "Your eyes.",
        "The way you care.",
        "Your voice.",
        "The way you say things.",
        "Your softness.",
        "The way you love people.",
        "Your authenticity.",
        "Your ridiculous cuteness.",
        "The way you make me laugh.",
        "Your whole face, honestly.",
        "Your heart.",
        "Everything.",
        "Literally everything.",
        "Okay. There are too many.",
        "I told you I would never shut up."

    ];


    let complimentIndex = 0;

    const complimentText =
        document.getElementById("complimentText");

    const complimentButton =
        document.getElementById("complimentButton");

    const complimentCount =
        document.getElementById("complimentCount");


    if (complimentButton) {

        complimentButton.addEventListener(
            "click",
            () => {

                if (
                    complimentIndex <
                    compliments.length - 1
                ) {
                    complimentIndex++;
                }

                if (complimentText) {

                    complimentText.textContent =
                        compliments[complimentIndex];

                    complimentText.style.animation =
                        "none";

                    requestAnimationFrame(() => {

                        complimentText.style.animation =
                            "complimentIn 0.4s ease";

                    });

                }

                if (complimentCount) {

                    complimentCount.textContent =
                        Math.min(
                            complimentIndex + 1,
                            compliments.length
                        );

                }

                if (
                    complimentIndex ===
                    compliments.length - 1
                ) {

                    complimentButton.textContent =
                        "okay okay 😭";

                    createHearts(15);

                } else {

                    createHearts(2);

                }

            }
        );

    }


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createHearts(amount = 5) {

        const container =
            document.getElementById("floatingHearts");

        if (!container) {
            return;
        }

        for (let i = 0; i < amount; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent =
                Math.random() > 0.25
                    ? "♥"
                    : "♡";

            heart.style.left =
                `${10 + Math.random() * 80}%`;

            heart.style.bottom =
                `${-20 + Math.random() * 10}px`;

            heart.style.fontSize =
                `${12 + Math.random() * 22}px`;

            heart.style.animationDuration =
                `${2.5 + Math.random() * 2.5}s`;

            heart.style.animationDelay =
                `${Math.random() * 0.5}s`;

            container.appendChild(heart);

            setTimeout(() => {

                if (heart.parentNode) {
                    heart.remove();
                }

            }, 6000);

        }

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti(amount = 80) {

        const container =
            document.getElementById("confetti");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const colors = [
            "#9e2734",
            "#d99aa0",
            "#b69257",
            "#651d27",
            "#e7d7ae"
        ];

        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti-piece";

            piece.style.left =
                `${Math.random() * 100}%`;

            piece.style.width =
                `${5 + Math.random() * 6}px`;

            piece.style.height =
                `${7 + Math.random() * 10}px`;

            piece.style.animationDelay =
                `${Math.random() * 1.2}s`;

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];

            container.appendChild(piece);

        }

    }


    /* =====================================================
       PAGE EFFECTS
    ===================================================== */

    function triggerPageEffects() {

        const page =
            pages[currentPage];

        if (!page) {
            return;
        }


        if (
            page.classList.contains(
                "notification-page"
            ) ||
            page.classList.contains(
                "message-page"
            )
        ) {

            setTimeout(() => {
                createHearts(4);
            }, 500);

        }


        if (
            page.classList.contains(
                "realization-page"
            )
        ) {

            setTimeout(() => {
                createHearts(6);
            }, 400);

        }


        if (
            page.classList.contains(
                "confession-page"
            )
        ) {

            setTimeout(() => {
                createHearts(10);
            }, 500);

        }


        if (
            page.classList.contains(
                "ending-page"
            )
        ) {

            setTimeout(() => {

                createConfetti();
                createHearts(25);

            }, 400);

        }

    }


    /* =====================================================
       PAGE CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const page =
                event.target.closest(".page");

            if (!page) {
                return;
            }

            if (
                event.target.closest("button") ||
                event.target.closest(".envelope") ||
                event.target.closest(".snack-card") ||
                event.target.closest(".app-card")
            ) {
                return;
            }

            if (Math.random() > 0.7) {
                createHearts(1);
            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    pages.forEach(page => {
        page.classList.remove(
            "active",
            "turn-next",
            "turn-prev"
        );
    });

    if (pages[0]) {
        pages[0].classList.add("active");
    }

    currentPage = 0;

    updatePageDisplay();


    /* =====================================================
       HIDE LOADING SCREEN
       
       IMPORTANT:
       This is deliberately LAST.
       Nothing before this should be able to stop
       the loading screen from disappearing.
    ===================================================== */

    const loading =
        document.getElementById("loading");

    if (loading) {

        setTimeout(() => {

            loading.classList.add("hidden");

        }, 900);

    }


    /* =====================================================
       PERIODIC HEARTS
    ===================================================== */

    setInterval(() => {

        if (
            currentPage > 0 &&
            Math.random() > 0.55
        ) {
            createHearts(1);
        }

    }, 5000);

});
