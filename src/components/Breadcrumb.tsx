import { Breadcrumb } from "antd";
import Link from "next/link";

export default function AntdBreadcrumb({
    slug = [],
    customTitles = {},
  }: {
    slug?: string[];
    customTitles?: Record<string, string>;
  }) {
    const breadcrumbItems = [
      {
        title: <Link href="/">Trang chủ</Link>,
      },
      ...slug.map((segment, index) => {
        const href = '/' + slug.slice(0, index + 1).join('/');
        const label = customTitles[segment] ?? decodeURIComponent(segment.replace(/-/g, ' '));
  
        return {
          title: <Link href={href}>{label}</Link>,
        };
      }),
    ];
  
    return <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />;
  }
  