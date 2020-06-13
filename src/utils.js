import fetchJsonp from "fetch-jsonp"

export function fetchp(string) {
    return fetchJsonp(string).then((response) => response.json())
}



import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
export const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 300),
    delay: 0,
    fallback(node, params) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;

        return {
            duration: 600,
            easing: quintOut,
            css: t => `
                transform: ${transform};
                opacity: ${t},
                position: absolute
            `
        };
    }
});



export function registerServiceWorker(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js');
        });
    }
} 
