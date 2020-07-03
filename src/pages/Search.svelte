<script>
import SearchBar from '../components/SearchBar'
import ListItem from '../components/ListItem'
const params = new URLSearchParams(window.location.search)
const term = params.get("q") 
let searchResults = term ? search(term) : new Promise((resolve,reject)=>{reject({message: 'Gebe einen Suchbegriff ein'})})

async function search(term) {
	return fetch(`https://itunes.apple.com/search?media=podcast&term=${term}`)
			.then(res => res.json())
			.catch(err => { console.error(err) })
}

function handleSearch(event) {
		searchResults = search(event.detail.term)
		window.scrollTo(0,0);
}
</script>

<SearchBar on:search={handleSearch} class="fixed z-10 top-2 max-w-md my-1 mx-2 md:mx-auto md:w-full inset-x-0"/>

<main class="absolute w-full">
	<section class="py-16 px-4 mx-auto max-w-md">
	{#await searchResults}
		<p class="hidden">Ergebnisse laden...</p>
	{:then res}
			<p>{res.resultCount} Ergebnisse gefunden</p>
			{#each res.results as item}
					<ListItem on:detail {item} />
			{/each}
	{:catch error}
		<p>{error.message}</p>
	{/await}
	</section>
</main>