import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { IoHome } from 'react-icons/io5';

export default function AntdBreadcrumb({
  slug = [],
  customTitles = {},
}: {
  slug?: string[];
  customTitles?: Record<string, string>;
}) {
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="!text-[#1250dc]">
          <span className="hidden md:inline-block lg:inline-block xl:inline-block 2xl:inline-block text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
            Trang chủ
          </span>
          <IoHome className="md:hidden mt-1" />
        </Link>
      ),
    },
    ...slug.map((segment, index) => {
      const href = '/' + slug.slice(0, index + 1).join('/');
      const label = customTitles[segment] ?? decodeURIComponent(segment.replace(/-/g, ' '));

      const isLast = index === slug.length - 1;

      return {
        title: isLast ? (
          <span className="text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">{label}</span> // Không phải link, text thường
        ) : (
          <Link
            href={href}
            className="!text-[#1250dc] text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm"
          >
            {label}
          </Link>
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 10 }} />;
}
