<head>
    <style>
        .icon-sidebar {
            display: flex;
        }
        .sidebar {
            display: none;
        }
        .main-content {
            min-width: 800px;
            max-width: 800px;
        }
        .recap {
            height: 40vh;
            background: linear-gradient(to right, #007bff, #00d4ff);
            padding: 25px;
            margin-bottom: 25px;
            border-radius: 25px;
        }
        .recap h2 {
            color: white;
            font-size: 50px;
        }
        .recap p {
            color: white;
        }

        /* Stile per il form */
        .form-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
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

        @media (max-width: 768px) {
            .main-content {
                width: 100%;
                min-width: 100%;
            }
            .form-group {
                flex-direction: column;
            }
        }
    </style>
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
        <input type="file" id="file" name="file" bind:value={account.profile_picture} >
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
        <label for="email">Qual'è il tuo obiettivo? Esprimilo in poche parole:</label>
        <textarea id="email" name="email" placeholder="Descrivi il tuo obiettivo..." required></textarea>
    </div>
    <div class="form-group">
        <button type="submit">Aggiorna obiettivo</button>
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

<script>
    import { onMount } from "svelte";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    let account = {}
    let first_username = "";

    onMount(async () => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        account = await response.json();
        first_username = account.username;
    });

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
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    author: account.author,
                    date_of_birth: account.date_of_birth,
                    biological_gender: account.biological_gender,
                    height_cm: account.height_cm,
                    profile_picture: account.profile_picture
                })
            });

            const data2 = await response2.json();
            console.log(data2);

            if(response2.ok){
                document.getElementById("error1").style.display = "none";
                document.getElementById("warning1").style.display = "none";
                document.getElementById("info1").style.display = "block";
                document.getElementById("info1").firstChild.textContent = "Dati anagrafici aggiornati!";
                window.location.href = "#updateDetailsForm";

                setTimeout(() => {
                    document.getElementById("info1").style.display = "none";
                    document.getElementById("error1").firstChild.textContent = "";
                }, 5000);
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