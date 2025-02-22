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
</script>

<main>
	<Pump state={reactorState.coolant.pumps[0]} />
	<Pump state={reactorState.coolant.pumps[1]} />
	<Pump state={reactorState.coolant.pumps[2]} />
</main>

<style>
	main {
		text-align: center;
		padding: 2rem;
	}
</style>
