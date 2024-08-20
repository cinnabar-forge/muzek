<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <div>
    {#if data.folders.length > 0}
      <ul>
        {#each data.folders as folder}
          <li>
            <a href={`${folder.hash}`}>{folder.path}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No folders found</p>
    {/if}
  </div>
  <div>
    <form method="POST" action="?/load-folder" use:enhance>
      <div>
        <input name="folder-name" type="text" placeholder="Folder name" />
      </div>
      <div>
        <button>Load folder</button>
      </div>
    </form>
  </div>
</main>
