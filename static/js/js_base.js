document.addEventListener("DOMContentLoaded", function () {
    const accountAvatar = document.querySelector(".header img");
    const accountMenu = document.getElementById("accountMenu");

    accountAvatar.addEventListener("click", function () {
        accountMenu.style.display = accountMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!accountAvatar.contains(event.target) && !accountMenu.contains(event.target)) {
            accountMenu.style.display = "none";
        }
    });

    const buttons = document.querySelectorAll(".form-container button");

    buttons.forEach(button => {
        button.addEventListener("mousedown", function () {
            this.style.transform = "scale(0.95)";
        });

        button.addEventListener("mouseup", function () {
            this.style.transform = "scale(1)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });
});



function toggleClassByPathEquals({
                                       substring,
                                       targetId,
                                       className,
                                       removeFromIds = []
                                   }) {
    const path = window.location.pathname;

    //const shouldApply = path.includes(substring);
    const shouldApply = path === substring;
    const targetEl = document.getElementById(targetId);

    if (shouldApply && targetEl) {
        targetEl.classList.add(className);
    }

    // Rimuove la classe da tutti gli altri elementi
    removeFromIds.forEach(id => {
        if (id !== targetId) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove(className);
            }
        }
    });
}

function toggleClassByPathContains({
                                     substring,
                                     targetId,
                                     className,
                                     removeFromIds = []
                                 }) {
    const path = window.location.pathname;

    const shouldApply = path.includes(substring);
    const targetEl = document.getElementById(targetId);

    if (shouldApply && targetEl) {
        targetEl.classList.add(className);
    }

    // Rimuove la classe da tutti gli altri elementi
    removeFromIds.forEach(id => {
        if (id !== targetId) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove(className);
            }
        }
    });
}

function replaceAllCommasWithDots(str) {
    return str.replace(/,/g, '.');
}

function formatDateForInput(dateStr) {
    let [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`; // Restituisce formato YYYY-MM-DD
}