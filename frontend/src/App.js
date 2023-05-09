import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SessionForms/SignupForm';  
import ExplorePage from './components/ExplorePage/ExplorePage';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={SplashPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <Route exact path="/explore" component={ExplorePage} />
    </Switch>
    </>
  );
}

export default App;
