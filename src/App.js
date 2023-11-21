import './App.css';
import LocationDetails from './components/LocationDetails'
import Home from './components/Home'
import SearchResultDetails from './components/SearchResultDetails'
import { HashRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="">
       <HashRouter>
            <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/details' element={<LocationDetails/>}/>
               <Route path='/searchresult' element={<SearchResultDetails/>}/>
            </Routes>
       </HashRouter>
      

    </div>
  );
}

export default App;
