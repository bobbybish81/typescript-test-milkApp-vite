import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Product from './routes/Product';
import OrderConfirmation from './routes/OrderConfirmation';
import Footer from './components/Footer';
import IState from './interfaces/IState';
import IResults from './interfaces/IResults';
import './styles/App.scss';

const App = () => {

  const [data, setData] = useState<IState>({
    loading: false,
    results: [] as IResults[],
    errorMessage: '',
  });

  const [query, setQuery] = useState<string>('');

  const search = (data:IResults[]) => {
    return data.filter((product:any) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  const milkTypes = (data:IResults[]) => {
    const allTypes = data.map(product => product.type);
    const types = allTypes.filter((type, index) => {
      return allTypes.indexOf(type) === index;
    });
    return types;
  }

  useEffect(() => {
    setData({...data, loading: true})
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/milkstore');
      try {
        const milkstore = await response.json();
        setData({
          ...data,
          loading: false,
          results: milkstore?.results,
        });
      } catch (error: any) {
        setData({
          ...data,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchData();
  },[])
  
  return (
    <>
      <Header/>
      {data.errorMessage && (<p>{data.errorMessage}</p>)}
      {data.loading && <h1>Loading... </h1>}
        <Routes>
          <Route path='/' element={<Home
            setQuery={setQuery}
            results={search(data?.results)}
            milkTypes={milkTypes(data?.results)}
            />} />
          <Route path={`/:product`} element={<Product results={data?.results}/>} />
          <Route path={`/orderconfirmation`} element={<OrderConfirmation/>} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
