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
            border: 1px solid #cfcfcf;
        }
        th, .total-name{
            background-color: #e8e8e8;
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
            font-weight: bold;
            text-align: left;
            background-color: #f4f4f4;
        }
        .name-column {
            width: 200px;
            text-align: left;
        }
        .grams-column {
            font-style: italic;
        }
        input[type="checkbox"] {
            transform: scale(1.5);
            display: block;
            margin: auto;
        }
        @media (max-width: 768px) {
            th, td {
                padding: 5px;
            }
            th:nth-child(n+4), td:nth-child(n+4), .header-limits {
                display: none;
            }
            .container  {
                flex-direction: column;
                align-items: center;
            }
            #totalValueRow {
                display: none;
            }
            .container div:nth-child(2) {
                text-align: center;
            }
        }
    </style>
</head>

<div class="container">
    <div><h1 class="titlePage">Scheda alimentare</h1></div>
    <div>
        <p><b>Data inizio:</b> <span id="start_date">--/--/----</span></p>
        <p><b>Data fine:</b> <span id="end_date">--/--/----</span></p>
    </div>
</div>

<div class="form-container">
    <table>
        <thead>
        <tr>
            <th rowspan="2" class="header-title">✓</th>
            <th rowspan="2" class="header-title name-column">Nome</th>
            <th rowspan="2" class="header-title">Grammi</th>
            <th class="header-title">Kcal</th>
            <th class="header-title">Proteine</th>
            <th class="header-title">Carboidrati</th>
            <th class="header-title">Zuccheri</th>
            <th class="header-title">Grassi</th>
            <th class="header-title">Grassi Saturi</th>
            <th class="header-title">Fibre</th>
        </tr>
        <tr>
            <th class="header-limits" id="max_kcal"></th>
            <th class="header-limits" id="max_protein"></th>
            <th class="header-limits" id="max_carbs"></th>
            <th class="header-limits"></th>
            <th class="header-limits" id="max_fats"></th>
            <th class="header-limits"></th>
            <th class="header-limits"></th>
        </tr>
        </thead>
        <tbody id="containerFoodPlan">
        </tbody>
    </table>
</div>

