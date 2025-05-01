import { Carousel } from 'antd';
import Image from 'next/image';
import { HEROSECTION } from '../constants/images';

const HeroSection = () => {
  return (
    <section>
      <div>
        <div>
          <Carousel arrows infinite={true} className='!hidden md:!block lg:!block xl:!block 2xl:!block'>
            {HEROSECTION.Banner_1_PC.map((bannerSrc, index) => (
              <Image
                key={index}
                src={bannerSrc}
                alt="banner"
                className="object-cover h-[227px] lg:h-[calc(100vw_/_1600_*_284)] xl:h-[284px] w-full"
                height={227}
                width={1028}
              />
            ))}
          </Carousel>
          <Carousel infinite={true} className='!block md:!hidden lg:!hidden xl:!hidden 2xl:!hidden'>
            {HEROSECTION.Banner_1_MB.map((bannerSrc, index) => (
                <Image
                  key={index}
                  src={bannerSrc}
                  alt="banner"
                  className="object-cover h-[calc(100vw_/_375_*_188)] w-full"
                  height={227}
                  width={1028}
                />
              ))}
          </Carousel>
        </div>
        <div className="mt-5 mx-10">
          <div className="flex gap-5 justify-center">
            <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-[805px]">
              <Carousel arrows infinite={true} autoplay={true} className='!hidden md:!block lg:!block xl:!block 2xl:!block'>
                {HEROSECTION.Banner_2_PC.map((bannerSrc, index) => (
                  <Image
                    key={index}
                    src={bannerSrc}
                    alt="banner"
                    className="rounded-2xl"
                    height={246}
                    width={805}
                  />
                ))}
              </Carousel>
              <Carousel arrows infinite={true} autoplay={true} className='!block md:!hidden lg:!hidden xl:!hidden 2xl:!hidden'>
                {HEROSECTION.Banner_2_MB.map((bannerSrc, index) => (
                  <Image
                    key={index}
                    src={bannerSrc}
                    alt="banner"
                    className="rounded-2xl"
                    height={246}
                    width={805}
                  />
                ))}
              </Carousel>
            </div>
            <div className="hidden md:flex lg:flex xl:flex 2xl:flex flex-col justify-between">
              {HEROSECTION.Banner_3_PC.map((bannerSrc, index) => (
                <Image
                  key={index}
                  src={bannerSrc}
                  alt="banner"
                  className="rounded-2xl"
                  height={117}
                  width={399}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
