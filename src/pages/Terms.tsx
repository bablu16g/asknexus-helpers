
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: May 1, 2025
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            Welcome to AskNexus. These Terms of Service ("Terms") govern your access to and use of the AskNexus website, mobile application, and services (collectively, the "Services"). Please read these Terms carefully before using our Services.
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between you and AskNexus Educational Technologies, Inc. ("AskNexus," "we," "us," or "our").
          </p>

          <h2>2. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. If we make changes, we will provide notice by, for example, posting the updated Terms on our website and updating the "Last Updated" date above. Your continued use of the Services after any changes indicates your agreement to the modified Terms.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To use certain features of the Services, you may be required to register for an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
          </p>
          <p>
            You agree not to create an account if we have previously removed you or banned you from our Services. We reserve the right to suspend or terminate your account if you violate these Terms.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to use the Services to:
          </p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Infringe the rights of others, including intellectual property rights</li>
            <li>Post or transmit harmful, offensive, or inappropriate content</li>
            <li>Submit academic questions for the purpose of cheating on exams or graded assignments</li>
            <li>Impersonate any person or entity</li>
            <li>Engage in any activity that interferes with or disrupts the Services</li>
            <li>Attempt to gain unauthorized access to the Services or related systems</li>
            <li>Use the Services for any commercial purpose without our explicit permission</li>
          </ul>

          <h2>5. Academic Honor Code</h2>
          <p>
            AskNexus is designed to provide educational assistance and tutoring. Users agree to:
          </p>
          <ul>
            <li>Use our Services responsibly and in accordance with their institution's academic integrity policies</li>
            <li>Not submit questions for exams or other assessments where outside help is prohibited</li>
            <li>Use the information provided by experts as learning resources, not as work to be submitted as their own</li>
            <li>Properly cite any information obtained through our Services when incorporated into their work</li>
          </ul>
          <p>
            AskNexus reserves the right to decline assistance for questions that appear to violate academic integrity principles.
          </p>

          <h2>6. Expert Services</h2>
          <p>
            AskNexus connects students with experts who provide educational assistance. While we strive to ensure high quality responses, we do not guarantee:
          </p>
          <ul>
            <li>The accuracy or completeness of expert answers</li>
            <li>That experts will be available for all questions at all times</li>
            <li>Specific response times, although we provide estimates</li>
          </ul>
          <p>
            For experts providing services on our platform, additional terms apply as outlined in our Expert Agreement.
          </p>

          <h2>7. Payment and Refunds</h2>
          <p>
            Users may purchase credits or subscriptions to access expert assistance. By making a purchase, you agree to:
          </p>
          <ul>
            <li>Pay all fees and applicable taxes as they become due</li>
            <li>Provide current, complete, and accurate billing information</li>
            <li>Immediately update your billing information if it changes</li>
          </ul>
          <p>
            Subscriptions will automatically renew unless cancelled at least 24 hours before the renewal date. Refunds may be provided at our discretion if you are unsatisfied with an expert's response. Refund requests must be submitted within 7 days of receiving the answer.
          </p>

          <h2>8. Intellectual Property Rights</h2>
          <p>
            The Services, including content, features, and functionality, are owned by AskNexus and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            By submitting content (such as questions or feedback) to the Services, you grant AskNexus a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content for the purpose of providing and improving our Services.
          </p>
          <p>
            Expert answers and educational materials provided through the Services are intended for the requesting user's personal educational use only and may not be redistributed, sold, or published without permission.
          </p>

          <h2>9. Privacy</h2>
          <p>
            Your privacy is important to us. Our <Link to="/privacy">Privacy Policy</Link> explains how we collect, use, and share information about you when you use our Services. By using our Services, you agree to the collection, use, and sharing of your information as described in our Privacy Policy.
          </p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING, ASKNEXUS EXPLICITLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT, OR NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASKNEXUS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul>
            <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;</li>
            <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;</li>
            <li>ANY CONTENT OBTAINED FROM THE SERVICES; OR</li>
            <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT OR SUBMISSIONS.</li>
          </ul>
          <p>
            IN NO EVENT SHALL ASKNEXUS'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100) OR THE AMOUNT YOU PAID ASKNEXUS IN THE LAST 12 MONTHS.
          </p>

          <h2>12. Governing Law and Jurisdiction</h2>
          <p>
            These Terms and any disputes arising out of or related to these Terms or the Services shall be governed by the laws of the State of California, without regard to its conflict of laws rules. Any legal action or proceeding relating to these Terms shall be brought exclusively in the state or federal courts located in San Francisco County, California.
          </p>

          <h2>13. General Terms</h2>
          <p>
            If any provision of these Terms is found to be unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. The waiver of any such right or provision will be effective only if in writing and signed by a duly authorized representative of AskNexus.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            AskNexus Educational Technologies, Inc.<br />
            Email: <a href="mailto:asknexus@gmail.com">asknexus@gmail.com</a><br />
            Phone: (702) 786-7847
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
