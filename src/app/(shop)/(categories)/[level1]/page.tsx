'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../components/Breadcrumb';
import { Category } from '../../../../lib/types/products/type';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryPageLV1() {
  const params = useParams();
  const slug = params?.level1 as string;

  const [data, setData] = useState<Category | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(slug);
        setData(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu category:', err);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <Skeleton active loading={!data}>
      <div>
        <AntdBreadcrumb slug={[slug]} customTitles={{ [slug]: data?.name || '' }} />
        <h1 className="text-[#020b27] text-xl font-semibold">{data?.name}</h1>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-3">
          {data?.children?.map((childrenLV2, index) => (
            <div key={index} className="bg-white border border-[#e4e8ed] rounded-xl p-4 flex gap-4">
              <Link
                href={`${data.slug}/${childrenLV2.slug}`}
                className="border-r border-[#e4e8ed] flex flex-col justify-center items-center gap-4 w-1/3 pr-4"
              >
                <Image
                  src={childrenLV2.image || '/placeholder.png'}
                  alt={childrenLV2.name || 'Category Image'}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-center text-sm font-bold">{childrenLV2.name}</h2>
                  <p className="text-center text-sm text-[#657384]">141 sản phẩm</p>
                </div>
              </Link>
              <div className="flex flex-col w-2/3 justify-center">
                {childrenLV2?.children?.map((childrenLV3, index) => (
                  <Link href={`${data.slug}/${childrenLV2.slug}/${childrenLV3.slug}`} key={index}>
                    <span className="text-sm text-[#1250dc] font-semibold hover:underline underline-offset-4">
                      {childrenLV3.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Skeleton>
  );
}
