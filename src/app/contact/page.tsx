import ContactForm from '@/components/ContactForm';


export default async function ContactFormPage() {
  // This delay now happens ONCE on the server.
  // This is what makes your loading.tsx appear correctly.
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay for demo

  return <ContactForm />;
}