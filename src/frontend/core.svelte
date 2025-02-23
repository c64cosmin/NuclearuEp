<script lang="ts">
	import Gauge from "./gauge.svelte";
	import type { Reactor } from "../reactor";
	export let state: Reactor;

	$: duration =
		state.coolant.flowSpeed === 0 ? 0 : 100 / state.coolant.flowSpeed;
</script>

<div class="grid-container core">
	<div class="grid-item">
		<div class="image-container">
			<svg class="image-container-div" width="200" height="200">
				<circle
					cx="100"
					cy="100"
					r="85"
					fill={state.core.criticalMassReached === 1 ? "yellow" : "red"}
				/>
			</svg>
			<img
				class="image-container-div"
				src="img/radioactive-svgrepo-com.svg"
				alt="reactive"
			/>
		</div>
	</div>
	<div class="grid-item">
		<Gauge label="Core temp" value={state.core.temp.current} range={[0, 800]} />
	</div>
	<div class="grid-item">
		<Gauge
			label="Core Pressure"
			value={state.core.pressure.current}
			range={[0, 300]}
		/>
	</div>
	<div class="grid-item">
		<div class="image-container">
			<svg
				class="image-container-div"
				width="200"
				height="200"
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
					fill="red"
					mask="url(#hole-mask)"
				/>
			</svg>
			<img
				class="image-container-div rotating"
				alt="fan"
				style={`animation-duration: ${duration}s`}
				src="img/fan-svgrepo-com.svg"
			/>
			<div class="gauge-number grid-item">
				{state.coolant.flowSpeed}
			</div>
		</div>
	</div>
	<div class="grid-item">
		<Gauge
			label="Criticality"
			value={state.core.stateCriticality}
			range={[-5, 5]}
			showNumbers={false}
		/>
	</div>
	<div class="grid-item">
		<Gauge
			label="Pressure"
			value={state.coolant.pressure}
			range={[0, 300]}
		/>
	</div>
</div>

<style>
	.core {
		background-color: #ff8800;
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

	.gauge-value {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 40px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
</style>
