import { Link } from 'react-router-dom';

const NotSignedIn = () => {
  return (
    <section>
      You're not signed in. <Link to='/'>Click here</Link>.
    </section>
  );
};

export default NotSignedIn;
