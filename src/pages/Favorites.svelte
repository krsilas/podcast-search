<script>
import { openDB } from 'idb'
import ListItem from '../components/ListItem'

async function getFavorites(){
    const db1 = await openDB('db1', 1);
	return db1.getAll('favorites')
}
    
</script>


<main class="absolute w-full">
	<section class="p-4 mx-auto max-w-md">
	{#await getFavorites()}
		<p>Favoriten werden geladen...</p>
	{:then res}
        {#if res.length <= 0} Du hast noch keine Podcasts favorisiert. {/if}
		{#each res as item}
			<ListItem on:detail {item} />
		{/each}
	{:catch error}
		<p class="text-red-500">{error.message}</p>
	{/await}
	</section>
</main>