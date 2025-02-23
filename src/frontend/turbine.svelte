<script lang="ts">
	import Gauge from "./gauge.svelte";
	import type { Turbine } from "../reactor";
	export let state: Turbine;

	$: duration = state.turbine.rpm === 0 ? 0 : 306 / state.turbine.rpm;
</script>

<div class="grid-container turbine">
	<div class="image-container grid-item">
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
						<circle cx="50" cy="50" r="40" fill="black" />
					</mask>
				</defs>
				<rect
					x="0"
					y="0"
					width="100"
					height="100"
					fill="orange"
					mask="url(#hole-mask)"
				/>
			</svg>
		</div>
		<div class="image-container-div">
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
		<div class="gauge-number grid-item">
			{state.turbine.rpm}
		</div>
	</div>
	<div class="gauge grid-item">
		<Gauge label="Temp" value={state.turbine.temperature} range={[0, 600]} />
	</div>
	<div class="gauge grid-item">
		<Gauge label="Pressure" value={state.turbine.pressure} range={[0, 600]} />
	</div>
	<div class="gauge-value grid-item big">
		{"kw:" + Number(state.generator.kw).toFixed(0)}
	</div>
	<div class="gauge-value grid-item big">
		{"v:" + Number(state.generator.v).toFixed(0)}
	</div>
	<div class="gauge-value grid-item big">
		{Number(state.generator.hertz).toFixed(0) + "hz"}
	</div>
</div>

<style>
	.turbine {
		background-color: #ffff88;
	}

	svg {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
	}

	.gauge-number {
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
		place-items: center;
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

	.grid-container {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		width: 600px;
	}

	.grid-item {
		text-align: center;
	}

	.big {
		font-size: 40px;
	}

	.gauge-value {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 40px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}
</style>
