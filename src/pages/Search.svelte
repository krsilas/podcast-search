<script>
    import SearchBar from '../components/SearchBar'
    import ListItem from '../components/ListItem'

    const params = new URLSearchParams(window.location.search.substring(1)) 
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

<SearchBar on:search={handleSearch} class="fixed top-2 max-w-md my-1 mx-2 md:mx-auto md:w-full left-0 right-0"/>

<main class="pt-16 px-4 py-4">
{#await searchResults}
	<p>Ergebnisse laden...</p>
{:then res}
    <p>{res.resultCount} Ergebnisse gefunden</p>
    {#each res.results as item}
        <ListItem {item} />
    {/each}
{:catch error}
	<p>{error.message}</p>
{/await}
</main>