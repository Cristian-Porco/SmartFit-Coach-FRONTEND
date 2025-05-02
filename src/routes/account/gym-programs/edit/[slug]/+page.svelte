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
            max-height: 300px;
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
        .modal-content>h3 { margin-bottom: 15px; }
        .modal-container {
            display: flex;
            gap: 20px;
            width: 100%;
            margin-bottom: 10px;
        }
        .food-search { width: 50%; }
        .food-list {
            list-style: none;
            height: 500px; /* Altezza limitata */
            overflow-y: scroll; /* Abilita la barra di scorrimento verticale */
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 0;
            border: 1px solid #ddd;
            border-radius: 40px;
        }
        .food-list::-webkit-scrollbar { display: none; }
        .food-list li {
            padding: 10px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }
        .food-list li:first-child { border-top: none; }
        .food-list li:last-child { border-bottom: none; }
        .food-details {
            width: 50%;
            background: #f1f5f9;
            border-radius: 40px;
            padding: 15px;
        }
        .food-details h3 { font-size: 1.5em; text-align: center; }
        .food-details div {
            margin: 5px 0;
        }
        .close-button { margin-bottom: 0; }

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

<!-- Contenitore per messaggi di errore -->
<div class="error" id="error1">
    <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
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
        <textarea placeholder="Inserisci le note sulla scheda di allenamento qui..." id="notes_plan" style="margin-bottom: 0;"></textarea>
    </div>
    <button on:click={saveGymPlan}>Modifica scheda di allenamento</button>
</div>

