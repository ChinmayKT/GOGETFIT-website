"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

function Field({
  label,
  error,
  icon: Icon,
  children,
}: {
  label: string;
  error?: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-silver-dim uppercase">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-primary/70 transition-colors duration-300 [&:has(+_input:focus)]:text-primary [&:has(+_textarea:focus)]:text-primary"
        />
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs text-primary-soft"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "glass w-full rounded-2xl bg-transparent py-3.5 pr-4 pl-11 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[--primary] focus:shadow-[0_0_0_1px_var(--primary),0_0_20px_rgba(255,106,0,0.15)]";

/**
 * "Get Appointment" — matches the reference field set exactly: Name + Email
 * side by side, Phone full width, Message, Submit. Wire onSubmit to a real
 * endpoint when one exists; currently logs and shows the success state.
 */
export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Wire to your CRM / API route here.
    await new Promise((r) => setTimeout(r, 900));
    console.info("Appointment request:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong flex flex-col items-center gap-3 rounded-[24px] p-10 text-center"
      >
        <CheckCircle2 size={40} className="text-primary" />
        <h3 className="headline text-2xl text-white">Thank you!</h3>
        <p className="max-w-sm text-sm text-silver-dim">
          Our GOGETFIT team will contact you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass-strong rounded-[24px] border border-white/10 p-6 shadow-[0_0_60px_-20px_rgba(255,106,0,0.12)] lg:p-7"
    >
      <h3 className="headline text-xl text-white">Get Appointment</h3>
      <div className="mt-1.5 mb-5 h-0.5 w-8 rounded-full bg-primary" />

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" error={errors.name?.message} icon={User}>
            <input
              {...register("name")}
              placeholder="Full Name"
              className={inputCls}
              autoComplete="name"
            />
          </Field>
          <Field label="Email Address" error={errors.email?.message} icon={Mail}>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className={inputCls}
              autoComplete="email"
            />
          </Field>
        </div>

        <Field label="Phone No." error={errors.phone?.message} icon={Phone}>
          <input
            {...register("phone")}
            placeholder="Phone No."
            className={inputCls}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field label="Message" error={errors.message?.message} icon={MessageSquare}>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Message..."
            className={cn(inputCls, "resize-none pt-3.5")}
          />
        </Field>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="glass-sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold tracking-wide text-white uppercase shadow-[0_0_32px_var(--glow-orange)] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            "Submit Now"
          )}
        </motion.button>
      </div>
    </form>
  );
}
