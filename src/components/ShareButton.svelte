<script>
export let name = ""
function share(){
    if (navigator.share) {
        navigator.share({
            title: name,
            text: "Hör' dir diesen Podcast an!",
            url: window.location.href,
        })
        .then(() => console.log('Erfolgreich geteilt!'))
        .catch((error) => console.log('Error:', error));
    }
}

</script>

<button on:click={share} class="px-3 py-2 bg-green-300 active:bg-green-400 desaturate-75 flex rounded-lg space-x-2">
    <svg class="text-green-800 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
    <span class="text-green-900 leading-snug font-bold">Podcast teilen</span>
</button>