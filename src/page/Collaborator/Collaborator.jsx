import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { AiFillCrown } from "react-icons/ai";

const { Item } = Form;

// Demo data for collaborators with isWinner flag
const demoCollaborators = [
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
    isWinner: true,
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
    isWinner: false,
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
    isWinner: true,
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
    isWinner: false,
  },
  // Add more as needed...
];

const Collaborator = () => {
  // Use demo data
  const allUsers = demoCollaborators;

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [winners, setWinners] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleWinners = () => {
    setWinners(!winners);
  };

  // Format users for table and apply winner filter
  useEffect(() => {
    let filteredUsers = allUsers;

    if (winners) {
      filteredUsers = filteredUsers.filter((user) => user.isWinner);
    }

    // Apply search filter
    if (searchText.trim() !== "") {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          String(user.phoneNumber).includes(searchText)
      );
    }

    // Apply date filter
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      filteredUsers = filteredUsers.filter(
        (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
      );
    }

    // Format for table display
    const formattedUsers = filteredUsers.map((user, index) => ({
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
      isWinner: user.isWinner,
    }));

    setDataSource(formattedUsers);
  }, [allUsers, winners, searchText, selectedDate]);

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.isWinner ? (
          <span className="text-white bg-red-600 px-2 py-1 rounded flex items-center gap-1">
            Winners <AiFillCrown />
          </span>
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/collaborator/${record.id}`}>
          <GoInfo className="text-2xl" />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> Past Bid User List
        </Link>
        <Form layout="inline" className="flex items-center space-x-4">
          <div>
            <button
              onClick={handleWinners}
              className={`rounded-full px-4 py-2 flex items-center gap-2 text-base ${
                winners ? "bg-red-600 text-white" : "bg-gray-300 text-black"
              }`}
            >
              Winners <AiFillCrown />
            </button>
          </div>
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
              headerBg: "#00659a",
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

export default Collaborator;
