const {Pool} = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }


  async getPlaylistSongsByPlaylistId(id) {
    const queryPlaylist = {
      text: `SELECT id, name
      FROM playlists
      WHERE id = $1`,
      values: [id],
    };
    const queryPlaylistSongs = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlist_songs
      LEFT JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };

    const playlist = await this._pool.query(queryPlaylist);
    const playlistSongs = await this._pool.query(queryPlaylistSongs);

    return {playlist: {
      ...playlist.rows[0],
      songs: playlistSongs.rows,
    }};
  }
}

module.exports = PlaylistsService;
