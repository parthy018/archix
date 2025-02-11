import React, { useState } from "react";

const Message = () => {
  // Simulating data fetching from an API
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      message:
        "I am interested in your architectural services. Please let me know how to proceed further and if there are any details or documents required from my side. Looking forward to your response!",
      date: "2025-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      message: "Looking forward to collaborating!",
      date: "2024-12-31",
    },
  ]);

  // State to track which message is expanded
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Toggle function to expand/collapse the message
  const toggleMessage = (id) => {
    setExpandedMessageId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Contact Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left text-sm font-medium">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Message</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr
                key={msg.id}
                className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{msg.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{msg.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{msg.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                  {/* Message Preview */}
                  {expandedMessageId === msg.id ? (
                    <div>
                      {msg.message}
                      <button
                        className="text-blue-500 underline ml-2"
                        onClick={() => toggleMessage(msg.id)}
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <div>
                      {msg.message.slice(0, 100)}...
                      <button
                        className="text-blue-500 underline ml-2"
                        onClick={() => toggleMessage(msg.id)}
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{msg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Message;
