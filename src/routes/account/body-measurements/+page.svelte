<head>
    <link rel="stylesheet" type="text/css" href="/css/account/body-measurements/style_home_body_measurements.css">
</head>

<h2 class="titlePage">Misure corporee</h2>

<div class="form-container">
    <button on:click={addBodyMeasurement}>Aggiungi misurazione</button>
</div>

<div id="isNotEmpty" class="form-container">
    <button id="button-ai-analysis" class="button-ai" on:click={showAIDiv}>Ottieni un’analisi intelligente sui dati</button>
</div>

<div id="ai-box" class="ai-box hidden">
    <h3>Risposta intelligente sui dati</h3>
    <div id="ai-content" class="ai-loader"></div>
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
        if(getCookie('csrftoken') === "") window.location.href = "/";

        toggleClassByPathEquals({
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

                if(item.average_measurement == null)
                    item.average_measurement = "Misurazione vuota"
                else {
                    item.average_measurement = parseFloat(item.average_measurement).toFixed(2);
                    item.average_measurement += " cm";
                }

                div.innerHTML = `
                    <div class="details">
                        <span class="average">${item.average_measurement}</span>
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
            document.getElementById("isNotEmpty").style.display = "none";
            const p = document.createElement('p');
            p.style = "margin: 10px 0;";
            p.innerHTML = "Nessuna misurazione presente!";
            container.appendChild(p);
        }
    });

    async function showAIDiv() {
        const aiBox = document.getElementById("ai-box");
        const aiContent = document.getElementById("ai-content");
        const buttonAI = document.getElementById("button-ai-analysis");

        aiBox.classList.add("hidden");
        aiContent.innerText = "";
        aiContent.classList.add("ai-loader");
        aiContent.classList.remove("ai-response");

        aiBox.classList.remove("hidden");
        buttonAI.disabled = true;
        setTimeout(() => aiBox.classList.add("visible"), 10); // per attivare la transizione

        const responseAnalysis = await fetch("http://127.0.0.1:8000/api/v1/data/body-measurement/analysis/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        if(responseAnalysis.ok) {
            aiContent.classList.remove("ai-loader");
            aiContent.classList.add("ai-response");

            const data = await responseAnalysis.json();
            aiContent.innerText = data.analysis;

            buttonAI.disabled = false;
        }
    }

    function addBodyMeasurement() {
        window.location.href = "/account/body-measurements/add";
    }
</script>