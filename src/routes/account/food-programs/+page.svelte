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
        .food-programs-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            transition: transform 0.2s;
        }
        .food-programs-item .details .average {
            margin-right: 10px;
            font-weight: bold;
        }
        .food-programs-item .buttons {
            display: flex;
            gap: 10px;
        }
        .food-programs-item .buttons button {
            padding: 10px 15px;
            color: white;
            cursor: pointer;
            height: 100%;
            margin: 0
        }
        .food-programs-item .buttons .delete-btn {
            background: red;
        }
        .food-programs-item .buttons .delete-btn:hover {
            background: #a62f28;
        }
        .food-programs-item:last-child {
            border-bottom: none;
        }
        @media (max-width: 768px) {
            .main-content {
                width: 100%;
                min-width: 100%;
            }
        }
    </style>
</head>

<h2 class="titlePage">Schede alimentari</h2>

<div class="form-container">
    <button on:click={addFoodPrograms}>Aggiungi scheda</button>
</div>

<div class="form-container">
    <h3>Storico schede</h3>
    <div id="food-programs-items">

    </div>
</div>

<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import { redirect } from "@sveltejs/kit";

    let chartCanvas;
    let selectedId = null;

    onMount(async() => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        const container = document.getElementById('food-programs-items');

        if(data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('food-programs-item');
                const sameDate = item.start_date === item.end_date;
                const dateText = sameDate
                    ? `Scheda alimentare del ${item.start_date}`
                    : `Scheda alimentare dal ${item.start_date} al ${item.end_date}`;

                div.innerHTML = `
                    <div class="details">
                        <span class="average">${dateText}</span>
                    </div>
                    <div class="buttons">
                        <button class="view-btn" data-id="${item.id}">Visualizza</button>
                        <button class="edit-btn" data-id="${item.id}">Modifica</button>
                        <button class="delete-btn" data-id="${item.id}">Elimina</button>
                    </div>
                `;

                container.appendChild(div);
            });

            document.querySelectorAll(".view-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    window.location.href = `/account/food-programs/view/${selectedId}`;
                });
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    window.location.href = `/account/food-programs/edit/${selectedId}`;
                });
            });

            // Event listener per eliminare il peso
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    const deleteResponse = await fetch(`http://127.0.0.1:8000/api/v1/data/food-plan/delete/${selectedId}/`, {
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
            });
        } else {
            const p = document.createElement('p');
            p.style = "margin: 10px 0;";
            p.innerHTML = "Nessuna scheda presente!";
            container.appendChild(p);
        }
    });

    function addFoodPrograms() {
        window.location.href = "/account/food-programs/add";
    }
</script>