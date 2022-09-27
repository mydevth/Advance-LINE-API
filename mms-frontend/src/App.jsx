import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App(){
  return (
    <BrowserRouter basename="mms-frontend">
    <Routes>
      <Route path="/" element={<HomePage />}> </Route>
      <Route path="/updateprofile" element={<UpdateProfilePage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}



export default App;
