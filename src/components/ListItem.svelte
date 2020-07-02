<script>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()
export let item;  
function handleClick(){
    dispatch('detail', { id: item.id || item.trackId })
}
</script>

<div class="flex py-2" on:click={handleClick}>
    <img class="h-16 rounded-xl" src={item.artworkUrl100} alt="{item.name}">
    <div class="mx-3 mt-1 leading-tight">
        <p class="font-medium clamp">{item.name || item.trackName}</p>
        <p class="text-sm text-gray-600 clamp" style="--lines: 1">{item.artistName}</p>
    </div>
</div>

<style>

.clamp {
    --lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>