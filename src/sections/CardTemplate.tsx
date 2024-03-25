import { CardTemplate } from "@/constants/types/homeType";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import Link from "next/link";

const CardTemplate = ({ itemDetail }: CardTemplate) => {
  return (
    <Card className="py-4 pb-9">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Link
          href={{
            pathname: "/form",
            query: { name: itemDetail?.name },
          }}
        >
          <Button className="" color="primary" radius="full" size="sm">
            Chỉnh sửa
          </Button>
        </Link>
        <a href={itemDetail?.url}>
          <Button className="" color="primary" radius="full" size="sm">
            Download
          </Button>
        </a>
        <h4 className="font-bold text-large">{itemDetail?.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default CardTemplate;
