<script>
    import { onMount } from 'svelte';
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    onMount(() => {
        deleteCookie('csrftoken');
        deleteCookie('pk');
        deleteCookie('username');
        window.location.href = "/";
    });
</script>