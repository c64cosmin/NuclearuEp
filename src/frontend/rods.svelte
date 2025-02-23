<script lang="ts">
	import type { Rods } from "../reactor";
	import { sendRodLevel } from "./nucleares";
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

	function incrementBig() {
		interacted = true;
		rodsLevel += 1.0;
		if (rodsLevel > 100) rodsLevel = 100;
	}

	function decrementBig() {
		interacted = true;
		rodsLevel -= 1.0;
		if (rodsLevel < 0) rodsLevel = 0;
	}

	function send() {
		sendRodLevel(rodsLevel);
		interacted = false;
	}
	$: rodsLevel = interacted ? rodsLevel : state.posActual;
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
	<div class="grid-container12">
		<div class="gauge-value">
			{Number(state.posActual).toFixed(1)}
		</div>
		<button class="grid-item" on:click={send}>Send</button>
	</div>
	<div class="grid-container13">
		<div class="grid-container21">
			<button class="grid-item" on:click={increment}>+</button>
			<button class="grid-item" on:click={incrementBig}>++</button>
		</div>
		<div class="gauge-value2">
			{Number(rodsLevel).toFixed(1)}
		</div>
		<div class="grid-container21">
			<button class="grid-item" on:click={decrement}>-</button>
			<button class="grid-item" on:click={decrementBig}>--</button>
		</div>
	</div>
</div>

<style>
	svg {
		display: block;
		margin: auto;
		width: 100%;
		height: 100%;
	}

	.gauge-value {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 70px;
		font-weight: bold;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.gauge-value2 {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 5px 10px;
		font-size: 40px;
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
		height: 200px;
	}

	.grid-container12 {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}

	.grid-container21 {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(1, 1fr);
	}

	.grid-container13 {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}

	button {
		font-size: 50px;
		width: 100%;
		height: 100%;
	}
</style>
