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
