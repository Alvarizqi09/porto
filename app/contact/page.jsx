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
import { Item } from "@radix-ui/react-select";
const info = [
  { icon: <FaPhoneAlt />, title: "Phone", desc: "(+62) 8132 7963 181" },
  { icon: <FaEnvelope />, title: "Email", desc: "Alvarizki80@gmail.com" },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    desc: "Gunung Pati,Semarang,Indonesia",
  },
];

const contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let`s work together</h3>
              <p className="text-white/60">
                Come contact me if you interest to work with me
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="firstname" placeholder="First Name" />
                <Input type="lastname" placeholder="Last Name" />
                <Input type="email" placeholder="Email Address" />
                <Input type="phone" placeholder="Phone Number" />
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Service"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select A service</SelectLabel>
                    <SelectItem value="est">Web Development</SelectItem>
                    <SelectItem value="mst">UI Design</SelectItem>
                    <SelectItem value="cst">Graphic Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                className="h-[200px]"
                placeholder="Type your message here"
              ></Textarea>
              <Button size="md" className="mac-w-40">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
          <ul className="flex flex-col gap-10">
            {info.map((Item, index) => {
              return (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{Item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white/60">{Item.title}</h3>
                    <p className="text-xl">{Item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default contact;
