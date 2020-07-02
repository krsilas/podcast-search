<script>
    import { flip } from 'svelte/animate';
    import {send, receive} from '../utils'
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    
    let term = ""

    function handleSearch(){
        dispatch('search', { term })
    }

    function autofocus(el){
        const params = new URLSearchParams(window.location.search)
        params.get('ref') == 'index' && el.focus()
    } 
</script>

   
<div out:send="{{key: 'input'}}" in:receive="{{key: 'input'}}"
    class="px-1 overflow-hidden bg-opacity-75 border border-gray-500 border-opacity-25 shadow-md rounded-xl bg-gray-50 md:mx-auto focus-within:border-gray-800 bg-blur {$$props.class}">
    <form class="flex items-center" on:submit|preventDefault={handleSearch}>
        <input use:autofocus on:focus
            class="w-full px-3 py-2 text-gray-900 bg-transparent focus:outline-none" 
            type="search" bind:value={term} 
            placeholder="Suche"
            />
        <button 
            class="flex-shrink-0 inline-block w-8 h-8 p-1 m-1 text-gray-700 border-blue-500 rounded-full focus:outline-none focus:border" 
            type="submit"
            >
            <svg style="margin: 2px" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
        </button>
    </form>  
</div>