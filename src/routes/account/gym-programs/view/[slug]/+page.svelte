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

        .tab.active .day-full {
            color: white;
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

        .exercise-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px 15px;
            margin: 8px 0;
            background-color: #f9f9f9;
        }

        .exercise-number {
            width: 30px;
            height: 30px;
            min-width: 30px;
            min-height: 30px;
            background-color: #007BFF;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            text-align: center;
            line-height: 30px;
            margin-right: 10px;
        }

        .exercise-title {
            flex: 1;
            font-size: 1rem;
            font-weight: 500;
        }

        .exercise-technique {
            font-size: 0.9rem;
            font-weight: 500;
            color: #e74c3c;
        }

        .set-label {
            margin-bottom: 4px;
            font-size: 13px;
        }

        .set-col {
            text-align: center;
        }

        .set-box {
            margin: 20px 0;
            padding: 10px;
            border-left: 4px solid #007bff;
        }

        .set-box h3 {
            margin-bottom: 10px;
            color: #007bff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            font-size: 16px;
        }

        th, td {
            padding: 8px;
            border: 0;
        }

        .set-number {
            width: 26px;
            height: 26px;
            background-color: #007bff;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 26px;
            font-size: 0.85rem;
            font-weight: bold;
            margin: 0 auto;
        }

        .set-input {
            height: 30px;
            font-size: 0.85rem;
            padding: 2px 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            text-align: center;
        }

        .input-with-info,
        .input-with-info-enabled {
            position: relative;
            display: flex;
            align-items: center;
        }

        .input-with-info input,
        .input-with-info-enabled input {
            flex-grow: 1;
        }

        .info-icon {
            cursor: help;
        }

        .order-value {
            width: 56px;
        }

        .data-value {
            width: 100px;
        }

        .set-box table {
            width: 100%;
            border-collapse: collapse;
        }

        .set-box th, .set-box td {
            padding: 0.5rem;
        }

        .mobile-label {
            display: none;
            font-weight: bold;
            margin-bottom: 4px;
        }

        @media screen and (max-width: 968px) {
            .set-box table,
            .set-box thead,
            .set-box tbody,
            .set-box th,
            .set-box td,
            .set-box tr {
                display: block;
                width: 100%;
            }

            .set-box thead {
                display: none;
            }

            .set-box tr {
                margin-bottom: 1rem;
                padding: 0.5rem;
                border-bottom: 1px solid #ccc;
            }

            .set-box tr:last-child {
                border-bottom: none;
            }

            .set-box td {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.4rem;
                border: none;
            }

            .mobile-label {
                display: inline-block;
                font-weight: 600;
                font-size: 0.9rem;
            }

            .input-with-info,
            .input-with-info-enabled {
                width: 80%;
            }

            .set-input {
                width: 100%;
                padding: 0.3rem;
                font-size: 0.9rem;
            }
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
            substring: '/account/gym-programs/view',
            targetId: 'gym-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'food-program-icon-item'
            ]
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

        let gym_plan_items = gym_plan_json["gym_plan_items"];

        const days = [
            { full: "Lunedì", short: "lun" },
            { full: "Martedì", short: "mar" },
            { full: "Mercoledì", short: "mer" },
            { full: "Giovedì", short: "gio" },
            { full: "Venerdì", short: "ven" },
            { full: "Sabato", short: "sab" },
            { full: "Domenica", short: "dom" },
        ];

        const tabsContainer = document.getElementById("tabs");
        const content = document.getElementById("content");

        days.forEach(({ full, short }) => {
            const tab = document.createElement("div");
            tab.classList.add("tab");

            tab.innerHTML = `<span class="day-full">${full}</span>`;

            tab.addEventListener("click", () => {
                document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                content.style.border = "1px solid #cfcfcf";
                content.innerHTML = `
            <h2 class="day-title">${full}</h2>
            <div id="${short}"></div>
        `;

                const divDay = document.getElementById(short);

                gym_plan_items.forEach((item) => {
                    if (item.section.day === short) {
                        let techniques = "";
                        if (Array.isArray(item.intensity_techniques_display)) {
                            techniques = item.intensity_techniques_display.join(', ');
                        } else if (typeof item.intensity_techniques_display === "string") {
                            techniques = item.intensity_techniques_display.split(/[,;|]/).map(t => t.trim()).join(', ');
                        }

                        const gym_plan_item = document.createElement("div");
                        gym_plan_item.classList.add("exercise-row");
                        gym_plan_item.innerHTML = `
                            <div class="exercise-number">${item.order}</div>
                            <div class="exercise-title">${item.notes}</div>
                            <div class="exercise-technique">${techniques}</div>
                        `;

                        divDay.appendChild(gym_plan_item);

                        const groupedSets = {};
                        item.sets.forEach(set => {
                            if (!groupedSets[set.set_number]) {
                                groupedSets[set.set_number] = [];
                            }
                            groupedSets[set.set_number].push(set);
                        });

                        const setNumbers = Object.keys(groupedSets).sort((a, b) => a - b);

                        setNumbers.forEach(setNumber => {
                            const box = document.createElement("div");
                            box.classList.add("set-box");
                            box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

                            let sameExercisesOnSets = groupedSets[setNumber].every(
                                set => set.exercise.name === groupedSets[setNumber][0].exercise.name
                            );
                            let lengthSets = groupedSets[setNumber].length;

                            const table = document.createElement("table");

                            const thead = document.createElement("thead");
                            const headerRow = document.createElement("tr");

                            const headers = [
                                { className: "order-value", content: "" },
                                { style: "text-align: left", content: "Esercizio" },
                                { className: "data-value", content: "Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                { className: "data-value", content: "Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                            ];

                            headers.forEach(h => {
                                const th = document.createElement("th");
                                if (h.className) th.className = h.className;
                                if (h.style) th.setAttribute("style", h.style);
                                if (h.title) {
                                    const span = document.createElement("span");
                                    span.className = "info-icon";
                                    span.title = h.title;
                                    span.textContent = h.content;
                                    th.appendChild(span);
                                } else {
                                    th.textContent = h.content;
                                }
                                headerRow.appendChild(th);
                            });

                            thead.appendChild(headerRow);
                            table.appendChild(thead);

                            const tbody = document.createElement("tbody");
                            table.appendChild(tbody);

                            box.append(table);

                            groupedSets[setNumber].forEach((set, test) => {
                                const row = document.createElement("tr");

                                const [ecc, fermo, conc] = set.tempo.split("-");
                                const rest = set.rest_seconds;

                                const data = [
                                    { type: "div", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                    { type: "text", value: set.exercise.name, disabled: true, mobilelabel: "Esercizio:" },
                                    { type: "input", value: set.prescribed_reps, disabled: true, mobilelabel: "Segnate:" },
                                    { type: "input", value: set.actual_reps, disabled: false, mobilelabel: "Svolte:" },
                                    { type: "input", value: set.rir, disabled: true, mobilelabel: "RIR:" },
                                    { type: "input", value: set.weight+"kg", disabled: true, mobilelabel: "Peso:" },
                                    { type: "input", value: ecc, disabled: true, mobilelabel: "Eccentrica:" },
                                    { type: "input", value: fermo, disabled: true, mobilelabel: "Fermo:" },
                                    { type: "input", value: conc, disabled: true, mobilelabel: "Concentrica:" },
                                    { type: "input", value: rest+"s", disabled: true, mobilelabel: "Riposo:" },
                                ];

                                data.forEach((item, index) => {
                                    const td = document.createElement("td");

                                    if (index === 0) {
                                        if(!sameExercisesOnSets) {
                                            const div = document.createElement("div");
                                            div.className = item.className;
                                            div.textContent = item.value;

                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            td.appendChild(span);
                                            td.appendChild(div);
                                        }
                                        row.appendChild(td);
                                    } else if (index === 1) {
                                        if(test === 0 && sameExercisesOnSets) {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;
                                            row.appendChild(span);

                                            td.textContent = item.value;
                                            td.rowSpan = lengthSets;
                                            row.appendChild(td);
                                        } else if(!sameExercisesOnSets) {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;
                                            row.appendChild(span);

                                            td.textContent = item.value;
                                            row.appendChild(td);
                                        }
                                    } else {
                                        const span = document.createElement("span");
                                        span.className = "mobile-label";
                                        span.textContent = item.mobilelabel;

                                        const wrapper = document.createElement("div");
                                        wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                                        const input = document.createElement("input");
                                        input.type = "text";
                                        input.className = "set-input";
                                        input.value = item.value;
                                        if (item.disabled) input.disabled = true;

                                        wrapper.appendChild(input);
                                        td.appendChild(span);
                                        td.appendChild(wrapper);
                                        row.appendChild(td);
                                    }


                                });

                                tbody.appendChild(row);
                                table.appendChild(tbody);
                            });

                            divDay.appendChild(box);
                        });
                    }
                });

                if (divDay.children.length === 0 && divDay.textContent.trim() === "") {
                    divDay.innerHTML = "<p>Nessun esercizio presente, puoi rilassarti!</p>"
                }
            });

            tabsContainer.appendChild(tab);
        });
    });
</script>