import {Link} from 'react-router-dom'
import './NotFound.css'

export const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>This page cannot be found</p>
            <Link to="/home">Back to the home page</Link>
        </div>
     );
}
 
export default NotFound;