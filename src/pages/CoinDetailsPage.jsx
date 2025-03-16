import { useParams } from "react-router-dom";

function CoinDetailsPage(){

    const {coinId} =useParams();

    return(

     <>
          <h1>Coin Details Page {coinId}</h1>
     </>

    )
}

export default CoinDetailsPage;