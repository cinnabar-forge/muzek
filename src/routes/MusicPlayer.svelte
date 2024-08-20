<script lang="ts">
  import { currentMusic } from "$lib/current-music";

  export let audioUrl: null | string = null;
  export let text: null | string = null;

  $: {
    audioUrl = $currentMusic.file;
    text = $currentMusic.text || audioUrl;
  }
</script>

{#if audioUrl}
  <div class="container">
    <span>{text || audioUrl}</span>
    <audio autoplay controls src={audioUrl}></audio>
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: center;
    margin: 0;
    padding: 0;
  }
  span,
  audio {
    margin: 0 0.5em;
  }
  audio {
    height: 1em;
  }
  span {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
  }
</style>
