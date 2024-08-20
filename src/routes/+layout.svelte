<script lang="ts">
  import { page } from "$app/stores";
  import { CINNABAR_PROJECT_VERSION } from "$lib/cinnabar";
  import "../app.css";
  import MusicPlayer from "./MusicPlayer.svelte";
</script>

<nav>
  <ul>
    <li>
      <a href="/" class={!$page.params.folder ? "logo" : ""}>MUZEK</a>
    </li>
    {#if $page.params.folder}
      <li><a href={`/${$page.params.folder}`} class="logo">Manage</a></li>
      <li><a href="{`/${$page.params.folder}`}/catalog">Catalog</a></li>
      <li><a href="{`/${$page.params.folder}`}/structure">Structure</a></li>
    {/if}
    <li class="grow-right"><MusicPlayer /></li>
  </ul>
</nav>
<slot></slot>
<footer>
  <p>
    <a href="https://github.com/cinnabar-forge/muzek">Muzek</a>
    v{CINNABAR_PROJECT_VERSION} By
    <a href="https://github.com/cinnabar-forge">Cinnabar Forge</a> in 2024
  </p>
</footer>

<style>
  nav {
    background-color: #333;
    color: white;
    padding: 0;
    margin: 0;
    font-family: "Teko", sans-serif;
    font-size: 1.5em;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  nav ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    height: 2em;
  }

  nav ul li {
    margin: 0 1em;
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

  .grow-right {
    flex-grow: 1;
  }

  footer {
    text-align: center;
    font-family: "Teko", sans-serif;
    font-size: 1.2em;
  }
</style>
