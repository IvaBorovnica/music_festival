import './Concerts.css';
import { useParams } from 'react-router-dom'

const ConcertInfo = () => {
    const {id} = useParams();
    return ( 
        <div className="concert-info">
            { id }
        </div>
     );
}
 
export default ConcertInfo;