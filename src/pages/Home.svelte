<script>
import { navigate } from 'svelte-routing' 
import { fade } from 'svelte/transition';
import SearchBar from '../components/SearchBar'
import ListItem from '../components/ListItem'
async function PodcastAPI() {
		return fetch(`/proxy/https://rss.itunes.apple.com/api/v1/de/podcasts/top-podcasts/all/10/non-explicit.json`)
				.then(res=>res.json())
				.catch((err) => { console.error(err) })
}
let TopPodcasts = PodcastAPI()
</script>

<div class="absolute top-0 w-full h-48 bg-waves z-0" in:fade="{{x: -100, duration: 100}}" out:fade="{{duration: 80}}"></div>
<header class="grid w-full text-teal-800 font-overlock">
    <h1 class="py-8 m-auto text-5xl font-bold z-10">Podcast Suche</h1>
</header>

<SearchBar on:focus={()=>navigate("/search?ref=index")} class="sticky max-w-md mx-2 my-1 top-2"/>

<section class="max-w-md mx-4 mt-8 text-gray-900 md:mx-auto">
<h2 class="text-2xl font-extrabold font-overlock">Beliebte Podcasts</h2>
{#await TopPodcasts}
	<p>lädt...</p>
{:then res}
    <div class="divide-y divide-gray-200">
	    {#each res.feed.results as item}
        <ListItem on:detail {item} />
        {/each}
    </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</section>

