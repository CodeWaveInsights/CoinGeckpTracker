import { useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";
// import { CurrencyContext } from "../../context/CurrencyContext";
import currencyStore from "../../state/store";
import { useNavigate } from "react-router-dom";

function CoinTable() {


  const { currency } = currencyStore();
  const [page, setPage] = useState(1);
  const navigate=useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page, currency], // Use `queryKey`
    queryFn: () => fetchCoinData(page, currency), // Use `queryFn`
    // retry: 2,
    // retryDelay: 1000,
    cacheTime: 1000 * 60 * 2,
    staleTime: 100 * 60 * 2,
  });

  function handleCoinRedirect(id){
    navigate(`/details/${id}`);

  
  }

  if (isError) {
    return <div>Error: {error?.message || "An unknown error occurred"}</div>;
  }

  return (
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-5 w-full max-w-[1200px] mx-auto px-4">
        <div className="w-full bg-amber-400 text-black font-semibold text-xl flex py-4 px-2 items-center justify-between">
          {/* Header of the table */}
          <div className="flex-1 text-center">Coin</div>
          <div className="flex-1 text-center">Price</div>
          <div className="flex-1 text-center">24h Change</div>
          <div className="flex-1 text-center">Market Cap</div>
        </div>

        <div className="flex flex-col w-[90%] mx-auto">
          {isLoading && <div>Loading</div>}
          {data &&
            data.map((coin) => {
              return (
                <div
                 onClick={()=>handleCoinRedirect(coin.id)}
                  key={coin.id}
                  className="w-full bg-transparent text-white flex py-4 px-2 font-semibold
              items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-start gap-3 basis-[31%]">
                    <div className="w-[5rem] h-[5rem]">
                      <img src={coin.image} className="w-full h-full" />
                    </div>

                    <div className="flex flex-col text-black">
                      <div className="text-3xl">{coin.name}</div>
                      <div className="text-xl">{coin.symbol}</div>
                    </div>
                  </div>

                  <div className="basis-[25%]  text-black">{coin.high_24h}</div>

                  <div className="basis-[20%]  text-black">
                    {coin.price_change_24h}
                  </div>

                  <div className="basis-[15%]  text-black">
                    {coin.market_cap}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex gap-4 justify-center items-center ">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-primary btn-wide text-green-600 text-2xl "
            type="button"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="btn btn-secondary btn-wide text-green-600 text-2xl "
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CoinTable;
