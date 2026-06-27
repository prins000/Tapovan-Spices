import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useInquiry } from './InquiryContext';

export default function FloatingWhatsApp() {
  const { openWhatsApp } = useInquiry();

  const handleClick = () => {
    openWhatsApp(
      "Hello Tapovan Spices,\n\nI am browsing your website and would like to inquire about your spices, pulses, and export catalog. Please connect with me.\n\nThank you."
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center">
      {/* Pulse rings */}
      <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-25" />
      <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-pulse opacity-40" />

      {/* Button */}
      <motion.button
        onClick={handleClick}
        className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center text-white border-none cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>
    </div>
  );
}
