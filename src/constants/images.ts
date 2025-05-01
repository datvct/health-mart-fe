import BackgroundLogin from '../../public/images/background-login.png';
import FPTLogoSmall from '../../public/images/FPT-logo-small.png';
import IconLoudSpeaker from '../../public/images/icon-loudspeaker.svg';
import SwapIcon from '../../public/images/icon-swap.png';
import ImageIconChungNhan from '../../public/images/iconchungnhan.png';
import ImageIconChungNhan2 from '../../public/images/iconchungnhan2.png';
import ImageHeader from '../../public/images/header/image-header.png';
import FPTIDLogo from '../../public/images/logo-login-fpt.png';
import LongChauLogo from '../../public/images/logo-login-long-chau.png';
import ImageLogo from '../../public/images/logo-long-chau.svg';
import ImageError from '../../public/images/error-page/error_image.svg';

import ImageMomo from '../../public/images/momo.png';
import ImageZaloPay from '../../public/images/zalopay.png';

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

import Footer_MB from '../../public/images/footer/footer_MB.webp';
import Footer_PC from '../../public/images/footer/footer_PC.jpg';
import Footer_Certificate_1 from '../../public/images/footer/certificate/bo_cong_thuong_a8e5750f57.svg';
import Footer_Certificate_2 from '../../public/images/footer/certificate/DMCA_1_1f84305343.svg';
import Footer_Certificate_3 from '../../public/images/footer/certificate/legit_2_18f407eac4.svg';

const IMAGES = {
  ImageHeader,
  IconLoudSpeaker,
  ImageLogo,
  BackgroundLogin,
  FPTIDLogo,
  LongChauLogo,
  FPTLogoSmall,
  SwapIcon,
  ImageMomo,
  ImageIconChungNhan,
  ImageIconChungNhan2,
  ImageZaloPay,
  ImageError,
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
  Certificate: [Footer_Certificate_1, Footer_Certificate_2, Footer_Certificate_3],
};

export { IMAGES, HEROSECTION, FOOTER };
