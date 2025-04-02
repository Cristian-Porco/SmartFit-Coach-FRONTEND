<head>
    <link rel="stylesheet" type="text/css" href="/css/account/body-measurements/style_home_body_measurements.css">
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
    import { getCookie } from 'svelte-cookie';

    let chartCanvas;
    let selectedId = null;

    onMount(async() => {
        toggleClassByPathEquals({
            substring: '/account/body-measurements',
            targetId: 'body-measurements-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'food-program-icon-item',
                'account-icon-item',
                'gym-program-icon-item'
            ]
        });

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