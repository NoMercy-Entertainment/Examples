const jsdom = require("jsdom");

const ALBUM_URL =
  "https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2";

(async () => {
  const res = await fetch(ALBUM_URL);

  const html = await res.text();
  const doc = new jsdom.JSDOM(html);

  const tracks = Array.from(
    doc.window.document.querySelectorAll("[data-track-info]")
  );
  
	const baseCoverUrl =
    "https://api.nomercy.tv/cors?url=" +
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/";

  const cover = doc.window.document
    .querySelector('[class="w-full h-80"] > img')
    .src?.replace("https://freemusicarchive.org/image/?file=", "")
    ?.split("&")
    ?.at(0);

  const artistName = doc.window.document.querySelector(
    '[class="font-body mx-auto md:mx-0"]>a'
  ).innerHTML.trim();

  const albumName = doc.window.document
    .querySelector(
      '[class="text-4xl text-center md:text-left inline-flex justify-center gap-2"]'
    )
    .textContent.split('\n').at(1).trim();

  let result = `playlists.set('${artistName} - ${albumName}', [\n`;

  for (const track of tracks ?? []) {
    const data = track.dataset.trackInfo
      ? JSON.parse(track.dataset.trackInfo)
      : {};

    const item = {
      id: data.id,
      cover: baseCoverUrl  + cover,
      album_track: [
        {
          name: data.albumTitle,
          url: ALBUM_URL,
        },
      ],
      artist_track: [
        {
          name: data.artistName,
          url: data.artistUrl,
        },
      ],
      name: data.title,
      path: data.fileUrl,
    };

    result += `${JSON.stringify(item, null, 2)},\n`;
  }

  result += "]);";

  console.log(result);
})();
