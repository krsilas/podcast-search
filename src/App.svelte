<script>
	import { Router, link, Link, Route } from "svelte-routing"
	import { getContext } from "svelte"
	import { registerServiceWorker } from "./utils"
	import Home from "./pages/Home.svelte";
	import Search from "./pages/Search.svelte"
	const location = getContext({})
	export let url = ""
	registerServiceWorker()
</script>


<Router url="{url}"> 
  <div id="shell" class="bg-gray-100 min-h-screen pb-16">
    <Route path="search" component="{Search}" />
    <Route path="/"><Home /></Route>
	<div class="bg-white shadow-2xl w-screen h-14 fixed bottom-0">
		<nav class="flex justify-around text-xs text-gray-600 leading-loose text-center">
			<a use:link href="/" class="flex flex-col flex-1 py-2">
				<svg class="text-gray-800" height="26" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 25"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
				<div>Home</div>
			</a>
			<a use:link href="/search" class="flex flex-col flex-1 py-2">
				<svg class="text-gray-800" height="26" fill="currentColor" viewBox="0 0 20 21"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
				<!-- {:else}	<svg class="h-10" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>{/if} -->
				<span>Suche</span>
			</a>
			<a use:link href="/favorites" class="flex flex-col flex-1 py-2">
				<svg class="text-gray-800" height="26" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 25"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
				<span>Favoriten</span>
			</a>
		</nav>
	</div>
  </div>
</Router>

<style global>
@import './css/main.css';
</style>