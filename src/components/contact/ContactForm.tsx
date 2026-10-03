"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";
import toast from "react-hot-toast";

const inputStyles =
  "contact-input px-4 py-3.5 my-4 bg-slate-800 outline-none rounded-md w-full text-gray-200 placeholder-gray-400";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "07c415b2-a130-4cc9-a8f1-a15685c51146");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      form.reset();
      toast("Form submitted succesfully", {
        style: {
          background: "#4f39f6",
          color: "white",
        },
      });
    } else {
      toast("Error submitting form", {
        style: {
          background: "#4f39f6",
          color: "white",
        },
      });
    }

    setLoading(false);
  };

  return (
    <form
      suppressHydrationWarning
      onSubmit={onSubmit}
      className="contact-form rounded-2xl bg-slate-900 px-4 py-8 "
    >
      <input
        type="text"
        placeholder="Your Name"
        className={inputStyles}
        required
        name="name"
      />
      <input
        type="text"
        placeholder="Your Email"
        className={inputStyles}
        required
        name="email"
      />
      <input
        type="text"
        placeholder="Message Destination"
        className={inputStyles}
        required
        name="subject"
      />
      <textarea
        placeholder="Message"
        required
        className={`${inputStyles}resize-none`}
        rows={5}
        name="message"
      />
      <button className="w-full bg-linear-to-r from-blue-900 to-purple-800 hover:from-blue-800 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? (
          <>
            <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
            Sending...
          </>
        ) : (
          <>
            <LuSend size={20} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
