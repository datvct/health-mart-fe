import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default function AntdBreadcrumb({
  slug = [],
  customTitles = {},
}: {
  slug?: string[];
  customTitles?: Record<string, string>;
}) {
  const breadcrumbItems = [
    {
      title: <Link href="/" className='!text-[#1250dc]'>Trang chủ</Link>,
    },
    ...slug.map((segment, index) => {
      const href = '/' + slug.slice(0, index + 1).join('/');
      const label = customTitles[segment] ?? decodeURIComponent(segment.replace(/-/g, ' '));

      const isLast = index === slug.length - 1;

      return {
        title: isLast ? (
          <span>{label}</span> // Không phải link, text thường
        ) : (
          <Link href={href} className='!text-[#1250dc]'>
            {label}
          </Link>
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />;
}
