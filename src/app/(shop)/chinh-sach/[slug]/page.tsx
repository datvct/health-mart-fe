// app/chinh-sach/[slug]/page.tsx
import { policyApi } from '@/lib/apis/policy';
import clsx from 'clsx';
import Link from 'next/link';
import { Policy } from '../../../../lib/types/policies/type';

interface PageProps {
  params: { slug: string };
}

export default async function ChinhSachPage({ params: { slug } }: PageProps) {
  const policies = await policyApi.getListPolicy();
  const selectedPolicy =
    policies.find((p: Policy) => p.slug === slug) ||
    (policies[0] ? policies[0] : null);

  if (!selectedPolicy) {
    return (
      <div className="container mx-auto p-4">
        Không có dữ liệu chính sách.
      </div>
    );
  }

  return (
    <>
      {/* Full-width grey breadcrumb */}
      <div className="w-full bg-[#edf0f3]">
        <div className="max-w-[1725px] mx-auto px-4">
          <nav className="py-3">
            <ol className="flex space-x-1 items-center text-sm text-gray-600">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li className="text-gray-800 font-medium truncate">
                {selectedPolicy.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Container chứa danh mục và nội dung */}
      <div className="w-full py-10 bg-white rounded-2xl">
        <div className="max-w-[1680px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar với border bo tròn và icon ba gạch */}
            <aside className="w-full md:w-64">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Tiêu đề */}
                <div className="bg-white px-4 py-3 flex items-center text-gray-700 border-b">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="font-semibold">Bài viết trong danh mục</span>
                </div>

                {/* Danh sách bài viết */}
                <ul className="text-sm">
                  {policies.map((policy: Policy) => {
                    console.log('policy', policy);
                    return (
                      <li key={policy.slug}>
                        <Link
                          href={`/chinh-sach/${policy.slug}`}
                          className={clsx(
                            'block px-4 py-3 transition-colors rounded-md',
                            {
                              'bg-[#e6efff] text-black font-semibold': policy.slug === slug, // Active
                              'hover:bg-[#e6efff] hover:text-[#1d3b6f] text-gray-700': policy.slug !== slug, // Hover
                            }
                          )}
                        >
                          {policy.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>



            {/* Nội dung */}
            <main className="flex-1 p-6 bg-white">
              <h1 className="text-2xl font-bold mb-4">
                {selectedPolicy.title}
              </h1>
              <div
                className="prose max-w-none text-gray-800 text-sm"
                dangerouslySetInnerHTML={{ __html: selectedPolicy.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
