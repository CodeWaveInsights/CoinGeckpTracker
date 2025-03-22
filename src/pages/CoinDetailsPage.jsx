import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../services/fetchCoinDetails";
import currencyStore from '../state/store'
import parse from "html-react-parser";

function CoinDetailsPage() {
  const { coinId } = useParams();
  const {currency } = currencyStore();

  const { isError, isLoading, data } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => fetchCoinDetails(coinId),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  if (isError) {
    return <div>Error: Something went wrong</div>;
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 w-full flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500">
        <img alt={data?.name} src={data?.image?.large} className="h-52 mb-5" />

        <h1 className="text-4xl font-bold mb-5">{data.name}</h1>
        <p className="w-full">{parse(data?.description?.en)}</p>

        <div className="w-full flex flex-col md:flex-row md:justify-around">
          <div className="flex items-center mb-4 md:mb-0">
            Rank
            <h2 className="text-xl font-bold ">
              <span className="ml-3 text-xl">{data?.market_cap_rank}</span>
            </h2>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-xl text-yellow-300 font-bold ">
              Current Price:
              <span className="ml-3 text-xl text-black">
                {data?.market_data?.current_price[currency] || "N/A"}{" "}
              </span>
            </h2>
          </div>
        </div>
      </div>
   
   <div className="md:w-2/3 w-full p-6">
    Coin Information
   </div>
   
    </div>
    
  );
}

export default CoinDetailsPage;
