<script lang="ts">
	import type { Pump } from "../reactor";
	export let state: Pump;

        $: duration = state.speed === 0 ? 0 : 40 / state.speed;
        $: bodyColor = state.dryStatus ? "red" : "blue";
</script>

<div class="image-container">
	<div>
		<svg
			width="100"
			height="100"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<mask id="hole-mask">
					<rect x="0" y="0" width="100" height="100" fill="white" />
					<circle cx="50" cy="50" r="40" fill="black" />
				</mask>
			</defs>
			<rect
				x="0"
				y="0"
				width="100"
				height="100"
                fill={bodyColor}
				mask="url(#hole-mask)"
			/>
		</svg>
	</div>
	<div
	>
		<svg
		class="rotating"
      style={`animation-duration: ${duration}s`}
			width="100"
			height="100"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="50" cy="50" r="10" fill="black" />
			<polygon points="50,10 60,40 50,35 40,40" fill="gray" />
			<polygon points="90,50 60,60 65,50 60,40" fill="gray" />
			<polygon points="50,90 40,60 50,65 60,60" fill="gray" />
			<polygon points="10,50 40,40 35,50 40,60" fill="gray" />
		</svg>
	</div>
</div>

<style>
	svg {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
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

	.image-container div{
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}
</style>
