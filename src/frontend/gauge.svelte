<script lang="ts">
	export let value: number = 50;
	export let range: [number, number] = [0, 100];

	$: angle = ((value - range[0]) / (range[1] - range[0])) * 180 - 90;
</script>

<div class="gauge">
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
	<div class="gauge-value">
		{value}
	</div>
</div>

<style>
	.gauge {
		width: 200px;
		height: 100px;
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
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 18px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}
</style>
