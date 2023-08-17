import React, { useEffect, useState } from 'react';
import './Band.css';
import BandInfo from './BandInfo'; // Import the BandInfo component
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Bands = () => {
  const navigate = useNavigate();
  const [bandsData, setBands] = useState();
  // Dummy band data for demonstration purposes

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/bands', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log(response)
          setBands(response.data)
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
    fetchData();
    console.log(bandsData)
}, []);

  // const bandsData = [
  //   {
  //     id: 1,
  //     name: 'Band A',
  //     genre: 'Rock',
  //     yearFormed: 2005,
  //     members: ['John', 'Mike', 'Sarah'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Band B',
  //     genre: 'Pop',
  //     yearFormed: 2010,
  //     members: ['Alice', 'Bob', 'Tom'],
  //   },
  //   // Add more bands data as needed
  // ];

  const [selectedBand, setSelectedBand] = useState(null);

  const handleBandClick = (band) => {
    navigate('/band/' + band.id);
  };

  return (
    <div className="bands">
      <h2>List of Bands</h2>
      <ul className="band-list">
        {bandsData?.map((band) => (
          <li
            key={band.id}
            className="band-item"
            onClick={() => handleBandClick(band)}
          >
            <h3>{band.name}</h3>
            <p>Website: {band.website}</p>
            <p>Year Formed: {band.formationYear}</p>
          </li>
        ))}
      </ul>
      {/* {selectedBand && <BandInfo band={selectedBand} />} */}
    </div>
  );
}

export default Bands;
