import Banner from "../../components/Banner/Banner";
import Hero from "../../sections/Hero/Hero";
import NewReleases from "../../sections/NewReleases/NewReleases";
import TopSellers from "../../sections/TopSellers/TopSellers";

import BackgroundImage from "../../assets/images/login-bg.png";

function Home() {
  return (
    <main className="Home">
      <Hero />
      <TopSellers />
      <NewReleases />
    </main>
  );
}

export default Home;
