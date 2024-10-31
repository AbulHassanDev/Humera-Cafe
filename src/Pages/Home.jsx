// import { Contact } from "lucide-react";
import CoffeeAnimation from "../Components/CoffeeAnimation";
import Header from "../Components/Header";
import Menu from "./Menu";
import Contact from "../Pages/Contact";
import Footer from "../Components/Footer";
import Reviews from "./Reviews";
import Reservation from "./Reservation";
// import Advertisements from "../Components/Advertisements"; // Import the Advertisements component

const Home = () => {
  return (
    <>
      <Header />
      <div id="#" className="h-screen">
        <CoffeeAnimation />
      </div>
      <div id="menu">
        <Menu />
      </div>
      <div id="reservation">
        <Reservation />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="contact">
        <Contact />
      </div>
      {/* <Advertisements/> Include the Advertisements component */}
      <br />
      <hr />
      <Footer />
    </>
  );
};

export default Home;
