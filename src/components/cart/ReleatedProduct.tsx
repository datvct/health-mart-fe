'use client';
import { useEffect, useState } from 'react';
import { productApi } from '../../lib/apis/product';
import { Product } from '../../lib/types/products/type';
import { ProductCard } from '../ProductCard';

const ReleatedProduct = () => {
  const [data, setData] = useState<Product[]>();
  useEffect(() => {
    async function fetchData() {
      const res = await productApi.getList();
      setData(res.data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="w-full flex items-center font-semibold text-heading3">Sản phẩm vừa xem</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
        {data?.slice(0, 6).map((product) => (
          <ProductCard key={product.product_id} data={product} />
        ))}
      </div>{' '}
    </div>
  );
};
export default ReleatedProduct;
