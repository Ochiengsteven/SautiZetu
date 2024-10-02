"use client";
import React from "react";
import { Card, Row, Col } from "antd";
import Image from "next/image";

// Import your images here
import billTrackingImg from "@/assets/images/bill-tracking.jpg";
import forumImg from "@/assets/images/forum.jpg";
import whistleblowerImg from "@/assets/images/whistleblower.jpg";
import policeReportImg from "@/assets/images/police-report.jpg";
import crowdfundImg from "@/assets/images/crowdfund.jpg";
import dataVisualizationImg from "@/assets/images/data-visualization.png";

const features = [
  {
    title: "Bill Tracking",
    description:
      "Stay informed about proposed laws in real-time. View and track updates on bills in the Kenyan parliament.",
    image: billTrackingImg,
  },
  {
    title: "Discussion Forums",
    description:
      "Engage in meaningful discussions about proposed laws and their potential impact on citizens.",
    image: forumImg,
  },
  {
    title: "Whistleblower Platform",
    description:
      "Anonymously report illegal government activities with evidence. Reports are verified before public release.",
    image: whistleblowerImg,
  },
  {
    title: "Police Brutality Reporting",
    description:
      "Report incidents of police brutality and illegal abductions, especially during legal protests.",
    image: policeReportImg,
  },
  {
    title: "Social Justice Crowdfunding",
    description:
      "Centralized crowdfunding platform for social justice causes, with multiple signatories and transparent contribution tracking.",
    image: crowdfundImg,
  },
  {
    title: "Data Visualization",
    description:
      "Visualize complex data and trends related to bills, reports, and crowdfunding campaigns for better understanding.",
    image: dataVisualizationImg,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Platform Features
        </h2>
        <Row gutter={[24, 24]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                className="h-full flex flex-col"
                cover={
                  <div className="h-48 relative">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      style={{ objectFit: "cover" }} // Use style instead of objectFit
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                  }
                  description={
                    <p className="text-gray-600">{feature.description}</p>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Features;
