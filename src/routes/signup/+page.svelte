<style>
    * {
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        margin: 0;
        font-family: sans-serif;
        background-color: #f5f5f5;
    }

    #container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .step {
        display: none;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        width: 100%;
        max-width: 500px;
    }

    .step.active {
        display: flex;
    }

    .title-presentation {
        text-align: center;
    }
</style>

<div id="container">
    <div class="step active" data-step="0">
        <div class="title-presentation">
            <h1>Ciao!</h1>
            <h3>Benvenuto su SmartFit Coach</h3>
        </div>
        <p>Sarò il tuo assistente nella configurazione dell'account. Inserisci username, email e password, poi segui le ulteriori istruzioni per personalizzare la tua esperienza su SmartFit Coach.</p>
        <button on:click={nextStep}>Cominciamo subito</button>
    </div>

    <div class="step" data-step="1">
        <label>Username:</label>
        <div class="error" id="error1">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="text" id="username" placeholder="Inserisci l'username...">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="2">
        <label>Email:</label>
        <div class="error" id="error2">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="email" id="email" placeholder="Inserisci l'email...">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="3">
        <label>Password:</label>
        <div class="error" id="error3">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="password" id="password1" placeholder="Inserisci la password...">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="4">
        <label>Conferma Password:</label>
        <div class="error" id="error4">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="password" id="password2" placeholder="Conferma la password...">
        <button on:click={register1}>Registrati</button>
    </div>

    <div class="step" data-step="5">
        <div class="title-presentation">
            <h3>Registrazione completata con successo!</h3>
            <p>Ora procediamo nell'inserimento di altri dettagli su di te.</p>
        </div>
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="6">
        <label>Qual'è il tuo nome?</label>
        <div class="error" id="error6">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="text" id="name" placeholder="Inserisci il nome...">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="7">
        <label>Qual'è il tuo cognome?</label>
        <div class="error" id="error7">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="text" id="surname" placeholder="Inserisci il cognome...">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="8">
        <label>Qual'è la tua data di nascita?</label>
        <div class="error" id="error8">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="date" id="date_of_birth">
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="9">
        <label>Qual'è il tuo sesso biologico?</label>
        <div class="error" id="error9">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <select id="biological_gender" name="gender">
            <option value="M">Maschio</option>
            <option value="F">Femmina</option>
        </select>
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="10">
        <label>Qual'è la tua altezza (in cm)?</label>
        <div class="error" id="error10">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <input type="number" id="height" placeholder="Inserisci l'altezza...">
        <button on:click={register2}>Avanti</button>
    </div>

    <div class="step" data-step="11">
        <div class="title-presentation">
            <h3>Dettagli aggiunti!</h3>
            <p>Ora procediamo nell'inserimento dell'obiettivo di questo percorso.</p>
        </div>
        <button on:click={nextStep}>Avanti</button>
    </div>

    <div class="step" data-step="12">
        <label>Qual'è il tuo obiettivo?</label>
        <div class="error" id="error12">
            <p></p> <!-- Il testo dell'errore viene inserito dinamicamente -->
        </div>
        <textarea id="goals" placeholder="Inserisci il tuo obiettivo in poche parole..." />
        <button on:click={register3}>Avanti</button>
    </div>

    <div class="step" data-step="13">
        <div class="title-presentation">
            <h3>Dettagli aggiunti!</h3>
            <p>Ora procediamo nell'inserimento dell'obiettivo di questo percorso.</p>
        </div>
        <button on:click={register4}>Avanti</button>
    </div>
</div>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import {onMount} from "svelte";

    let currentStep = 0;

    onMount(() => {
        if(getCookie('csrftoken') === "") window.location.href = "/";
    });

    function nextStep() {
        const steps = document.querySelectorAll('.step');
        steps[currentStep].classList.remove('active');
        currentStep++;
        steps[currentStep].classList.add('active');
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function showError(message, elementId) {
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

    async function register1() {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;

        const payload = { username, email, password1, password2 };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/registration/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.key) {
                setCookie("csrftoken", data.key);
                nextStep();
            } else {
                document.querySelectorAll('.step')[currentStep].classList.remove('active');

                if (data.username?.length) {
                    currentStep = 1;
                    showError(data.username[0], "error1");
                } else if (data.email?.length) {
                    currentStep = 2;
                    showError(data.email[0], "error2");
                } else if (data.password1?.length) {
                    currentStep = 3;
                    showError(data.password1[0], "error3");
                } else if (data.password2?.length) {
                    currentStep = 4;
                    showError(data.password2[0], "error4");
                }

                document.querySelectorAll('.step')[currentStep].classList.add('active');
            }
        } catch (err) {
            await wait(2000);
            const responseForcedLogin = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password1 })
            });

            if (responseForcedLogin.ok) {
                const data1 = await responseForcedLogin.json();
                setCookie("csrftoken", data1.key);
                nextStep();
            }
        }

        const responseDetails = await fetch("http://127.0.0.1:8000/api/v1/auth/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken')
            }
        });

        if (responseDetails.ok) {
            const data2 = await responseDetails.json();
            setCookie("pk", data2.pk);
            setCookie("username", data2.username);
        }
    }

    async function register2() {
        const first_name = document.getElementById("name").value;
        const last_name = document.getElementById("surname").value;
        const date_of_birth = document.getElementById("date_of_birth").value;
        const biological_gender = document.getElementById("biological_gender").value;
        const height_cm = document.getElementById("height").value;

        const responseDetailsAccount1 = await fetch("http://127.0.0.1:8000/api/v1/auth/user/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name
            })
        });

        const data1 = await responseDetailsAccount1.json();

        if(responseDetailsAccount1.ok) {
            const responseDetailsAccount2 = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken')
                },
                body: JSON.stringify({
                    author: getCookie("pk"),
                    date_of_birth: date_of_birth,
                    biological_gender: biological_gender,
                    height_cm: height_cm
                })
            });

            const data2 = await responseDetailsAccount2.json();

            if (responseDetailsAccount2.ok) nextStep();
            else {
                document.querySelectorAll('.step')[currentStep].classList.remove('active');

                if (data2.date_of_birth?.length) {
                    currentStep = 8;
                    showError(data2.date_of_birth[0], "error8");
                } else if (data2.biological_gender?.length) {
                    currentStep = 9;
                    showError(data2.biological_gender[0], "error9");
                } else if (data2.height_cm?.length) {
                    currentStep = 10;
                    showError(data2.height_cm[0], "error10");
                }

                document.querySelectorAll('.step')[currentStep].classList.add('active');
            }
        } else {
            document.querySelectorAll('.step')[currentStep].classList.remove('active');

            if (data1.first_name?.length) {
                currentStep = 6;
                showError(data1.first_name[0], "error6");
            } else if (data1.last_name?.length) {
                currentStep = 7;
                showError(data1.last_name[0], "error7");
            }

            document.querySelectorAll('.step')[currentStep].classList.add('active');
        }
    }

    async function register3() {
        const goal_description = document.getElementById("goals").value;

        const responseGoals = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken')
            },
            body: JSON.stringify({
                goal_description: goal_description
            })
        });

        nextStep();
    }

    function register4() {
        window.location.href = "/account";
    }
</script>