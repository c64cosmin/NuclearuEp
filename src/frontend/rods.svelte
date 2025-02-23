<script lang="ts">
	import type { Rods } from "../reactor";
	export let state: Rods;

	let interacted: boolean = false;
	let rodsLevel = 100;
	function increment() {
		interacted = true;
		rodsLevel += 0.1;
		if (rodsLevel > 100) rodsLevel = 100;
	}

	function decrement() {
		interacted = true;
		rodsLevel -= 0.1;
		if (rodsLevel < 0) rodsLevel = 0;
	}

	function sendRodsLevel() {
		interacted = false;
		console.log(rodsLevel);
	}
	$: rodsLevel = interacted ? rodsLevel : state.posOrdered;
</script>

<div class="grid-container">
	<div class="image-container grid-item">
		<div class="image-container-div">
			<svg
				width="100"
				height="100"
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="0" y="0" width="100" height="100" fill="#000000" />
				<rect
					x="0"
					y={100 - state.posActual}
					width="100"
					height="100"
					fill="#00ff00"
				/>
			</svg>
		</div>
	</div>
	<div class="grid-item">
		<div class="grid-container half">
			<div class="gauge-value grid-item">
				{Number(state.posActual).toFixed(1)}
			</div>
			<button class="grid-item" on:click={sendRodsLevel}>Update</button>
		</div>
	</div>
	<div class="grid-item">
		<div class="grid-container third">
			<button class="grid-item" on:click={increment}>+</button>
			<div class="gauge-value grid-item">
				{Number(rodsLevel).toFixed(1)}
			</div>
			<button class="grid-item" on:click={decrement}>-</button>
		</div>
	</div>
</div>

<style>
	button {
		width: 100%;
		height: 100%;
		font-size: 50px;
	}

	svg {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
	}

	.gauge-value {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 50px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

	.grid-container {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(1, 1fr);
		width: 600px;
	}

	.half {
		height: 50;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(2, 1fr);
		width: 200px;
		height: 200px;
	}

	.third {
		height: 33.33%;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(3, 1fr);
		width: 200px;
		height: 200px;
	}

	.grid-item {
		text-align: center;
	}
</style>
