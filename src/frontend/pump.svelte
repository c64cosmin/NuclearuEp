<script lang="ts">
	import type { Pump } from "../reactor";
	export let state: Pump;

	$: duration = state.speed === 0 ? 0 : 40 / state.speed;
</script>

<div class="image-container">
	<img src="img/pump.svg" alt="pump" />
	<img
		src="img/propeller.svg"
		alt="fan"
		class="rotating"
		style={`animation-duration: ${duration}s`}
	/>
</div>

<style>
	img {
		display: block;
		margin: auto;
	}

	.rotating {
		animation: rotate infinite linear;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.image-container {
		display: grid;
		place-items: center; /* Centers images */
		position: relative;
		width: 200px;
		height: 200px;
	}

	.image-container img {
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}
</style>
