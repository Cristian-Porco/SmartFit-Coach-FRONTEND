<head>
    <link rel="stylesheet" type="text/css" href="/css/account/body-measurements/style_add_edit_body_measurements.css">
</head>

<h2 class="titlePage">Misure corporee</h2>

<form class="form-container" on:submit={addBodyMeasurement}>
    <h3>Aggiungi misurazione</h3>
    <div class="error" id="error1">
        <p></p>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="chest">Circonferenza torace (in centimetri):</label>
            <input type="text" id="chest" name="chest" placeholder="Torace...">
        </div>
        <div class="input-container">
            <label for="bicep">Circonferenza avambraccio (in centimetri):</label>
            <input type="text" id="bicep" name="bicep" placeholder="Bicipite...">
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="thigh">Circonferenza coscia (in centimetri):</label>
            <input type="text" id="thigh" name="thigh" placeholder="Coscia...">
        </div>
        <div class="input-container">
            <label for="waist">Circonferenza vita (in centimetri):</label>
            <input type="text" id="waist" name="waist" placeholder="Vita...">
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="hips">Circonferenza fianchi (in centimetri):</label>
            <input type="text" id="hips" name="hips" placeholder="Fianchi...">
        </div>
        <div class="input-container">
            <label for="abdomen">Circonferenza addome (in centimetri):</label>
            <input type="text" id="abdomen" name="abdomen" placeholder="Addome...">
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="calf">Circonferenza polpaccio (in centimetri):</label>
            <input type="text" id="calf" name="calf" placeholder="Polpaccio...">
        </div>
        <div class="input-container">
            <label for="neck">Circonferenza collo (in centimetri):</label>
            <input type="text" id="neck" name="neck" placeholder="Collo...">
        </div>
    </div>
    <div class="input-container">
        <label for="shoulders">Lunghezza spalla (in centimetri):</label>
        <input type="text" id="shoulders" name="shoulders" placeholder="Spalle...">
    </div>

    <div class="input-container" style="margin-top: 30px;">
        <label for="date_recorded">Data di registrazione:</label>
        <input type="date" id="date_recorded" name="date_recorded"  bind:value={selectedDate} required>
    </div>
    <button type="submit">Aggiungi</button>
</form>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import {onMount} from "svelte";

    let today = new Date().toISOString().split('T')[0];
    let selectedDate = today;

    onMount(async() =>  {
        toggleClassByPathEquals({
            targetId: 'body-measurements-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'food-program-icon-item',
                'account-icon-item',
                'gym-program-icon-item'
            ]
        });
    });

    async function addBodyMeasurement() {
        let values_clear = {
            chest: replaceAllCommasWithDots(document.getElementById("chest").value),
            bicep: replaceAllCommasWithDots(document.getElementById("bicep").value),
            thigh: replaceAllCommasWithDots(document.getElementById("thigh").value),
            waist: replaceAllCommasWithDots(document.getElementById("waist").value),
            hips: replaceAllCommasWithDots(document.getElementById("hips").value),
            abdomen: replaceAllCommasWithDots(document.getElementById("abdomen").value),
            calf: replaceAllCommasWithDots(document.getElementById("calf").value),
            neck: replaceAllCommasWithDots(document.getElementById("neck").value),
            shoulders: replaceAllCommasWithDots(document.getElementById("shoulders").value),
        }

        const response = await fetch("http://127.0.0.1:8000/api/v1/data/body-measurement/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                chest: values_clear.chest,
                bicep: values_clear.bicep,
                thigh: values_clear.thigh,
                waist: values_clear.waist,
                hips: values_clear.hips,
                abdomen: values_clear.abdomen,
                calf: values_clear.calf,
                neck: values_clear.neck,
                shoulders: values_clear.shoulders,
                date_recorded: document.getElementById("date_recorded").value,
                author: getCookie("pk")
            })
        });

        const data = await response.json();

        if(response.ok) {
            window.location.href = "/account/body-measurements/";
        } else {
            document.getElementById("error1").style.display = "block";
            if(data.chest.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Torace: " + data.chest[0];
            } else if(data.bicep.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Bicipite: " + data.bicep[0];
            } else if(data.thigh.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Coscia: " + data.thigh[0];
            } else if(data.waist.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Vita: " + data.waist[0];
            } else if(data.hips.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Fianchi: " + data.hips[0];
            } else if(data.abdomen.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Addome: " + data.abdomen[0];
            } else if(data.calf.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Polpaccio: " + data.calf[0];
            } else if(data.neck.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Collo: " + data.neck[0];
            } else if(data.shoulders.length != 0) {
                document.getElementById("error1").firstChild.textContent = "Spalle: " + data.shoulders[0];
            }
        }
    }
</script>