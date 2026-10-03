import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkedAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import ContactForm from "./ContactForm";

const contactInfo = [
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    title: "Email",
    value: "azmiulil2010@gmail.com",
    link: "mailto:azmiulil2010@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt className="w-6 h-6" />,
    title: "Lokasi",
    value: "Indonesia, Jawa Timur, Kota Pasuruan",
    link: "https://maps.google.com/?q=Pasuruan,+Jawa+Timur",
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
  return (
    <section className="py-10 lg:py-16">
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

        <div data-aos="zoom-in">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
