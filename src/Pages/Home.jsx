// import { Contact } from "lucide-react";
import CoffeeAnimation from "../Components/CoffeeAnimation";
import Header from "../Components/Header";
import Menu from "./Menu";
import Contact  from '../Pages/Contact'
// import Footer from "../Components/Footer";
// import Advertisements from "../Components/Advertisements"; // Import the Advertisements component

const Home = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <CoffeeAnimation />
      </div>
      <div>
        <Menu />
      </div>
      <Contact/>
      {/* <Advertisements/> Include the Advertisements component */}







    {/* <Footer/> */}
    </>
  );
}

export default Home;