<script>
    import {onMount} from "svelte";
    import {getCookie} from "svelte-cookie";

    export let data;
    let idFoodPlan;

    let food_plan = {
        "id": null,
        "start_date": null,
        "end_date": null,
        "max_kcal": null,
        "max_protein": null,
        "max_carbs": null,
        "max_fats": null,
        "author": null
    }
    let food_items = []
    let food_items_sections = [];

    let content = [];

    onMount(async () => {
        idFoodPlan = data.id;
        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/food-plan/${idFoodPlan}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        const food_plan_json = await response.json();

        food_plan = {
            id: food_plan_json.id,
            start_date: food_plan_json.start_date,
            end_date: food_plan_json.end_date,
            max_kcal: food_plan_json.max_kcal,
            max_protein: food_plan_json.max_protein,
            max_carbs: food_plan_json.max_carbs,
            max_fats: food_plan_json.max_fats,
            author: food_plan_json.author
        };

        food_items = food_plan_json.food_items;

        document.getElementById("start_date").innerText = food_plan.start_date;
        document.getElementById("end_date").innerText = food_plan.end_date;
        document.getElementById("max_kcal").innerText = food_plan.max_kcal;
        document.getElementById("max_protein").innerText = food_plan.max_protein + "g";
        document.getElementById("max_carbs").innerText = food_plan.max_carbs + "g";
        document.getElementById("max_fats").innerText = food_plan.max_fats + "g";

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

        // Ora content è popolato, possiamo renderizzarlo
        const table = document.getElementById("containerFoodPlan");
        let total_grams = {
            "kcal": 0,
            "protein": 0,
            "carboids": 0,
            "sugar": 0,
            "fats": 0,
            "satured_fats": 0,
            "fiber": 0
        }

        content.forEach(item => {
            if (item.type === "section") {
                const newFoodPlanSection = table.insertRow();
                newFoodPlanSection.classList.add("meal-name");

                const cell = newFoodPlanSection.insertCell(0);
                cell.textContent = `${item.item.name} (orario previsto ${item.item.start_time})`;
                cell.colSpan = 10;
            } else if (item.type === "food-item") {
                const newFoodItem = table.insertRow();
                newFoodItem.id = item.food_plan_item.id;
                const cell1 = newFoodItem.insertCell(0);

                const checkbox = document.createElement("input");
                checkbox.id = "check" + item.food_plan_item.id;
                checkbox.checked = item.food_plan_item.eaten;
                if(item.food_plan_item.eaten)
                    document.getElementById(item.food_plan_item.id).style.background = "#89c3ff";

                checkbox.type = "checkbox";
                checkbox.addEventListener("change", async function () {
                    if(item.food_plan_item.eaten === true) {
                        document.getElementById(item.food_plan_item.id).style.background = "";

                        const eaten = await fetch('http://127.0.0.1:8000/api/v1/data/food-plan-item/update/' + item.food_plan_item.id + '/', {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                eaten: false,
                            })
                        });

                        item.food_plan_item.eaten = false;
                    } else {
                        document.getElementById(item.food_plan_item.id).style.background = "#89c3ff";

                        const eaten = await fetch('http://127.0.0.1:8000/api/v1/data/food-plan-item/update/' + item.food_plan_item.id + '/', {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                eaten: true,
                            })
                        });

                        item.food_plan_item.eaten = true;
                    }
                });

                cell1.appendChild(checkbox);
                const cell2 = newFoodItem.insertCell(1);
                cell2.classList.add("name-column");
                cell2.textContent = item.food_item.name;

                const cell3 = newFoodItem.insertCell(2);
                cell3.classList.add("grams-column");
                cell3.textContent = item.food_plan_item.quantity_in_grams + "g";

                const cell4 = newFoodItem.insertCell(3);
                const moltiplicatore = item.food_plan_item.quantity_in_grams / 100;
                total_grams.kcal += item.food_item.kcal_per_100g * moltiplicatore;
                cell4.textContent = item.food_item.kcal_per_100g * moltiplicatore;

                total_grams.protein += item.food_item.protein_per_100g * moltiplicatore;
                newFoodItem.insertCell(4).textContent = (item.food_item.protein_per_100g * moltiplicatore).toFixed(1) + "g";
                total_grams.carboids += item.food_item.carbs_per_100g * moltiplicatore;
                newFoodItem.insertCell(5).textContent = (item.food_item.carbs_per_100g * moltiplicatore).toFixed(1) + "g";
                total_grams.sugar += item.food_item.sugars_per_100g * moltiplicatore;
                newFoodItem.insertCell(6).textContent = (item.food_item.sugars_per_100g * moltiplicatore).toFixed(1) + "g";
                total_grams.fats += item.food_item.fats_per_100g * moltiplicatore;
                newFoodItem.insertCell(7).textContent = (item.food_item.fats_per_100g * moltiplicatore).toFixed(1) + "g";
                total_grams.satured_fats += item.food_item.saturated_fats_per_100g * moltiplicatore;
                newFoodItem.insertCell(8).textContent = (item.food_item.saturated_fats_per_100g * moltiplicatore).toFixed(1) + "g";
                total_grams.fiber += item.food_item.fiber_per_100g * moltiplicatore;
                newFoodItem.insertCell(9).textContent = (item.food_item.fiber_per_100g * moltiplicatore).toFixed(1) + "g";
            }
        });

        const totalValueRow = table.insertRow();
        totalValueRow.classList.add("total-name");
        totalValueRow.id = "totalValueRow";

        const cell1 = totalValueRow.insertCell(0);
        cell1.textContent = "Somma dei valori degli alimenti";
        cell1.colSpan = 3;

        const cell2 = totalValueRow.insertCell(1);
        cell2.textContent = total_grams.kcal;

        const cell3 = totalValueRow.insertCell(2);
        cell3.textContent = total_grams.protein.toFixed(1) + "g";

        const cell4 = totalValueRow.insertCell(3);
        cell4.textContent = total_grams.carboids.toFixed(1) + "g";

        const cell5 = totalValueRow.insertCell(4);
        cell5.textContent = total_grams.sugar.toFixed(1) + "g";

        const cell6 = totalValueRow.insertCell(5);
        cell6.textContent = total_grams.fats.toFixed(1) + "g";

        const cell7 = totalValueRow.insertCell(6);
        cell7.textContent = total_grams.satured_fats.toFixed(1) + "g";

        const cell8 = totalValueRow.insertCell(7);
        cell8.textContent = total_grams.fiber.toFixed(1) + "g";
    });
</script>