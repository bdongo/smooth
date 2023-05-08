import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
    </Switch>
    </>
  );
}

export default App;
