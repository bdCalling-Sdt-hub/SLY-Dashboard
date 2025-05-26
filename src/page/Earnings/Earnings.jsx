import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Modal, Pagination } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { jsPDF } from "jspdf";

const demoEarnings = [
  {
    id: "TXN001",
    transactionId: "TXN001",
    currency: "USD",
    amount: 150,
    status: "Completed",
    paymentMethod: "Credit Card",
    updatedAt: "2025-05-20T10:30:00Z",
    userName: "John Doe",
    location: "New York",
    date: "2025-05-20",
  },
  {
    id: "TXN002",
    transactionId: "TXN002",
    currency: "USD",
    amount: 200,
    status: "Completed",
    paymentMethod: "PayPal",
    updatedAt: "2025-05-19T15:20:00Z",
    userName: "Jane Smith",
    location: "Los Angeles",
    date: "2025-05-19",
  },
  {
    id: "TXN003",
    transactionId: "TXN003",
    currency: "EUR",
    amount: 100,
    status: "Completed",
    paymentMethod: "Bank Transfer",
    updatedAt: "2025-05-18T08:45:00Z",
    userName: "Alice Johnson",
    location: "Berlin",
    date: "2025-05-18",
  },
  // add more demo items if needed
];

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Pagination and Filtering
  const [filteredEarnings, setFilteredEarnings] = useState(demoEarnings);

  useEffect(() => {
    let filtered = demoEarnings;

    if (searchText.trim() !== "") {
      filtered = filtered.filter((row) =>
        row.userName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (searchDate.trim() !== "") {
      filtered = filtered.filter(
        (row) => new Date(row.updatedAt).toISOString().split("T")[0] === searchDate
      );
    }

    setFilteredEarnings(filtered);
    setCurrentPage(1); // reset page on filter change
  }, [searchText, searchDate]);

  // Paginated data slice
  const paginatedData = filteredEarnings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    if (selectedTransaction) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Transaction Details", 14, 20);
      doc.setFontSize(12);

      const leftMargin = 10;
      const detailsStartY = 30;

      doc.rect(leftMargin, detailsStartY, 190, 90);
      doc.text(`Transaction ID: #${selectedTransaction.transactionId}`, leftMargin + 6, detailsStartY + 10);
      doc.text(`User Name: ${selectedTransaction.userName}`, leftMargin + 6, detailsStartY + 20);
      doc.text(`Location: ${selectedTransaction.location}`, leftMargin + 6, detailsStartY + 30);
      doc.text(`Date: ${selectedTransaction.date}`, leftMargin + 6, detailsStartY + 40);
      doc.text(`Withdraw Amount: $${selectedTransaction.amount}`, leftMargin + 6, detailsStartY + 50);

      doc.save("transaction-details.pdf");
    }
  };

  return (
    <div className="w-full p-5 overflow-x-auto">
      <div className="w-full md:flex justify-between items-center py-6">
        <h1 className="text-2xl flex items-center">
          <FaAngleLeft /> Earnings
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border text-gray-400 px-4 py-2 rounded-md mr-2"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <input
            type="text"
            className="border text-black px-4 py-2 rounded-md mr-2"
            placeholder="Search by User Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-[#0077b5] text-white w-10 h-10 flex items-center justify-center rounded-md ml-2">
            <IoSearchOutline />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border-[#0077b5] min-w-[1000px]">
        <thead className="bg-[#0077b5]">
          <tr>
            <th className="text-white px-4 py-2 text-left">Transaction ID</th>
            <th className="text-white px-4 py-2 text-left">Currency</th>
            <th className="text-white px-4 py-2 text-left">Amount</th>
            <th className="text-white px-4 py-2 text-left">Status</th>
            <th className="text-white px-4 py-2 text-left">Payment Method</th>
            <th className="text-white px-4 py-2 text-left">Date</th>
            <th className="text-white px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="text-black px-4 py-2">{row.transactionId}</td>
              <td className="text-black px-4 py-2">{row.currency}</td>
              <td className="text-black px-4 py-2">{row.amount}</td>
              <td className="text-black px-4 py-2">Success</td>
              <td className="text-black px-4 py-2">{row.paymentMethod}</td>
              <td className="text-black px-4 py-2">{new Date(row.updatedAt).toLocaleDateString()}</td>
              <td className="text-black px-4 py-2">
                <div onClick={() => showModal(row)} className="cursor-pointer">
                  <HiOutlineDotsHorizontal className="text-2xl font-semibold" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredEarnings.length}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        {selectedTransaction && (
          <div className="text-black">
            <h2 className="text-2xl font-semibold mb-4 text-center">Transaction Details</h2>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Transaction ID:</p>
              <p>{selectedTransaction.transactionId}</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Currency:</p>
              <p>{selectedTransaction.currency}</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Amount:</p>
              <p>{selectedTransaction.amount}</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Status:</p>
              <p>Success</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Payment Method:</p>
              <p>{selectedTransaction.paymentMethod}</p>
            </div>

            {/* button approve and cancle  */}
            <div className="flex justify-between mt-6 gap-2">
              <button className="px-4 w-full rounded py-2 bg-[#b50000] text-white">Approve </button>
              <button className="px-4 w-full rounded py-2 bg-[#0077b5] text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Earnings;
