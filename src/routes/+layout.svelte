<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";
</script>

<nav>
  <ul>
    <li><a href="/" class="{!$page.params.folder ? "logo" : ""}">MUZEK</a></li>
    {#if $page.params.folder}
      <li><a href={`/${$page.params.folder}`} class="logo">Manage</a></li>
      <li><a href="{`/${$page.params.folder}`}/catalog">Catalog</a></li>
      <li><a href="{`/${$page.params.folder}`}/structure">Structure</a></li>
    {/if}
  </ul>
</nav>
<slot></slot>

<style>
  nav {
    background-color: #333;
    color: white;
    padding: 0.005em 0;
    margin: 0;
    font-family: "Oswald";
    font-size: 1.5em;
  }

  nav ul {
    display: flex;
    list-style: none;
  }

  nav ul li {
    margin-right: 1.75em;
  }

  nav ul li a {
    color: white;
    text-decoration: none;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }

  .logo {
    color: var(--color-theme-accent);
  }
</style>
