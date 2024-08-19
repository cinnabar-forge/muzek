<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main>
  <div>
    {data.folderName}
  </div>
  <div>
    <form method="POST" action="?/reload-folder">
      <button>Reload folder (all edit data will be lost)</button>
    </form>
  </div>
  <div>
    <button>Save new folder structure</button>
  </div>
</main>
