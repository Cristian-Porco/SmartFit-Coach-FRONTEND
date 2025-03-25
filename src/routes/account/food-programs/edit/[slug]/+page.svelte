<head>
    <style>
        .icon-sidebar {
            display: flex;
        }
        .sidebar {
            display: none;
        }
        .main-content {
            width: 100%;
            min-width: 100%;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 10px;
        }
        .container div {
            flex: 1;
            text-align: center;
        }
        .container div:nth-child(1) {
            text-align: left;
        }
        .container div:nth-child(2) {
            text-align: right;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: center;
            border-top: 1px solid #cfcfcf;
            border-bottom: 1px solid #cfcfcf;
        }
        th {
            border: 1px solid #cfcfcf;
        }
        td:first-child {
            border-left: 1px solid #cfcfcf;
        }

        /* Imposta il bordo destro solo sull'ultima colonna */
        td:last-child {
            border-right: 1px solid #cfcfcf;
        }
        th, .total-name {
            background-color: #e8e8e8;
        }
        #detailsFoodPlanMobile {
            background-color: #e8e8e8;
            display: none;
        }
        .header-title {
            font-size: 18px;
            font-weight: bold;
        }
        .header-limits {
            font-size: 14px;
        }
        .separator {
            border: 1px solid #fff !important;
        }
        .meal-name {
            font-size: 18px;
            font-weight: bold;
            background-color: #f4f4f4;
        }
        .name-column {
            width: 20%;
            text-align: left;
            font-weight: bold;
        }
        .grams-column {
            width: 120px;
            padding: 0px;
            font-weight: bold;
            font-size: 18px;
        }
        input[type="checkbox"] {
            transform: scale(1.5);
            display: block;
            margin: auto;
        }
        .separator-row {
            height: 20px;
        }
        .responsive-table {
            width: 100%;
            border-collapse: collapse;
        }
        table input {
            padding: 8px;
            margin-bottom: 0;
            border-radius: 0;
            background: #fff;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
        }
        #max_kcal, #max_protein, #max_carbs, #max_fats {
            padding: 0px;
        }
        #section_date input {
            display: inline;
            width: auto;
        }
        @media screen and (max-width: 768px) {
            .container  {
                flex-direction: column;
                align-items: center;
            }

            .responsive-table thead {
                display: none; /* Nasconde l'intestazione originale */
            }

            .responsive-table tbody,
            .responsive-table tr,
            .responsive-table td {
                display: block;
                width: 100%;
                border: 0px;
            }

            .responsive-table tr {
                margin-bottom: 10px;
                border: 1px solid #ddd;
            }

            .responsive-table .separator-row {
                display: none;
            }

            .responsive-table td {
                text-align: left;
                position: relative;
                display: flex;
                justify-content: space-between;
            }

            .responsive-table td::before {
                content: attr(data-label);
                font-weight: bold;
                flex: 1;
                padding-right: 10px;
            }
            .delete-column {
                text-align: center;
            }
            .name-column {
                display: none !important;
            }
            .grams-column {
                font-size: 30px;
            }
            #detailsFoodPlanMobile {
                display: block;
            }
            #detailsFoodPlanMobile input {
                justify-content: space-between;
                align-items: center;
                width: auto;
            }
            table input {

                width: 120px;
            }
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
        .modal-content>h3 {
            margin-bottom: 15px;
        }
        .modal-container {
            display: flex;
            gap: 20px;
            width: 100%;
            margin-bottom: 10px;
        }
        .food-search {
            width: 50%;
        }
        .food-list {
            list-style: none;
            height: 300px; /* Altezza limitata */
            overflow-y: scroll; /* Abilita la barra di scorrimento verticale */
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 0;
            border: 1px solid #ddd;
            border-radius: 40px;
        }
        .food-list::-webkit-scrollbar {
            display: none;
        }
        .food-list li {
            padding: 10px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }
        .food-list li:first-child {
            border-top: none;
        }
        .food-list li:last-child {
            border-bottom: none;
        }
        .food-details {
            width: 50%;
            background: #f1f5f9;
            border-radius: 40px;
            padding: 15px;
        }
        .food-details h3 {
            font-size: 1.5em;
            text-align: center
        }
        .food-details div {
            text-align: left;
            position: relative;
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 18px;
        }
        .close-button {
            margin-bottom: 0;
        }
        @keyframes glow {
            0% { background-color: #007bff; }
            50% { background-color: #80bfff; }
            100% { background-color: #f1f5f9; }
        }
        .highlight {
            animation: glow 1s ease-in-out;
        }
        #max_protein, #max_carbs, #max_fats, .grams-column {
            position: relative;
        }
        #max_protein::after, #max_carbs::after, #max_fats::after, .grams-column::after {
            content: " g";
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none; /* Impedisce di cliccare sopra */
            color: gray;
            font-size: 14px;
        }
        .grams-column::after {
            font-size: 18px;
        }
        .food-item-add {
            display: flex;
            flex-direction: column;
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
        video, #qr-shaded-region {
            border-radius: 40px;
        }
    </style>
</head>

<div class="container">
    <div><p><b>Modifica</b></p><h1 class="titlePage">Scheda alimentare</h1></div>
    <div id="section_date">
        <p><b>Data inizio:</b> <input type="date" id="start_date" required></p>
        <p><b>Data fine:</b> <input type="date" id="end_date" required></p>
    </div>
</div>

<div class="error" id="error1">
    <p></p>
</div>

<div class="form-container">
    <table  class="responsive-table">
        <thead>
            <tr>
                <th rowspan="2" colspan="2" class="header-title name-column">Nome</th>
                <th rowspan="2" class="header-title">Grammi</th>
                <th class="header-title kcal_column">Kcal</th>
                <th class="header-title protein_column">Proteine</th>
                <th class="header-title carbs_column">Carboidrati</th>
                <th class="header-title sugars_column">Zuccheri</th>
                <th class="header-title fats_column">Grassi</th>
                <th class="header-title satured_fats_column">Grassi Saturi</th>
                <th class="header-title fiber_column">Fibre</th>
            </tr>
            <tr>
                <th class="header-limits kcal_column" id="max_kcal"><input type="number" placeholder="Max Kcal..." class="max_kcal_value" on:blur={autoCalculationKCal} ></th>
                <th class="header-limits protein_column" id="max_protein"><input type="number" placeholder="Max Proteine..." class="max_protein_value" on:blur={autoCalculationKCal} ></th>
                <th class="header-limits carbs_column" id="max_carbs"><input type="number" placeholder="Max Carboidrati..." class="max_carbs_value" on:blur={autoCalculationKCal} ></th>
                <th class="header-limits sugars_column" id="max_sugars"></th>
                <th class="header-limits fats_column" id="max_fats"><input type="number" placeholder="Max Grassi..." class="max_fats_value" on:blur={autoCalculationKCal} ></th>
                <th class="header-limits satured_fats_column" id="max_saturated_sugars"></th>
                <th class="header-limits fiber_column" id="max_fiber"></th>
            </tr>
        </thead>
        <tbody id="containerFoodPlan">
            <tr id="detailsFoodPlanMobile">
                <td data-label="Max Kcal:"><input type="number" placeholder="Max Kcal..." class="max_kcal_value" on:blur={autoCalculationKCal}></td>
                <td data-label="Max Proteine:"><input type="number" placeholder="Max Proteine..." class="max_protein_value" on:blur={autoCalculationKCal}></td>
                <td data-label="Max Carboidrati:"><input type="number" placeholder="Max Carboidrati..." class="max_carbs_value" on:blur={autoCalculationKCal}></td>
                <td data-label="Max Grassi:"><input type="number" placeholder="Max Grassi..." class="max_fats_value" on:blur={autoCalculationKCal}></td>
            </tr>
        </tbody>
    </table>
</div>
<button on:click={() => showModal = true}>Aggiungi pasto</button>
<div class="separator-row"></div>
<button on:click={saveFoodPlan}>Modifica scheda alimentare</button>

<script>
    import { onMount } from "svelte";
    import { getCookie } from "svelte-cookie";
    import { Html5Qrcode } from 'html5-qrcode';
    import { tick } from 'svelte';

    export let data;
    let showModal = false;
    let searchQuery = "";
    let foodItems = [];
    let filteredFoodItems = [];
    let selectedFood = null;
    let foodSections = [];
    let selectedSection = "";
    let selectedQuantity = null;

    let showSectionModal = false;
    let newSectionName = "";
    let newSectionTime = "";

    let showFoodModal = false;
    let scanner;
    let scanning = false;
    let showScannerModal = false;

    let total_grams = {
        "kcal": 0,
        "protein": 0,
        "carboids": 0,
        "sugar": 0,
        "fats": 0,
        "satured_fats": 0,
        "fiber": 0
    }

    let limit_grams = {
        "max_kcal": 0,
        "max_protein": 0,
        "max_carboids": 0,
        "min_sugar": 0,
        "max_sugar": 0,
        "max_fats": 0,
        "max_satured_fats": 0,
        "min_fiber": 0
    }

    let new_food_item = {
        "name": "",
        "brand": "",
        "barcode": "",
        "kcal": 0,
        "protein": 0,
        "carboids": 0,
        "sugar": 0,
        "fats": 0,
        "saturated_fats": 0,
        "fiber": 0
    }

    // Carica gli alimenti dall'API
    async function fetchFoodItems() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-item/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                }
            });
            if (!response.ok) throw new Error("Errore nel caricamento degli alimenti");
            foodItems = await response.json();
            filteredFoodItems = foodItems;
        } catch (error) {
            // TODO: visualizzare errori
        }
    }

    // Carica le sezioni degli alimenti
    async function fetchFoodSections() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan-section/me/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                }
            });
            if (!response.ok) {
                // TODO: visualizzare errori
            }
            foodSections = await response.json();
        } catch (error) {
            // TODO: visualizzare errori
        }
    }

    // Filtra gli alimenti in base alla ricerca
    function filterFoodItems() {
        filteredFoodItems = foodItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Seleziona un alimento
    function selectFood(food) {
        selectedFood = food;
    }

    // Aggiunge il pasto alla tabella
    async function addMeal() {
        if (!selectedFood || !selectedSection || selectedQuantity == null) return;

        const response = await fetch('http://127.0.0.1:8000/api/v1/data/food-plan-item/create/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                eaten: false,
                quantity_in_grams: selectedQuantity,
                food_plan: data.id,
                food_item: selectedFood.id,
                food_section: selectedSection
            })
        });

        if(response.ok) {
            location.reload();
        } else {
            // TODO: visualizzare errori
        }
    }

    function autoCalculationKCal() {
        limit_grams.max_protein = parseFloat(document.querySelector(".max_protein_value")?.value || 0);
        limit_grams.max_carboids = parseFloat(document.querySelector(".max_carbs_value")?.value || 0);
        limit_grams.max_fats = parseFloat(document.querySelector(".max_fats_value")?.value || 0);

        limit_grams.max_kcal = (limit_grams.max_protein * 4) + (limit_grams.max_carboids * 4) + (limit_grams.max_fats * 9);

        limit_grams.min_sugar = parseFloat(((limit_grams.max_kcal*0.05)/4).toFixed(1));
        limit_grams.max_sugar = parseFloat(((limit_grams.max_kcal*0.1)/4).toFixed(1));
        limit_grams.max_satured_fats = parseFloat(((limit_grams.max_kcal*0.1)/9).toFixed(1));
        limit_grams.min_fiber = parseFloat(((limit_grams.max_kcal/1000)*14).toFixed(1));

        document.getElementById("max_sugars").innerText = limit_grams.min_sugar + "-" + limit_grams.max_sugar + "g";
        document.getElementById("max_saturated_sugars").innerText = limit_grams.max_satured_fats + "g";
        document.getElementById("max_fiber").innerText = "almeno " + limit_grams.min_fiber + "g";

        // Aggiorna tutti gli elementi con la classe .max_kcal_value
        document.querySelectorAll(".max_kcal_value").forEach(el => {
            el.value = limit_grams.max_kcal;

            // Aggiungi l'animazione
            el.classList.add("highlight");

            // Rimuovi l'animazione dopo 1 secondo
            setTimeout(() => {
                el.classList.remove("highlight");
            }, 1000);
        });

        document.querySelectorAll("#max_kcal").forEach(el => {
            el.value = limit_grams.max_kcal;

            // Aggiungi l'animazione
            el.classList.add("highlight");

            // Rimuovi l'animazione dopo 1 secondo
            setTimeout(() => {
                el.classList.remove("highlight");
            }, 1000);
        });

        updateGraphicsLimits()
    }

    async function saveFoodPlan() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan/update/" + data.id + "/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                start_date: document.getElementById("start_date").value,
                end_date: document.getElementById("end_date").value,
                max_kcal: document.querySelector(".max_kcal_value")?.value,
                max_protein: document.querySelector(".max_protein_value")?.value,
                max_carbs: document.querySelector(".max_carbs_value")?.value,
                max_fats: document.querySelector(".max_fats_value")?.value,
            })
        });

        if(response.ok) {
            location.href = "/account/food-programs/";
        } else {
            // TODO: visualizzare errori
        }
    }

    function updateGraphicsLimits() {
        if(limit_grams.max_kcal < total_grams.kcal) {
            document.querySelectorAll(".kcal_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".kcal_column").forEach(el => {
                if(el.tagName === "TH") {
                    if(el.id === "max_kcal") el.style.background = "#ffffff";
                    else el.style.background = "#e8e8e8";
                } else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.max_protein < total_grams.protein) {
            document.querySelectorAll(".protein_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".protein_column").forEach(el => {
                if(el.tagName === "TH") {
                    if(el.id === "max_protein") el.style.background = "#ffffff";
                    else el.style.background = "#e8e8e8";
                } else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.max_carboids < total_grams.carboids) {
            document.querySelectorAll(".carbs_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".carbs_column").forEach(el => {
                if(el.tagName === "TH") {
                    if(el.id === "max_carbs") el.style.background = "#ffffff";
                    else el.style.background = "#e8e8e8";
                } else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.max_sugar < total_grams.sugar) {
            document.querySelectorAll(".sugars_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else if(limit_grams.min_sugar < total_grams.sugar
            && total_grams.sugar < limit_grams.max_sugar) {
            document.querySelectorAll(".sugars_column").forEach(el => {
                el.style.background = "#ffe959";
            });
        } else {
            document.querySelectorAll(".sugars_column").forEach(el => {
                if(el.tagName === "TH") el.style.background = "#e8e8e8";
                else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.max_fats < total_grams.fats) {
            document.querySelectorAll(".fats_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".fats_column").forEach(el => {
                if(el.tagName === "TH") {
                    if(el.id === "max_fats") el.style.background = "#ffffff";
                    else el.style.background = "#e8e8e8";
                } else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.max_satured_fats < total_grams.satured_fats) {
            document.querySelectorAll(".satured_fats_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".satured_fats_column").forEach(el => {
                if(el.tagName === "TH") el.style.background = "#e8e8e8";
                else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }

        if(limit_grams.min_fiber > total_grams.fiber) {
            document.querySelectorAll(".fiber_column").forEach(el => {
                el.style.background = "#ff5959";
            });
        } else {
            document.querySelectorAll(".fiber_column").forEach(el => {
                if(el.tagName === "TH") el.style.background = "#e8e8e8";
                else if(el.id === "totalValueRow") el.style.background = "#e8e8e8";
                else el.style.background = "none";
            });
        }
    }

    function createFoodItem() {
        showFoodModal = true;
    }

    function createFoodItemSection() {
        showSectionModal = true;
    }

    async function submitNewSection() {
        if (!newSectionName || !newSectionTime) return;

        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan-section/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                name: newSectionName,
                start_time: newSectionTime,
                author: getCookie('pk')
            })
        });

        if (response.ok) {
            showSectionModal = false;
            newSectionName = "";
            newSectionTime = "";
            await fetchFoodSections(); // aggiorna l'elenco delle sezioni
        } else {
            // TODO: visualizzare errori
        }
    }


    let content = [];

    onMount(async() => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan/" + data.id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const food_plan = await response.json();

        const formattedStartDate = food_plan.start_date.split('/').reverse().join('-');
        document.getElementById("start_date").value = formattedStartDate;
        const formattedEndDate = food_plan.end_date.split('/').reverse().join('-');
        document.getElementById("end_date").value = formattedEndDate;

        function syncInputs(className) {
            document.querySelectorAll(`.${className}`).forEach(input => {
                input.addEventListener("input", (event) => {
                    document.querySelectorAll(`.${className}`).forEach(el => {
                        if (el !== event.target) { // Evita di riassegnare il valore a chi ha attivato l'evento
                            el.value = event.target.value;
                        }
                    });
                });
            });
        }

        // Assegna i valori iniziali
        document.querySelectorAll(".max_kcal_value").forEach(el => {
            el.value = food_plan.max_kcal;
        });
        document.querySelectorAll(".max_protein_value").forEach(el => {
            el.value = food_plan.max_protein;
        });
        document.querySelectorAll(".max_carbs_value").forEach(el => {
            el.value = food_plan.max_carbs;
        });
        document.querySelectorAll(".max_fats_value").forEach(el => {
            el.value = food_plan.max_fats;
        });

        // Aggiunge il comportamento di sincronizzazione tra input con la stessa classe
        syncInputs("max_kcal_value");
        syncInputs("max_protein_value");
        syncInputs("max_carbs_value");
        syncInputs("max_fats_value");

        [".max_protein_value", ".max_carbs_value", ".max_fats_value"].forEach(className => {
            document.querySelectorAll(className).forEach(input => {
                input.addEventListener("input", autoCalculationKCal);
            });
        });

        limit_grams.max_kcal = parseFloat(food_plan.max_kcal);
        limit_grams.max_protein = parseFloat(food_plan.max_protein);
        limit_grams.max_carboids = parseFloat(food_plan.max_carbs);
        limit_grams.min_sugar = parseFloat(((food_plan.max_kcal*0.05)/4).toFixed(1));
        limit_grams.max_sugar = parseFloat(((food_plan.max_kcal*0.1)/4).toFixed(1));
        limit_grams.max_fats = parseFloat(food_plan.max_fats);
        limit_grams.max_satured_fats = parseFloat(((food_plan.max_kcal*0.1)/9).toFixed(1));
        limit_grams.min_fiber = parseFloat(((food_plan.max_kcal/1000)*14).toFixed(1));

        document.getElementById("max_sugars").innerText = limit_grams.min_sugar + "-" + limit_grams.max_sugar + "g";
        document.getElementById("max_saturated_sugars").innerText = limit_grams.max_satured_fats + "g";
        document.getElementById("max_fiber").innerText = "almeno " + limit_grams.min_fiber + "g";

        let food_items = food_plan.food_items;
        const table = document.getElementById("containerFoodPlan");

        // Raggruppiamo gli alimenti per sezione
        const groupedByFoodSection = food_items.reduce((acc, item) => {
            if (!acc[item.food_section]) {
                acc[item.food_section] = [];
            }
            acc[item.food_section].push(item);
            return acc;
        }, {});

        const food_items_sections_id = Object.keys(groupedByFoodSection);
        let sections = [];

        // Fetch parallelo delle sezioni
        const sectionRequests = food_items_sections_id.map(async (id) => {
            const response_section = await fetch(`http://127.0.0.1:8000/api/v1/data/food-plan-section/${id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                }
            });

            return response_section.json();
        });

        sections = await Promise.all(sectionRequests);
        sections.sort((a, b) => a.start_time - b.start_time);

        // Creiamo l'array content con le sezioni e gli alimenti
        sections.forEach(item => {
            content.push({ type: "section", item });

            const key = item.id.toString();
            const vector_food_items = groupedByFoodSection[key];

            vector_food_items.forEach(item2 => {
                content.push({
                    type: "food-item",
                    food_plan_item: item2,
                    food_item: {} // Per ora vuoto, lo popoleremo dopo
                });
            });
        });

        // Fetch parallelo degli alimenti
        const foodRequests = content
            .filter(item => item.type === "food-item")
            .map(async (item) => {
                const response_food = await fetch(`http://127.0.0.1:8000/api/v1/data/food-item/${item.food_plan_item.food_item}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + getCookie('csrftoken'),
                    }
                });

                item.food_item = await response_food.json();
            });

        await Promise.all(foodRequests);

        content.forEach(item => {
            if (item.type === "section") {
                const rowSeparator = table.insertRow();
                rowSeparator.classList.add("separator-row");

                const newFoodPlanSection = table.insertRow();
                newFoodPlanSection.classList.add("meal-name");

                const cell = newFoodPlanSection.insertCell(0);
                cell.textContent = `${item.item.name} (orario previsto ${item.item.start_time})`;
                cell.colSpan = 10;
            } else if (item.type === "food-item") {
                const newFoodItem = table.insertRow();
                newFoodItem.id = item.food_plan_item.id;
                const cell1 = newFoodItem.insertCell(0);
                cell1.classList.add("delete-column");

                // Creazione dell'icona Material Icons
                const trashIcon = document.createElement("span");
                trashIcon.classList.add("material-icons");
                trashIcon.textContent = "delete"; // Nome dell'icona di Material Icons
                trashIcon.style.cursor = "pointer";
                trashIcon.style.fontSize = "24px"; // Dimensione icona
                trashIcon.style.color = "red"; // Colore dell'icona

                // Evento di click per eliminare l'elemento
                trashIcon.addEventListener("click", async function () {
                    const response = await fetch('http://127.0.0.1:8000/api/v1/data/food-plan-item/delete/' + item.food_plan_item.id + '/', {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        }
                    });

                    if (response.ok) {
                        newFoodItem.remove();

                        let el2 = document.getElementById("totalValueRow");
                        el2.classList.add("highlight");
                        setTimeout(() => {
                            el2.classList.remove("highlight");
                        }, 1000);

                        const righeValide = document.querySelectorAll(
                            "tr:not(.meal-name):not(.separator-row):not(#detailsFoodPlanMobile):not(#totalValueRow)"
                        );

                        const totalRiga = document.getElementById("totalValueRow");
                        const totalCelle = totalRiga.getElementsByTagName("td");

                        totalCelle[1].textContent = 0;
                        totalCelle[2].textContent = 0;
                        totalCelle[3].textContent = 0;
                        totalCelle[4].textContent = 0;
                        totalCelle[5].textContent = 0;
                        totalCelle[6].textContent = 0;
                        totalCelle[7].textContent = 0;

                        righeValide.forEach(riga => {
                            const celle = [...riga.querySelectorAll("td")];
                            celle.forEach((cella, index) => {
                                if(index == 3) {
                                    totalCelle[1].textContent = parseFloat(totalCelle[1].textContent) + parseFloat(cella.textContent);
                                } else if(index == 4) {
                                    totalCelle[2].textContent = parseFloat(totalCelle[2].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                } else if(index == 5) {
                                    totalCelle[3].textContent = parseFloat(totalCelle[3].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                } else if(index == 6) {
                                    totalCelle[4].textContent = parseFloat(totalCelle[4].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                } else if(index == 7) {
                                    totalCelle[5].textContent = parseFloat(totalCelle[5].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                } else if(index == 8) {
                                    totalCelle[6].textContent = parseFloat(totalCelle[6].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                } else if(index == 9) {
                                    totalCelle[7].textContent = parseFloat(totalCelle[7].textContent) + parseFloat(cella.textContent.slice(0, -1));
                                }
                            });
                        });

                        totalCelle[1].textContent = parseFloat(totalCelle[1].textContent).toFixed(1);
                        totalCelle[2].textContent = parseFloat(totalCelle[2].textContent).toFixed(1) + "g";
                        totalCelle[3].textContent = parseFloat(totalCelle[3].textContent).toFixed(1) + "g";
                        totalCelle[4].textContent = parseFloat(totalCelle[4].textContent).toFixed(1) + "g";
                        totalCelle[5].textContent = parseFloat(totalCelle[5].textContent).toFixed(1) + "g";
                        totalCelle[6].textContent = parseFloat(totalCelle[6].textContent).toFixed(1) + "g";
                        totalCelle[7].textContent = parseFloat(totalCelle[7].textContent).toFixed(1) + "g";

                        total_grams.kcal = totalCelle[1].textContent;
                        total_grams.protein = totalCelle[2].textContent;
                        total_grams.carboids = totalCelle[3].textContent;
                        total_grams.sugar = totalCelle[4].textContent;
                        total_grams.fats = totalCelle[5].textContent;
                        total_grams.satured_fats = totalCelle[6].textContent;
                        total_grams.fiber = totalCelle[7].textContent;
                    } else {
                        // TODO: visualizzare errori
                    }
                });

                cell1.appendChild(trashIcon);
                const cell2 = newFoodItem.insertCell(1);
                cell2.classList.add("name-column");
                cell2.textContent = item.food_item.name;

                const cell3 = newFoodItem.insertCell(2);
                cell3.classList.add("grams-column");
                cell3.setAttribute("data-label", item.food_item.name);

                // Creazione dell'input per modificare i grammi
                const inputGrams = document.createElement("input");
                inputGrams.type = "number";
                inputGrams.value = item.food_plan_item.quantity_in_grams;
                inputGrams.style.textAlign = "center";
                inputGrams.style.border = "1px solid #ccc";
                inputGrams.style.borderRadius = "4px";
                inputGrams.style.padding = "4px";
                inputGrams.style.fontSize = "18px";

                // Evento per aggiornare il valore quando l'utente preme Invio
                inputGrams.addEventListener("input", async function (event) {
                    const newQuantity = parseInt(inputGrams.value, 10);

                    let response = await fetch(`http://127.0.0.1:8000/api/v1/data/food-plan-item/update/${item.food_plan_item.id}/`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        },
                        body: JSON.stringify({
                            id: item.food_plan_item.id,
                            quantity_in_grams: newQuantity,
                        })
                    });

                    let response_inputGrams = await response.json();
                    
                    response = await fetch(`http://127.0.0.1:8000/api/v1/data/food-item/${response_inputGrams.food_item}/`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        }
                    });

                    response_inputGrams = await response.json();

                    const riga = document.getElementById(item.food_plan_item.id);
                    const celle = riga.getElementsByTagName("td");
                    
                    const moltiplicatore = newQuantity / 100;
                    celle[3].textContent = (response_inputGrams.kcal_per_100g * moltiplicatore).toFixed(1);
                    celle[4].textContent = (response_inputGrams.protein_per_100g * moltiplicatore).toFixed(1) + "g";
                    celle[5].textContent = (response_inputGrams.carbs_per_100g * moltiplicatore).toFixed(1) + "g";
                    celle[6].textContent = (response_inputGrams.sugars_per_100g * moltiplicatore).toFixed(1) + "g";
                    celle[7].textContent = (response_inputGrams.fats_per_100g * moltiplicatore).toFixed(1) + "g";
                    celle[8].textContent = (response_inputGrams.saturated_fats_per_100g * moltiplicatore).toFixed(1) + "g";
                    celle[9].textContent = (response_inputGrams.fiber_per_100g * moltiplicatore).toFixed(1) + "g";

                    let el1 = document.getElementById(item.food_plan_item.id);
                    el1.classList.add("highlight");
                    setTimeout(() => {
                        el1.classList.remove("highlight");
                    }, 1000);

                    let el2 = document.getElementById("totalValueRow");
                    el2.classList.add("highlight");
                    setTimeout(() => {
                        el2.classList.remove("highlight");
                    }, 1000);

                    const righeValide = document.querySelectorAll(
                        "tr:not(.meal-name):not(.separator-row):not(#detailsFoodPlanMobile):not(#totalValueRow)"
                    );

                    const totalRiga = document.getElementById("totalValueRow");
                    const totalCelle = totalRiga.getElementsByTagName("td");
                    
                    totalCelle[1].textContent = 0;
                    totalCelle[2].textContent = 0;
                    totalCelle[3].textContent = 0;
                    totalCelle[4].textContent = 0;
                    totalCelle[5].textContent = 0;
                    totalCelle[6].textContent = 0;
                    totalCelle[7].textContent = 0;

                    righeValide.forEach(riga => {
                        const celle = [...riga.querySelectorAll("td")];
                        celle.forEach((cella, index) => {
                            if(index == 3) {
                                totalCelle[1].textContent = parseFloat(totalCelle[1].textContent) + parseFloat(cella.textContent);
                            } else if(index == 4) {
                                totalCelle[2].textContent = parseFloat(totalCelle[2].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            } else if(index == 5) {
                                totalCelle[3].textContent = parseFloat(totalCelle[3].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            } else if(index == 6) {
                                totalCelle[4].textContent = parseFloat(totalCelle[4].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            } else if(index == 7) {
                                totalCelle[5].textContent = parseFloat(totalCelle[5].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            } else if(index == 8) {
                                totalCelle[6].textContent = parseFloat(totalCelle[6].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            } else if(index == 9) {
                                totalCelle[7].textContent = parseFloat(totalCelle[7].textContent) + parseFloat(cella.textContent.slice(0, -1));
                            }
                        });
                    });

                    totalCelle[1].textContent = parseFloat(totalCelle[1].textContent).toFixed(1);
                    totalCelle[2].textContent = parseFloat(totalCelle[2].textContent).toFixed(1) + "g";
                    totalCelle[3].textContent = parseFloat(totalCelle[3].textContent).toFixed(1) + "g";
                    totalCelle[4].textContent = parseFloat(totalCelle[4].textContent).toFixed(1) + "g";
                    totalCelle[5].textContent = parseFloat(totalCelle[5].textContent).toFixed(1) + "g";
                    totalCelle[6].textContent = parseFloat(totalCelle[6].textContent).toFixed(1) + "g";
                    totalCelle[7].textContent = parseFloat(totalCelle[7].textContent).toFixed(1) + "g";

                    total_grams.kcal = parseFloat(totalCelle[1].textContent);
                    total_grams.protein = parseFloat(totalCelle[2].textContent);
                    total_grams.carboids = parseFloat(totalCelle[3].textContent);
                    total_grams.sugar = parseFloat(totalCelle[4].textContent);
                    total_grams.fats = parseFloat(totalCelle[5].textContent);
                    total_grams.satured_fats = parseFloat(totalCelle[6].textContent);
                    total_grams.fiber = parseFloat(totalCelle[7].textContent);

                    updateGraphicsLimits()
                });

                // Aggiunge il campo di input alla cella
                cell3.appendChild(inputGrams);

                const moltiplicatore = item.food_plan_item.quantity_in_grams / 100;
                total_grams.kcal += item.food_item.kcal_per_100g * moltiplicatore;
                const cell4 = newFoodItem.insertCell(3);
                cell4.classList.add("kcal_column");
                cell4.setAttribute("data-label", "Kcal:")
                cell4.textContent = (item.food_item.kcal_per_100g * moltiplicatore).toFixed(1);

                total_grams.protein += item.food_item.protein_per_100g * moltiplicatore;
                const cell5 = newFoodItem.insertCell(4);
                cell5.classList.add("protein_column");
                cell5.setAttribute("data-label", "Proteine:")
                cell5.textContent = (item.food_item.protein_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.carboids += item.food_item.carbs_per_100g * moltiplicatore;
                const cell6 = newFoodItem.insertCell(5);
                cell6.classList.add("carbs_column");
                cell6.setAttribute("data-label", "Carboidrati:")
                cell6.textContent = (item.food_item.carbs_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.sugar += item.food_item.sugars_per_100g * moltiplicatore;
                const cell7 = newFoodItem.insertCell(6);
                cell7.classList.add("sugars_column");
                cell7.setAttribute("data-label", "Zuccheri:")
                cell7.textContent = (item.food_item.sugars_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.fats += item.food_item.fats_per_100g * moltiplicatore;
                const cell8 = newFoodItem.insertCell(7);
                cell8.classList.add("fats_column");
                cell8.setAttribute("data-label", "Grassi:");
                cell8.textContent = (item.food_item.fats_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.satured_fats += item.food_item.saturated_fats_per_100g * moltiplicatore;
                const cell9 = newFoodItem.insertCell(8);
                cell9.classList.add("satured_fats_column");
                cell9.setAttribute("data-label", "Grassi Saturi:");
                cell9.textContent = (item.food_item.saturated_fats_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.fiber += item.food_item.fiber_per_100g * moltiplicatore;
                const cell10 = newFoodItem.insertCell(9);
                cell10.classList.add("fiber_column");
                cell10.setAttribute("data-label", "Fibre:");
                cell10.textContent = (item.food_item.fiber_per_100g * moltiplicatore).toFixed(1) + "g";
            }
        });

        const rowSeparator = table.insertRow();
        rowSeparator.classList.add("separator-row");

        const totalValueRow = table.insertRow();
        totalValueRow.classList.add("total-name");
        totalValueRow.id = "totalValueRow";

        const cell1 = totalValueRow.insertCell(0);
        cell1.innerHTML = "<b>Somma dei valori degli alimenti</b>";
        cell1.colSpan = 3;

        const cell2 = totalValueRow.insertCell(1);
        cell2.classList.add("kcal_column");
        cell2.setAttribute("data-label", "Kcal:")
        cell2.textContent = total_grams.kcal.toFixed(1);

        const cell3 = totalValueRow.insertCell(2);
        cell3.classList.add("protein_column");
        cell3.setAttribute("data-label", "Proteine:")
        cell3.textContent = total_grams.protein.toFixed(1) + "g";

        const cell4 = totalValueRow.insertCell(3);
        cell4.classList.add("carbs_column");
        cell4.setAttribute("data-label", "Carboidrati:")
        cell4.textContent = total_grams.carboids.toFixed(1) + "g";

        const cell5 = totalValueRow.insertCell(4);
        cell5.classList.add("sugars_column");
        cell5.setAttribute("data-label", "Zuccheri:")
        cell5.textContent = total_grams.sugar.toFixed(1) + "g";

        const cell6 = totalValueRow.insertCell(5);
        cell6.classList.add("fats_column");
        cell6.setAttribute("data-label", "Grassi:")
        cell6.textContent = total_grams.fats.toFixed(1) + "g";

        const cell7 = totalValueRow.insertCell(6);
        cell7.classList.add("satured_fats_column");
        cell7.setAttribute("data-label", "Grassi Saturi:")
        cell7.textContent = total_grams.satured_fats.toFixed(1) + "g";

        const cell8 = totalValueRow.insertCell(7);
        cell8.classList.add("fiber_column");
        cell8.setAttribute("data-label", "Fibre:")
        cell8.textContent = total_grams.fiber.toFixed(1) + "g";

        updateGraphicsLimits()

        fetchFoodItems();
        fetchFoodSections();
    });

    async function startScanner() {
        showScannerModal = true;
        await tick();
        scanner = new Html5Qrcode("barcode-reader");
        scanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                new_food_item.barcode = decodedText;
                stopScanner();
                showScannerModal = false;
            },
            (errorMessage) => {
                console.warn(errorMessage);
            }
        );
        scanning = true;
    }

    function stopScanner() {
        if (scanner && scanning) {
            scanner.stop().then(() => {
                scanning = false;
                scanner.clear();
            }).catch(err => console.error("Errore arresto scanner", err));
        }
    }

    async function saveFoodItem() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-item/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                // TODO: aggiustare aggiunta JSON Food Item
                name,
                brand,
                barcode,
                kcal_per_100g: kcal,
                protein_per_100g: protein,
                carbs_per_100g: carbs,
                sugars_per_100g: sugars,
                fats_per_100g: fats,
                saturated_fats_per_100g: saturatedFats,
                fiber_per_100g: fiber
            })
        });

        // TODO: controllare se funziona

        if (response.ok) {
            alert("Alimento creato con successo");
            showFoodModal = false;
        } else {
            alert("Errore durante la creazione dell'alimento");
        }
    }
</script>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <h3>Aggiungi Pasto</h3>
            <div class="modal-container">
                <div class="food-search">
                    <label for="search">Cerca alimento:</label>
                    <input type="text" id="search" bind:value={searchQuery} on:input={filterFoodItems} placeholder="Cerca alimento...">
                    <ul class="food-list">
                        {#each filteredFoodItems as food}
                            <li on:click={() => selectFood(food)}>{food.name}</li>
                        {/each}
                    </ul>
                    <button style="margin-top: 10px; width: 100%;" on:click={createFoodItem}>
                        Crea nuovo alimento
                    </button>
                </div>
                <div class="food-details">
                    {#if selectedFood}
                        <h3>{selectedFood.name}</h3>
                        <p style="text-align: center">Valori nutrizionali per 100g</p>
                        <div>
                            <p><b>Kcal:</b></p>
                            <p>{selectedFood.kcal_per_100g.toFixed(1)}</p>
                        </div>
                        <div>
                            <p><b>Proteine:</b></p>
                            <p>{selectedFood.protein_per_100g.toFixed(1)}g</p>
                        </div>
                        <div>
                            <p><b>Carboidrati:</b></p>
                            <p>{selectedFood.carbs_per_100g.toFixed(1)}g</p>
                        </div>
                        <div>
                            <p><b>Zuccheri:</b></p>
                            <p>{selectedFood.sugars_per_100g.toFixed(1)}g</p>
                        </div>
                        <div>
                            <p><b>Grassi:</b></p>
                            <p>{selectedFood.fats_per_100g.toFixed(1)}g</p>
                        </div>
                        <div>
                            <p><b>Grassi Saturi:</b></p>
                            <p>{selectedFood.saturated_fats_per_100g.toFixed(1)}g</p>
                        </div>
                        <div>
                            <p><b>Fibre:</b></p>
                            <p>{selectedFood.fiber_per_100g.toFixed(1)}g</p>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="separator-row"></div>
            <label for="quantity">Quantità alimento (in grammi):</label>
            <input type="number" id="quantity" bind:value={selectedQuantity} placeholder="Quantità alimento...">
            <label for="section">Sezione alimento:</label>
            <div style="display: flex; align-items: center; gap: 10px;">
                <select id="section" bind:value={selectedSection}>
                    <option value="">Seleziona sezione</option>
                    {#each foodSections as section}
                        <option value={section.id}>{section.name}</option>
                    {/each}
                </select>
                <button on:click={createFoodItemSection}>Crea nuova sezione</button>
            </div>
            <div class="separator-row"></div>
            <button on:click={addMeal}>Aggiungi</button>
            <button class="close-button" on:click={() => showModal = false}>Annulla</button>
        </div>
    </div>
{/if}

{#if showSectionModal}
    <div class="modal">
        <div class="modal-content" style="width: 500px">
            <h3>Nuova Sezione</h3>
            <label for="newSectionName">Nome sezione:</label>
            <input type="text" id="newSectionName" bind:value={newSectionName} placeholder="Nome sezione... (ad esempio, Colazione, Pranzo, ...)" />

            <label for="newSectionTime" style="margin-top: 10px;">Orario previsto (solo ora):</label>
            <input type="number" id="newSectionTime" min="0" max="24" bind:value={newSectionTime} placeholder="Orario previsto del pasto..." />

            <div class="separator-row"></div>
            <button on:click={submitNewSection}>Salva</button>
            <button class="close-button" on:click={() => showSectionModal = false}>Annulla</button>
        </div>
    </div>
{/if}

{#if showFoodModal}
    <div class="modal">
        <div class="modal-content food-item-add" style="width: 800px">
            <h3>Nuovo Alimento</h3>

            <div class="form-group">
                <div class="input-container">
                    <label for="name">Nome:</label>
                    <input bind:value={new_food_item.name} type="text" id="name" placeholder="Nome alimento..." />
                </div>
                <div class="input-container">
                    <label for="brand">Marca:</label>
                    <input bind:value={new_food_item.brand} type="text" id="brand" placeholder="Marca (opzionale)..." />
                </div>
            </div>

            <label>Barcode:</label>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input bind:value={new_food_item.barcode} type="text" placeholder="Inserisci barcode manualmente..." />
                <button type="button" on:click={startScanner}>
                    Inserisci barcode tramite fotocamera
                </button>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="kcal">Chilocalorie (Kcal) per 100g:</label>
                    <input bind:value={new_food_item.kcal} type="number" id="kcal"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="protein">Proteine per 100g:</label>
                    <input bind:value={new_food_item.protein} type="number" id="protein"/>
                </div>
                <div class="input-container">
                    <label for="carboids">Carboidrati per 100g:</label>
                    <input bind:value={new_food_item.carboids} type="number" id="carboids"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="sugar">Zuccheri per 100g:</label>
                    <input bind:value={new_food_item.sugar} type="number" id="sugar"/>
                </div>
                <div class="input-container">
                    <label for="fats">Grassi per 100g:</label>
                    <input bind:value={new_food_item.fats} type="number" id="fats"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="saturated_fats">Grassi Saturi per 100g:</label>
                    <input bind:value={new_food_item.saturated_fats} type="number" id="saturated_fats"/>
                </div>
                <div class="input-container">
                    <label for="fiber">Fibre per 100g:</label>
                    <input bind:value={new_food_item.fiber} type="number" id="fiber"/>
                </div>
            </div>

            <div class="separator-row"></div>
            <button on:click={saveFoodItem}>Aggiungi</button>
            <button class="close-button" on:click={() => showFoodModal = false}>Annulla</button>
        </div>
    </div>
{/if}

{#if showScannerModal}
    <div class="modal">
        <div class="modal-content" style="width: 90%; max-width: 500px;">
            <h3>Scansione Barcode</h3>
            <div id="barcode-reader" style="width: 100%; height: auto;"></div>
            <div class="separator-row"></div>
            <button on:click={() => { stopScanner(); showScannerModal = false; }}>Chiudi</button>
        </div>
    </div>
{/if}