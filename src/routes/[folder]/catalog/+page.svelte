<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main>
  <table>
    <thead>
      <tr>
        <th>Action</th>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Year</th>
        <th>Original path</th>
        <th>Provisional path</th>
      </tr>
    </thead>
    <tbody>
      {#each data.files as file}
        <tr>
          <td><a href="/{file.folder}/catalog/{file.hash}">Edit</a></td>
          <td>{file.title ?? "-"}</td>
          <td>{file.artist ?? "-"}</td>
          <td>{file.album ?? "-"}</td>
          <td>{Number(file.year) ?? "-"}</td>
          <td>{file.original_path ?? "-"}</td>
          <td>{file.provisional_path ?? "-"}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
