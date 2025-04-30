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
            color: gray
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
            color: gray
        }

        .input-min-wrapper {
            position: relative;
            display: inline-block;
        }
        .input-min {
            padding-right: 2.5em; /* Spazio per la targhetta "kg" */
            box-sizing: border-box;
        }
        .min-label {
            position: absolute;
            right: 0.3em;
            top: 38%;
            transform: translateY(-50%);
            pointer-events: none; /* Permette clic solo sull'input */
            font-size: 0.9em;
            font-weight: bold;
            color: gray
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
    import {
        IntensityTechniquesDefault,
        IntensityTechniquesDeathSet,
        IntensityTechniquesAMRAP,
        IntensityTechniquesEMOM,
        IntensityTechniquesIsometric,
        IntensityTechniquesMyoreps,
        IntensityTechniquesRestPause,
        IntensityTechniquesTempoBase,
        IntensityTechniquesUnilateral
    } from "$lib/edit_set_details.js";

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
                            IntensityTechniquesTempoBase(setNumbers, groupedSets, divDay);
                        } else if (item.intensity_techniques.includes("unilateral")) {
                            IntensityTechniquesUnilateral(setNumbers, groupedSets, divDay, disabledDayBefore);
                        } else if (item.intensity_techniques.includes("rest_pause")) {
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;

                            IntensityTechniquesRestPause(setNumbers, groupedSets, divDay, dayBeforeToday, full, button);
                        } else if (item.intensity_techniques.includes("myoreps")) {
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;
                            button.style.display = 'none';

                            IntensityTechniquesMyoreps(setNumbers, groupedSets, divDay, dayBeforeToday, full, button);
                        } else if (item.intensity_techniques.includes("isometric") || item.intensity_techniques.includes("isometric_overload")) {
                            IntensityTechniquesIsometric(setNumbers, groupedSets, divDay);
                        } else if (item.intensity_techniques.includes("emom")) {
                            IntensityTechniquesEMOM(setNumbers, groupedSets, divDay);
                        } else if (item.intensity_techniques.includes("amrap")) {
                            IntensityTechniquesAMRAP(setNumbers, groupedSets, divDay);
                        } else if (item.intensity_techniques.includes("death_set")) {
                            IntensityTechniquesDeathSet(setNumbers, groupedSets, divDay);
                        } else {
                            IntensityTechniquesDefault(setNumbers, groupedSets, divDay);
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