"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", desc: "(+62) 8132 7963 181" },
  { icon: <FaEnvelope />, title: "Email", desc: "Alvarizqi80@gmail.com" },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    desc: "Purwokerto, Jawa Tengah, Indonesia",
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
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("Contact");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("errorMessage"));
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      className="py-6 mb-16"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
          {/* Contact Info List */}
          <div className="flex-1 w-full xl:max-w-md order-2 xl:order-none">
            <ul className="flex flex-col gap-4 w-full">
              {info.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-5 p-5 glass-card bg-[#FEFCF6]/85 border border-foreground/15 rounded-2xl shadow-sm hover:shadow-nature hover:border-primary/40 transition-all duration-300 text-left"
                >
                  <div className="w-13 h-13 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0 shadow-sm text-xl">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-foreground/50 font-semibold font-display uppercase tracking-wider text-xs mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-base xl:text-lg font-bold font-display text-foreground truncate">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Whimsical note card */}
            <div className="mt-8 p-6 glass-card bg-[#FEFCF6]/70 border border-foreground/10 rounded-3xl text-foreground/75 text-sm leading-relaxed font-display">
              <div className="flex items-center gap-2 font-bold text-foreground mb-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Direct Mailbox</span>
              </div>
              <p>
                Whether you have an adventurous project idea, a curious question, or simply want to say hello like a passing breeze, my inbox is always open.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xl:w-[58%] w-full order-1 xl:order-none">
            <form
              className="flex flex-col gap-6 p-8 xl:p-10 glass-card bg-[#FEFCF6]/90 border border-foreground/15 rounded-3xl shadow-nature-xl text-left"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-primary" />
                  <span>Send a Message</span>
                </span>
                <h3 className="text-3xl xl:text-4xl font-bold font-display text-foreground">
                  {t("title")}
                </h3>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
              </div>
              <p className="text-foreground/75 leading-relaxed text-sm xl:text-base">
                {t("description")}
              </p>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-4 bg-primary/15 border border-primary/30 text-foreground rounded-2xl font-display font-semibold text-sm shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>{t("successMessage")}</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-100/80 border border-red-300 text-red-800 rounded-2xl font-display font-semibold text-sm shadow-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder={t("firstName")}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder={t("lastName")}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder={t("emailAddress")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder={t("phoneNumber")}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <Textarea
                name="message"
                placeholder={t("message")}
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button
                size="lg"
                className="self-start rounded-full shadow-nature hover:shadow-glow"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? t("submitting") : t("sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
