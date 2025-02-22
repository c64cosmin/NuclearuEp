<script lang="ts">
	export let value: number = 50;
	export let range: [number, number] = [0, 100];
	export let label: string = "Gauge";

	$: angle = ((value - range[0]) / (range[1] - range[0])) * 180 - 90;
</script>

<div class="grid-container">
	<div class="gauge grid-item">
		<svg viewBox="0 0 200 100">
			<circle
				cx="100"
				cy="100"
				r="95"
				fill="none"
				stroke="#e0e0e0"
				stroke-width="10"
			/>

			{#each Array(51) as _, i}
				<line
					x1="0"
					y1="100"
					x2={i % 10 == 0 ? "15" : i % 2 == 0 ? "10" : "5"}
					y2="100"
					stroke="black"
					stroke-width="1"
					transform="rotate({(i * 180) / 50}, 100, 100)"
				/>
			{/each}

			{#each Array(5) as _, i}
				<text
					x="100"
					y="25"
					text-anchor="middle"
					font-family="Arial, sans-serif"
					font-size="17"
					transform="rotate({Math.max(0.05, Math.min(0.95, i / 4)) * 180 -
						90}, 100, 100)"
				>
					{(i / 4) * (range[1] - range[0]) + range[0]}
				</text>
			{/each}

			<line
				x1="100"
				y1="100"
				x2="100"
				y2="5"
				stroke="red"
				stroke-width="4"
				transform="rotate({angle},100,100)"
			/>
		</svg>
	</div>
	<div class="grid-item">
		<div class="grid-container half">
			<div class="gauge-label grid-item">
				{label}
			</div>
			<div class="gauge-value">
				{value}
			</div>
		</div>
	</div>
</div>

<style>
	.gauge {
		width: 200px;
		height: 200px;
		position: relative;
		overflow: hidden;
		background-color: transparent;
		margin: 50px auto;
	}

	.gauge svg {
		width: 100%;
		height: 100%;
	}

	.gauge-value {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 48px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.gauge-label {
		width: 100%;
		height: 100%;
		font-size: 30px;
		font-weight: bold;
	}

	.grid-container {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(2, 1fr);
		height: 200px;
		width: 200px;
	}

	.half {
		height: 50%;
	}

	.grid-item {
		text-align: center;
		width: 100%;
		height: 100%;
	}
</style>
