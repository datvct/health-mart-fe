'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../../components/Breadcrumb';
import { Category, Product } from '../../../../../lib/types/products/type';
import { Button, Modal, Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from '../../../../../components/Filter';
import { IoFilter } from 'react-icons/io5';
import { FilterMobile } from '../../../../../components/FilterMobile';
import { ProductCard } from '../../../../../components/ProductCard';

export default function CategoryPageLV2() {
  const params = useParams();
  const level1 = params?.level1 as string;
  const level2 = params?.level2 as string;
  const router = useRouter();

  const [data, setData] = useState<Category | null>(null);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<Record<number, number>>({});
  const [visibleCount, setVisibleCount] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort'); // "order_desc_price" | "order_asc_price" | null

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  useEffect(() => {
    if (!level2) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(level2);
        setData(res.data);

        const filters: Record<string, any> = {};
        searchParams.forEach((value, key) => {
          if (filters[key]) {
            // nếu đã có thì convert thành array (multi-values)
            filters[key] = Array.isArray(filters[key])
              ? [...filters[key], value]
              : [filters[key], value];
          } else {
            filters[key] = value;
          }
        });

        const productRes = await productApi.getProductByCategoryId(res.data?.category_id, filters);
        setListProduct(productRes.data);
        const totals: Record<number, number> = {};

        await Promise.all(
          res.data.children.map(async (category: { category_id: number }) => {
            const productRes = await productApi.getProductByCategoryId(category.category_id);
            totals[category.category_id] = productRes.data.length;
          }),
        );

        setCategoryTotals(totals);
      } catch {
        router.replace('/not-found');
      }
    };

    fetchData();
  }, [level2, router, searchParams]);

  const handleSortChange = (sortValue: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('sort', sortValue);
    router.push(`?${current.toString()}`);
  };

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
            <Link
              href={`${level2}/${childrenLV3.slug}`}
              key={index}
              className="bg-white border border-[#e4e8ed] rounded-xl p-4 flex gap-4"
            >
              <Image
                src={childrenLV3.image || '/placeholder.png'}
                alt={childrenLV3.name || 'Category Image'}
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-bold">{childrenLV3.name}</h2>
                <p className="text-sm text-[#657384]">
                  {categoryTotals[childrenLV3.category_id] || 0} sản phẩm
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-5">
        <Filter />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-[#020b27] font-semibold">Danh sách sản phẩm</h2>
            <div className="flex items-center gap-2 justify-between w-full">
              <p className="text-sm text-[#020b27]">Sắp xếp theo:</p>
              <div className="flex items-center divide-x divide-stroke-disable overflow-x-auto whitespace-nowrap scrollbar-none sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden gap-2 w-2/3">
                <Button
                  className={sort === 'order_desc_price' ? 'border-[#1250dc] text-[#1250dc]' : ''}
                  onClick={() => handleSortChange('order_desc_price')}
                >
                  Giá cao
                </Button>
                <Button
                  className={sort === 'order_asc_price' ? 'border-[#1250dc] text-[#1250dc]' : ''}
                  onClick={() => handleSortChange('order_asc_price')}
                >
                  Giá thấp
                </Button>
              </div>
              <div className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex gap-2">
                <Button
                  className={
                    sort === 'order_desc_price'
                      ? 'rounded-xl border-[#1250dc] text-[#1250dc]'
                      : 'rounded-xl'
                  }
                  onClick={() => handleSortChange('order_desc_price')}
                >
                  Giá cao
                </Button>
                <Button
                  className={
                    sort === 'order_asc_price'
                      ? 'rounded-xl border-[#1250dc] text-[#1250dc]'
                      : 'rounded-xl'
                  }
                  onClick={() => handleSortChange('order_asc_price')}
                >
                  Giá thấp
                </Button>
              </div>
            </div>
            <Button
              type="primary"
              onClick={showModal}
              className="block md:hidden lg:hidden xl:hidden 2xl:hidden"
            >
              <IoFilter />
            </Button>
            <Modal
              title="Bộ lọc nâng cao"
              okText="Filter"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FilterMobile />
            </Modal>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
            {listProduct?.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.product_id} data={product} />
            ))}
          </div>
          {visibleCount < listProduct.length && (
            <div className="mt-4 text-center flex justify-center items-center w-full">
              <Button className="rounded-xl" onClick={handleShowMore}>
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </div>
    </Skeleton>
  );
}
