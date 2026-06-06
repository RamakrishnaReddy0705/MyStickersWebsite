import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
Header
function App() {
  const navigation=useNavigation();
  navigation.state
  return(
    <div>
      
      <Header></Header>
       {
        navigation.state==="loading"?(
          <div className="d-flex align-items-center justify-content-center min-vh-100
">
            <span className="fs-1 fw-semibold text-primary  text-dark">Loading...</span>
            </div>
        ):(<Outlet/>)
       }
     
      <Footer></Footer>
    </div>
    
  );
}

export default App
