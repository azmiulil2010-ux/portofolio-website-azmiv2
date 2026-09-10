"use client";

import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkedAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    title: "Email",
    value: "azmiulil2010@gmail.com",
    link: "#",
  },
  {
    icon: <FaMapMarkedAlt className="w-6 h-6" />,
    title: "Lokasi",
    value: "Indonesia, Jawa Timur, Kota Pasuruan",
    link: "#",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: <FaInstagram />,
    value: "qzmiuu",
    link: "https://www.instagram.com/qzmiuu/",
  },
  {
    name: "TikTok",
    icon: <FaTiktok />,
    value: "44zmii",
    link: "https://www.tiktok.com/@azmii.hh",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    value: "Azmi Tech",
    link: "https://www.youtube.com/channel/UConwuD3udrqXVXSU_BiB8Jg",
  },
];

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const InputStyles =
    "px-4 py-3.5 my-4 bg-slate-800 outline-none rounded-md w-full text-gray-200 placeholder-gray-400";

  const onSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "07c415b2-a130-4cc9-a8f1-a15685c51146");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      (event.target as HTMLFormElement).reset();
      toast("Form submitted succesfully", {
        style:{
          background:"#4f39f6",
          color:"white"
        }
      })
    } else {
      toast("Error submitting form", {
        style:{
          background:"#4f39f6",
          color:"white"
        }
      })
    }

    setLoading(false);

    console.log(Object.fromEntries(formData.entries()))
  };
  return (
    <section id="contact" className="py-16 lg:py-30">
      <div
        className="w-[90%] md:w-[80%] lg:[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12"
      >
        <div data-aos="fade-right">
          <h2
            className="py-3 text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300"
          >
            Beri Kritik Atau Saran Anda Disini
          </h2>
          <p className="text-gray-400 mb-10 text-base lg:text-lg leading-relaxed">
            Punya pertanyaan, ide, atau ingin bekerja sama? Jangan ragu untuk
            menghubungi saya. Saya siap berdiskusi dan terhubung untuk berbagai
            kesempatan di bidang teknologi dan pengembangan web.
          </p>

          <div className="space-y-5 mg-12">
            {contactInfo.map((items, index) => {
              return (
                <Link
                  href={items.link}
                  key={index}
                  className="group flex item-center gap-4 px-2 py-3 transition-colors hover:bg-white/5 rounded-lg"
                >
                  <div className="h-15 w-15 rounded-full bg-white/5 text-white transition-transform group-hover:scale-105 grid place-items-center">
                    {items.icon}
                  </div>
                  <div className="">
                    <h4 className="text-md font-medium text-white">
                      {items.title}
                    </h4>
                    <p className="text-md text-gray-400">{items.value}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-start gap-5">
            {socialLinks.map((social) => (
              <Link
                href={social.link}
                key={social.name}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                title={social.name}
                className="group flex min-w-24 flex-col items-center gap-2 text-center text-gray-300 transition-all hover:-translate-y-1 hover:text-indigo-400"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-xl transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                  {social.icon}
                </span>
                <span className="text-xs font-medium text-gray-400 group-hover:text-indigo-400">
                  {social.name} : {social.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Form */}
        <div data-aos="zoom-in">
          <form
            onSubmit={onSubmit}
            className="rounded-lg bg-slate-900 px-4 py-8 "
          >
            <input
              type="text"
              placeholder="Your Name"
              className={InputStyles}
              required
              name="name"
            />
            <input
              type="text"
              placeholder="Your Email"
              className={InputStyles}
              required
              name="email"
            />
            <input
              type="text"
              placeholder="Message Destination"
              className={InputStyles}
              required
              name="suject"
            />
            <textarea
              placeholder="Message"
              required
              className={`${InputStyles}resize-none`}
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
        </div>
      </div>
    </section>
  );
}
