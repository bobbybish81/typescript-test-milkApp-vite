import { useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IResults from '../interfaces/IResults';
import Slider from '@mui/material/Slider';
import { MdArrowBackIos } from 'react-icons/md';
import milkImg from '../assets/milkImg.png';
import '../styles/Product.scss';

interface ProductProps {
  results: IResults[];
}

const Product = ({ results } : ProductProps) => {

  const param = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
  })

  return (
    <main className='container-xl' style={{minHeight: '100vh'}}>
      <section className='product-container'>
        {results.filter(product => product.name === param.product).map((product, index) => {
          return (
            <article key={index} className='product-article'>
              <div
                className='back-arrow'
                onClick={()=> navigate(-1)}>
                <MdArrowBackIos/>
                <p>Back</p>
              </div>
              <div className='product'>
                <div className='product-img'>
                  <img className='product-milk-img'
                    src={milkImg}
                    alt='milkImg'/>
                </div>
                <div className='product-detail'>
                  <p className='product-text'>{product.name}</p>
                  <p className='product-text'>{product.type}</p>
                  <p className='product-text'>{`${product.storage} Liters`}</p>
                  <div className='slider'>
                    <Slider
                      defaultValue={1}
                      aria-label='Default'
                      valueLabelDisplay='auto'
                      color='secondary'/>
                  </div>
                  <button
                    className='order-btn'
                    onClick={()=> navigate('/orderconfirmation')}>Order</button>
                </div>
              </div>
            </article>
            )
          })}
      </section>
    </main>
  )
}

export default Product