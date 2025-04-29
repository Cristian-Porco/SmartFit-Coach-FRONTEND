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

        .day-subtitle {
            color: #afafaf;
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
        .action-value {
            width: 74px
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

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 700px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        }
        .modal-content>h2 { margin-bottom: 15px; }
        .modal-content>h3 { margin: 8px 0; }
        .modal-container {
            display: flex;
            gap: 20px;
            width: 100%;
            margin-bottom: 10px;
        }
        .instructions-list {
            border-radius: 10px;
            height: 200px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
        }
        .instructions-list p {margin-bottom: 8px; }
        .carousel {
            position: relative;
            width: 100%;
            overflow: hidden;
        }

        .carousel-image {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            max-height: 400px;
        }

        .carousel-indicators {
            display: flex;
            justify-content: center;
            margin-top: 8px;
            gap: 6px;
        }

        .carousel-indicators button {
            width: 50px;
            padding: 0;
            border-radius: 100%;
            height: 50px;
            font-size: 16px;
        }

        .carousel-indicators button.selected {
            background-color: #0056b3;
        }
        #section_date input { display: inline; width: auto; }

        .input-kg-wrapper {
            position: relative;
            display: inline-block;
        }
        .input-kg {
            padding-right: 2.5em; /* Spazio per la targhetta "kg" */
            box-sizing: border-box;
        }
        .kg-label {
            position: absolute;
            right: 0.3em;
            top: 38%;
            transform: translateY(-50%);
            pointer-events: none; /* Permette clic solo sull'input */
            font-size: 0.9em;
            font-weight: bold;
        }

        .input-sec-wrapper {
            position: relative;
            display: inline-block;
        }
        .input-sec {
            padding-right: 2.5em; /* Spazio per la targhetta "kg" */
            box-sizing: border-box;
        }
        .sec-label {
            position: absolute;
            right: 0.3em;
            top: 38%;
            transform: translateY(-50%);
            pointer-events: none; /* Permette clic solo sull'input */
            font-size: 0.9em;
            font-weight: bold;
        }

        .exercise-actions {
            margin-left: 10px;
        }
        .edit-exercise-button, .delete-exercise-button, .edit-details-exercise-button, .delete-details-exercise-button {
            cursor: pointer;
            font-size: 24px;
        }
        .edit-exercise-button, .edit-details-exercise-button {
            color: #007bff
        }
        .delete-exercise-button, .delete-details-exercise-button {
            color: red;
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
                width: 75%;
            }

            .set-input {
                width: 100%;
                padding: 0.3rem;
                font-size: 0.9rem;
            }

            .modal-content {
                width: 100vw;
                height: 100vh;
                max-height: none;
                border-radius: 0;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            .modal-container { flex-direction: column; gap: 10px; flex: 1; }
        }

        @media screen and (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
        }
    </style>
</head>

<!-- Contenitore intestazione della pagina della scheda alimentare -->
<div class="container">
    <div><p><b>Modifica</b></p><h1 class="titlePage">Scheda di allenamento</h1></div>
    <div id="section_date">
        <p><b>Data inizio:</b> <input type="date" id="start_date" required></p>
        <p><b>Data fine:</b> <input type="date" id="end_date" required></p>
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
        <textarea placeholder="Inserisci le note sulla scheda di allenamento qui..." id="note" style="margin-bottom: 0;"></textarea>
    </div>
    <button>Modifica scheda di allenamento</button>
</div>

{#if showExercisePopup}
    <div class="modal">
        <div class="modal-content">
            <h2>{selectedExercise.name}</h2>

            <!-- Slideshow -->
            {#if selectedExercise.image_files?.length}
                <div class="carousel">
                    <img class="carousel-image" src={selectedExercise.image_files[currentSlide]} alt="Foto esercizio" />

                    <div class="carousel-indicators">
                        {#each selectedExercise.image_files as _, index}
                            <button
                                    class:selected={index === currentSlide}
                                    on:click={() => currentSlide = index}
                            >
                                {index + 1}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Dettagli -->
            {#if selectedExercise.level_display != null}<p><strong>Livello:</strong> {selectedExercise.level_display}</p>{/if}
            {#if selectedExercise.mechanic_display != null}<p><strong>Meccanica:</strong> {selectedExercise.mechanic_display}</p>{/if}
            {#if selectedExercise.category_display != null}<p><strong>Categoria:</strong> {selectedExercise.category_display}</p>{/if}
            {#if selectedExercise.equipment_display != null}<p><strong>Attrezzatura:</strong> {selectedExercise.equipment_display}</p>{/if}

            <!-- Istruzioni -->
            {#if selectedExercise.instructions?.length}
                <h3>Istruzioni</h3>
                <div class="instructions-list">
                    {#each selectedExercise.instructions as step}
                        <p>{step}</p>
                    {/each}
                </div>
            {/if}

            <button on:click={closeExercisePopup} style="margin: 0; margin-top: 15px">Chiudi visualizzazione esercizio</button>
        </div>
    </div>
{/if}

<script>
    import {onMount} from "svelte";
    import {getCookie} from "svelte-cookie";

    export let data;
    let idGymPlan;

    let selectedExercise = null;
    let showExercisePopup = false;
    let currentSlide = 0;

    async function openExercisePopup(exercise) {
        const imageIds = exercise.image_urls || [];
        const imageFiles = await fetchExerciseImages(imageIds);

        exercise.image_files = imageFiles;
        selectedExercise = exercise;
        currentSlide = 0; // reset allo slide iniziale
        showExercisePopup = true;
    }

    function closeExercisePopup() {
        showExercisePopup = false;
        selectedExercise = null;
    }

    async function fetchExerciseImages(imageIds) {
        const imageUrls = [];

        for (const id of imageIds) {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-media-upload/${id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + getCookie('csrftoken') // usa la funzione Svelte che già usi
                    }
                });

                const data = await res.json();
                if (data.file) {
                    imageUrls.push(data.file);
                }
            } catch (err) {
                console.error("Errore caricando immagine ID:", id, err);
            }
        }

        return imageUrls;
    }

    function parseDateIT(str) {
        const [gg, mm, aaaa] = str.split('/');
        return new Date(`${aaaa}-${mm}-${gg}`); // ISO: YYYY-MM-DD
    }

    function getTodayWeekdayIfInRange(startStr, endStr) {
        const giorniSettimana = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const today = new Date();

        const start = parseDateIT(startStr);
        const end = parseDateIT(endStr);

        if (today >= start && today <= end) {
            return giorniSettimana[today.getDay()];
        } else {
            return null;
        }
    }

    function giorniPrecedenti(giorno) {
        const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

        if (giorno === null) return giorniSettimana;

        const index = giorniSettimana.indexOf(giorno);
        if (index === -1) return []; // giorno non valido

        return giorniSettimana.slice(0, index);
    }

    onMount(async () => {
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

        idGymPlan = data.id;
        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan/${idGymPlan}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const gym_plan_json = await response.json();

        const formattedStartDate = gym_plan_json["start_date"].split('/').reverse().join('-');
        document.getElementById("start_date").value = formattedStartDate;
        const formattedEndDate = gym_plan_json["end_date"].split('/').reverse().join('-');
        document.getElementById("end_date").value = formattedEndDate;

        document.getElementById("note").innerText = gym_plan_json["note"];

        let isNameDayOrNull = getTodayWeekdayIfInRange(gym_plan_json["start_date"], gym_plan_json["end_date"]);
        let dayBeforeToday = giorniPrecedenti(isNameDayOrNull);

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
            tab.id = full + "Tab";
            tab.classList.add("tab");

            tab.innerHTML = `<span class="day-full">${full}</span>`;

            tab.addEventListener("click", () => {
                let disabledDayBefore = false;
                if(dayBeforeToday.includes(full)) {
                    disabledDayBefore = true;
                }
                document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                content.style.border = "1px solid #cfcfcf";

                let type_day, notes_day;
                gym_plan_items.forEach((item) => {
                    if (item.section.day === short) {
                        type_day = item.section.type;
                        notes_day = item.section.notes;
                    }
                });
                if(type_day === undefined ) { type_day = ""; }
                if(notes_day === undefined ) { notes_day = ""; }

                content.innerHTML = `
                    <h2 class="day-title">
                        ${full} <span class="day-subtitle"> ${type_day}</span>
                    </h2>
                    <p>${notes_day}</p>
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
                            <div class="exercise-actions">
                                <span class="material-icons edit-exercise-button">edit</span>
                                <span class="material-icons delete-exercise-button">delete</span>
                            </div>
                        `;
                        gym_plan_item.id = "orderExercise" + item.order;


                        gym_plan_item.querySelector(".edit-exercise-button").addEventListener("click", (e) => {
                            alert("Modifica esercizio n." + item.id);
                        });

                        gym_plan_item.querySelector(".delete-exercise-button").addEventListener("click", (e) => {
                            alert("Elimina esercizio n." + item.id);
                        });

                        let plan_item = item.id;

                        divDay.appendChild(gym_plan_item);

                        const groupedSets = {};
                        item.sets.forEach(set => {
                            if (!groupedSets[set.set_number]) {
                                groupedSets[set.set_number] = [];
                            }
                            groupedSets[set.set_number].push(set);
                        });

                        const setNumbers = Object.keys(groupedSets).sort((a, b) => a - b);

                        if(item.intensity_techniques.includes("tempo-based")) {
                            // TODO: aggiustare visualizzazione
                            // aggiustato azioni
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
                                    { style: "text-align: left", content: "Esercizio" },
                                    { className: "data-value", content: "Minuti Prescritti", title: "Numero di minuti prescritti da eseguire" },
                                    { className: "data-value", content: "Minuti Effettuati", title: "Numero di minuti realmente eseguiti" },
                                    { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                                    { className: "action-value" },
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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "input", value: set.prescribed_reps_1 + " min.", disabled: false, mobilelabel: "Minuti Prescritti:" },
                                        { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Minuti Effettuati:", event: true},
                                        { type: "input", value: rest+" sec.", disabled: false, mobilelabel: "Recupero:" },
                                        { type: "action", mobilelabel: "Azioni:" },
                                    ];

                                    data.forEach((item, index) => {
                                        const td = document.createElement("td");

                                        if (index === 0) {
                                            if(test === 0 && sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            }
                                        } else if(index === 4) {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            const actionsDiv = document.createElement("div");
                                            actionsDiv.classList.add("exercise-actions");
                                            actionsDiv.style.marginLeft = 0;

                                            const editIcon = document.createElement("span");
                                            editIcon.classList.add("material-icons", "edit-details-exercise-button");
                                            editIcon.textContent = "edit";
                                            editIcon.addEventListener("click", (e) => {
                                                alert("Modifica dettaglio esercizio n." + set.id);
                                            });

                                            const deleteIcon = document.createElement("span");
                                            deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                                            deleteIcon.textContent = "delete";
                                            deleteIcon.addEventListener("click", (e) => {
                                                alert("Elimina dettaglio esercizio n." + set.id);
                                            });

                                            actionsDiv.appendChild(editIcon);
                                            actionsDiv.appendChild(deleteIcon);

                                            td.appendChild(span);
                                            td.appendChild(actionsDiv);
                                            row.appendChild(td);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

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
                        } else if (item.intensity_techniques.includes("unilateral")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
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
                                    { className: "data-value", content: "Ripetizioni Prescritte (arto 1)", title: "Numero di ripetizioni prescritte da eseguire" },
                                    { className: "data-value", content: "Ripetizioni Effettuate (arto 1)", title: "Numero di ripetizioni realmente eseguite" },
                                    { className: "data-value", content: "Ripetizioni Prescritte (arto 2)", title: "Numero di ripetizioni prescritte da eseguire" },
                                    { className: "data-value", content: "Ripetizioni Effettuate (arto 2)", title: "Numero di ripetizioni realmente eseguite" },
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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "div", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "input", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte (arto 1):" },
                                        { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate (arto 1):", event: true},
                                        { type: "input", value: set.prescribed_reps_2, disabled: false, mobilelabel: "Ripetizioni Prescritte (arto 2):" },
                                        { type: "input", value: set.actual_reps_2, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate (arto 2):", event: true},
                                        { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                        { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                        { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                        { type: "input", value: rest+" sec.", disabled: false, mobilelabel: "Recupero:" },
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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
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
                                            if (item.event && index == 3) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });
                                            else if(item.event && index == 5) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_2: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }


                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                divDay.appendChild(box);
                            });
                        } else if (item.intensity_techniques.includes("rest_pause")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;

                            setNumbers.forEach(setNumber => {
                                const box = document.createElement("div");
                                box.classList.add("set-box");
                                if(setNumber == 1)
                                    box.innerHTML = `<h4>Serie d'introduzione</h4>`;
                                else if(setNumber >= 2)
                                    box.innerHTML = `<h4>Serie a cedimento</h4>`;

                                let sameExercisesOnSets = groupedSets[setNumber].every(
                                    set => set.exercise.name === groupedSets[setNumber][0].exercise.name
                                );
                                let lengthSets = groupedSets[setNumber].length;

                                const table = document.createElement("table");

                                const thead = document.createElement("thead");
                                const headerRow = document.createElement("tr");

                                let headers;
                                if(setNumber == 1) {
                                    headers = [
                                        { className: "order-value", content: "" },
                                        { style: "text-align: left", content: "Esercizio" },
                                        { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                        { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                        { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                        { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                        { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                        { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                        { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                        { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }
                                    ];
                                } else if(setNumber >= 2) {
                                    headers = [
                                        { className: "order-value", content: "" },
                                        { style: "text-align: left", content: "Esercizio" },
                                        { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                        { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                        { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                        { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                        { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                        { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                        { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }
                                    ];
                                }

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

                                groupedSets[setNumber].forEach((set, test, array) => {
                                    const row = document.createElement("tr");

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    let data;
                                    if(setNumber == 1) {
                                        data = [
                                            {
                                                type: "div",
                                                className: "set-number",
                                                value: test + 1,
                                                mobilelabel: "Ordine:"
                                            },
                                            {
                                                type: "text",
                                                value: set.exercise.name,
                                                disabled: false,
                                                mobilelabel: "Esercizio:"
                                            },
                                            {
                                                type: "input",
                                                value: set.prescribed_reps_1,
                                                disabled: false,
                                                mobilelabel: "Ripetizioni Prescritte:"
                                            },
                                            {
                                                type: "input",
                                                value: set.actual_reps_1,
                                                disabled: disabledDayBefore,
                                                mobilelabel: "Ripetizioni Effettuate:",
                                                event: true
                                            },
                                            { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                            { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                            { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                            { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                            { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                            {
                                                type: "input",
                                                value: rest + " sec.",
                                                disabled: false,
                                                mobilelabel: "Recupero:"
                                            }
                                        ];
                                    } else if(setNumber >= 2) {
                                        data = [
                                            {
                                                type: "div",
                                                className: "set-number",
                                                value: test + 1,
                                                mobilelabel: "Ordine:"
                                            },
                                            {
                                                type: "text",
                                                value: set.exercise.name,
                                                disabled: false,
                                                mobilelabel: "Esercizio:"
                                            },
                                            {
                                                type: "input",
                                                value: set.actual_reps_1,
                                                disabled: disabledDayBefore,
                                                mobilelabel: "Ripetizioni Effettuate:",
                                                event: true
                                            },
                                            { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                            { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                            { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                            { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                            { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                            {
                                                type: "input",
                                                value: rest + " sec.",
                                                disabled: false,
                                                mobilelabel: "Recupero:"
                                            }
                                        ];
                                    }

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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }


                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);

                                    if(setNumber == 2 && test === array.length - 1) {
                                        button.addEventListener("click", async() => {
                                            const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization": "Token " + getCookie('csrftoken'),
                                                },
                                                body: JSON.stringify({
                                                    order: set.order+1,
                                                    set_number: set.set_number,
                                                    prescribed_reps_1: 0,
                                                    prescribed_reps_2: 0,
                                                    actual_reps_1: 0,
                                                    actual_reps_2: 0,
                                                    rir: set.rir,
                                                    rest_seconds: set.rest_seconds,
                                                    weight: set.weight,
                                                    tempo_fcr: set.tempo_fcr,
                                                    plan_item: plan_item,
                                                    exercise_id: set.exercise.id
                                                })
                                            });

                                            localStorage.setItem("scrollToId", gym_plan_item.id);
                                            location.reload();
                                        });
                                    }
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                if(!dayBeforeToday.includes(full)) {
                                    box.appendChild(button);
                                }
                                divDay.appendChild(box);
                            });
                        } else if (item.intensity_techniques.includes("myoreps")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;
                            button.style.display = 'none';

                            let maxReps, minReps;

                            setNumbers.forEach(setNumber => {
                                const box = document.createElement("div");
                                box.classList.add("set-box");
                                if(setNumber == 1)
                                    box.innerHTML = `<h4>Serie d'introduzione</h4>`;
                                else if(setNumber >= 2)
                                    box.innerHTML = `<h4>Serie a cedimento</h4>`;

                                let sameExercisesOnSets = groupedSets[setNumber].every(
                                    set => set.exercise.name === groupedSets[setNumber][0].exercise.name
                                );
                                let lengthSets = groupedSets[setNumber].length;

                                const table = document.createElement("table");

                                const thead = document.createElement("thead");
                                const headerRow = document.createElement("tr");

                                let headers;
                                if(setNumber == 1) {
                                    headers = [
                                        { className: "order-value", content: "" },
                                        { style: "text-align: left", content: "Esercizio" },
                                        { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                        { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                        { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                        { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                        { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                        { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                        { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                        { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }
                                    ];
                                } else if(setNumber >= 2) {
                                    headers = [
                                        { className: "order-value", content: "" },
                                        { style: "text-align: left", content: "Esercizio" },
                                        { className: "data-value", content: "Ripetizioni Prescritte massime", title: "Numero di ripetizioni massime prescritte da eseguire" },
                                        { className: "data-value", content: "Ripetizioni Prescritte minime", title: "Numero di ripetizioni minime prescritte da eseguire" },
                                        { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                        { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                        { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                        { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                        { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                        { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                        { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }
                                    ];
                                }

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

                                groupedSets[setNumber].forEach((set, test, array) => {
                                    const row = document.createElement("tr");

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    let data;
                                    if(setNumber == 1) {
                                        maxReps = set.prescribed_reps_2;
                                        minReps = set.actual_reps_2;
                                        data = [
                                            {
                                                type: "div",
                                                className: "set-number",
                                                value: test + 1,
                                                mobilelabel: "Ordine:"
                                            },
                                            {
                                                type: "text",
                                                value: set.exercise.name,
                                                disabled: false,
                                                mobilelabel: "Esercizio:"
                                            },
                                            {
                                                type: "input",
                                                value: set.prescribed_reps_1,
                                                disabled: false,
                                                mobilelabel: "Serie Prescritte:"
                                            },
                                            {
                                                type: "input",
                                                value: set.actual_reps_1,
                                                disabled: disabledDayBefore,
                                                mobilelabel: "Serie Effettuate:",
                                                event: true
                                            },
                                            { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                            { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                            { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                            { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                            { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                            {
                                                type: "input",
                                                value: rest + " sec.",
                                                disabled: false,
                                                mobilelabel: "Recupero:"
                                            }
                                        ];
                                    } else if(setNumber >= 2) {
                                        data = [
                                            {
                                                type: "div",
                                                className: "set-number",
                                                value: test + 1,
                                                mobilelabel: "Ordine:"
                                            },
                                            {
                                                type: "text",
                                                value: set.exercise.name,
                                                disabled: false,
                                                mobilelabel: "Esercizio:"
                                            },
                                            {
                                                type: "input",
                                                value: maxReps,
                                                disabled: false,
                                                mobilelabel: "Serie Prescritte massime:"
                                            },
                                            {
                                                type: "input",
                                                value: minReps,
                                                disabled: false,
                                                mobilelabel: "Serie Prescritte minime:"
                                            },
                                            {
                                                type: "input",
                                                value: set.actual_reps_1,
                                                disabled: disabledDayBefore,
                                                mobilelabel: "Serie Effettuate:",
                                                event: true
                                            },
                                            { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                            { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                            { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                            { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                            { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                            {
                                                type: "input",
                                                value: rest + " sec.",
                                                disabled: false,
                                                mobilelabel: "Recupero:"
                                            }
                                        ];
                                    }

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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }

                                        if(index === 4 && test === array.length - 1 && setNumber == 2) {
                                            let cellInput = row.cells[3].querySelector("input");
                                            cellInput.addEventListener("input", function () {
                                                if(this.value <= minReps) button.style.display = 'none';
                                                else button.style.display = 'block';
                                            });
                                        }
                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);

                                    if(setNumber == 2 && test === array.length - 1) {
                                        button.addEventListener("click", async() => {
                                            const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization": "Token " + getCookie('csrftoken'),
                                                },
                                                body: JSON.stringify({
                                                    order: set.order+1,
                                                    set_number: set.set_number,
                                                    prescribed_reps_1: 0,
                                                    prescribed_reps_2: 0,
                                                    actual_reps_1: 0,
                                                    actual_reps_2: 0,
                                                    rir: set.rir,
                                                    rest_seconds: set.rest_seconds,
                                                    weight: set.weight,
                                                    tempo_fcr: set.tempo_fcr,
                                                    plan_item: plan_item,
                                                    exercise_id: set.exercise.id
                                                })
                                            });

                                            localStorage.setItem("scrollToId", gym_plan_item.id);
                                            location.reload();
                                        });
                                    }
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                if(!dayBeforeToday.includes(full)) {
                                    box.appendChild(button);
                                }
                                divDay.appendChild(box);
                            });
                        } else if (item.intensity_techniques.includes("isometric") || item.intensity_techniques.includes("isometric_overload")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
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
                                    { className: "data-value", content: "Secondi Prescritti", title: "Numero di secondi prescritti da eseguire" },
                                    { className: "data-value", content: "Secondi Effettuati", title: "Numero di secondi realmente eseguiti" },
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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "div", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "input", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Serie Prescritte:" },
                                        { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Serie Effettuate:", event: true},
                                        { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                        { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                        { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                        { type: "input", value: rest+" sec.", disabled: false, mobilelabel: "Recupero:" },
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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }


                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                divDay.appendChild(box);
                            });
                        } else if (item.intensity_techniques.includes("emom")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
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
                                    { style: "text-align: left", content: "Esercizio" },
                                    { className: "order-value", content: "Minuto" },
                                    { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                    { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                    { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                    { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                    { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                    { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                    { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "div", className: "set-number", value: test+1, mobilelabel: "Minuto:" },
                                        { type: "input", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Serie Prescritte:" },
                                        { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Serie Effettuate:", event: true},
                                        { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                        { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                        { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                    ];

                                    data.forEach((item, index) => {
                                        const td = document.createElement("td");

                                        if (index === 0) {
                                            if(test === 0 && sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            }
                                        } else if (index === 1) {
                                            const div = document.createElement("div");
                                            div.className = item.className;
                                            div.textContent = item.value;

                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            td.appendChild(span);
                                            td.appendChild(div);
                                            row.appendChild(td);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

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
                        } else if (item.intensity_techniques.includes("amrap")) {
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
                            setNumbers.forEach(setNumber => {
                                const box = document.createElement("div");
                                box.classList.add("set-box");
                                box.innerHTML = `<h4>Circuito</h4>`;

                                let sameExercisesOnSets = groupedSets[setNumber].every(
                                    set => set.exercise.name === groupedSets[setNumber][0].exercise.name
                                );
                                let firstSet = groupedSets[setNumber][0];
                                let rest = firstSet.rest_seconds;
                                let skipDurationAndReps = rest === 0 && firstSet.prescribed_reps_1 === 0;
                                let lengthSets = groupedSets[setNumber].length;

                                const table = document.createElement("table");

                                const thead = document.createElement("thead");
                                const headerRow = document.createElement("tr");

                                const headers = [
                                    { className: "order-value", content: "" },
                                    { style: "text-align: left", content: "Esercizio" },
                                    { className: "data-value", content: "Durata", title: "Durata dell'esercizio in AMRAP" },
                                    { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                    { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                                    { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                    { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                    { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                    { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                    { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                ];

                                headers.forEach((h, index) => {
                                    if (skipDurationAndReps && (index === 2 || index === 3)) return; // Salta Durata e Ripetizioni Prescritte

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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "div", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "input", value: rest+" sec.", disabled: false, mobilelabel: "Durata:" },
                                        { type: "input", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte:" },
                                        { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate:", event: true},
                                        { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                        { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                        { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" }
                                    ];

                                    data.forEach((item, index) => {
                                        if (skipDurationAndReps && (index === 2 || index === 3)) return;

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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            }
                                        } else if (index === 2) {
                                            if (test === 0) {
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

                                                td.rowSpan = lengthSets; // <-- RIGA IMPORTANTE: fa sì che la cella duri per tutte le righe
                                                row.appendChild(td);
                                            }
                                            // Se non è la prima riga, saltiamo la creazione della cella Durata
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }


                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                divDay.appendChild(box);
                            });
                        } else if (item.intensity_techniques.includes("death_set")){
                            // TODO: aggiustare visualizzazione
                            // TODO: aggiungere azioni
                            setNumbers.forEach(setNumber => {
                                let showRecoveryColumn = false;
                                if(setNumber == 3) showRecoveryColumn = true;

                                let isSecondSet = !(setNumber == 5);

                                const box = document.createElement("div");
                                box.classList.add("set-box");
                                const titles = {
                                    1: "Serie iniziale",
                                    2: "1° Drop Set",
                                    3: "2° Drop Set + Rest Pause",
                                    4: "Parziali",
                                    5: "Isometria",
                                };

                                const title = titles[setNumber] || `Serie ${setNumber}`;
                                box.innerHTML = `<h4>${title}</h4>`;

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
                                    ...(isSecondSet ? [
                                        { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                        { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" }
                                    ]: [
                                        { className: "data-value", content: "Secondi Prescritti", title: "Numero di secondi prescritti da eseguire" },
                                        { className: "data-value", content: "Secondi Effettuati", title: "Numero di secondi realmente eseguiti" },
                                    ]),
                                    { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                                    { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                                    { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                                    { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                                    { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                                    ...(showRecoveryColumn ? [{ className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }] : []),
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

                                    const [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "div", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        ...(isSecondSet ? [
                                            { type: "input", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte:" },
                                            { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate:", event: true},
                                        ] : [
                                            { type: "input", value: set.prescribed_reps_1 + " sec.", disabled: false, mobilelabel: "Secondi Prescritti:" },
                                            { type: "input", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Secondi Effettuati:", event: true},
                                        ]),
                                        { type: "input", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "input", value: set.weight+"kg", disabled: false, mobilelabel: "Peso:" },
                                        { type: "input", value: ecc+" sec.", disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "input", value: fermo+" sec.", disabled: false, mobilelabel: "Fermo:" },
                                        { type: "input", value: conc+" sec.", disabled: false, mobilelabel: "Concentrica:" },
                                        ...(showRecoveryColumn ? [{ type: "input", value: rest+" sec.", disabled: false, mobilelabel: "Recupero:" }] : []),
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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
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
                                            if (item.event) input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        actual_reps_1: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }
                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                divDay.appendChild(box);
                            });
                        } else {
                            // aggiustato visualizzazione
                            // TODO: aggiungere azioni
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
                                    { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                                    { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
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

                                    let [ecc, fermo, conc] = set.tempo_fcr.split("-");
                                    const rest = set.rest_seconds;

                                    const data = [
                                        { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                                        { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                                        { type: "number", target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Serie Prescritte:" },
                                        { type: "number", target: "actual_reps_1", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Serie Effettuate:"},
                                        { type: "number", target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                                        { type: "number", target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                                        { type: "number", target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                                        { type: "number", target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                                        { type: "number", target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                                        { type: "number", target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Recupero:" }
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

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.rowSpan = lengthSets;
                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            } else if(!sameExercisesOnSets) {
                                                const span = document.createElement("span");
                                                span.className = "mobile-label";
                                                span.textContent = item.mobilelabel;
                                                row.appendChild(span);

                                                const link_exercise = document.createElement("a");
                                                link_exercise.href = "";
                                                link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                                                link_exercise.textContent = item.value;

                                                td.appendChild(link_exercise);
                                                row.appendChild(td);
                                            }
                                        } else if(item.target === "weight") {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            const wrapper = document.createElement('div');
                                            wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                                            const input = document.createElement('input');
                                            input.type = 'number';
                                            input.className = 'set-input';
                                            input.value = item.value;
                                            input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        weight: this.value
                                                    })
                                                });
                                            });

                                            const label = document.createElement('span');
                                            label.className = 'kg-label';
                                            label.textContent = 'kg';

                                            wrapper.appendChild(input);
                                            wrapper.appendChild(label);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        } else if(
                                            item.target === "ecc" ||
                                            item.target === "fermo" ||
                                            item.target === "conc"
                                        ) {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            const wrapper = document.createElement('div');
                                            wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                                            const input = document.createElement('input');
                                            input.type = 'number';
                                            input.className = 'set-input';
                                            input.value = item.value;
                                            input.addEventListener("input", async function () {
                                                if(item.target === "ecc") ecc = this.value;
                                                else if(item.target === "fermo") fermo = this.value;
                                                else if(item.target === "conc") conc = this.value;

                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        tempo_fcr: ecc + "-" + fermo + "-" + conc
                                                    })
                                                });
                                            });

                                            const label = document.createElement('span');
                                            label.className = 'sec-label';
                                            label.textContent = 'sec';

                                            wrapper.appendChild(input);
                                            wrapper.appendChild(label);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        } else if(
                                            item.target === "rest_seconds"
                                        ) {
                                            const span = document.createElement("span");
                                            span.className = "mobile-label";
                                            span.textContent = item.mobilelabel;

                                            const wrapper = document.createElement('div');
                                            wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                                            const input = document.createElement('input');
                                            input.type = 'number';
                                            input.className = 'set-input';
                                            input.value = item.value;
                                            input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        rest_seconds: this.value
                                                    })
                                                });
                                            });

                                            const label = document.createElement('span');
                                            label.className = 'sec-label';
                                            label.textContent = 'sec';

                                            wrapper.appendChild(input);
                                            wrapper.appendChild(label);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
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
                                            input.addEventListener("input", async function () {
                                                const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token " + getCookie('csrftoken'),
                                                    },
                                                    body: JSON.stringify({
                                                        [item.target]: this.value
                                                    })
                                                });
                                            });

                                            wrapper.appendChild(input);
                                            td.appendChild(span);
                                            td.appendChild(wrapper);
                                            row.appendChild(td);
                                        }
                                    });

                                    tbody.appendChild(row);
                                    table.appendChild(tbody);
                                });

                                if(sameExercisesOnSets)
                                    for (const riga of table.rows)
                                        if (riga.cells[0])
                                            riga.deleteCell(0);

                                divDay.appendChild(box);
                            });
                        }
                    }
                });

                if (divDay.children.length === 0 && divDay.textContent.trim() === "") {
                    divDay.innerHTML = "<p>Nessun esercizio presente, puoi rilassarti!</p>"
                }
            });

            tabsContainer.appendChild(tab);
        });

        if(isNameDayOrNull !== null)
            document.getElementById(isNameDayOrNull + "Tab").click();

        const id = localStorage.getItem("scrollToId");
        if (id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("scrollToId");
        }
    });
</script>