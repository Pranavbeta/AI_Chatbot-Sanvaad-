import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: "What makes Sanvaad different from other AI chatbots?",
    a: "Sanvaad is designed for Gen Z, with trendy features, privacy, and continuous updates based on user feedback.",
  },
  {
    q: "Is my data safe and private?",
    a: "Yes, your data is encrypted and we prioritize your privacy above all else.",
  },
  {
    q: "Can I use Sanvaad on multiple devices?",
    a: "Absolutely! Sanvaad is available on web and mobile platforms.",
  },
  {
    q: "How do I get support?",
    a: "You can reach out to our support team via the app or our website contact form.",
  },
];

const FAQSection = () => (
  <Box sx={{ py: 8, background: "#fff" }}>
    <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ color: "#000" }}>
      Frequently Asked Questions
    </Typography>
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      {faqs.map((faq, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600} sx={{ color: "#000" }}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  </Box>
);

export default FAQSection; 