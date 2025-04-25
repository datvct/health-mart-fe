import { Category } from '../../types/';

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Thực phẩm chức năng', 
    slug: 'thuc-pham-chuc-nang',
    subCategories: [
      { id: '1-1', name: 'Vitamin & Khoáng chất', slug: '#' },
      { id: '1-2', name: 'Sinh lý - Nội tiết tố', slug: '#' },
      { id: '1-3', name: 'Cải thiện tăng cường chức năng', slug: '#' },
      { id: '1-4', name: 'Hỗ trợ điều trị', slug: '#' },
      { id: '1-5', name: 'Hỗ trợ tiêu hóa', slug: '#' },
      { id: '1-6', name: 'Thần kinh não', slug: '#' },
    ]
  },
  { 
    id: '2', 
    name: 'Dược mỹ phẩm', 
    slug: 'duoc-my-pham',
    subCategories: [
      { id: '2-1', name: 'Chăm sóc da mặt', slug: '#' },
      { id: '2-2', name: 'Chăm sóc cơ thể', slug: '#' },
      { id: '2-3', name: 'Chăm sóc tóc', slug: '#' },
    ]
  },
  { 
    id: '3', 
    name: 'Thuốc', 
    slug: 'thuoc',
    subCategories: [
      { id: '3-1', name: 'Thuốc kê đơn', slug: '#' },
      { id: '3-2', name: 'Thuốc không kê đơn', slug: '#' },
    ]
  },
  { 
    id: '4', 
    name: 'Chăm sóc cá nhân', 
    slug: 'cham-soc-ca-nhan',
    subCategories: [
      { id: '4-1', name: 'Vệ sinh cá nhân', slug: '#' },
      { id: '4-2', name: 'Chăm sóc răng miệng', slug: '#' },
      { id: '4-3', name: 'Chăm sóc cơ thể', slug: '#' },
    ]
  },
  { 
    id: '5', 
    name: 'Thiết bị y tế', 
    slug: 'thiet-bi-y-te',
    subCategories: [
      { id: '5-1', name: 'Máy đo huyết áp', slug: '#' },
      { id: '5-2', name: 'Máy đo đường huyết', slug: '#' },
      { id: '5-3', name: 'Nhiệt kế', slug: 'nhiet-ke' },
    ]
  },
  { id: '6', name: 'Hệ thống nhà thuốc', slug: '#' },
];