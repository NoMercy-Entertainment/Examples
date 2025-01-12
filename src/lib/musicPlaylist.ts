import {BasePlaylistItem, musicPlayer} from "@/components/MusicPlayer/musicPlayerStore";

export const fetchPlaylist = async (genre = 'Pop', limit = 1) => {
	const playlist = new Map<string, BasePlaylistItem>();
	const pageSize = 20;
	let page = 1;

	const baseUrl = 'https://api-dev.nomercy.tv/cors?url=';
	musicPlayer.baseUrl = baseUrl;
	const baseCoverUrl = baseUrl +  'https://files.freemusicarchive.org/storage-freemusicarchive-org/';

	while (page <= limit) {
		const url = `https://freemusicarchive.org/genre/${genre}/?pageSize=${pageSize}&page=${page}&sort=_score`;
		const response = await fetch(baseUrl + encodeURIComponent(url));
		const html = await response.text();

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const tracks = Array.from(doc.querySelectorAll<HTMLDivElement>('[data-track-info]'));

		for (const track of tracks ?? []) {
			const data = track.dataset.trackInfo ? JSON.parse(track.dataset.trackInfo) : {};

			const id = data.id;
			const title = data.title;
			const artistName = data.artistName;
			const artistUrl = data.artistUrl;
			const albumTitle = data.albumTitle;
			const playbackUrl = data.playbackUrl;

			const albumUrl = data.url.replace(/(\w)\/\/(\w)/u, '$1/singles/$2');

			const response = await fetch(baseUrl + encodeURIComponent(albumUrl));
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const cover = doc.querySelector<HTMLImageElement>('[class="object-cover h-full w-full"]')?.src?.replace('https://freemusicarchive.org/image/?file=', '/')?.split('&')?.at(0) ;

			const item = {
				id: id,
				cover: baseCoverUrl + cover,
				album_track: [
					{
						name: albumTitle,
						url: albumUrl,
					}
				],
				artist_track: [
					{
						name: artistName,
						url: artistUrl,
					}
				],
				name: title,
				path: baseUrl + playbackUrl,
			};

			playlist.set(id, item);

			if (playlist.size == 1) {
				musicPlayer.playTrack(playlist.get(id)!);
			} else {
				musicPlayer.addToQueue(item);
			}
		}

		page++;
	}

	return playlist;
}