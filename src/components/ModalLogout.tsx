'use client';

import { Button, Modal } from 'antd';
import Image from 'next/image';
import { IMAGES } from '../constants/images';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal = ({ open, onCancel, onConfirm }: Props) => {
  return (
    <Modal
      open={open}
      centered
      onCancel={onCancel}
      footer={null}
      closeIcon={<span className="text-xl">×</span>}
    >
      <div className="text-center p-4">
        <Image
          src={IMAGES.ImageLogout}
          alt="logout"
          width={120}
          height={120}
          className="mx-auto mb-3"
        />
        <p className="text-lg font-semibold mb-2">Đăng xuất?</p>
        <p className="text-sm text-gray-500 mb-4">
          Bạn sẽ không nhận được đặc quyền riêng dành cho thành viên.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={onCancel}>Đóng</Button>
          <Button type="primary" className="bg-[#165DFF]" onClick={onConfirm}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
