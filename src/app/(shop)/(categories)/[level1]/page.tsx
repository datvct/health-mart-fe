'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../components/Breadcrumb';
import { Category, Product } from '../../../../lib/types/products/type';
import { Button, Modal, Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from '../../../../components/Filter';
import { ProductCard } from '../../../../components/ProductCard';
import { FilterMobile } from '../../../../components/FilterMobile';
import { IoFilter } from 'react-icons/io5';

export default function CategoryPageLV1() {
  const params = useParams();
  const slug = params?.level1 as string;
  const router = useRouter();

  const [data, setData] = useState<Category | null>(null);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<Record<number, number>>({});
  const [visibleCount, setVisibleCount] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(listProduct)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(slug);
        setData(res.data);

        const productRes = await productApi.getProductByCategoryId(res.data?.category_id);
        setListProduct(productRes.data);
        if (res.data?.children?.length) {
          const totals: Record<number, number> = {};
          await Promise.all(
            res.data.children.map(async (child: { category_id: number }) => {
              const productRes = await productApi.getProductByCategoryId(child.category_id);
              totals[child.category_id] = productRes.data.length;
            }),
          );
          setCategoryTotals(totals);
        }
      } catch {
        router.replace('/not-found');
      }
    };

    fetchData();
  }, [router, slug]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <Skeleton active loading={!data}>
      <div className="pt-4">
        <AntdBreadcrumb slug={[slug]} customTitles={{ [slug]: data?.name || '' }} />
        <h1 className="text-[#020b27] text-xl font-semibold">{data?.name}</h1>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3">
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
                  <p className="text-center text-sm text-[#657384]">
                    {categoryTotals[childrenLV2.category_id] || 0} sản phẩm
                  </p>
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
      <div className="mt-4 flex gap-5">
        <Filter />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-[#020b27] font-semibold">Danh sách sản phẩm</h2>
            <div className="flex items-center gap-2 justify-between w-full">
              <p className="text-sm text-[#020b27]">Sắp xếp theo:</p>
              <div className="flex items-center divide-x divide-stroke-disable overflow-x-auto whitespace-nowrap scrollbar-none sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden gap-2 w-2/3">
                <Button className="border-[#1250dc] text-[#1250dc]">Bán chạy</Button>
                <Button className="">Giá cao</Button>
                <Button className="">Giá thấp</Button>
              </div>
              <div className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex gap-2">
                <Button className="rounded-xl border-[#1250dc] text-[#1250dc]">Bán chạy</Button>
                <Button className="rounded-xl">Giá cao</Button>
                <Button className="rounded-xl">Giá thấp</Button>
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
