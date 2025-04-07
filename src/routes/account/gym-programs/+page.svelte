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
        @media (max-width: 768px) {
            .main-content {
                width: 100%;
                min-width: 100%;
            }
        }
    </style>
</head>

<h2 class="titlePage">Schede di allenamento</h2>

<div class="form-container">
    <button on:click={addGymPrograms}>Aggiungi scheda</button>
</div>

<div class="form-container">
    <h3>Storico schede</h3>
    <div id="gym-programs-items">

    </div>
</div>

<script>
    import { onMount } from "svelte";
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    onMount(async() => {
        toggleClassByPathEquals({
            substring: '/account/gym-programs',
            targetId: 'gym-program-icon-item',
            className: 'current-page',
            removeFromIds: [
                'weight-icon-item',
                'body-measurements-icon-item',
                'account-icon-item',
                'food-program-icon-item'
            ]
        });
    });

    function addGymPrograms() {
        window.location.href = "/account/gym-programs/add";
    }
</script>