'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productApi } from '@/lib/apis/product';
import AntdBreadcrumb from '../../../../../../components/Breadcrumb';
import { Category, Product } from '../../../../../../lib/types/products/type';
import { Button, Modal, Skeleton } from 'antd';
import { Filter } from '../../../../../../components/Filter';
import { IoFilter } from 'react-icons/io5';
import { FilterMobile } from '../../../../../../components/FilterMobile';
import { ProductCard } from '../../../../../../components/ProductCard';

export default function CategoryPageLV3() {
  const params = useParams();
  const level1 = params?.level1 as string;
  const level2 = params?.level2 as string;
  const level3 = params?.level3 as string;

  const [data, setData] = useState<Category | null>(null);
  const [dataLV1, setDataLV1] = useState<Category | null>(null);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!level3) return;

    const fetchData = async () => {
      try {
        const res = await productApi.getCategoryBySlug(level3);
        const res1 = await productApi.getCategoryBySlug(level1);
        setData(res.data);
        setDataLV1(res1.data);
        const productRes = await productApi.getProductByCategoryId(res.data?.category_id);
        setListProduct(productRes.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu category:', err);
      }
    };

    fetchData();
  }, [level1, level3]);

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
