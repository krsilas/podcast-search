<script>
import { Link } from "svelte-routing"
import { getContext } from "svelte"

const location = getContext({})
function isActive({ location, href, isPartiallyCurrent, isCurrent }) {
		const defaultStyles = "flex flex-col flex-1 py-1 pt-2 active:teal"
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
		if (isActive) {
			return { class: `${defaultStyles} text-teal-700` };
		}
		return { class: defaultStyles };
}
</script>

<div class="bg-gray-50 border-t border-gray-300 shadow-2xl w-screen fixed bottom-0">
    <nav class="flex justify-around text-xs text-gray-800 leading-relaxed text-center pb-safe-area">
        <Link getProps="{isActive}" to="/">
            <svg height="26" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 25"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span class="opacity-75">Home</span>
        </Link>
        <Link getProps="{isActive}" to="/search">
            <svg height="26" fill="currentColor" viewBox="0 0 20 21"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            <span class="opacity-75">Suche</span>
        </Link>
        <Link getProps="{isActive}" to="/favorites">
            <svg height="26" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 25"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            <span class="opacity-75">Favoriten</span>
        </Link>
    </nav>
</div>

<style>
.pb-safe-area {
	padding-bottom: env(safe-area-inset-bottom, 0);
}
/* .active\:teal {
	-webkit-tap-highlight-color: #B2F5EA;
} */
</style>