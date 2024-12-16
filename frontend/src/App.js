import {BrowserRouter,Route,Routes} from "react-router-dom"
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Generate from "./pages/Generate";
import Header from "./components/Header";
import Home from "./pages/Home";

import PrivateRoute from './components/PrivateRoute';
import Topics from "./pages/Topics";

function App() {
  return <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route element={<PrivateRoute />}>
    <Route path="/generate" element={<Generate/>}></Route>
    <Route path="/display" element={<Topics/>}/>
          </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
