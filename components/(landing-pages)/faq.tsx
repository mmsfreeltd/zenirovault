'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SITE_NAME } from '@/global/constants';

const faqs = [
  {
    id: 'faq-1',
    question: `How to start trading with ${SITE_NAME}?`,
    answer: (
      <ul className="space-y-2 list-disc pl-5">
        <li>Create an account.</li>
        <li>Confirm your identity and eligibility (KYC).</li>
        <li>
          Fund your {SITE_NAME} account by connecting your digital wallet.
        </li>
        <li>Login and start trading.</li>
      </ul>
    ),
  },
  {
    id: 'faq-2',
    question: 'How to create an account and confirm your email address?',
    answer:
      'Sign up using your email address, then verify your email by clicking the confirmation link sent to your inbox.',
  },
  {
    id: 'faq-3',
    question: 'Confirm your identification and eligibility for trading?',
    answer:
      'Complete the KYC process by submitting valid identification documents to verify your identity and eligibility.',
  },
  {
    id: 'faq-4',
    question: `How do I deposit money and fund my account with ${SITE_NAME}?`,
    answer:
      'You can fund your account using supported cryptocurrencies or payment methods directly from your dashboard.',
  },
  {
    id: 'faq-5',
    question: `Is ${SITE_NAME} a regulated broker?`,
    answer: `${SITE_NAME} operates in compliance with applicable regulations and follows industry-standard security practices.`,
  },
  {
    id: 'faq-6',
    question: `How to withdraw money from ${SITE_NAME}?`,
    answer:
      'Withdrawals can be requested from your dashboard and are processed securely to your connected wallet or bank account.',
  },
];

export default function Faq() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#07061a]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Frequently Asked{' '}
          <span className="bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="mt-16 space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="
                rounded-xl
                bg-gray-50/70 dark:bg-white/5
                border border-gray-200 dark:border-white/10
                backdrop-blur
                px-4
              "
            >
              <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
