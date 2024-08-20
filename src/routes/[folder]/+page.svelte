<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main>
  <div>
    {data.folderName}
  </div>
  <div>
    <form method="POST" action="?/reload-folder" use:enhance>
      <button>Reload folder (all edit data will be lost)</button>
    </form>
  </div>
  <div>
    <form method="POST" action="?/save-structure" use:enhance>
      <button>Save new folder structure</button>
    </form>
  </div>
</main>
