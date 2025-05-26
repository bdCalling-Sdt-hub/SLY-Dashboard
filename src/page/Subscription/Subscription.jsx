import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { FaPlus } from "react-icons/fa";

const demoSubscriptions = [
  {
    id: 1,
    name: "Weekly Plan",
    price: 5.5,
    duration: "weekly",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Monthly Plan",
    price: 20,
    duration: "monthly",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Yearly Plan",
    price: 200,
    duration: "yearly",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState(demoSubscriptions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("weekly");
  const [editId, setEditId] = useState(null);

  // Open modal for add or edit
  const showModal = (edit = false, subscription = null) => {
    setIsEditing(edit);
    setIsModalVisible(true);
    if (edit && subscription) {
      setSubscriptionName(subscription.name);
      setPrice(subscription.price);
      setDescription(subscription.details);
      setDuration(subscription.duration);
      setEditId(subscription.id);
    } else {
      // reset
      setSubscriptionName("");
      setPrice("");
      setDescription("");
      setDuration("weekly");
      setEditId(null);
    }
  };

  // Close modal and reset
  const handleCancel = () => {
    setIsModalVisible(false);
    setSubscriptionName("");
    setPrice("");
    setDescription("");
    setDuration("weekly");
    setEditId(null);
  };

  // Add new subscription
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subscriptionName || !price || !description) {
      message.error("Please fill all fields!");
      return;
    }

    const newSubscription = {
      id: Date.now(), // simple unique id
      name: subscriptionName,
      price: Number(price),
      details: description,
      duration,
    };

    setSubscriptions([newSubscription, ...subscriptions]);
    message.success("Subscription added!");
    handleCancel();
  };

  // Update existing subscription
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!subscriptionName || !price || !description) {
      message.error("Please fill all fields!");
      return;
    }

    const updatedSubscriptions = subscriptions.map((sub) =>
      sub.id === editId
        ? {
            ...sub,
            name: subscriptionName,
            price: Number(price),
            details: description,
            duration,
          }
        : sub
    );

    setSubscriptions(updatedSubscriptions);
    message.success("Subscription updated!");
    handleCancel();
  };

  // Delete subscription
  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    message.success("Subscription deleted!");
  };

  return (
    <section>
      <div className="w-full md:flex justify-end items-center py-6">
        <button
          className="text-xl px-2 md:px-5 py-3 bg-[#0077b5] text-white flex justify-center items-center gap-1 rounded md:mb-0"
          onClick={() => showModal(false)}
        >
          <FaPlus className="text-xl font-semibold text-white" /> Add Subscription
        </button>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
            <div>
              <h2 className="my-5 text-3xl font-semibold text-center">{subscription.name}</h2>
              <p className="text-center text-xl">
                ${subscription.price} / {subscription.duration}
              </p>
              <p className="my-5 px-5 text-base">{subscription.details}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5">
              <button
                onClick={() => handleDelete(subscription.id)}
                className="w-full py-3 px-6 border border-[#0077b5] rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => showModal(true, subscription)}
                className="w-full py-3 px-6 border bg-[#0077b5] text-white rounded-lg"
              >
                Edit Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for add/edit subscription */}
      <Modal
        title={isEditing ? "Edit Subscription" : "Add Subscription"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <span className="block mb-2 font-semibold">Subscription Package Name</span>
            <Input
              placeholder="Enter subscription name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
            />
          </div>

          <div className="my-3">
            <span className="block mb-2 font-semibold">Subscription Duration</span>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="mb-4">
            <span className="block mb-2 font-semibold">Subscription Package Price</span>
            <Input
              placeholder="Enter price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <span className="block mb-2 font-semibold">Subscription Package Details</span>
            <textarea
              className="w-full h-40 border border-gray-300 rounded-md p-2"
              placeholder="Enter subscription description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-[#0077b5] text-white">
            {isEditing ? "Update Subscription" : "Add Subscription"}
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Subscription;
