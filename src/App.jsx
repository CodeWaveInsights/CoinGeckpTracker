import { useState } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import CoinTable from './components/CoinTable/CoinTable.Jsx'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar/Navbar'

function App() {

  const [currency, setCurrency]=useState('usd');

  return (
    <>
    {currency}
       <Navbar setCurrency={setCurrency}/>
       <Banner/>

       <ErrorBoundary>
       <CoinTable currency={currency}/>
       </ErrorBoundary>
    
   
    </>
  )
}

export default App
