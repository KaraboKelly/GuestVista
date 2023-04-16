import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import AdminLogin from './AdminLogin'
import DashboardOverview from './Dashboard/DashboardOverview'
import GuestHouses from './Dashboard/GuestHouses'
import Bookings from './Dashboard/Bookings'
import MySideNav from './MySideNav';
import GuesthouseList from './components/GuesthouseList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router >
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/mysidenav' element={<MySideNav />} />
      <Route path='/dashboard-overview' element={<DashboardOverview />} />
      <Route path='/guest-houses' element={<GuestHouses />} />
      <Route path='/bookings' element={<Bookings />} />
      <Route path='/guesthouselist' element={<GuesthouseList />} />

    </Routes>
  </Router>


//
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
