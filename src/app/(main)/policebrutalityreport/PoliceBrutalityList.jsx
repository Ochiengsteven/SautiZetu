"use client";

import { Card, Row, Col, Typography } from "antd";
import { format } from "date-fns";

const { Text } = Typography;

const PoliceBrutalityList = ({ reports }) => {
  return (
    <Row gutter={[16, 16]}>
      {reports.map((report) => (
        <Col xs={24} sm={12} md={8} lg={6} key={report.id}>
          <Card
            title={`Incident on ${format(new Date(report.date), "dd/MM/yyyy")}`} // {format(new Date(report.date), "dd/MM/yyyy")}
            extra={<Text type="secondary">{report.status}</Text>}
          >
            <p>
              <strong>Location:</strong> {report.location}
            </p>
            <p>
              <strong>Description:</strong> {report.description}
            </p>
            <p>
              <strong>Reported by:</strong> {report.reporter.username}
            </p>
            <p>
              <strong>Evidence:</strong> {report.evidence.length} file(s)
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PoliceBrutalityList;
