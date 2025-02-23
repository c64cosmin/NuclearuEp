<script lang="ts">
	import Gauge from "./gauge.svelte";
	import type { Turbine } from "../reactor";
	export let state: Turbine;

	$: duration = state.turbine.rpm === 0 ? 0 : 306 / state.turbine.rpm;
	$: watt =
		state.generator.kw > 10000
			? Number(state.generator.kw / 1000).toFixed(2) + "MW"
			: Number(state.generator.kw).toFixed(0) + "kW";
	$: volts =
		state.generator.v > 10000
			? Number(state.generator.v / 1000).toFixed(2) + "kV"
			: Number(state.generator.v).toFixed(0) + "V";
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
						<circle cx="50" cy="50" r="45" fill="black" />
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
			<img
				alt="fan"
				class="rotating"
				style={`animation-duration: ${duration}s`}
				src="img/fan-svgrepo-com.svg"
			/>
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
	<div class="grid-item big">
		<Gauge
			label="Power"
			value={state.generator.kw}
			valueString={(state.generator.kw > 10000
				? Number(state.generator.kw / 1000).toFixed(2)
				: Number(state.generator.kw).toFixed(0)
			).toString()}
			range={[0, 40000]}
			unit={state.generator.kw > 10000 ? "MW" : "kW"}
		/>
	</div>
	<div class="grid-item big">
		<Gauge
			label="Volts"
			value={state.generator.v}
			valueString={(state.generator.v > 10000
				? Number(state.generator.v / 1000).toFixed(2)
				: Number(state.generator.v).toFixed(0)
			).toString()}
			range={[0, 25000]}
			unit={state.generator.v > 10000 ? "kV" : "V"}
		/>
	</div>
	<div class="grid-item big">
		<Gauge
			label="Freq"
			value={state.generator.hertz}
			range={[0, 60]}
			unit={"hz"}
		/>
	</div>
</div>

<style>
	.turbine {
		background-color: #ffff88;
	}

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
