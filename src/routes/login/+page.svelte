<head>
    <style>
        .main-content {
            padding: 0px;
            text-align: center; /* Per centrare il testo */
        }
        .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .login-container {
            width: 100%;
        }
        .login-container h2 {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .login-container button {
            margin-top: 1.5rem;
        }
    </style>
</head>

<div class="login-page">
    <div class="login-container">
        <h2>Accedi</h2>
        <form class="form-container" on:submit={login}>
            <div class="form-group">
                <div id="error">
                    Credenziali non valide!
                </div>
            </div>
            <div class="form-group">
                <input type="text" bind:value={email} id="email" name="email" placeholder="Username..." required>
            </div>
            <div class="form-group">
                <input type="password" bind:value={password} id="password" name="password" placeholder="Password..." required>
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>

<script>
    import { onMount } from "svelte";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    let email = "";
    let password = "";

    async function login(event) {
        event.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setCookie("csrftoken", data.key);
            window.location.href = "/account";
        } else {
            document.getElementById("error").style.display = "block";
        }
    }
</script>