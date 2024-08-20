<script lang="ts">
  import type { PageServerData } from "./$types";
  import { currentMusic } from "$lib/current-music";
  import { getDisplayNameFromData } from "$lib/display-name";

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
          <td>
            <div class="action">
              <button
                on:click={() => {
                  currentMusic.set({
                    file: `/music/${file.hash}`,
                    text: getDisplayNameFromData(
                      file.hash,
                      file.title,
                      file.artist,
                      file.album,
                      file.year,
                    ),
                  });
                }}>Play</button
              ><a class="button-like" href="/{file.folder}/catalog/{file.hash}"
                >Edit</a
              ><a class="button-like" href="/music/{file.hash}" target="_blank"
                >DLoad</a
              >
            </div>
          </td>
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

<style>
  .action {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    justify-items: center;
  }
</style>
