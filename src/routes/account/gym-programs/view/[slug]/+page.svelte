<head>
    <style>
        .icon-sidebar { display: flex; }
        .sidebar { display: none; }
        .main-content { width: 100%; min-width: 100%; }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 10px;
        }
        .container div { flex: 1; text-align: center; }
        .container div:nth-child(1) { text-align: left; }
        .container div:nth-child(2) { text-align: right; }

        .tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .tab {
            padding: 1rem;
            border-radius: 10px;
            background-color: #e1e7ee;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            flex: 1 1 120px;
            text-align: center;
            font-weight: bold;
        }

        .tab:hover {
            background-color: #acb0c3;
        }

        .tab.active {
            background-color: #007bff;
            color: white;
            font-weight: bold;
        }

        .content-day, .content-note {
            background-color: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1rem 0;
        }

        .content-note {
            border: 1px solid #cfcfcf;
        }

        .day-title {
            margin: 0;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            color: #333;
        }

        @media screen and (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
        }
    </style>
</head>

<div class="container">
    <div><p><b>Visualizza</b></p><h1 class="titlePage">Scheda di allenamento</h1></div>
    <div>
        <p><b>Data inizio:</b> <span id="start_date">--/--/----</span></p>
        <p><b>Data fine:</b> <span id="end_date">--/--/----</span></p>
    </div>
</div>

<div class="form-container">
    <div class="tabs" id="tabs">
        <!-- Le tab dei giorni verranno generate dinamicamente -->
    </div>

    <div class="content-day" id="content">
        <h4 style="text-align: center">Seleziona un giorno della settimana dai pulsanti presenti sopra</h4>
    </div>

    <div class="content-note" id="notes">
        <h2 class="day-title">Note sulla scheda di allenamento</h2>
        <p id="note">Contenuto della giornata selezionata apparirà qui.</p>
    </div>
</div>

<script>
    import {onMount} from "svelte";
    import {getCookie} from "svelte-cookie";

    export let data;
    let idGymPlan;

    let content = [];

    onMount(async () => {
        toggleClassByPathEquals({
            substring: '/account/gym-programs',
            targetId: 'gym-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'food-program-icon-item'
            ]
        });

        const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
        const tabsContainer = document.getElementById("tabs");
        const content = document.getElementById("content");

        days.forEach((day, index) => {
            const tab = document.createElement("div");
            tab.classList.add("tab");
            tab.innerText = day;
            tab.addEventListener("click", () => {
                document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                content.style.border = "1px solid #cfcfcf";
                content.innerHTML = `
          <h2 class="day-title">${day}</h2>
          <p>Qui puoi gestire le attività del ${day.toLowerCase()}.</p>
        `;
            });
            tabsContainer.appendChild(tab);
        });

        idGymPlan = data.id;
        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan/${idGymPlan}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const gym_plan_json = await response.json();
        document.getElementById("start_date").innerText = gym_plan_json["start_date"];
        document.getElementById("end_date").innerText = gym_plan_json["end_date"];
        if(gym_plan_json["note"] !== "") document.getElementById("note").innerText = gym_plan_json["note"];
        else document.getElementById("notes").style.display ="none";

        console.log(gym_plan_json);
    });
</script>