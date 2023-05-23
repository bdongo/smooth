import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SessionForms/SignupForm';  
import ExplorePage from './components/ExplorePage/ExplorePage';
import EventShow from './components/EventShow/EventShow';
import ReviewForm from './components/ReviewForm/ReviewForm';
import UpdateForm from './components/UpdateForm/UpdateForm';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './components/Search/SearchBar';
import SearchResults from './components/Search/SearchResults';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Footer from './components/Footer/Footer';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [itineraryOpen, setItineraryOpen] = useState(false);

  const openItinerary = () => {
    const itinerary = document.querySelector('.itinerary');
    itinerary.style.translate = '0%';
    setItineraryOpen(true);
  }

  const closeItinerary = () => {
    const itinerary = document.querySelector('.itinerary');
    itinerary.style.translate = '100%';
    setItineraryOpen(false);
  }

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar itineraryOpen={itineraryOpen} setItineraryOpen={setItineraryOpen} openItinerary={openItinerary} closeItinerary={closeItinerary}/>
    <Switch>
      <Route exact path="/" component={SplashPage} />
        <Route path='/newReview' component={ReviewForm} />
        <Route path='/updateReview' component={UpdateForm} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <Route exact path="/profile" >
          <ProfilePage openItinerary={openItinerary}/>
      </Route>
      <Route path="/search">
        {/* <SearchBar></SearchBar> */}
          <SearchResults itineraryOpen={itineraryOpen} openItinerary={openItinerary} />
      </Route>
      <Route exact path="/explore" >
        <ExplorePage />
      </Route>

      <Route exact path="/event/:id" component={EventShow} />

    </Switch>
    <Footer />  
    </>
  );
}

export default App;
