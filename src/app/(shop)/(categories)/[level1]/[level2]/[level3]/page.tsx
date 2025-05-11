'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../../../components/Breadcrumb';
import { Category } from '../../../../../../lib/types/products/type';
import { Skeleton } from 'antd';

export default function CategoryPageLV3() {
  const params = useParams();
  const level1 = params?.level1 as string;
  const level2 = params?.level2 as string;
  const level3 = params?.level3 as string;

  const [data, setData] = useState<Category | null>(null);
  const [dataLV1, setDataLV1] = useState<Category | null>(null);

  useEffect(() => {
    if (!level3) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(level3);
        const res1 = await productApi.getCategoryBySlug(level1);
        setData(res.data);
        setDataLV1(res1.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu category:', err);
      }
    };

    fetchData();
  }, [level3]);

  // Tạo tiêu đề breadcrumb
  const customTitles = {
    [level1]: dataLV1?.name || '',
    [level2]: data?.parent?.name || '',
    [level3]: data?.name || '',
  };

  return (
    <Skeleton active loading={!data}>
      <div>
        <AntdBreadcrumb slug={[level1, level2, level3]} customTitles={customTitles} />
        <h1 className="text-[#020b27] text-xl font-semibold">{data?.name}</h1>
      </div>
    </Skeleton>
  );
}
