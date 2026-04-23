import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import { increment, decrement } from './redux/counterSlice';
import Homepage from './pages/Homepage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import GoogleHandler from './components/GoogleHandler';
import Product from './components/Dashboard/Product';
import Cart from './pages/Cart';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Wishlist from './pages/Wishlist';

export default function App() {

  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.count);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/google/callback" element={<GoogleHandler />} />

         <Route element={<PrivateRoute allowrole={['user', 'admin']} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/men" element={<CategoryPage categoryName="men" />} />
          <Route path="/women" element={<CategoryPage categoryName="women" />} />
          <Route path="/kids" element={<CategoryPage categoryName="kids" />} />
        </Route>

        <Route element={<PrivateRoute allowrole={['admin', 'user']} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

//NOTE keywords in react-redux and @reduxtoolkit
//actions => actions are the javascript object which have type and payload property

//reducers => takes the previous state and returns new state

//useDispatch
//createSlice => it generally a function which manages the reducers and actions

//store => store is like a container which have all the state we are using in our project

//initialState => initial value of the some value which is going to change

//useSelector
//provider
