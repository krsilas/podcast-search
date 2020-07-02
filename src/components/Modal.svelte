<script>
import {fly, fade} from 'svelte/transition'
import { quintOut } from 'svelte/easing';

</script>

<div transition:fade={{duration: 200}} class="w-full fixed bottom-0 h-full z-20 bg-gray-900 bg-opacity-25">
    <div class="w-full max-w-2xl mx-auto h-16 flex justify-end px-2 select-none">
        <button on:click class="text-gray-900 text-opacity-50 active:outline-none active:text-opacity-75">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" stroke="none" fill="currentColor"/>
            <line x1="16.126" y1="7.874" x2="7.874" y2="16.126" stroke="white" style="stroke-width: 1.5px;"/>
            <line x1="7.874" y1="7.874" x2="16.126" y2="16.126" stroke="white" style="stroke-width: 1.5px;"/>
        </svg>
        </button>
    </div>

    <div transition:fly={{y: 800, duration: 300, easing: quintOut}} class="bg-gray-50 overflow-y-scroll mx-2 max-w-2xl md:mx-auto h-full relative rounded-t-lg shadow-xl p-4 break-words">
        <slot></slot>
    </div>
</div>