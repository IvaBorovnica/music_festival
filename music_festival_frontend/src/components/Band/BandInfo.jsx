import React, { useState } from 'react';
import './Band.css';
import { useParams } from 'react-router-dom'

const BandInfo = () => {
  const {id} = useParams();
  // const [newSongName, setNewSongName] = useState('');
  // const [newSongGenre, setNewSongGenre] = useState('');
  // const [songs, setSongs] = useState(band.songs);

  // const handleBuyTicket = () => {
  //   // Replace this with the logic to handle buying a ticket, e.g., redirect to a ticket purchasing page
  //   console.log(`Buying ticket for ${band.name}`);
  // };

  // const handleAddSong = () => {
  //   if (newSongName && newSongGenre) {
  //     const newSong = {
  //       id: songs?.length + 1,
  //       name: newSongName,
  //       genre: newSongGenre,
  //     };
  //     setSongs([...songs, newSong]);
  //     setNewSongName('');
  //     setNewSongGenre('');
  //   }
  // };

  return (
    <div className="band-info">
      {/* <h2>{band.name}</h2>
      <p>Genre: {band.genre}</p>
      <p>Year Formed: {band.yearFormed}</p>
      <p>Members: {band.members.join(', ')}</p>
      <h3>Songs</h3>
      <ul className="song-list">
        {songs?.map((song) => (
          <li key={song.id} className="song-item">
            <strong>{song.name}</strong> - {song.genre}
          </li>
        ))}
      </ul>
      <div className="add-song">
        <h3>Add a New Song</h3>
        <div className="form-group">
          <label htmlFor="newSongName">Name:</label>
          <input
            type="text"
            id="newSongName"
            name="newSongName"
            value={newSongName}
            onChange={(e) => setNewSongName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newSongGenre">Genre:</label>
          <input
            type="text"
            id="newSongGenre"
            name="newSongGenre"
            value={newSongGenre}
            onChange={(e) => setNewSongGenre(e.target.value)}
          />
        </div>
        <button>Add Song</button>
      </div> */}
      { id }
    </div>
  );
}

export default BandInfo;
