
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  orderId: number;
  currentStatus: string;
};

const statuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updateStatus = async (
    newStatus: string
  ) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Update failed");
        return;
      }

      setStatus(newStatus);
      setMessage("Status updated successfully");
      router.refresh();

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select
        value={status}
        disabled={loading}
        onChange={(e) => updateStatus(e.target.value)}
        className="border rounded-lg p-2 bg-white"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {loading && (
        <p className="text-sm text-gray-500 mt-1">
          Updating...
        </p>
      )}

      {message && (
        <p className="text-xs mt-1 text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}
