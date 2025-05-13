'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../../components/Breadcrumb';
import { Category } from '../../../../../lib/types/products/type';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryPageLV2() {
  const params = useParams();
  const level1 = params?.level1 as string;
  const level2 = params?.level2 as string;

  const [data, setData] = useState<Category | null>(null);

  useEffect(() => {
    if (!level2) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(level2);
        setData(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu category:', err);
      }
    };

    fetchData();
  }, [level2]);

  return (
    <Skeleton active loading={!data}>
      <div>
        <AntdBreadcrumb
          slug={[level1, level2]}
          customTitles={{ [level1]: data?.parent.name || '', [level2]: data?.name || '' }}
        />
        <h1 className="text-[#020b27] text-xl font-semibold">{data?.name}</h1>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-3">
          {data?.children?.map((childrenLV3, index) => (
            <Link href={`${level2}/${childrenLV3.slug}`} key={index} className="bg-white border border-[#e4e8ed] rounded-xl p-4 flex gap-4">
              <Image
                src={childrenLV3.image || '/placeholder.png'}
                alt={childrenLV3.name || 'Category Image'}
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-bold">{childrenLV3.name}</h2>
                <p className="text-sm text-[#657384]">100 sản phẩm</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Skeleton>
  );
}
