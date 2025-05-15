'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../../../../components/Breadcrumb';
import { Category, Product } from '../../../../../../../lib/types/products/type';
import { Skeleton } from 'antd';

export default function CategoryPageLV3() {
  const params = useParams();
  const level1 = params?.level1 as string;
  const level2 = params?.level2 as string;
  const level3 = params?.level3 as string;
  const productSlug = params?.productSlug as string;

  const [dataLV3, setDataLV3] = useState<Category | null>(null);
  const [dataLV2, setDataLV2] = useState<Category | null>(null);
  const [dataLV1, setDataLV1] = useState<Category | null>(null);
  const [data, setData] = useState<Product | null>(null);

  useEffect(() => {
    if (!level3) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getProductBySlug(productSlug);
        const res1 = await productApi.getCategoryBySlug(level1);
        const res2 = await productApi.getCategoryBySlug(level2);
        const res3 = await productApi.getCategoryBySlug(level3);
        setData(res.data);
        setDataLV1(res1.data);
        setDataLV2(res2.data);
        setDataLV3(res3.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu product:', err);
      }
    };

    fetchData();
  }, [level1, level2, level3, productSlug]);

  //   Tạo tiêu đề breadcrumb
  const customTitles = {
    [level1]: dataLV1?.name || '',
    [level2]: dataLV2?.name || '',
    [level3]: dataLV3?.name || '',
    [productSlug]: data?.name || '',
  };

  return (
    <Skeleton active loading={!data}>
      <div>
        <AntdBreadcrumb slug={[level1, level2, level3, productSlug]} customTitles={customTitles} />
        <h1 className="text-[#020b27] text-xl font-semibold">{data?.name}</h1>
      </div>
    </Skeleton>
  );
}