{#if showExercisePopup}
    <div class="modal">
        <div class="modal-content" style="height: 90vh;">
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

{#if showChooseIntensityModal}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi esercizio</h3>

            <!-- Selettore tecnica d'intensità -->
            <div class="intensity-select">
                <label for="intensity-technique">Tecnica d’intensità:</label>
                <select id="intensity-technique" bind:value={selectedTechnique}>
                    <option value="bilateral">Bilaterale (entrambe le gambe)</option>
                    <option value="unilateral">Unilaterale (gamba singola)</option>
                    <option value="tempo-based">Tempo-Based (durata fissa)</option>
                    <option value="drop_set">Drop Set / Stripping</option>
                    <option value="super_set">Super Set / Giant Set</option>
                    <option value="forced_reps">Serie Forzate</option>
                    <option value="half_reps">Half Reps</option>
                    <option value="rest_pause">Rest-Pause</option>
                    <option value="myoreps">MyoReps</option>
                    <option value="pre_fatigue">Pre-Affaticamento</option>
                    <option value="negative">Negativa Forzata</option>
                    <option value="peak_contraction">Contrazione di Picco</option>
                    <option value="tempoTUT">Tempo Training / TUT</option>
                    <option value="isometric">Contrazioni Isometriche</option>
                    <option value="seven_seven">21 Serie / 7-7-7</option>
                    <option value="cluster">Cluster Set</option>
                    <option value="pyramid">Piramidale</option>
                    <option value="wave_loading">Wave Loading</option>
                    <option value="isometric_overload">Isometric Overload</option>
                    <option value="accomodating">Accommodating Resistance</option>
                    <option value="pause_reps">Pause Reps</option>
                    <option value="emom">EMOM</option>
                    <option value="amrap">AMRAP</option>
                    <option value="death_set">Death Set</option>
                </select>
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={() => openSelectedTechnique()}>Aggiungi</button>
            <button class="close-button" on:click={() => showChooseIntensityModal = false}>Annulla</button>
        </div>
    </div>
{/if}

{#if showBilateralExercise}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi esercizio bilaterale</h3>

            <!-- Sezione input -->
            <div class="input-group">
                <!-- Pulsante per scegliere l'esercizio -->
                <button on:click={() => showChooseExerciseModal = true}>Scegli esercizio</button>

                <label for="sets">Numero di serie:</label>
                <input id="sets" type="number" bind:value={numSeries} min="0" />

                <label for="reps">Ripetizioni prescritte:</label>
                <input id="reps" type="number" bind:value={numReps} min="0" />

                <label for="rir">RIR:</label>
                <input id="rir" type="number" bind:value={rir} min="0" />

                <label for="weight">Peso (in kg):</label>
                <input id="weight" type="number" bind:value={weight} min="0" step="0.25" />

                <label for="eccentric">Eccentrica (in secondi):</label>
                <input id="eccentric" type="number" bind:value={eccentric} min="0" step="1" />

                <label for="pause">Fermo (in secondi):</label>
                <input id="pause" type="number" bind:value={pause} min="0" step="1" />

                <label for="concentric">Concentrica (in secondi):</label>
                <input id="concentric" type="number" bind:value={concentric} min="0" step="1" />

                <label for="concentric">Recupero (in secondi):</label>
                <input id="concentric" type="number" bind:value={rest_seconds} min="0" step="1" />
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={addDefaultExercise}>Aggiungi</button>
            <button class="close-button" on:click={() => {showBilateralExercise = false; idExercises = []}}>Annulla</button>
        </div>
    </div>
{/if}

{#if showUnilateralExercise}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi esercizio unilaterale</h3>

            <!-- Sezione input -->
            <div class="input-group">
                <!-- Pulsante per scegliere l'esercizio -->
                <button on:click={() => showChooseExerciseModal = true}>Scegli esercizio</button>

                <label for="sets">Numero di serie:</label>
                <input id="sets" type="number" bind:value={numSeries} min="0" />

                <label for="reps">Ripetizioni prescritte:</label>
                <input id="reps" type="number" bind:value={numReps} min="0" />

                <label for="rir">RIR:</label>
                <input id="rir" type="number" bind:value={rir} min="0" />

                <label for="weight">Peso (in kg):</label>
                <input id="weight" type="number" bind:value={weight} min="0" step="0.25" />

                <label for="eccentric">Eccentrica (in secondi):</label>
                <input id="eccentric" type="number" bind:value={eccentric} min="0" step="1" />

                <label for="pause">Fermo (in secondi):</label>
                <input id="pause" type="number" bind:value={pause} min="0" step="1" />

                <label for="concentric">Concentrica (in secondi):</label>
                <input id="concentric" type="number" bind:value={concentric} min="0" step="1" />

                <label for="concentric">Recupero (in secondi):</label>
                <input id="concentric" type="number" bind:value={rest_seconds} min="0" step="1" />
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={addDefaultExercise}>Aggiungi</button>
            <button class="close-button" on:click={() => {showUnilateralExercise = false; idExercises = []}}>Annulla</button>
        </div>
    </div>
{/if}

{#if showTempoBasedExercise}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi esercizio con durata fissa</h3>

            <!-- Sezione input -->
            <div class="input-group">
                <!-- Pulsante per scegliere l'esercizio -->
                <button on:click={() => showChooseExerciseModal = true}>Scegli esercizio</button>

                <label for="reps">Minuti prescritti:</label>
                <input id="reps" type="number" bind:value={numReps} min="0" />

                <label for="concentric">Recupero (in secondi):</label>
                <input id="concentric" type="number" bind:value={rest_seconds} min="0" step="1" />
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={() => { numSeries = 1; addDefaultExercise(); }}>Aggiungi</button>
            <button class="close-button" on:click={() => {showTempoBasedExercise = false; idExercises = []}}>Annulla</button>
        </div>
    </div>
{/if}

{#if showDropSetExercise}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi esercizio bilaterale</h3>

            <!-- Sezione input -->
            <div class="input-group">
                <!-- Pulsante per scegliere l'esercizio -->
                <button on:click={() => showChooseExerciseModal = true}>Scegli esercizio</button>

                <label for="sets">Numero di serie:</label>
                <input id="sets" type="number" bind:value={numSeries} min="0" />

                <label for="reps">Ripetizioni prescritte (separate dalla virgola):</label>
                <input id="reps" type="text" bind:value={numReps} min="0" />

                <label for="rir">RIR:</label>
                <input id="rir" type="number" bind:value={rir} min="0" />

                <label for="weight">Peso (in kg, separate dalla virgola):</label>
                <input id="weight" type="text" bind:value={weight} min="0" step="0.25" />

                <label for="eccentric">Eccentrica (in secondi):</label>
                <input id="eccentric" type="number" bind:value={eccentric} min="0" step="1" />

                <label for="pause">Fermo (in secondi):</label>
                <input id="pause" type="number" bind:value={pause} min="0" step="1" />

                <label for="concentric">Concentrica (in secondi):</label>
                <input id="concentric" type="number" bind:value={concentric} min="0" step="1" />

                <label for="concentric">Recupero (in secondi):</label>
                <input id="concentric" type="number" bind:value={rest_seconds} min="0" step="1" />
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={addDropSetExercise}>Aggiungi</button>
            <button class="close-button" on:click={() => {showDropSetExercise = false; idExercises = []}}>Annulla</button>
        </div>
    </div>
{/if}



{#if showChooseExerciseModal}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi Serie</h3>

            <!-- Sezione contenente la ricerca alimenti e i dettagli -->
            <div class="modal-container">

                <!-- Sezione ricerca alimento -->
                <div class="food-search">
                    <label for="search">Cerca esercizio:</label>
                    <div class="search-bar">
                        <input
                                type="text"
                                id="search"
                                bind:value={searchQuery}
                                on:input={filterGymItems}
                                placeholder="Cerca esercizio..."
                        />
                    </div>

                    <!-- Lista filtrata di alimenti disponibili -->
                    <ul class="food-list">
                        {#each filteredGymItems as gymItem}
                            <li on:click={() => selectGymItem(gymItem)}>{gymItem.name}</li>
                        {/each}
                    </ul>
                </div>

                <div class="food-details">
                    {#if selectedGymItem}
                        <h3>
                            {selectedGymItem.name}
                        </h3>

                        <!-- Slideshow -->
                        {#if selectedGymItem.image_files?.length}
                            <div class="carousel">
                                <img class="carousel-image" src={selectedGymItem.image_files[currentSlide]} alt="Foto esercizio" />

                                <div class="carousel-indicators">
                                    {#each selectedGymItem.image_files as _, index}
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
                        {#if selectedGymItem.level_display != null}<p><strong>Livello:</strong> {selectedGymItem.level_display}</p>{/if}
                        {#if selectedGymItem.mechanic_display != null}<p><strong>Meccanica:</strong> {selectedGymItem.mechanic_display}</p>{/if}
                        {#if selectedGymItem.category_display != null}<p><strong>Categoria:</strong> {selectedGymItem.category_display}</p>{/if}
                        {#if selectedGymItem.equipment_display != null}<p><strong>Attrezzatura:</strong> {selectedGymItem.equipment_display}</p>{/if}
                    {/if}
                </div>
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={() => {idExercises.push(selectedGymItem.id); showChooseExerciseModal = false; }}>Aggiungi</button>
            <button class="close-button" on:click={() => showChooseExerciseModal = false}>Annulla</button>
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
    let idGymSection;

    let selectedExercise = null;
    let showExercisePopup = false;
    let currentSlide = 0;

    let showChooseExerciseModal = false;
    let searchQuery = "";
    let gymItems = [];
    let filteredGymItems = [];
    let selectedGymItem = null;

    let showChooseIntensityModal = false;
    let selectedTechnique = 'bilateral';

    let idExercises = [];
    let numSeries = 0;
    let numReps = 0;
    let rir = 0;
    let weight = 0;
    let eccentric = 0;
    let pause = 0;
    let concentric = 0;
    let rest_seconds = 0;

    let showBilateralExercise = false;
    let showUnilateralExercise = false;
    let showTempoBasedExercise = false;
    let showDropSetExercise = false;

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

    async function selectGymItem(gymItem) {
        const imageIds = gymItem.image_urls || [];
        const imageFiles = await fetchExerciseImages(imageIds);

        gymItem.image_files = imageFiles;
        selectedGymItem = gymItem;
    }

    function filterGymItems() {
        const query = searchQuery.toLowerCase();

        filteredGymItems = gymItems.filter(item =>
            item.name.toLowerCase().includes(query)
        );
    }

    async function fetchGymItems() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/data/gym-item/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'), // Usa il token CSRF come autenticazione
                }
            });

            if (!response.ok) {
                // In caso di risposta non valida (es. 500, 404)
                showError("Errore durante il caricamento degli alimenti!");
                return;
            }

            // Parsing della risposta in JSON
            gymItems = await response.json();
            filteredGymItems = gymItems; // Aggiorna la lista filtrata
        } catch (error) {
            // In caso di errore di rete o eccezione imprevista
            showError("Errore durante il caricamento degli alimenti!");
        }
    }

    function openSelectedTechnique() {
        switch(selectedTechnique) {
            case "bilateral":
                showBilateralExercise = true;
            case "unilateral":
                showUnilateralExercise = true;
            case "tempo-based":
                showTempoBasedExercise = true;
            case "drop_set":
                numReps = "";
                weight = "";
                showDropSetExercise = true;
        }
    }

    async function addDefaultExercise() {
        const orderRes = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-item/first-available-order/${idGymSection}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getCookie('csrftoken'),
            }
        });
        const orderData = await orderRes.json();
        const order = orderData.first_available_order;

        const intensityTechniques = selectedTechnique ? [selectedTechnique] : [];

        // Step 1: Crea GymPlanItem
        const response = await fetch('http://127.0.0.1:8000/api/v1/data/gym-plan-item/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                section_id: idGymSection,
                order: order,
                intensity_techniques: intensityTechniques,
                notes: "Nessuna nota tecnica"
            }),
        });

        const data = await response.json();
        const planItemId = data.id;

        // Step 2: Ciclo per creare i set associati
        for (let i = 1; i <= numSeries; i++) {
            const setResponse = await fetch('http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    exercise_id: idExercises[0],
                    order: 0, // puoi personalizzare l’ordine se necessario
                    set_number: i,
                    prescribed_reps_1: numReps,
                    prescribed_reps_2: numReps,
                    rir: rir,
                    rest_seconds: rest_seconds,
                    weight: weight,
                    tempo_fcr: eccentric+"-"+pause+"-"+concentric,
                    plan_item: planItemId
                }),
            });

            const setData = await setResponse.json();
        }

        location.reload();
    }

    async function addDropSetExercise() {
        const arrayNumReps = String(numReps).split(",");
        const arrayWeight = String(weight).split(",");
        console.log(arrayNumReps);
        console.log(arrayWeight);

        if (arrayNumReps.length != arrayWeight.length) {}

        const orderRes = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-item/first-available-order/${idGymSection}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getCookie('csrftoken'),
            }
        });
        const orderData = await orderRes.json();
        const order = orderData.first_available_order;

        const intensityTechniques = selectedTechnique ? [selectedTechnique] : [];

        // Step 1: Crea GymPlanItem
        const response = await fetch('http://127.0.0.1:8000/api/v1/data/gym-plan-item/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                section_id: idGymSection,
                order: order,
                intensity_techniques: intensityTechniques,
                notes: "Nessuna nota tecnica"
            }),
        });

        const data = await response.json();
        const planItemId = data.id;

        // Step 2: Ciclo per creare i set associati
        for (let i = 1; i <= numSeries; i++) {
            for (let j=0; j < arrayNumReps.length; j++) {
                let calcRest = rest_seconds;
                console.log(j + " " + (arrayNumReps.length - 1));

                if (j !== arrayNumReps.length - 1) {
                    calcRest = 10;
                }

                const setResponse = await fetch('http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + getCookie('csrftoken'),
                    },
                    body: JSON.stringify({
                        exercise_id: idExercises[0],
                        order: j,
                        set_number: i,
                        prescribed_reps_1: arrayNumReps[j],
                        prescribed_reps_2: arrayNumReps[j],
                        rir: rir,
                        rest_seconds: calcRest,
                        weight: arrayWeight[j],
                        tempo_fcr: `${eccentric}-${pause}-${concentric}`,
                        plan_item: planItemId
                    }),
                });

                const setData = await setResponse.json();
            }
        }

        location.reload();
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

    function validateWeekRange(startDateInputId, endDateInputId) {
        const startInput = document.getElementById(startDateInputId);
        const endInput = document.getElementById(endDateInputId);

        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);

        // Controlla che le date siano valide
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return { valid: false, message: "Inserisci date valide." };
        }

        const startDay = startDate.getDay(); // 1 = lunedì, 0 = domenica
        const endDay = endDate.getDay();

        const diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (startDay !== 1) {
            return { valid: false, message: "La data di inizio deve essere un lunedì." };
        }

        if (endDay !== 0) {
            return { valid: false, message: "La data di fine deve essere una domenica." };
        }

        if (diffInDays !== 6) {
            return { valid: false, message: "La differenza tra le due date deve essere esattamente di 7 giorni (dalla mattina del lunedì alla sera della domenica)." };
        }

        return { valid: true };
    }

    function showError(message, elementId = "error1") {
        const errorEl = document.getElementById(elementId);

        if (errorEl) {
            // Mostra l'errore
            errorEl.style.display = "block";
            errorEl.firstChild.textContent = message;

            // Scroll animato verso l'elemento
            errorEl.scrollIntoView({ behavior: "smooth", block: "center" });

            // Nasconde l'errore dopo 5 secondi
            setTimeout(() => {
                errorEl.style.display = "none";
                errorEl.firstChild.textContent = "";
            }, 5000);
        }
    }

    async function saveGymPlan() {
        const result = validateWeekRange("start_date", "end_date");

        if(result.valid) {
            // Effettua una richiesta PATCH al backend per aggiornare un piano alimentare esistente
            const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan/update/${data.id}/`, {
                method: "PATCH", // Metodo HTTP per aggiornare solo i campi specificati
                headers: {
                    "Content-Type": "application/json", // Indica che il corpo della richiesta è in formato JSON
                    "Authorization": "Token " + getCookie('csrftoken'), // Aggiunge il token CSRF per autenticazione
                },
                // Corpo della richiesta con i dati aggiornati da inviare al server
                body: JSON.stringify({
                    start_date: document.getElementById("start_date").value, // Data di inizio del piano
                    end_date: document.getElementById("end_date").value,     // Data di fine del piano
                    note: document.getElementById("notes_plan").value        // Note del piano
                })
            });

            // Se la risposta è positiva (2xx), reindirizza alla pagina dei programmi alimentari
            if (response.ok) {
                location.href = "/account/gym-programs/";
            } else {
                // Altrimenti mostra un messaggio di errore all'utente
                showError("Errore durante il salvataggio della scheda di allenamento!");
            }
        } else {
            showError(result.message);
        }
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

        document.getElementById("notes_plan").innerText = gym_plan_json["note"];

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
                        ${full}
                    </h2>

                    <label for="type_day">Tipologia della giornata:</label>
                    <input type="text" name="type_day" value="${type_day}"
                        placeholder="Inserisci la tipologia della giornata qui..."/>

                    <label for="notes_day">Note della giornata:</label>
                    <textarea id="notes_day" name="notes_day"
                        placeholder="Inserisci le note della giornata qui...">${notes_day}</textarea>

                    <div id="${short}"></div>
                `;

                const divDay = document.getElementById(short);

                const buttonAddTechnique = document.createElement("button");
                buttonAddTechnique.textContent = "Aggiungi esercizio";
                buttonAddTechnique.style = "margin: 30px 0";
                buttonAddTechnique.addEventListener("click", (e) => {
                    showChooseIntensityModal = true;
                });
                divDay.appendChild(buttonAddTechnique);

                gym_plan_items.forEach((item) => {
                    if (item.section.day === short) {
                        idGymSection = item.section.id;
                        let techniques = "";
                        if (Array.isArray(item.intensity_techniques_display)) {
                            techniques = item.intensity_techniques_display.join(', ');
                        } else if (typeof item.intensity_techniques_display === "string") {
                            techniques = item.intensity_techniques_display.split(/[,;|]/).map(t => t.trim()).join(', ');
                        }

                        const gym_plan_item = document.createElement("div");
                        gym_plan_item.classList.add("exercise-row");
                        gym_plan_item.innerHTML = `
                            <div class="exercise-number">${item.order+1}</div>
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

                        gym_plan_item.querySelector(".delete-exercise-button").addEventListener("click", async function () {
                            const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-item/delete/${item.id}/`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Token ' + getCookie('csrftoken'),
                                }
                            });

                            if (response.ok) {
                                location.reload();
                            }
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
                            IntensityTechniquesTempoBase(setNumbers, groupedSets, divDay, openExercisePopup);
                        } else if (item.intensity_techniques.includes("unilateral")) {
                            IntensityTechniquesUnilateral(setNumbers, groupedSets, divDay, disabledDayBefore, openExercisePopup);
                        } else if (item.intensity_techniques.includes("rest_pause")) {
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;

                            IntensityTechniquesRestPause(setNumbers, groupedSets, divDay, dayBeforeToday, full, button, openExercisePopup);
                        } else if (item.intensity_techniques.includes("myoreps")) {
                            const button = document.createElement("button");
                            button.classList.add("buttonCedimento");
                            button.textContent = "Aggiungi serie a cedimento";
                            button.style.margin = 0;
                            button.style.display = 'none';

                            IntensityTechniquesMyoreps(setNumbers, groupedSets, divDay, dayBeforeToday, full, button, openExercisePopup);
                        } else if (item.intensity_techniques.includes("isometric") || item.intensity_techniques.includes("isometric_overload")) {
                            IntensityTechniquesIsometric(setNumbers, groupedSets, divDay, openExercisePopup);
                        } else if (item.intensity_techniques.includes("emom")) {
                            IntensityTechniquesEMOM(setNumbers, groupedSets, divDay, openExercisePopup);
                        } else if (item.intensity_techniques.includes("amrap")) {
                            IntensityTechniquesAMRAP(setNumbers, groupedSets, divDay, openExercisePopup);
                        } else if (item.intensity_techniques.includes("death_set")) {
                            IntensityTechniquesDeathSet(setNumbers, groupedSets, divDay, openExercisePopup);
                        } else {
                            IntensityTechniquesDefault(setNumbers, groupedSets, divDay, openExercisePopup);
                        }

                        /*const buttonAdd = document.createElement("button");
                        buttonAdd.textContent = "Aggiungi serie";
                        buttonAdd.style.margin = 0;
                        buttonAdd.addEventListener("click", (e) => {
                            showChooseExerciseModal = true;
                        });
                        buttonAdd.setAttribute("data-id", item.id)
                        divDay.appendChild(buttonAdd);*/
                    }
                });
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

        fetchGymItems();
    });
</script>