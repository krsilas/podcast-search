<script>
import { openDB } from 'idb'
import FavButton from '../components/FavButton'
import ShareButton from '../components/ShareButton'
import {parsePodcast} from '../parse'
export let id = ""
let NumberOfEpisodes = 0
let isFav = false
let info = getInfo()

async function getInfo() {
    return fetch (`/proxy/https://itunes.apple.com/lookup?id=${id}&entity=podcast`)
        .then(res=>res.json())
        .then(res=>res.results[0])
        .catch(err => { console.error(err) })
}

async function getFeed(){
    const {feedUrl} = await info
    return fetch(`/proxy/${feedUrl}`)
        .then(res=>res.text())
        .then(parsePodcast)
        .then(res=>{
            NumberOfEpisodes = res.episodes.length
            return res
        })
        .catch(err=>{console.errror(err)})
}

(async () => {
	const db1 = await openDB('db1', 1);
	const { trackId } = await info
	db1.getAllKeys('favorites').then(res => { isFav = res.includes(trackId)})
})()

async function saveToFavorites(){
	const podcast = await info
	const db1 = await openDB('db1', 1);

	if (!isFav){
		db1.add(
			'favorites', //Name der Datenbank
			podcast, //Value
			podcast.trackId //Key
		).then(result => {
			console.log(`Podcast mit der ID ${podcast.trackId} hinzugefügt!`)
		}).catch(err => { console.error('Error: ', err) })
	} else {
		db1.delete('favorites', podcast.trackId).catch(err => { console.error('Errord: ', err) })
	} 
	db1.close()
	isFav = !isFav
}
</script>


{#await info}
	<p class="hidden">Informationen werden geladen...</p>
{:then podcast}
    <img class="h-48 rounded-xl shadow" src={podcast.artworkUrl600} alt="{podcast.name}">
    <div class="my-3">
        <h2 class="font-medium text-xl">{podcast.name || podcast.trackName}</h2>
        <p class="text-gray-600">{podcast.artistName}</p>
        <p class="my-2">
            Folgenanzahl: {NumberOfEpisodes} <br>
            Kategorie: {podcast.primaryGenreName}
        </p>
    </div>
		<div class="flex flex-wrap space-x-2">
			<FavButton on:save={saveToFavorites} {isFav} />
			<ShareButton name={podcast.name} />
		</div>
{:catch error}
    <p class="text-red-500">{error.message}</p>
{/await}

{#await getFeed()}
    <p>Feed wird geladen...</p>
{:then data}
    {#each data.episodes.slice(0,25) as episode, index}
    <ul class="mt-4">
        <li class="bg-white rounded-lg shadow-lg py-1 px-3 w-full my-2">
            <span class="text-xs text-gray-600"><strong>{episode.date}</strong></span><br>
            <strong>{episode.title}</strong><br>
            <audio class="-ml-3" src="{ (index<2) ? episode.audio : ''}" controls style="filter: contrast(1.5)"></audio>
        </li>
    </ul>
    {/each}
{/await}