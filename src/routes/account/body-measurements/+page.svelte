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
        .body-measurements-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            transition: transform 0.2s;
        }
        .body-measurements-item:first-child {
            font-size: 50px !important;
        }
        .body-measurements-item:first-child .details .date {
            font-size: 16px;
        }
        .body-measurements-item .details {
            display: block;
            justify-content: flex-start;
            align-items: center;
        }
        .body-measurements-item .details .average {
            margin-right: 10px;
            font-weight: bold;
        }
        .body-measurements-item .details .date {
            color: #777;
        }
        .body-measurements-item .buttons {
            display: flex;
            gap: 10px;
        }
        .body-measurements-item .buttons button {
            padding: 10px 15px;
            color: white;
            cursor: pointer;
            height: 100%;
            margin: 0
        }
        .body-measurements-item .buttons .delete-btn {
            background: red;
        }
        .body-measurements-item .buttons .delete-btn:hover {
            background: #a62f28;
        }
        .body-measurements-item:last-child {
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

<h2 class="titlePage">Misure corporee</h2>

<div class="form-container">
    <button on:click={addBodyMeasurement}>Aggiungi misurazione</button>
</div>

<div class="form-container">
    <h3>Storico misurazioni</h3>
    <div id="body-measurements-items">

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
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/body-measurement/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        const container = document.getElementById('body-measurements-items');

        if(data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('body-measurements-item');
                div.innerHTML = `
                <div class="details">
                    <span class="average">${item.average_measurement} cm</span>
                    <span class="date">${item.date_recorded}</span>
                </div>
                <div class="buttons">
                    <button class="edit-btn" data-id="${item.id}">Modifica</button>
                    <button class="delete-btn" data-id="${item.id}">Elimina</button>
                </div>
            `;

                container.appendChild(div);
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    window.location.href = `/account/body-measurements/edit/${selectedId}`;
                });
            });

            // Event listener per eliminare il peso
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    selectedId = event.target.getAttribute("data-id");
                    const deleteResponse = await fetch(`http://127.0.0.1:8000/api/v1/data/body-measurement/delete/${selectedId}/`, {
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
            p.innerHTML = "Nessuna misurazione presente!";
            container.appendChild(p);
        }
    });

    function addBodyMeasurement() {
        window.location.href = "/account/body-measurements/add";
    }
</script>