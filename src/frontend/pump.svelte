<script lang="ts">
	import type { Pump } from "../reactor";
	export let state: Pump;

	$: duration = state.speed === 0 ? 0 : 40 / state.speed;
	$: bodyColor =
		state.dryStatus === 1
			? "gray"
			: state.overloadStatus === 1
				? "red"
				: "blue";
</script>

<div class="image-container">
	<div class="image-container-div">
		<svg
			width="100"
			height="100"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<mask id="hole-mask">
					<rect x="0" y="0" width="100" height="100" fill="white" />
					<circle cx="50" cy="50" r="45" fill="black" />
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
	<div class="image-container-div">
		<img
			alt="fan"
			class="rotating"
			style={`animation-duration: ${duration}s`}
			src="img/fan-svgrepo-com.svg"
		/>
	</div>
	<div class="gauge">
		{state.speed}
	</div>
</div>

<style>
	img {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
	}
	svg {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
	}

	.gauge {
		position: absolute;
		top: 10px;
		left: 10px;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 18px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

	.image-container-div {
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}
</style>
