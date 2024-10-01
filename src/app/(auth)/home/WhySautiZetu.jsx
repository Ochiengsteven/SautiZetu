"use client";
import React from "react";
import Image from "next/image";
import { Typography, Card } from "antd";
import transparencyImg from "@/assets/images/transparency.jpg";
import civicEngagementImg from "@/assets/images/civic-engagement.jpg";
import accountabilityImg from "@/assets/images/accountability.jpg";
import communitySupportImg from "@/assets/images/community-support.png";

const { Title, Paragraph } = Typography;

const reasons = [
  {
    title: "Transparency",
    description:
      "Real-time tracking of proposed bills and government activities.",
    image: transparencyImg,
  },
  {
    title: "Civic Engagement",
    description:
      "Foster public discussions and educate citizens on important issues.",
    image: civicEngagementImg,
  },
  {
    title: "Accountability",
    description:
      "Secure whistleblowing platform to expose corruption and malpractice.",
    image: accountabilityImg,
  },
  {
    title: "Support",
    description:
      "Crowdfunding feature to support social justice initiatives and affected individuals.",
    image: communitySupportImg,
  },
];

const WhySautiZetu = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <Title level={2} className="text-center text-3xl md:text-4xl mb-4">
          Why SautiZetu?
        </Title>
        <Paragraph className="text-center text-md text-gray-500 mb-12 max-w-3xl mx-auto">
          SautiZetu empowers Kenyan citizens to actively participate in shaping
          their nation&apos;s future. Our platform provides the tools and
          information needed to ensure government accountability, promote social
          justice, and build a stronger, more equitable society.
        </Paragraph>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              hoverable
              className="flex flex-col h-full"
              cover={
                <div className="relative h-48">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              }
            >
              <Card.Meta
                title={<Title level={4}>{reason.title}</Title>}
                description={<Paragraph>{reason.description}</Paragraph>}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhySautiZetu;
