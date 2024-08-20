<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main>
  <form method="POST" action="?/update-music-file" use:enhance>
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value={data.musicFileData.title} />
    </div>
    <div>
      <label for="artist">Artist</label>
      <input type="text" id="artist" name="artist" value={data.musicFileData.artist} />
    </div>
    <div>
      <label for="album">Album</label>
      <input type="text" id="album" name="album" value={data.musicFileData.album} />
    </div>
    <div>
      <label for="year">Year</label>
      <input type="text" id="year" name="year" value={data.musicFileData.year} />
    </div>
    <div>
      <label for="track_number">Track Number</label>
      <input type="number" id="track_number" name="track_number" value={data.musicFileData.track_number} />
    </div>
    <div>
      <label for="genre">Genre</label>
      <input type="text" id="genre" name="genre" value={data.musicFileData.genre} />
    </div>
    <div>
      <button type="submit">Save</button>
    </div>
  </form>
</main>