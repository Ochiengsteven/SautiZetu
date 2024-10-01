"use client";
import React from "react";
import { Card, Row, Col } from "antd";
import imapactImg from "@/assets/images/impact.jpg";
import participateImg from "@/assets/images/participate.jpg";
import signupImg from "@/assets/images/signup.png";
import Image from "next/image";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account to join our community of change-makers. Verify your email to unlock full platform features.",
    image: signupImg,
  },
  {
    title: "Participate",
    description:
      "Engage in forums, report issues, or contribute to crowdfunding campaigns. Your voice matters in shaping a better future.",
    image: participateImg,
  },
  {
    title: "Make an Impact",
    description:
      "See the real-world changes your actions create. From policy shifts to community support, your participation drives positive change.",
    image: imapactImg,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <Row gutter={[16, 16]} justify="center">
          {steps.map((step, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                className="text-center h-full overflow-hidden"
                cover={
                  <div className="h-48 relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  }
                  description={
                    <p className="text-gray-600">{step.description}</p>
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

export default HowItWorks;
