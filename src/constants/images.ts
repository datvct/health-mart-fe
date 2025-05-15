import BackgroundLogin from '../../public/images/background-login.png';
import FPTLogoSmall from '../../public/images/FPT-logo-small.png';
import SwapIcon from '../../public/images/icon-swap.png';
import FPTIDLogo from '../../public/images/logo-login-fpt.png';
import LongChauLogo from '../../public/images/logo-login-long-chau.png';
import ImageLogo from '../../public/images/logo-long-chau.svg';

import ImageError from '../../public/images/error-page/error_image.svg';

import Banner_1_1_PC from '../../public/images/hero-section/desktop/banner-1/banner-1-1-PC.webp';
import Banner_1_2_PC from '../../public/images/hero-section/desktop/banner-1/banner-1-2-PC.webp';
import Banner_2_1_PC from '../../public/images/hero-section/desktop/banner-2/Banner_web_PC_2_1.webp';
import Banner_2_2_PC from '../../public/images/hero-section/desktop/banner-2/Banner_Web_PC_2_2.jpg';
import Banner_2_3_PC from '../../public/images/hero-section/desktop/banner-2/Banner_Web_PC_2_3.webp';
import Banner_3_1_PC from '../../public/images/hero-section/desktop/banner-3/banner-3-1-PC.webp';
import Banner_3_2_PC from '../../public/images/hero-section/desktop/banner-3/banner-3-2-PC.webp';
import Banner_1_1_MB from '../../public/images/hero-section/mobile/banner-1/Banner_1_1_MB.webp';
import Banner_1_2_MB from '../../public/images/hero-section/mobile/banner-1/Banner_1_2_MB.png';
import Banner_2_1_MB from '../../public/images/hero-section/mobile/banner-2/Banner_MB_2_1.webp';
import Banner_2_2_MB from '../../public/images/hero-section/mobile/banner-2/Banner_MB_2_2.webp';
import Banner_2_3_MB from '../../public/images/hero-section/mobile/banner-2/Banner_MB_2_3.webp';

import Footer_Certificate_1 from '../../public/images/footer/certificate/bo_cong_thuong_a8e5750f57.svg';
import Footer_Certificate_2 from '../../public/images/footer/certificate/DMCA_1_1f84305343.svg';
import Footer_Certificate_3 from '../../public/images/footer/certificate/legit_2_18f407eac4.svg';
import Footer_Connect_1 from '../../public/images/footer/connect-mehtodes/facebook_logo_3152b9bb16.svg';
import Footer_Connect_2 from '../../public/images/footer/connect-mehtodes/Logo_Zalo_979d41d52b.svg';
import Footer_MB from '../../public/images/footer/footer_MB.webp';
import Footer_PC from '../../public/images/footer/footer_PC.jpg';
import Footer_Payment_2 from '../../public/images/footer/payment-methods/momo_ebbd8eb9b0.svg';
import Footer_Payment_1 from '../../public/images/footer/payment-methods/zalopay_884e503cf9.svg';

import PHARMACY_SHOP_3 from '../../public/images/he-thong-cua-hang/duocsi.svg';
import PHARMACY_SHOP_5 from '../../public/images/he-thong-cua-hang/giaohang.svg';
import PHARMACY_SHOP_4 from '../../public/images/he-thong-cua-hang/muale.svg';
import PHARMACY_SHOP_1 from '../../public/images/he-thong-cua-hang/nhathuoc.svg';
import PHARMACY_SHOP_2 from '../../public/images/he-thong-cua-hang/thuoc.svg';
import PHARMACY_SHOP_6 from '../../public/images/he-thong-cua-hang/trahang.svg';

import ImageCartEmpty from '../../public/images/illustration-cart-empty.png';

const IMAGES = {
  ImageLogo,
  BackgroundLogin,
  FPTIDLogo,
  LongChauLogo,
  FPTLogoSmall,
  SwapIcon,
  ImageError,
  ImageCartEmpty,
};

const HEROSECTION = {
  Banner_1_PC: [Banner_1_1_PC, Banner_1_2_PC],
  Banner_2_PC: [Banner_2_1_PC, Banner_2_2_PC, Banner_2_3_PC],
  Banner_3_PC: [Banner_3_1_PC, Banner_3_2_PC],
  Banner_1_MB: [Banner_1_1_MB, Banner_1_2_MB],
  Banner_2_MB: [Banner_2_1_MB, Banner_2_2_MB, Banner_2_3_MB],
};

const FOOTER = {
  Footer_MB,
  Footer_PC,
  Certificate: { Footer_Certificate_1, Footer_Certificate_2, Footer_Certificate_3 },
  Payment: [Footer_Payment_1, Footer_Payment_2],
  Connect: [Footer_Connect_1, Footer_Connect_2],
};

const PHARMACY_SHOP = {
  PHARMACY_SHOP_1,
  PHARMACY_SHOP_2,
  PHARMACY_SHOP_3,
  PHARMACY_SHOP_4,
  PHARMACY_SHOP_5,
  PHARMACY_SHOP_6,
};

export { FOOTER, HEROSECTION, IMAGES, PHARMACY_SHOP };
