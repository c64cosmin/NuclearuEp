<script lang="ts">
	import { startNucleares } from "./nucleares";
	import { getReactor } from "../reactor";
	import Pump from "./pump.svelte";

	let reactorState = getReactor();
	let serverOnline = false;

	startNucleares((online, state) => {
		serverOnline = online;
		reactorState = state;
		console.log("spoj: reactorState", reactorState);
	});

	$: onlineIcon = serverOnline
		? "cloud-check-svgrepo-com.svg"
		: "cloud-slash-svgrepo-com.svg";
</script>

<main>
	<div style="display: flex;">
		<div class="image-container">
			<img
				src="img/cloud-check-svgrepo-com.svg"
				alt="online"
				style={"visibility:" + (serverOnline ? "visible" : "hidden")}
			/>
			<img
				src="img/cloud-slash-svgrepo-com.svg"
				alt="offline"
				style={"visibility:" + (!serverOnline ? "visible" : "hidden")}
			/>
		</div>
		<div class="image-container">
			<img
				src="img/link-alt-svgrepo-com.svg"
				alt="online"
				style={"visibility:" + (reactorState.online ? "visible" : "hidden")}
			/>
			<img
				src="img/link-slash-alt-svgrepo-com.svg"
				alt="offline"
				style={"visibility:" + (!reactorState.online ? "visible" : "hidden")}
			/>
		</div>
		<div class="image-container">
			<img
				src="img/radiation-svgrepo-com.svg"
				alt="online"
				style={"visibility:" + (reactorState.online ? "visible" : "hidden")}
			/>
		</div>
	</div>
    <div style={"opacity:"+(serverOnline?"100%":"30%")}>
	<Pump state={reactorState.coolant.pumps[0]} />
	<Pump state={reactorState.coolant.pumps[1]} />
	<Pump state={reactorState.coolant.pumps[2]} />
	<div>{JSON.stringify(reactorState)}</div>
    </div>
</main>

<style>
	main {
		text-align: center;
		padding: 2rem;
	}

	.image-container {
		display: grid;
		place-items: center; /* Centers images */
		position: relative;
		width: 32px;
		height: 32px;
	}

	.image-container img {
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}
</style>
