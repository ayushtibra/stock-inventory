import Navbar from '@/components/navbar'
import Search from '@/components/search';
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';

const productsData = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]
export default function Home() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts]: any = useState([]);
  const [searchItem, setSearchItem] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbxDBKTy7X2JG4nC9URX6Rzx5VLaV1n09YlUr8RCnH9T5hLXexdcFExaldzoPSRXjH4x/exec?path=stock');
      const data = await response.json();
      if (data.length > 0) {
        setLoading(false);
        setProducts(data);
        setFilteredProducts(data)
      } else {
        setLoading(false);
        setProducts([])
        setFilteredProducts([])
      }
    }

    fetchProducts();

    const intervalId = setInterval(fetchProducts, 30 * 60 * 1000);
    return () => clearInterval(intervalId);

  }, [])

  useEffect(() => {
    const filteredItems = products.filter((product) =>
      product.Name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredProducts(filteredItems);
  }, [searchItem])

  const handleChange = (value: any) => {
    console.log('first', value.target.value)
    setSearchItem(value.target.value)
  }

  console.log('first', filteredProducts)

  return (
    <>
      <Navbar searchItem={searchItem} handleChange={handleChange} />
      <div className="bg-white h-screen">
        {/* <Search  /> */}

        {loading ? <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          visible={true}
        /> : (
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts?.length > 0 ? filteredProducts?.map((product: any) => (
                <a key={product?.ProductID} href='#' className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product?.Image}
                      alt={product?.Name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700 text-center">{product?.Name}</h3>
                  <table className="table-fixed w-full text-center mt-2">
                    <thead>
                      <tr>
                        <th className='font-normal'>Size</th>
                        <th className='font-normal'>Price</th>
                        <th className='font-normal'>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='font-medium text-sm'>S</td>
                        <td className='font-medium text-sm'>₹{product?.PriceS}</td>
                        <td className='font-medium text-sm text-green-700'>{product?.QuantityS || 'Not in stock'}</td>
                      </tr>
                      <tr>
                        <td className='font-medium text-sm'>M</td>
                        <td className='font-medium text-sm'>₹{product?.PriceM}</td>
                        <td className='font-medium text-sm text-green-700'>{product?.QuantityM || 'Not in stock'}</td>
                      </tr>
                      <tr>
                        <td className='font-medium text-sm'>L</td>
                        <td className='font-medium text-sm'>₹{product?.PriceL}</td>
                        <td className='font-medium text-sm text-green-700'>{product.QuantityL || 'Not in stock'}</td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              )) : (
                <p className='text-center'> No Products Found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>

  )
}
