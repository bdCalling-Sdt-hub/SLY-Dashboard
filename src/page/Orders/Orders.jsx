import React from "react";
import { Table, ConfigProvider } from "antd";

const Orders = () => {
  // Demo data
  const orders = [
    {
      id: "1",
      userName: "John Doe",
      productName: "Samsung Galaxy S24",
      payment: "Card",
      amount: 699,
      slyPackage: "Gold",
      city: "New York",
    },
    {
      id: "2",
      userName: "Alice Johnson",
      productName: "iPhone 15 Pro",
      payment: "PayPal",
      amount: 999,
      slyPackage: "Platinum",
      city: "Los Angeles",
    },
    {
      id: "3",
      userName: "Bob Smith",
      productName: "Google Pixel 8",
      payment: "COD",
      amount: 799,
      slyPackage: "Silver",
      city: "Chicago",
    },
  ];

  // Define columns
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "SLY Package",
      dataIndex: "slyPackage",
      key: "slyPackage",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
  ];

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0077b5",
              headerColor: "#fff",
              headerBorderRadius: 4,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Orders;
