<script>
import FavButton from '../components/FavButton'
import {parsePodcast} from '../parse'
export let id = ""
let info = getInfo()
let feed = getFeed()
let NumberOfEpisodes = null

async function getInfo() {
    return fetch (`/proxy/https://itunes.apple.com/lookup?id=${id}&entity=podcast`)
        .then(res=>res.json())
        .then(res=>res.results[0])
        .catch(err => { console.error(err) })
}

async function getFeed(){
    const {feedUrl} = await getInfo();
    return fetch(feedUrl)
        .then(res=>res.text())
        .then(parsePodcast)
        .then(res=>{
            NumberOfEpisodes = res.episodes.length
            return res
        })
        .catch(err=>{console.errror(err)})
}
function saveToFavorites(){

}
</script>


{#await info}
<p class="hidden">Lädt...</p>
{:then info}
    <img class="h-48 rounded-xl shadow" src={info.artworkUrl600} alt="{info.name}">
    <div class="my-3">
        <h2 class="font-medium text-xl">{info.name || info.trackName}</h2>
        <p class="text-gray-600">{info.artistName}</p>
        <p class="my-2">
            Folgenanzahl: {NumberOfEpisodes} <br>
            Kategorie: {info.primaryGenreName}
        </p>
    </div>
    <FavButton on:save={saveToFavorites} isFav={false} />
{:catch error}
    <p class="text-red-500">{error.message}</p>
{/await}

{#await feed}
    Lädt
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