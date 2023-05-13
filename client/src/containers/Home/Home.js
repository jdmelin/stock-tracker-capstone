import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserId } from '../../containers/Login/loginSlice';

function Home() {
  const userId = useSelector(selectUserId);

  return (
    <>
      <h1 className="display-4">Welcome to Stock Tracker!</h1>
      <p className="lead">
        Check out some stocks and add them to your favorites.
      </p>
      <hr className="my-4" />
      <Link className="btn btn-primary btn-lg" to={`/stocks/${userId}`}>
        View stocks!
      </Link>
      <Link
        className="btn btn-secondary btn-lg mx-3"
        to={`/my-stocks/${userId}`}
      >
        View your stocks!
      </Link>
    </>
  );
}

export default Home;
