<head>
    <link rel="stylesheet" type="text/css" href="/css/account/style_account.css">
</head>

<div class="recap">
    <h2>Bentornato, {account.first_name}</h2>
    <p>SINTESI SPIEGAZIONE PROCEDIMENTO OBIETTIVO</p>
</div>

<form class="form-container" id="updateDetailsForm" on:submit={updateDetails}>
    <h3>Dati anagrafici</h3>
    <div class="error" id="error1">
        <p></p>
    </div>
    <div class="warning" id="warning1">
        <p></p>
    </div>
    <div class="info" id="info1">
        <p></p>
    </div>
    <div class="input-container">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" bind:value={account.username}>
    </div>
    <div class="input-container">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Email..." bind:value={account.email} required disabled>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Nome..." bind:value={account.first_name} required>
        </div>
        <div class="input-container">
            <label for="surname">Cognome:</label>
            <input type="text" id="surname" name="surname" placeholder="Cognome..." bind:value={account.last_name} required>
        </div>
    </div>
    <div class="input-container">
        <label for="birthdate">Data di nascita:</label>
        <input type="date" id="birthdate" name="birthdate" bind:value={account.date_of_birth} required>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="gender">Sesso biologico:</label>
            <select id="gender" name="gender" bind:value={account.biological_gender} required>
                <option value="M">Maschile</option>
                <option value="F">Femminile</option>
            </select>
        </div>
        <div class="input-container">
            <label for="height">Altezza (in centimetri):</label>
            <input type="number" id="height" name="height" min="1" max="300" placeholder="Altezza..."
                   bind:value={account.height_cm} required>
        </div>
    </div>
    <div class="input-container">
        <label for="file">Immagine di profilo:</label>
        <input type="file" id="file" name="file" accept="image/*" on:change={handleFileChange}>
    </div>
    <div class="form-group">
        <button type="submit">Aggiorna dati</button>
    </div>
</form>

<form class="form-container"  id="updateObjectiveForm">
    <h3>Obiettivo</h3>
    <div class="error" id="error2">
        <p></p>
    </div>
    <div class="input-container">
        <label for="goal_description">Qual'è il tuo obiettivo? Esprimilo in poche parole:</label>
        <textarea id="goal_description" name="goal_description" placeholder="Descrivi il tuo obiettivo..." required>{account.goal_description}</textarea>
    </div>
    <div class="form-group">
        <button type="submit" on:click={updateGoal}>Aggiorna obiettivo</button>
    </div>
</form>

<form class="form-container" id="updatePasswordForm" on:submit={updatePassword}>
    <h3>Aggiorna password</h3>
    <div class="error" id="error3">
        <p></p>
    </div>
    <div class="warning" id="warning3">
        <p></p>
    </div>
    <div class="info" id="info3">
        <p></p>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password..." bind:value={password} required>
        </div>
        <div class="input-container">
            <label for="conf-password">Conferma password:</label>
            <input type="password" id="conf-password" name="conf-password" placeholder="Conferma password..." bind:value={conf_password} required>
        </div>
    </div>
    <div class="form-group">
        <button type="submit">Aggiorna password</button>
    </div>
</form>

