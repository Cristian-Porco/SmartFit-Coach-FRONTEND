<head>
    <style>
        .icon-sidebar {
            display: flex;
        }
        .sidebar {
            display: none;
        }
        .main-content {
            min-width: 800px;
            max-width: 800px;
        }
        .gym-programs-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            transition: transform 0.2s;
        }
        .gym-programs-item .details .average {
            margin-right: 10px;
            font-weight: bold;
        }
        .gym-programs-item .buttons {
            display: flex;
            gap: 10px;
        }
        .gym-programs-item .buttons button {
            padding: 10px 15px;
            color: white;
            cursor: pointer;
            height: 100%;
            margin: 0
        }
        .gym-programs-item .buttons .delete-btn {
            background: red;
        }
        .gym-programs-item .buttons .delete-btn:hover {
            background: #a62f28;
        }
        .gym-programs-item:last-child {
            border-bottom: none;
        }

        .animated-gradient-border {
            position: relative;
            background: white;
            padding: 8px 13px !important;
            z-index: 0;
            border: 2px solid transparent;
            font-weight: bold;

            /* Imposta sfumatura per bordo e testo */
            background-image: linear-gradient(white, white),
            linear-gradient(90deg, #ff0000, #ff9900, #33cc33, #3399ff, #cc33ff, #ff0000);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            animation: animated-border 6s linear infinite;
            background-size: 400% 100%;
        }

        .animated-gradient-border:hover {
            -webkit-text-fill-color: white; /* cambia il testo a bianco per contrasto */
        }

        @keyframes animated-border {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        @media (max-width: 768px) {
            .main-content {
                width: 100%;
                min-width: 100%;
            }
        }
    </style>
</head>

<h2 class="titlePage">Schede di allenamento</h2>

<div class="form-container">
    <button on:click={addGymPrograms}>Aggiungi scheda</button>
</div>

<div class="form-container">
    <h3>Storico schede</h3>
    <div id="gym-programs-items">

    </div>
</div>

<script>
    import { onMount } from "svelte";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    let selectedId = null;

    function parseDateIT(str) {
        const [gg, mm, aaaa] = str.split('/');
        return new Date(`${aaaa}-${mm}-${gg}`); // ISO: YYYY-MM-DD
    }

    onMount(async() => {
        if(getCookie('csrftoken') === "") window.location.href = "/";

        toggleClassByPathEquals({
            targetId: 'gym-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'food-program-icon-item'
            ]
        });

        const response = await fetch("http://127.0.0.1:8000/api/v1/data/gym-plan/me-min/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        const container = document.getElementById('gym-programs-items');

        if(data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('gym-programs-item');
                const dateText = `Scheda di allenamento dal ${item.start_date} al ${item.end_date}`;
                let targetView = "Visualizza";
                let classList = "view-btn";

                const today = new Date();
                const start = parseDateIT(item.start_date);
                const end = parseDateIT(item.end_date);



                const detailsDiv = document.createElement("div");
                detailsDiv.classList.add("details");

                const dateSpan = document.createElement("span");
                dateSpan.classList.add("average");
                dateSpan.textContent = dateText;

                detailsDiv.appendChild(dateSpan);

                const buttonsDiv = document.createElement("div");
                buttonsDiv.classList.add("buttons");

                const viewBtn = document.createElement("button");
                let color;
                if (today >= start && today <= end) {
                    targetView = "Allenati!";
                    classList += " animated-gradient-border";
                    color = "#3e3e3e";
                }
                viewBtn.className = classList;
                viewBtn.dataset.id = item.id;
                viewBtn.innerHTML = targetView;
                viewBtn.style.color = color;
                viewBtn.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    window.location.href = `/account/gym-programs/view/${selectedId}`;
                });

                const editBtn = document.createElement("button");
                editBtn.className = "edit-btn";
                editBtn.dataset.id = item.id;
                editBtn.textContent = "Modifica";
                editBtn.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    window.location.href = `/account/gym-programs/edit/${selectedId}`;
                })

                const deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn";
                deleteBtn.dataset.id = item.id;
                deleteBtn.textContent = "Elimina";
                deleteBtn.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    const deleteResponse = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan/delete/${selectedId}/`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        }
                    });

                    if(deleteResponse.ok) {
                        location.reload();
                    }
                });

                buttonsDiv.appendChild(viewBtn);
                buttonsDiv.appendChild(editBtn);
                buttonsDiv.appendChild(deleteBtn);

                div.appendChild(detailsDiv);
                div.appendChild(buttonsDiv);

                container.appendChild(div);
            });
        } else {
            const p = document.createElement('p');
            p.style = "margin: 10px 0;";
            p.innerHTML = "Nessuna scheda presente!";
            container.appendChild(p);
        }
    });

    function addGymPrograms() {
        window.location.href = "/account/gym-programs/add";
    }
</script>