"use client";

import { Table, Modal } from "antd";
import { useState } from "react";
import { getEvidenceFile } from "./actions";
import Image from "next/image";

const WhistleblowerList = ({ reports }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = async (reportId, fileIndex) => {
    const result = await getEvidenceFile(reportId, fileIndex);
    if (result.success) {
      setSelectedFile(result.file);
      setModalVisible(true);
    } else {
      console.error(result.error);
    }
  };

  const renderEvidenceFiles = (evidence, reportId) => {
    return evidence.map((file, index) => (
      <div
        key={index}
        onClick={() => handleFileClick(reportId, index)}
        style={{ cursor: "pointer" }}
      >
        {file.filename}
      </div>
    ));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Reported By",
      dataIndex: ["reporter", "name"],
      key: "reporter",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Evidence",
      dataIndex: "evidence",
      key: "evidence",
      render: (evidence, record) => renderEvidenceFiles(evidence, record.id),
    },
  ];

  return (
    <>
      <Table
        dataSource={reports}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedFile && (
          <div>
            <h3>{selectedFile.filename}</h3>
            {selectedFile.mimeType.startsWith("image/") && (
              <Image
                src={`data:${selectedFile.mimeType};base64,${selectedFile.data}`}
                alt={selectedFile.filename}
                style={{ maxWidth: "100%" }}
              />
            )}
            {selectedFile.mimeType === "application/pdf" && (
              <iframe
                src={`data:${selectedFile.mimeType};base64,${selectedFile.data}`}
                width="100%"
                height="500px"
              />
            )}
            {selectedFile.mimeType.startsWith("video/") && (
              <video controls width="100%">
                <source
                  src={`data:${selectedFile.mimeType};base64,${selectedFile.data}`}
                  type={selectedFile.mimeType}
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default WhistleblowerList;
