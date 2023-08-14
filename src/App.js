import './App.css';
import {auth} from './firebase'
import Home from './components/Home';
import SignIn from './components/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth'

function App() {
  const [user] = useAuthState(auth)
  return (
  <>
    {user ? <Home /> : <SignIn />}
  </>
  );
}

export default App;
