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
        .areaChartZone {
            height: 40vh;
            background: linear-gradient(to right, #4d4d4d, #b3b3b3);
            padding: 25px;
            margin: 25px 0;
            border-radius: 25px;
        }
        .areaChartZone h3 {
            color: white;
            font-size: 36px;
        }
        .areaChartZone p {
            color: white;
        }
        .form-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .form-group {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        .input-container {
            flex: 1;
            min-width: 200px;
            display: flex;
            flex-direction: column;
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
        .body-measurements-item .details .weight {
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

        .popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .popup {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
            width: 400px;
        }

        .popup h3 {
            margin-bottom: 15px;
        }

        .popup .form-group {
            display: flex;
            gap: 0px;
            flex-direction: column;
        }

        .popup #cancel-edit {
            margin-bottom: 0px;
        }

        @media (max-width: 768px) {
            .main-content {
                width: 100%;
                min-width: 100%;
            }
            .form-group {
                flex-direction: column;
            }
        }
    </style>
</head>

<h2 class="titlePage">Peso</h2>

<form class="form-container" on:submit={addWeight}>
    <h3>Aggiungi peso</h3>
    <div class="error" id="error1">
        <p></p>
    </div>
    <div class="info" id="info1">
        <p></p>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="weight">Peso:</label>
            <input type="text" id="add-weight" name="weight" placeholder="Peso..." required>
        </div>
        <div class="input-container">
            <label for="date_recorded">Data di registrazione:</label>
            <input type="date" id="add-date" name="date_recorded" required>
        </div>
    </div>
    <div class="form-group">
        <button type="submit">Aggiungi</button>
    </div>
</form>

<div id="chartWeights" class="areaChartZone">
    <canvas bind:this={chartCanvas} style="width:100%; height:100%;"></canvas>
</div>

<div>
    <h3>Storico peso</h3>
    <div id="weight-items">

    </div>
</div>

<div id="edit-popup" class="popup-overlay">
    <div class="popup">
        <h3>Modifica Peso</h3>
        <div class="error" id="error2">
            <p></p>
        </div>
        <div class="form-group">
            <div class="input-container">
                <label for="edit-weight">Peso:</label>
                <input type="text" id="edit-weight" required>
            </div>
            <div class="input-container">
                <label for="edit-date">Data di registrazione:</label>
                <input type="date" id="edit-date" required>
            </div>
        </div>
        <div class="form-group">
            <button id="save-edit">Salva</button>
            <button id="cancel-edit">Annulla</button>
        </div>
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
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/weight/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        const container = document.getElementById('weight-items');

        if(data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('weight-item');
                div.innerHTML = `
                <div class="details">
                    <span class="weight">${item.weight_value} kg</span>
                    <span class="date">${item.date_recorded}</span>
                </div>
                <div class="buttons">
                    <button class="edit-btn" data-id="${item.id}" data-weight="${item.weight_value}" data-date="${item.date_recorded}">Modifica</button>
                    <button class="delete-btn" data-id="${item.id}">Elimina</button>
                </div>
            `;

                container.appendChild(div);
            });
        } else {
            document.getElementById("chartWeights").style.display = "none";

            const p = document.createElement('p');
            p.style = "margin: 10px 0;";
            p.innerHTML = "Nessun peso presente!";
            container.appendChild(p);
        }

        // Event listener per aprire il popup
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                selectedId = event.target.getAttribute("data-id");
                document.getElementById("edit-weight").value = event.target.getAttribute("data-weight");
                document.getElementById("edit-date").value = event.target.getAttribute("data-date");

                document.getElementById("edit-popup").style.display = "flex";
            });
        });

        // Event listener per eliminare il peso
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                selectedId = event.target.getAttribute("data-id");
                const deleteResponse = await fetch(`http://127.0.0.1:8000/api/v1/data/weight/delete/${selectedId}/`, {
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

        // Event listener per chiudere il popup
        document.getElementById("cancel-edit").addEventListener("click", () => {
            document.getElementById("edit-popup").style.display = "none";
        });

        // Event listener per salvare le modifiche
        document.getElementById("save-edit").addEventListener("click", async () => {
            const newWeight = document.getElementById("edit-weight").value;
            const newDate = document.getElementById("edit-date").value;

            const updateResponse = await fetch(`http://127.0.0.1:8000/api/v1/data/weight/update/${selectedId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    id_user: getCookie("pk"),
                    weight_value: newWeight,
                    date_recorded: newDate
                })
            });

            const data = await updateResponse.json();

            if(updateResponse.ok) {
                location.reload();
            } else {
                document.getElementById("error2").style.display = "block";
                if(data.weight_value.length != 0) {
                    document.getElementById("error2").firstChild.textContent = data.weight_value[0];
                } else if(data.date_recorded.length != 0) {
                    document.getElementById("error2").firstChild.textContent = data.date_recorded[0];
                }
            }
        });

        data.sort((a, b) => new Date(a.date_recorded) - new Date(b.date_recorded));

        let labels_response = [];
        let data_response = [];

        for (let i = 0; i < data.length; i++) {
            labels_response.push(data[i].date_recorded);
            data_response.push(data[i].weight_value);
        }

        const ctx = chartCanvas.getContext("2d");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels_response,
                datasets: [
                    {
                        label: "Peso",
                        data: data_response, // Dati esempio
                        fill: true,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderColor: "white",
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Nasconde la legenda
                    }
                },
                scales: {
                    x: {
                        ticks: { color: "white" },
                        grid: { color: "rgba(255, 255, 255, 0.2)" }
                    },
                    y: {
                        ticks: { color: "white" },
                        grid: { color: "rgba(255, 255, 255, 0.2)" }
                    }
                }
            }
        });
    });

    // Funzione per aggiungere un record del peso
    async function addWeight() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/weight/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                id_user: getCookie("pk"),
                weight_value: document.getElementById("add-weight").value,
                date_recorded: document.getElementById("add-date").value
            })
        });

        const data = await response.json();

        if(response.ok) {
            location.reload();
        } else {
            document.getElementById("error1").style.display = "block";
            if(data.weight_value.length != 0) {
                document.getElementById("error1").firstChild.textContent = data.weight_value[0];
            } else if(data.date_recorded.length != 0) {
                document.getElementById("error1").firstChild.textContent = data.date_recorded[0];
            } 
        }

        console.log(data);
    }
</script>