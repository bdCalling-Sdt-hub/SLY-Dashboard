import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

// Demo users data
const demoUsers = [
  {
    id: "1",
    fullName: "John Doe",
    accountID: "ACC12345",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    address_line1: "123 Main St",
    createdAt: "2024-05-15T10:00:00Z",
    image: { url: "/images/john.jpg" },
    status: "active",
    gender: "male",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    accountID: "ACC67890",
    email: "jane.smith@example.com",
    phoneNumber: "0987654321",
    address_line1: "456 Oak Ave",
    createdAt: "2024-04-12T08:30:00Z",
    image: { url: "/images/jane.jpg" },
    status: "inactive",
    gender: "female",
  },
  {
    id: "3",
    fullName: "Alice Johnson",
    accountID: "ACC54321",
    email: "alice.johnson@example.com",
    phoneNumber: "5551234567",
    address_line1: "789 Pine Rd",
    createdAt: "2024-03-20T15:45:00Z",
    image: { url: "/images/alice.jpg" },
    status: "active",
    gender: "female",
  },
  {
    id: "4",
    fullName: "Bob Williams",
    accountID: "ACC98765",
    email: "bob.williams@example.com",
    phoneNumber: "4449876543",
    address_line1: "321 Cedar Blvd",
    createdAt: "2024-02-10T12:15:00Z",
    image: { url: "/images/bob.jpg" },
    status: "active",
    gender: "male",
  },
  // Add more demo users as needed
];

const { Item } = Form;

const Users = () => {
  // Replace API data with demo data
  const allUsers = demoUsers;

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]); // Store filtered data

  // Format users for table display
  useEffect(() => {
    if (allUsers) {
      const formattedUsers = allUsers.map((user, index) => ({
        id: user.id || user._id,
        si: index + 1,
        fullName: user.fullName,
        accountID: user.accountID,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address_line1: user.address_line1,
        createdAt: user.createdAt,
        imageUrl: user.image?.url,
        status: user.status,
        gender: user.gender,
      }));
      setDataSource(formattedUsers);
    }
  }, [allUsers]);

  // Search Filter
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(allUsers || []);
    } else {
      setDataSource(
        allUsers.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phoneNumber).includes(searchText)
        ) || []
      );
    }
  }, [searchText, allUsers]);

  // Date Filter
  useEffect(() => {
    if (!selectedDate) {
      setDataSource(allUsers || []);
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        allUsers.filter(
          (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
        ) || []
      );
    }
  }, [selectedDate, allUsers]);

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/users/${record.id}`}>
          <GoInfo className="text-2xl" />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> Users List
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#92b8c0]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
              allowClear
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </Item>
          <Item>
            <button
              type="button"
              className="size-8 rounded-full flex justify-center items-center bg-[#92b8c0] text-black"
              onClick={() => { }}
              aria-label="Search"
            >
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

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
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={false}
        />
      </ConfigProvider>
    </section>
  );
};

export default Users;