<div class="form-container">
    <h3>Alimenti aggiunti</h3>
    <p>In questa sezione puoi modificare facilmente gli alimenti che hai aggiunto in precedenza: aggiorna quantità o
        correggi dettagli in pochi click, per mantenere sempre la tua scheda alimentare precisa e aggiornata.</p>
    <div class="food-item-list">
        {#if foodItems.length > 0}
            <ul class="food-list">
                {#each foodItems as item}
                    <li class="food-list-item">
                        <span>{item.name}{item.brand ? ` (${item.brand})` : ''}</span>
                        <button class="edit-button" on:click={() => editFoodModal(item)}>Modifica</button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Nessun alimento aggiunto!</p>
        {/if}
    </div>
</div>

<div class="form-container">
    <h3>Sezioni aggiunte</h3>
    <p>In questa sezione puoi modificare facilmente le sezioni dei tuoi pasti che hai aggiunto in precedenza: aggiorna
        il nome o l'orario indicativo in pochi click, per mantenere sempre la tua scheda alimentare precisa e aggiornata.</p>
    <div class="food-item-section-list">
        {#if foodSectionItems.length > 0}
            <ul class="food-list">
                {#each foodSectionItems as item}
                    <li class="food-list-item">
                        <span>{item.name} (orario previsto {item.start_time})</span>
                        <button class="edit-button" on:click={() => editFoodSectionModal(item)}>Modifica</button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Nessuna sezione di alimenti aggiunto!</p>
        {/if}
    </div>
</div>

<!-- Modal per la creazione di un nuovo alimento -->
{#if showFoodModal}
    <div class="modal">
        <div class="modal-content food-item-add" style="width: 800px">
            <h3>Modifica Alimento</h3>

            <!-- Contenitore per messaggi di errore -->
            <div class="error" id="errorFood">
                <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
            </div>

            <!-- Nome e marca -->
            <div class="form-group">
                <div class="input-container">
                    <label for="name">Nome:</label>
                    <input bind:value={edit_food_item.name} type="text" id="name" placeholder="Nome alimento..." />
                </div>
                <div class="input-container">
                    <label for="brand">Marca:</label>
                    <input bind:value={edit_food_item.brand} type="text" id="brand" placeholder="Marca (opzionale)..." />
                </div>
            </div>

            <!-- Barcode -->
            <label>Barcode:</label>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input bind:value={edit_food_item.barcode} type="text" placeholder="Inserisci barcode manualmente..." />
                <button type="button" on:click={startScanner}>Inserisci barcode tramite fotocamera</button>
            </div>

            <!-- Valori nutrizionali per 100g -->
            <div class="form-group">
                <div class="input-container">
                    <label for="kcal">Chilocalorie (Kcal) per 100g:</label>
                    <input bind:value={edit_food_item.kcal} type="number" id="kcal"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="protein">Proteine per 100g:</label>
                    <input bind:value={edit_food_item.protein} type="number" id="protein"/>
                </div>
                <div class="input-container">
                    <label for="carboids">Carboidrati per 100g:</label>
                    <input bind:value={edit_food_item.carboids} type="number" id="carboids"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="sugar">Zuccheri per 100g:</label>
                    <input bind:value={edit_food_item.sugar} type="number" id="sugar"/>
                </div>
                <div class="input-container">
                    <label for="fats">Grassi per 100g:</label>
                    <input bind:value={edit_food_item.fats} type="number" id="fats"/>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <label for="saturated_fats">Grassi Saturi per 100g:</label>
                    <input bind:value={edit_food_item.saturated_fats} type="number" id="saturated_fats"/>
                </div>
                <div class="input-container">
                    <label for="fiber">Fibre per 100g:</label>
                    <input bind:value={edit_food_item.fiber} type="number" id="fiber"/>
                </div>
            </div>

            <div class="separator-row"></div>

            <!-- Pulsanti azione -->
            <button on:click={editFoodItem}>Modifica</button>
            <button class="close-button" on:click={() => showFoodModal = false}>Annulla</button>
        </div>
    </div>
{/if}

<!-- Modal per la scansione barcode tramite fotocamera -->
{#if showScannerModal}
    <div class="modal">
        <div class="modal-content modal-scan" style="width: 90%; max-width: 500px;">
            <h3>Scansione Barcode</h3>
            <div id="barcode-reader" style="width: 100%; height: auto;"></div>
            <div class="separator-row"></div>
            <button class="close-button" on:click={() => { stopScanner(); showScannerModal = false; }}>Chiudi</button>
        </div>
    </div>
{/if}

<!-- Modal per la creazione di una nuova sezione (pasto) -->
{#if showSectionModal}
    <div class="modal">
        <div class="modal-content modal-section" style="width: 500px">
            <h3>Modifica Sezione</h3>

            <!-- Contenitore per messaggi di errore -->
            <div class="error" id="errorSection">
                <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
            </div>

            <!-- Input nome sezione -->
            <label for="newSectionName">Nome sezione:</label>
            <input
                    type="text"
                    id="newSectionName"
                    bind:value={newSectionName}
                    placeholder="Nome sezione... (ad esempio, Colazione, Pranzo, ...)"
            />

            <!-- Input orario previsto -->
            <label for="newSectionTime" style="margin-top: 10px;">Orario previsto (solo ora):</label>
            <input
                    type="number"
                    id="newSectionTime"
                    min="0"
                    max="24"
                    bind:value={newSectionTime}
                    placeholder="Orario previsto del pasto..."
            />

            <div class="separator-row"></div>

            <!-- Pulsanti -->
            <button on:click={editFoodSection}>Salva</button>
            <button class="close-button" on:click={() => showSectionModal = false}>Annulla</button>
        </div>
    </div>
{/if}

<script>
    import {onMount, tick} from "svelte";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import {Html5Qrcode} from "html5-qrcode";

    let account = {}
    let first_username = "";

    let selectedFile = null;
    let accountId = 1;

    let foodItems = [];
    let showFoodModal = false;
    let edit_food_item = {
        "id": 0, "name": "", "brand": "", "barcode": "", "kcal": 0,
        "protein": 0, "carboids": 0, "sugar": 0, "fats": 0,
        "saturated_fats": 0, "fiber": 0
    };
    let scanner;
    let scanning = false;
    let showScannerModal = false;

    let foodSectionItems = [];
    let showSectionModal = false;
    let newSectionId = 0;
    let newSectionName = "";
    let newSectionTime = "";

    async function startScanner() {
        showScannerModal = true;
        await tick(); // attende il rendering del DOM

        scanner = new Html5Qrcode("barcode-reader");
        scanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                if(showFoodModal) edit_food_item.barcode = decodedText;
                else {
                    document.getElementById("search").value = decodedText;
                    document.getElementById("search").focus();
                    document.getElementById("search").dispatchEvent(new Event('input', { bubbles: true }));
                }
                stopScanner();
                showScannerModal = false;
            }
        );

        scanning = true;
    }

    function stopScanner() {
        if (scanner && scanning) {
            scanner.stop().then(() => {
                scanning = false;
                scanner.clear();
            });
        }
    }

    function editFoodModal(item) {
        showFoodModal = true;
        edit_food_item = {
            "id": item.id,
            "name": item.name, "brand": item.brand, "barcode": item.barcode, "kcal": item.kcal_per_100g,
            "protein": item.protein_per_100g, "carboids": item.carbs_per_100g, "sugar": item.sugars_per_100g,
            "fats": item.fats_per_100g, "saturated_fats": item.saturated_fats_per_100g, "fiber": item.fiber_per_100g
        };
    }

    async function editFoodItem() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-item/update/" + edit_food_item.id + "/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                name: edit_food_item.name,
                barcode: edit_food_item.barcode,
                brand: edit_food_item.brand,
                kcal_per_100g: edit_food_item.kcal,
                protein_per_100g: edit_food_item.protein,
                carbs_per_100g: edit_food_item.carboids,
                sugars_per_100g: edit_food_item.sugar,
                fats_per_100g: edit_food_item.fats,
                saturated_fats_per_100g: edit_food_item.saturated_fats,
                fiber_per_100g: edit_food_item.fiber
            })
        });

        const response_json = await response.json();

        if(response.ok) {
            document.getElementById("errorFood").style.display = "none";
            showSectionModal = false;
            location.reload();
        } else {
            document.getElementById("errorFood").style.display = "block";
            if(response_json.name) {
                document.getElementById("errorFood").firstChild.textContent = "NOME: " + response_json.name[0];
            } else if(response_json.barcode) {
                document.getElementById("errorFood").firstChild.textContent = "BARCODE: " + response_json.barcode[0];
            } else if(response_json.brand) {
                document.getElementById("errorFood").firstChild.textContent = "MARCA: " + response_json.brand[0];
            } else if(response_json.kcal_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "CHILOCALORIE: " + response_json.kcal_per_100g[0];
            } else if(response_json.protein_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "PROTEINE: " + response_json.protein_per_100g[0];
            } else if(response_json.carbs_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "CARBOIDRATI: " + response_json.carbs_per_100g[0];
            } else if(response_json.sugars_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "ZUCCHERI: " + response_json.sugars_per_100g[0];
            } else if(response_json.fats_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "GRASSI: " + response_json.fats_per_100g[0];
            } else if(response_json.saturated_fats_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "GRASSI SATURI: " + response_json.saturated_fats_per_100g[0];
            } else if(response_json.fiber_per_100g) {
                document.getElementById("errorFood").firstChild.textContent = "FIBRE: " + response_json.fiber_per_100g[0];
            }
        }
    }

    function editFoodSectionModal(item) {
        showSectionModal = true;
        newSectionId = item.id;
        newSectionName = item.name;
        newSectionTime = item.start_time;
    }

    async function editFoodSection() {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan-section/update/" + newSectionId + "/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                name: newSectionName,
                start_time: newSectionTime
            })
        });

        const response_json = await response.json();

        if(response.ok) {
            document.getElementById("errorSection").style.display = "none";
            showSectionModal = false;
            location.reload();
        } else {
            document.getElementById("errorSection").style.display = "block";
            if(response_json.name) {
                document.getElementById("errorSection").firstChild.textContent = "NOME SEZIONE: " + response_json.name[0];
            } else if(response_json.start_time) {
                document.getElementById("errorSection").firstChild.textContent = "ORARIO PREVISTO: " + response_json.start_time[0];
            }
        }
    }

    onMount(async () => {
        if(getCookie('csrftoken') === "") window.location.href = "/";

        toggleClassByPathEquals({
            targetId: 'account-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'food-program-icon-item',
                'gym-program-icon-item'
            ]
        });

        const response1 = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });
        account = await response1.json();

        const response2 = await fetch("http://127.0.0.1:8000/api/v1/data/food-item/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });
        foodItems = await response2.json();

        const response3 = await fetch("http://127.0.0.1:8000/api/v1/data/food-plan-section/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });
        foodSectionItems = await response3.json();

        account.date_of_birth = formatDateForInput(account.date_of_birth)

        first_username = account.username;
    });

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
    }

    async function updateDetails(event) {
        event.preventDefault();

        if(first_username === account.username){
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/user/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    username: account.username + "1234567890",
                })
            });
        }

        const response1 = await fetch("http://127.0.0.1:8000/api/v1/auth/user/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                username: account.username,
                first_name: account.first_name,
                last_name: account.last_name
            })
        });

        const data1 = await response1.json();

        if(response1.ok){
            const response2 = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    author: account.author,
                    date_of_birth: account.date_of_birth,
                    biological_gender: account.biological_gender,
                    height_cm: account.height_cm
                })
            });

            const data2 = await response2.json();

            if(response2.ok){
                if(selectedFile) {
                    const formData = new FormData();
                    formData.append("profile_picture", selectedFile);

                    const response3 = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
                        method: "PATCH",
                        body: formData,
                        headers: {
                            "Authorization": "Token " + getCookie('csrftoken')
                        }
                    });

                    if (!response3.ok) {
                        document.getElementById("error1").style.display = "block";
                        document.getElementById("warning1").style.display = "none";
                        document.getElementById("info1").style.display = "none";
                        if(data1.profile_picture.length != 0) {
                            document.getElementById("error1").firstChild.textContent = data1.profile_picture[0];
                        }
                        window.location.href = "#updateDetailsForm";
                    } else {
                        document.getElementById("error1").style.display = "none";
                        document.getElementById("warning1").style.display = "none";
                        document.getElementById("info1").style.display = "block";
                        document.getElementById("info1").firstChild.textContent = "Dati anagrafici aggiornati!";
                        window.location.href = "#updateDetailsForm";

                        setTimeout(() => {
                            document.getElementById("info1").style.display = "none";
                            document.getElementById("error1").firstChild.textContent = "";
                        }, 5000);
                    }
                }
            } else {
                document.getElementById("error1").style.display = "block";
                document.getElementById("warning1").style.display = "none";
                document.getElementById("info1").style.display = "none";
                if(data1.date_of_birth.length != 0) {
                    document.getElementById("error1").firstChild.textContent = data1.date_of_birth[0];
                } else if(data1.biological_gender.length != 0) {
                    document.getElementById("error1").firstChild.textContent = data1.biological_gender[0];
                } else if(data1.height_cm.length != 0) {
                    document.getElementById("error1").firstChild.textContent = data1.height_cm[0];
                } else if(data1.profile_picture.length != 0) {
                    document.getElementById("error1").firstChild.textContent = data1.profile_picture[0];
                }
                window.location.href = "#updateDetailsForm";
            }
        } else {
            document.getElementById("error1").style.display = "block";
            document.getElementById("warning1").style.display = "none";
            document.getElementById("info1").style.display = "none";
            if(data1.username.length != 0) {
                document.getElementById("error1").firstChild.textContent = data1.username[0];
            } else if(data1.first_name.length != 0) {
                document.getElementById("error1").firstChild.textContent = data1.first_name[0];
            } else if(data1.last_name.length != 0) {
                document.getElementById("error1").firstChild.textContent = data1.last_name[0];
            }
            window.location.href = "#updateDetailsForm";
        }

        first_username = account.username;
    }

    async function updateGoal() {
        const goal_description = document.getElementById("goal_description").value;
        console.log(goal_description);
    }

    let password = "";
    let conf_password = "";

    async function updatePassword(event) {
        event.preventDefault();

        if(password === conf_password) {
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/password/change/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({ new_password1: password, new_password2: conf_password })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById("error3").style.display = "none";
                document.getElementById("warning3").style.display = "none";
                document.getElementById("info3").style.display = "block";
                document.getElementById("info3").firstChild.textContent = "Password aggiornata!";
                window.location.href = "#updatePasswordForm";

                setTimeout(() => {
                    document.getElementById("info3").style.display = "none";
                    document.getElementById("error3").firstChild.textContent = "";
                }, 5000);
            } else {
                document.getElementById("error3").style.display = "block";
                document.getElementById("warning3").style.display = "none";
                document.getElementById("info3").style.display = "none";
                document.getElementById("error3").firstChild.textContent = data.new_password2[0];
                window.location.href = "#updatePasswordForm";
            }
        } else {
            document.getElementById("error3").style.display = "none";
            document.getElementById("warning3").style.display = "block";
            document.getElementById("info3").style.display = "none";
            document.getElementById("warning3").firstChild.textContent = "Le password inserite non coincidono!";
            window.location.href = "#updatePasswordForm";

            setTimeout(() => {
                document.getElementById("warning3").style.display = "none";
                document.getElementById("warning3").firstChild.textContent = "";
            }, 5000);
        }

        password = "";
        conf_password = "";
    }
</script>