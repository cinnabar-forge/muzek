<script lang="ts">
  import type { PageServerData } from "./$types";
  import { currentMusic } from "$lib/current-music";
  import { getDisplayNameFromData } from "$lib/display-name";
  import { saveableAudioFormats } from "$lib/variables";
  import type { MusicFile } from "$lib/types";

  export let data: PageServerData;

  function getFileFate(file: MusicFile) {
    const fates = [];
    if (file.provisional_path !== file.original_path) {
      fates.push("To be moved");
    }
    if (file.resave_file) {
      fates.push("To be resaved");
    }
    return fates.join(", ");
  }
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
        <th>Fate</th>
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
              >
              {#if saveableAudioFormats.includes(file.extension)}
                <a class="button-like" href="/{file.folder}/catalog/{file.hash}"
                  >Edit</a
                >
              {/if}
              <a class="button-like" href="/music/{file.hash}" target="_blank"
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
          <td>{getFileFate(file)}</td>
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
