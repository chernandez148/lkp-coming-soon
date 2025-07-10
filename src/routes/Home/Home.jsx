import Authors from "../../sections/Authors/Authors";
import Hero from "../../sections/Hero/Hero";
import NewReleases from "../../sections/NewReleases/NewReleases";

function Home() {
  return (
    <main className="Home">
      <Hero />
      <NewReleases />
      <Authors />
    </main>
  );
}

export default Home;
