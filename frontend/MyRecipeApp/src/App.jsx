import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';//CDN for react-bootstrap
import Home from './components/Home.jsx';
import Index from './components/Index.jsx';
import UserRegister from './components/UserRegister.jsx';
import UserLogin from './components/UserLogin.jsx';
import Category from './components/Category.jsx';
import Navbar from './components/Navbar.jsx';
import SpecRecipe from './components/SpecRecipe.jsx'
import NewRecipe from './components/NewRecipe.jsx'
import './App.css'

function App() {
  const title = '/login'
  return (
    <div className="App">
      <Router>
        <Navbar title={title} />
        <Routes>
          <Route exact path='/index' element={<Index />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<UserRegister />} />
          <Route exact path='/login' element={<UserLogin />} />
          <Route exact path='/newRecipe' element={<NewRecipe />} />
          {/* : for useParams, specCategory is a placeholder for whatever the link will be using */}
          <Route exact path='/recipe/:recipeId' element={<SpecRecipe />} />
          <Route exact path='/categories/:specCategory' element={<Category />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
