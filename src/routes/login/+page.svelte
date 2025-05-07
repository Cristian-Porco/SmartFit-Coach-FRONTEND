<head>
    <link rel="stylesheet" type="text/css" href="/css/login/style_login.css">
</head>

<div class="login-page">
    <div class="login-container">
        <h2>Accedi</h2>
        <form class="form-container" on:submit={login}>
            <div class="form-group">
                <div class="error" id="error">
                    <p>Credenziali non valide!</p>
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

    onMount(() => {
        if(getCookie('csrftoken') !== "") window.location.href = "/account";
    });

    async function login(event) {
        event.preventDefault();

        const response1 = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password })
        });

        if (response1.ok) {
            const data1 = await response1.json();
            setCookie("csrftoken", data1.key);
            window.location.href = "/account";

            const response2 = await fetch("http://127.0.0.1:8000/api/v1/auth/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + getCookie('csrftoken')
                }
            });
            
            if (response2.ok) {
                const data2 = await response2.json();
                setCookie("pk", data2.pk);
                setCookie("username", data2.username);
            }
        } else {
            document.getElementById("error").style.display = "block";
        }
    }
</script>