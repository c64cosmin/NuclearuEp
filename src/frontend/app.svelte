<script>
  let name = 'World';
</script>

<main>
  <h1>Hello {name}!</h1>
  <input bind:value={name} placeholder="Enter your name" />
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
