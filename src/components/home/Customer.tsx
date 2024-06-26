'use client';

import { Button } from '@nextui-org/react';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bankImages } from '@/lib/bankImages';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PartnerType } from '@/constants/types/homeType';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Customer = () => {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}partner/getAllApprovePartner`)
      .then((response) => {
        setPartners(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-7 items-center justify-center bg-[#F3F3F3] pb-16 pl-80 pr-80 pt-24 text-black">
      {/* 1 */}
      <div className="col-span-2 flex flex-col">
        <h1 className="mb-12 border-l-8 border-[#ff0004] p-5 text-2xl font-bold">
          KHÁCH HÀNG CỦA CHÚNG TÔI
        </h1>
        <p className="text-[16px] italic">
          Theo phân loại của chúng tôi, kinh tế Việt Nam đang được vận hành với
          14 lĩnh vực ngành kinh doanh. Điều đáng tự hào của BASICO là bạn có
          thể tìm thấy trong cơ sở khách hàng phong phú của chúng tôi những
          thương hiệu dẫn đầu trong hầu hết lĩnh vực, ngành kinh doanh. Đó là
          những doanh nghiệp đầu ngành, mang lại niềm tự hào cho kinh tế Việt
          Nam. Còn chúng tôi tự hào vì BASICO được họ lựa chọn với tư cách hãng
          luật duy nhất phục vụ toàn diện, gắn kết chiến lược trên con đường
          phát triển…
        </p>
        <Button
          className="flex items-center justify-start bg-[#F3F3F3] p-0 text-[16px] text-[#FF0004] hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => router.push('/about/ourClients')}
        >
          <h2>XEM THÊM</h2>
          <FontAwesomeIcon icon={faChevronCircleRight} className="size-4" />
        </Button>
      </div>

      {/* 2 */}
      <div className="col-span-5 grid grid-cols-5 gap-10 ">
        {partners.slice(0, 15).map((partner, index) => (
          <div
            key={index}
            className="relative h-[144px] w-[141px] bg-white pb-6 pt-6"
          >
            <div>
              <Image
                alt={partner.name}
                src={partner?.avatar}
                width={141.5}
                height={144.33}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
