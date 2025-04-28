import { Carousel } from 'antd';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section>
      <div>
        <div>
          <Carousel arrows infinite={true}>
            <div>
              <Image
                src={
                  'https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_full_width_D_1440x256_1_71d9098f44.png'
                }
                alt="banner"
                className="object-cover h-[227px] lg:h-[calc(100vw_/_1600_*_284)] xl:h-[284px] w-full"
                height={227}
                width={1028}
              />
            </div>
            <div>
              <Image
                src={
                  'https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/310325_Banner_Home_1_bf0a1c0ef6.png'
                }
                alt="banner"
                className="object-cover h-[227px] lg:h-[calc(100vw_/_1600_*_284)] xl:h-[284px] w-full"
                height={227}
                width={1028}
              />
            </div>
            <div>
              <Image
                src={
                  'https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_full_width_1_d3a3a4f965.jpg'
                }
                alt="banner"
                className="object-cover h-[227px] lg:h-[calc(100vw_/_1600_*_284)] xl:h-[284px] w-full"
                height={227}
                width={1028}
              />
            </div>
          </Carousel>
        </div>
        <div className="mt-5 mx-10">
          <div className="flex gap-5 justify-center">
            <div className="w-[805px]">
              <Carousel arrows infinite={true} autoplay={true}>
                <div>
                  <Image
                    src={
                      'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/H1_Desktop_805x246_da1e92a7c6.png'
                    }
                    alt="banner"
                    height={246}
                    width={805}
                  />
                </div>
                <div>
                  <Image
                    src={
                      'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_754f67cafc.jpg'
                    }
                    alt="banner"
                    height={246}
                    width={805}
                  />
                </div>
                <div>
                  <Image
                    src={
                      'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_754f67cafc.jpg'
                    }
                    alt="banner"
                    height={246}
                    width={805}
                  />
                </div>
              </Carousel>
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <Image
                src={
                  'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Ung_Thu_1_185705d391.jpg'
                }
                alt="banner"
                height={117}
                width={399}
              />
              <Image
                src={
                  'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Ung_Thu_1_185705d391.jpg'
                }
                alt="banner"
                height={117}
                width={399}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
