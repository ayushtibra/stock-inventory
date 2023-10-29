import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbxDBKTy7X2JG4nC9URX6Rzx5VLaV1n09YlUr8RCnH9T5hLXexdcFExaldzoPSRXjH4x/exec?path=stock');
      const data = await response.json();
      if (data.length > 0) {
        setLoading(false);
        setProducts(data);
      } else {
        setLoading(false);
        setProducts('No products found')
      }
    }

    fetchProducts();

    const intervalId = setInterval(fetchProducts, 30 * 60 * 1000);
    return () => clearInterval(intervalId);

  }, [])


  return (
    <>
      <Navbar />
      <div className="bg-white h-screen">
        {loading ? <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          wrapperClassName=""
          visible={true}
        /> : (
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products?.map((product) => (
                <a key={product?.ProductID} href='#' className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product?.Image}
                      alt={product?.Name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product?.Name}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">₹{product?.Price}</p>
                  <p className="mt-1 text-base font-medium text-green-700">Quantity: {product?.Quantity}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>

  )
}
