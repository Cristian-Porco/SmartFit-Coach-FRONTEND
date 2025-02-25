<script>
    import { onMount } from 'svelte';
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    onMount(() => {
        deleteCookie('csrftoken');
        window.location.href = "/";
    });
</script>