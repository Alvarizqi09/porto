"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", desc: "(+62) 8132 7963 181" },
  { icon: <FaEnvelope />, title: "Email", desc: "Alvarizki80@gmail.com" },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    desc: "Gunung Pati, Semarang, Indonesia",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message } = formData;
    const mailtoLink = `mailto:Alvarizki80@gmail.com?subject=${encodeURIComponent(
      `Interested about your service`
    )}&body=${encodeURIComponent(
      `Hello, my name is ${firstName} ${lastName}. I am interested in your service. Here are my details:

Email: ${email}
Phone: ${phone}

Message:
${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto mb-10">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="flex-1 flex items-center xl:justify-end order-2 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#DFD3C3] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-black/80">{item.title}</h3>
                      <p className="text-xl">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="xl:w-[54%] order-1 xl:order-none">
            <form
              className="flex flex-col gap-6 p-10 bg-[#DFD3C3] rounded-xl"
              onSubmit={handleSubmit}
            >
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <p className="text-black/80">
                Come contact me if you're interested in working with me
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <Textarea
                className="h-[200px]"
                name="message"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
              />
              <Button size="md" className="max-w-40" type="submit">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
