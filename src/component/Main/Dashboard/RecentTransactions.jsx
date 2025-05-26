import { ConfigProvider, Table, Pagination, Space, message, Modal } from "antd";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
// Removed API hooks imports since using demo data

const demoRecentUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "user",
    createdAt: "2024-05-15T10:00:00Z",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "admin",
    createdAt: "2024-04-12T08:30:00Z",
  },
  {
    id: "3",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    role: "user",
    createdAt: "2024-03-20T15:45:00Z",
  },
  {
    id: "4",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    role: "user",
    createdAt: "2024-02-10T12:15:00Z",
  },
  {
    id: "5",
    firstName: "Mary",
    lastName: "Brown",
    email: "mary.brown@example.com",
    role: "moderator",
    createdAt: "2024-01-25T09:00:00Z",
  },
  {
    id: "6",
    firstName: "James",
    lastName: "Davis",
    email: "james.davis@example.com",
    role: "user",
    createdAt: "2023-12-05T17:20:00Z",
  },
  {
    id: "7",
    firstName: "Patricia",
    lastName: "Miller",
    email: "patricia.miller@example.com",
    role: "user",
    createdAt: "2023-11-11T13:10:00Z",
  },
  {
    id: "8",
    firstName: "Michael",
    lastName: "Wilson",
    email: "michael.wilson@example.com",
    role: "user",
    createdAt: "2023-10-01T11:00:00Z",
  },
];

const RecentTransactions = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Using demo data here
  const recentUsers = demoRecentUsers;

  // Modal open
  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Filter users by search text (name)
  const filteredData = recentUsers.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const matchesText = fullName.includes(searchText.toLowerCase());
    // Skip date filtering since no date picker UI is implemented here
    return matchesText;
  });

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Add serial number and key
  const dataSource = paginatedData.map((user, index) => ({
    ...user,
    key: user.id || index,
    si: (currentPage - 1) * pageSize + index + 1,
  }));

  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      align: "center",
    },
    {
      title: "User Name",
      key: "userName",
      align: "center",
      render: (_, record) => `${record.firstName || ""} ${record.lastName || ""}`.trim(),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "joinDate",
      align: "center",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex flex-row justify-center">
          <button onClick={() => viewDetails(record)}>
            <IoEyeOutline className="text-2xl" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg p-5">
      <div className="flex items-center justify-between flex-wrap my-6">
        <h1 className="text-2xl flex items-center">Recent User</h1>
      </div>

      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0077b5",
              headerColor: "#fff",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 500 }}
          className="text-center"
        />
      </ConfigProvider>

      {/* Pagination */}
      <div className="flex justify-center my-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          pageSizeOptions={["6", "10", "20", "50"]}
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        />
      </div>

      {/* User Details Modal */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-10">User Details</h2>
            <p className="flex items-center justify-between my-5">
              <strong>Name:</strong> {`${selectedUser.firstName || ""} ${selectedUser.lastName || ""}`.trim()}
            </p>
            <p className="flex items-center justify-between my-5">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="flex items-center justify-between my-5">
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p className="flex items-center justify-between my-5">
              <strong>Join Date:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentTransactions;
