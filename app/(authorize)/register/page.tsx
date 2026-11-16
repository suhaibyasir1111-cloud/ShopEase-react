"use client";
import type { FormEvent } from "react";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log("status:",response.status);
    console.log(data);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md border rounded-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Register
        </button>
       </form>
    </main>
  );
}