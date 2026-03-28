import React from "react";

const RecentBookings = ({ bookings }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
      <h4 className="font-semibold text-gray-800 mb-4">Recent Bookings</h4>
      <div className="space-y-3">
        {bookings.slice(0, 5).map((b) => (
          <div key={b.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-800">{b.user}</div>
              <div className="text-xs text-gray-500">{b.service} • {b.date}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                b.status === "Booked" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
              }`}>
                {b.status}
              </span>
              <span className="text-sm font-semibold text-gray-700">₹{b.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;