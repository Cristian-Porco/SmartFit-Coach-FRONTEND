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
        /* Stile per il form */
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
        .weight-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            transition: transform 0.2s;
        }
        .weight-item:first-child {
            font-size: 40px !important;
        }
        .weight-item:first-child .details .date {
            font-size: 16px;
        }
        .weight-item .details {
            display: block;
            justify-content: flex-start;
            align-items: center;
        }

        .weight-item .details .weight {
            margin-right: 10px;
            font-weight: bold;
        }

        .weight-item .details .date {
            color: #777;
        }
        .weight-item .buttons {
            display: flex;
            gap: 10px;
        }
        .weight-item .buttons button {
            padding: 10px 15px;
            color: white;
            cursor: pointer;
            height: 100%;
            margin: 0
        }
        .weight-item:last-child {
            border-bottom: none;
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

<form class="form-container">
    <h3>Aggiungi peso</h3>
    <div class="form-group">
        <div class="input-container">
            <label for="weight">Peso:</label>
            <input type="text" id="weight" name="weight" placeholder="Peso..." required>
        </div>
        <div class="input-container">
            <label for="date_recorded">Data di registrazione:</label>
            <input type="date" id="date_recorded" name="date_recorded" required>
        </div>
    </div>
    <div class="form-group">
        <button type="submit">Aggiungi</button>
    </div>
</form>

<div class="areaChartZone">
    <canvas bind:this={chartCanvas} style="width:100%; height:100%;"></canvas>
</div>

<div>
    <h3>Storico peso</h3>
    <div>
        <div class="weight-item">
            <div class="details">
                <span class="weight">80 kg</span>
                <span class="date">2025-02-25</span>
            </div>
            <div class="buttons">
                <button>Modifica</button>
                <button>Elimina</button>
            </div>
        </div>

        <div class="weight-item">
            <div class="details">
                <span class="weight">78 kg</span><br>
                <span class="date">2025-02-22</span>
            </div>
            <div class="buttons">
                <button>Modifica</button>
                <button>Elimina</button>
            </div>
        </div>

        <div class="weight-item">
            <div class="details">
                <span class="weight">75 kg</span><br>
                <span class="date">2025-02-20</span>
            </div>
            <div class="buttons">
                <button>Modifica</button>
                <button>Elimina</button>
            </div>
        </div>
    </div>
</div>

<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    let chartCanvas;

    onMount(async() => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/weight/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const data = await response.json();
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
</script>