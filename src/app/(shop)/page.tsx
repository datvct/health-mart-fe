'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { HeroSection } from '../../components/HeroSection';
import { ProductCard } from '../../components/ProductCard';
import { productApi } from '../../lib/apis/product';
import { Product } from '../../lib/types/products/type';

function Home() {
  const [data, setData] = useState<Product[]>();
  useEffect(() => {
    async function fetchData() {
      const res = await productApi.getList();
      setData(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HeroSection />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
        {data?.map((product) => (
          <ProductCard key={product.product_id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
