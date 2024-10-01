import React from "react";
import Image from "next/image";
import { Typography } from "antd";
import introImg from "@/assets/images/intro.jpg";

const { Title, Paragraph } = Typography;

const SautizetuIntro = () => {
  return (
    <div className="bg-green-500 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src={introImg}
              alt="Sautizetu Platform"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <Title level={2} className="text-white mb-4">
              What is Sautizetu?
            </Title>
            <Paragraph className="text-white text-md">
              Sautizetu is a groundbreaking social justice platform designed to
              empower Kenyan citizens and promote transparency in governance.
              Our name, &quot;Sautizetu,&quot; means &quot;Our Voice&quot; in
              Swahili, embodying our mission to amplify the collective voice of
              the people. We provide a comprehensive suite of tools including
              real-time bill tracking, public forums for discussion, a secure
              whistleblowing system, police brutality reporting, and
              community-driven crowdfunding. By leveraging technology, we aim to
              foster civic engagement, hold leaders accountable, and support
              grassroots movements for positive change in Kenya. Join us in
              building a more just and equitable society, where every voice is
              heard and every action counts.
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SautizetuIntro;
