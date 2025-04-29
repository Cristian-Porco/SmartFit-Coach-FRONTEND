<head>
    <link rel="stylesheet" type="text/css" href="/css/account/food-programs/style_add_food_programs.css">
</head>

<p><b>Aggiungi</b></p>
<h2 class="titlePage">Scheda alimentare</h2>

<form class="form-container" on:submit={addFoodPrograms}>
    <div class="error" id="error1">
        <p></p>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="start_date">Data di inizio:</label>
            <input type="date" id="start_date">
        </div>
        <div class="input-container">
            <label for="end_date">Data di fine:</label>
            <input type="date" id="end_date">
        </div>
    </div>
    <div class="input-container">
        <label for="kcal">Max Kcal:</label>
        <input type="number" id="max_kcal" placeholder="Aggiungi max kcal...">
    </div>
    <div class="input-container">
        <label for="protein">Max Proteine:</label>
        <input type="number" id="max_protein" on:blur={autoCalculationKCal} placeholder="Aggiungi max proteine...">
    </div>
    <div class="input-container">
        <label for="carbs">Max Carboidrati:</label>
        <input type="number" id="max_carbs" on:blur={autoCalculationKCal} placeholder="Aggiungi max carboidrati...">
    </div>
    <div class="input-container">
        <label for="fat">Max Grassi:</label>
        <input type="number" id="max_fats" on:blur={autoCalculationKCal} placeholder="Aggiungi max grassi...">
    </div>
    <button type="submit">Aggiungi</button>
</form>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import {onMount} from "svelte";

    let today = new Date().toISOString().split('T')[0];
    let selectedDate = today;

    onMount(() => {
        toggleClassByPathEquals({
            targetId: 'food-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'gym-program-icon-item'
            ]
        });
    });

    async function addFoodPrograms() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                start_date: document.getElementById("start_date").value,
                end_date: document.getElementById("end_date").value,
                max_kcal: document.getElementById("max_kcal").value,
                max_protein: document.getElementById("max_protein").value,
                max_carbs: document.getElementById("max_carbs").value,
                max_fats: document.getElementById("max_fats").value,
                food_items: [],
                author: getCookie("pk")
            })
        });

        const data = await response.json();

        if(response.ok) {
            window.location.href = "/account/food-programs/edit/" + data.id;
        } else {
            document.getElementById("error1").style.display = "block";
            if(data.start_date.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Data di inizio: " + data.start_date[0];
            } else if(data.end_date.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Data di fine: " + data.end_date[0];
            } else if(data.max_kcal.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Max Kcal: " + data.max_kcal[0];
            } else if(data.max_protein.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Max Proteine: " + data.max_protein[0];
            } else if(data.max_carbs.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Max Carboidrati: " + data.max_carbs[0];
            } else if(data.max_fats.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Max Grassi: " + data.max_fats[0];
            }
        }
    }

    function autoCalculationKCal() {
        if(document.getElementById("max_protein").value !== "" &&
            document.getElementById("max_carbs").value !== "" &&
            document.getElementById("max_fats").value !== "") {

            let kcalInput = document.getElementById("max_kcal");

            let kcal_previste = (
                (document.getElementById("max_protein").value * 4) +
                (document.getElementById("max_carbs").value * 4) +
                (document.getElementById("max_fats").value * 9)
            );

            kcalInput.value = kcal_previste;

            // Aggiungi la classe animata
            kcalInput.classList.add("highlight");

            // Rimuovi la classe dopo l'animazione
            setTimeout(() => {
                kcalInput.classList.remove("highlight");
            }, 1000); // 1 secondo
        }
    }
</script>