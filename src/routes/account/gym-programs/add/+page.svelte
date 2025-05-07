<head>
    <link rel="stylesheet" type="text/css" href="/css/account/gym-programs/style_add_gym_programs.css">
</head>

<p><b>Aggiungi</b></p>
<h2 class="titlePage">Scheda di allenamento</h2>

<form class="form-container" on:submit={addGymPrograms}>
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
    <button type="submit">Aggiungi</button>
</form>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import {onMount} from "svelte";

    let today = new Date().toISOString().split('T')[0];
    let selectedDate = today;

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


    onMount(() => {
        if(getCookie('csrftoken') === "") window.location.href = "/";

        toggleClassByPathEquals({
            targetId: 'gym-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'food-program-icon-item',
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'food-program-icon-item'
            ]
        });
    });

    async function addGymPrograms() {
        const result = validateWeekRange("start_date", "end_date");

        if(result.valid) {
            const response1 = await fetch("http://127.0.0.1:8000/api/v1/data/gym-plan/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    start_date: document.getElementById("start_date").value,
                    end_date: document.getElementById("end_date").value,
                    author: getCookie("pk")
                })
            });

            const data1 = await response1.json();

            if(response1.ok) {
                const days = ["lun", "mar", "mer", "gio", "ven", "sab", "dom"];
                const author = getCookie("pk");
                const gymPlanId = data1.id;

                let gymPlanSections = [];

                // 1. Creazione sezioni giornaliere
                for (const day of days) {
                    const response = await fetch("http://127.0.0.1:8000/api/v1/data/gym-plan-section/create/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        },
                        body: JSON.stringify({
                            author: author,
                            gym_plan: gymPlanId,
                            day: day,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        gymPlanSections.push(data.id); // Salva l'ID della sezione
                    }
                }

                // 2. Creazione item per ogni sezione
                if(gymPlanSections.length === 7) {
                    for (const sectionId of gymPlanSections) {
                        const response = await fetch("http://127.0.0.1:8000/api/v1/data/gym-plan-item/create/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                section_id: sectionId,
                                order: 0,
                                intensity_techniques: ["null"],
                            }),
                        });
                    }
                }

                window.location.href = "/account/gym-programs/edit/" + data1.id;
            } else {
                document.getElementById("error1").style.display = "block";
                if(data1.start_date.length != 0) {
                    document.getElementById("error1").firstChild.textContent = "Data di inizio: " + data1.start_date[0];
                } else if(data1.end_date.length != 0) {
                    document.getElementById("error1").firstChild.textContent = "Data di fine: " + data1.end_date[0];
                }
            }
        } else {
            document.getElementById("error1").style.display = "block";
            document.getElementById("error1").firstChild.textContent = result.message;
        }
    }
</script>