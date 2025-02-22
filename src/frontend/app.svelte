<script lang="ts">
  import Pump from "./pump.svelte";
  let name = 'World';
</script>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }
  input {
    padding: 0.5rem;
    margin-top: 1rem;
  }
</style>

<main>
  <Pump speed=1 active=true />
  <Pump speed=2 active=true />
  <Pump speed=3 active=true />
</main>
