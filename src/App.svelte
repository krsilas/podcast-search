<script>
	import { Router,  Route } from "svelte-routing"
	import { registerServiceWorker } from "./utils"
	import Home from "./pages/Home";
	import Search from "./pages/Search"
	import Modal from './components/Modal'
	import Podcast from './pages/Podcast'
	import Favorites from './pages/Favorites'
	import TabBar from './components/TabBar'
	
	let modalOpen = false
	let podcastId = ""
	//export let url = ""
	registerServiceWorker()
	function openModal(e) {
		modalOpen = true
		podcastId = e.detail.id
		history.pushState({}, document.title, `/podcast/${e.detail.id}`)
	}
	
</script>


<Router> 
  <div class="min-h-screen pb-16 select-none">
    <Route path="/"><Home on:detail={e => openModal(e)} /></Route>
	<Route path="/search"><Search on:detail={e => openModal(e)} /></Route>
	<Route path="/favorites"><Favorites on:detail={e => openModal(e)} /></Route>
	<Route path="/podcast/:id" let:params>
		<div class="m-4"><Podcast id={params.id} /></div>
	</Route>
	<TabBar />
  </div>
  {#if modalOpen}
  	<Modal on:click={()=>modalOpen=false}>
	  <Podcast id={podcastId} />
	</Modal>
  {/if}
</Router>

<style global>
@import './css/main.css';
</style>