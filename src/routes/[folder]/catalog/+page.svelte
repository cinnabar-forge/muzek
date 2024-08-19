<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Original path</th>
        <th>Provisional path</th>
      </tr>
    </thead>
    <tbody>
      {#each data.files as file}
        <tr>
          <td>{file.title ?? "-"}</td>
          <td>{file.artist ?? "-"}</td>
          <td>{file.album ?? "-"}</td>
          <td>{Number(file.year) ?? "-"}</td>
          <td>{file.genre ?? "-"}</td>
          <td>{file.original_path ?? "-"}</td>
          <td>{file.provisional_path ?? "-"}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #3d3d3d;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #202020;
  }

  tr:nth-child(even) {
    background-color: #161616;
  }
</style>