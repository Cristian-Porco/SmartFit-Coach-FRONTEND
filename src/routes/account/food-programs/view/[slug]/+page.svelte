<head>
    <link rel="stylesheet" type="text/css" href="/css/account/food-programs/style_view_food_programs.css">
</head>

<div class="container">
    <div><p><b>Visualizza</b></p><h1 class="titlePage">Scheda alimentare</h1></div>
    <div>
        <p><b>Data inizio:</b> <span id="start_date">--/--/----</span></p>
        <p><b>Data fine:</b> <span id="end_date">--/--/----</span></p>
    </div>
</div>

<div class="form-container">
    <table class="responsive-table">
        <thead>
        <tr>
            <th rowspan="2" class="header-title">✓</th>
            <th rowspan="2" class="header-title name-column">Nome</th>
            <th rowspan="2" class="header-title">Grammi</th>
            <th class="header-title">Kcal</th>
            <th class="header-title">Proteine</th>
            <th class="header-title">Carboidrati</th>
            <th rowspan="2" class="header-title">Zuccheri</th>
            <th class="header-title">Grassi</th>
            <th rowspan="2" class="header-title">Grassi Saturi</th>
            <th rowspan="2" class="header-title">Fibre</th>
        </tr>
        <tr>
            <th class="header-limits" id="max_kcal"></th>
            <th class="header-limits" id="max_protein"></th>
            <th class="header-limits" id="max_carbs"></th>
            <th class="header-limits" id="max_fats"></th>
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
        toggleClassByPathContains({
            substring: '/account/food-programs/view',
            targetId: 'food-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'gym-program-icon-item'
            ]
        });

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

        const table = document.getElementById("containerFoodPlan");

        const detailsFoodPlan = table.insertRow();
        detailsFoodPlan.id = "detailsFoodPlanMobile";

        const details1 = detailsFoodPlan.insertCell(0);
        details1.setAttribute("data-label", "Max Kcal:");
        details1.textContent = food_plan.max_kcal;

        const details2 = detailsFoodPlan.insertCell(1);
        details2.setAttribute("data-label", "Max Proteine:");
        details2.textContent = food_plan.max_protein + "g";

        const details3 = detailsFoodPlan.insertCell(2);
        details3.setAttribute("data-label", "Max Carboidrati:");
        details3.textContent = food_plan.max_carbs + "g";

        const details4 = detailsFoodPlan.insertCell(3);
        details4.setAttribute("data-label", "Max Grassi:");
        details4.textContent = food_plan.max_fats + "g";

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
                cell2.textContent = item.food_item.brand
                    ? `${item.food_item.name} (${item.food_item.brand})`
                    : item.food_item.name;

                const cell3 = newFoodItem.insertCell(2);
                cell3.classList.add("grams-column");
                cell3.setAttribute("data-label", item.food_item.name)
                cell3.textContent = item.food_plan_item.quantity_in_grams + "g";

                const moltiplicatore = item.food_plan_item.quantity_in_grams / 100;
                total_grams.kcal += item.food_item.kcal_per_100g * moltiplicatore;
                const cell4 = newFoodItem.insertCell(3);
                cell4.setAttribute("data-label", "Kcal:")
                cell4.textContent = item.food_item.kcal_per_100g * moltiplicatore;

                total_grams.protein += item.food_item.protein_per_100g * moltiplicatore;
                const cell5 = newFoodItem.insertCell(4);
                cell5.setAttribute("data-label", "Proteine:")
                cell5.textContent = (item.food_item.protein_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.carboids += item.food_item.carbs_per_100g * moltiplicatore;
                const cell6 = newFoodItem.insertCell(5);
                cell6.setAttribute("data-label", "Carboidrati:")
                cell6.textContent = (item.food_item.carbs_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.sugar += item.food_item.sugars_per_100g * moltiplicatore;
                const cell7 = newFoodItem.insertCell(6)
                cell7.setAttribute("data-label", "Zuccheri:")
                cell7.textContent = (item.food_item.sugars_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.fats += item.food_item.fats_per_100g * moltiplicatore;
                const cell8 = newFoodItem.insertCell(7);
                cell8.setAttribute("data-label", "Grassi:");
                cell8.textContent = (item.food_item.fats_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.satured_fats += item.food_item.saturated_fats_per_100g * moltiplicatore;
                const cell9 = newFoodItem.insertCell(8);
                cell9.setAttribute("data-label", "Grassi Saturi:");
                cell9.textContent = (item.food_item.saturated_fats_per_100g * moltiplicatore).toFixed(1) + "g";

                total_grams.fiber += item.food_item.fiber_per_100g * moltiplicatore;
                const cell10 = newFoodItem.insertCell(9);
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
        cell2.setAttribute("data-label", "Kcal:")
        cell2.textContent = total_grams.kcal;

        const cell3 = totalValueRow.insertCell(2);
        cell3.setAttribute("data-label", "Proteine:")
        cell3.textContent = total_grams.protein.toFixed(1) + "g";

        const cell4 = totalValueRow.insertCell(3);
        cell4.setAttribute("data-label", "Carboidrati:")
        cell4.textContent = total_grams.carboids.toFixed(1) + "g";

        const cell5 = totalValueRow.insertCell(4);
        cell5.setAttribute("data-label", "Zuccheri:")
        cell5.textContent = total_grams.sugar.toFixed(1) + "g";

        const cell6 = totalValueRow.insertCell(5);
        cell6.setAttribute("data-label", "Grassi:")
        cell6.textContent = total_grams.fats.toFixed(1) + "g";

        const cell7 = totalValueRow.insertCell(6);
        cell7.setAttribute("data-label", "Grassi Saturi:")
        cell7.textContent = total_grams.satured_fats.toFixed(1) + "g";

        const cell8 = totalValueRow.insertCell(7);
        cell8.setAttribute("data-label", "Fibre:")
        cell8.textContent = total_grams.fiber.toFixed(1) + "g";
    });
</script>