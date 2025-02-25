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

<h3>Dati anagrafici</h3>
<form class="form-container">
    <div class="input-container">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" bind:value={account.username} disabled>
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
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Email..." bind:value={account.email} required>
    </div>
    <div class="input-container">
        <label for="file">Immagine di profilo:</label>
        <input type="file" id="file" name="file" bind:value={account.profile_picture} >
    </div>
    <div class="form-group">
        <button type="submit">Aggiorna dati</button>
    </div>
</form>

<h3>Obiettivo</h3>
<form class="form-container">
    <div class="input-container">
        <label for="email">Qual'è il tuo obiettivo? Esprimilo in poche parole:</label>
        <textarea id="email" name="email" placeholder="Descrivi il tuo obiettivo..." required></textarea>
    </div>
    <div class="form-group">
        <button type="submit">Aggiorna obiettivo</button>
    </div>
</form>

<h3>Aggiorna password</h3>
<form class="form-container">
    <div class="form-group">
        <div class="input-container">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password..." required>
        </div>
        <div class="input-container">
            <label for="conf-password">Conferma password:</label>
            <input type="password" id="conf-password" name="conf-password" placeholder="Conferma password..." required>
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

    onMount(async () => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/data/detailsaccount/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + getCookie('csrftoken'),
            }
        });

        account = await response.json();
    });
</script>