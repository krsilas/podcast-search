<script>
	import { Router,  Route } from "svelte-routing"
	import { registerServiceWorker } from "./utils"
	import Home from "./pages/Home";
	import Search from "./pages/Search"
	import Modal from './components/Modal'
	import Podcast from './pages/Podcast'
	import TabBar from './components/TabBar'
	
	let modalOpen = false
	let podcastId = ""
	//export let url = ""
	//registerServiceWorker()
	function openModal(id) {
		modalOpen = true
		podcastId = id
	}
	
</script>


<Router> 
  <div class="min-h-screen pb-16 select-none">
    <Route path="/"><Home on:detail={e => openModal(e.detail.id)} /></Route>
	<Route path="/search"><Search on:detail={e => openModal(e.detail.id)} /></Route>
	<Route path="/podcast/:id"><Podcast /></Route>
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