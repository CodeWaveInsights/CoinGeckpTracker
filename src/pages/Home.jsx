import Banner from "../components/Banner/Banner";
import ErrorBoundary from "../components/ErrorBoundary";
import CoinTable from "../components/CoinTable/CoinTable";
import Navbar from "../components/Navbar/Navbar";
function Home() {
  return (
    <>
    <ErrorBoundary>
    <Navbar />
    </ErrorBoundary>
    
      <Banner />

      <ErrorBoundary>
        <CoinTable />
      </ErrorBoundary>
    </>
  );
}

export default Home;
