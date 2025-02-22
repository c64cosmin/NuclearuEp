<script lang="ts">
  import Pump from "./pump.svelte";
  let name = 'World';
</script>

<main>
  <Pump speed=1 active=true />
</main>

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
