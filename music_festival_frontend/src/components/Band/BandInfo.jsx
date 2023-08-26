import React, { useEffect, useState } from 'react';
import './BandInfo.css';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Setlist from '../Concerts/Setlist';

const BandInfo = ({ role }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [band, setBand] = useState();
  const [songs, setSongs] = useState();
  const [title, setTitle] = useState();
  const [length, setLength] = useState();
  const [setlist, setSetlist] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {

    const fetchInfo = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/bands/' + id, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log(response)
          setBand(response.data)
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
  const fetchSongs = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/bands/' + id + '/songs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        setSongs(response.data)
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
const fetchBand = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/v1/bands/' + id, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      console.log(response)
      setBand(response.data)
  } catch (error) {
      console.error('Login failed:', error);
      throw error;
  }
}
    fetchInfo();
    fetchSongs();
    fetchBand();
    console.log(songs)
}, []);



  function addSong(){
    const newSongData = {
      title,
      length,
      band: {
        id
      }
    };
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Set the token as a header in the Axios request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios with the token in the headers
    axios.post('http://localhost:8080/api/v1/songs', newSongData, config)
      .then((response) => {
        // Handle the successful addition here, such as displaying a success message or redirecting to another page
        console.log('Band added successfully!', response.data);

        // Redirect to '/bands' upon successful addition
        // window.location.href = '/bands';
      })
      .catch((error) => {
        // Handle addition errors here, such as displaying an error message
        console.error('Failed to add band:', error);
      });
  }

  const [location, setLocation] = useState();
  const [date, setDate] = useState(); // Renamed "time" to "date" for clarity
  const [time, setTime] = useState();

  function addConcert(){
    const formattedDateTime = new Date(`${date}T${time}:00`).toISOString();

    const newConcertData = {
      location: location,
      time: formattedDateTime, // Use the formatted date and time here
      band: {
        id
      },
      price,
      setlist: setlist.map((setlistSong) => setlistSong.song)
    };
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Set the token as a header in the Axios request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios with the token in the headers
    axios.post('http://localhost:8080/api/v1/concerts', newConcertData, config)
      .then((response) => {
        // Handle the successful addition here, such as displaying a success message or redirecting to another page
        console.log('Band added successfully!', response.data);

        // Redirect to '/bands' upon successful addition
        // window.location.href = '/bands';
      })
      .catch((error) => {
        // Handle addition errors here, such as displaying an error message
        console.error('Failed to add band:', error);
      });
  }

  return (
    <div className="band-info">
      <h1>{band?.name}</h1>
      <h3>Website: {band?.website}</h3>
      <h3>Formation year: {band?.formationYear}</h3>
      <h3>Songs</h3>
      {songs?.map((song) => (
        <div>{song.title} ({song.length})</div>
      ))}
      {role === 'ADMIN' && <><div className="input-box">
        <label >Title</label>
        <input type="text" onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div className="input-box">
        <label >Length</label>
        <input type="text" onChange={(event) => setLength(event.target.value)}/>
      </div>
      <button onClick={() => addSong()}>Add</button></>}
      
      {role === 'ORGANIZER' && <><h3>Concerts</h3>
      <div className="input-box">
      </div><div className="input-box">
        <label >Location</label>
        <input type="text" onChange={(event) => setLocation(event.target.value)}/>
        <label>Date</label>
        <input type="date" id="date" onChange={(event) => setDate(event.target.value)} />
        <label>Time</label>
        <input type="time" id="time" onChange={(event) => setTime(event.target.value)} />
        <label>Price</label>
        <input type="number" id="price" onChange={(event) => setPrice(event.target.value)} />
      </div><button onClick={() => addConcert()}>Add</button>
      
      <Setlist band={band} songs={songs} setSetlist={setSetlist} setlist={setlist}/></>}
    </div>
  );
}

export default BandInfo;
