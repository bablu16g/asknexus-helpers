
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: May 1, 2025
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            This Privacy Policy explains how AskNexus Educational Technologies, Inc. ("AskNexus," "we," "us," or "our") collects, uses, and discloses information about you when you access or use our website, mobile application, and services (collectively, the "Services").
          </p>
          <p>
            We take your privacy seriously. Please read this Privacy Policy carefully to understand our practices regarding your information and how we will treat it. By using our Services, you acknowledge that you have read and understood this Privacy Policy.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information in the following ways:
          </p>

          <h3>1.1. Information You Provide to Us</h3>
          <p>
            We collect information you provide directly to us when you:
          </p>
          <ul>
            <li>Create or update your account (e.g., name, email address, password, academic level, areas of study)</li>
            <li>Submit questions and educational materials (e.g., homework problems, essays, projects)</li>
            <li>Provide expert credentials and qualifications (for experts)</li>
            <li>Make payments (e.g., payment method information)</li>
            <li>Communicate with us or other users</li>
            <li>Submit feedback, reviews, or responses to surveys</li>
            <li>Apply for jobs or expert positions</li>
          </ul>

          <h3>1.2. Information We Collect Automatically</h3>
          <p>
            When you access or use our Services, we automatically collect certain information, including:
          </p>
          <ul>
            <li>
              <strong>Device Information:</strong> Information about the device you use to access our Services, such as hardware model, operating system, unique device identifiers, and mobile network information.
            </li>
            <li>
              <strong>Log Information:</strong> Information that your browser or device automatically sends whenever you visit our website or use our app, such as your IP address, browser type and settings, access times, pages viewed, and referring website address.
            </li>
            <li>
              <strong>Usage Information:</strong> Information about your interactions with our Services, such as the features you use, the questions you ask, the responses you receive, and the time spent on our platform.
            </li>
            <li>
              <strong>Location Information:</strong> General location information inferred from your IP address.
            </li>
          </ul>

          <h3>1.3. Information from Cookies and Similar Technologies</h3>
          <p>
            We and our third-party service providers use cookies, web beacons, and other tracking technologies to collect information about your use of our Services. This information helps us provide functionality, analyze usage, and improve your experience. You can control cookies through your browser settings and other tools.
          </p>

          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul>
            <li>Provide, maintain, and improve our Services</li>
            <li>Match students with appropriate experts</li>
            <li>Process transactions and send related information</li>
            <li>Personalize your experience and deliver content relevant to your interests</li>
            <li>Send administrative messages, updates, and support information</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Verify expert credentials and qualifications</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent fraudulent transactions, abuse, and other illegal activities</li>
            <li>Comply with legal obligations</li>
            <li>Enforce our Terms of Service and other policies</li>
          </ul>

          <h2>3. How We Share Information</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Between Students and Experts:</strong> When students submit questions, we share relevant information with experts who can provide assistance. Similarly, experts' responses and relevant profile information are shared with students.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to perform work on our behalf (e.g., payment processing, data analysis, email delivery, hosting services).
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government requests).
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information with third parties when you explicitly consent to such sharing.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Academic questions and answers may be retained indefinitely in anonymized form to improve our Services.
          </p>
          <p>
            You can request deletion of your personal information by contacting us at privacy@asknexus.com. Note that some information may remain in our records after your request is processed, particularly if retention is necessary to comply with our legal obligations, resolve disputes, or enforce our agreements.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Accessing, updating, or correcting your personal information</li>
            <li>Requesting deletion of your personal information</li>
            <li>Objecting to or restricting certain processing activities</li>
            <li>Requesting portability of your personal information</li>
            <li>Withdrawing consent where processing is based on consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@asknexus.com. We will respond to your request in accordance with applicable law.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information as soon as possible.
          </p>
          <p>
            For students between 13 and 18 years old, we require parental consent for account creation and use of our Services.
          </p>

          <h2>7. International Data Transfers</h2>
          <p>
            AskNexus is based in the United States, and we process and store information in the U.S. and other countries. If you are located outside the United States, your information may be transferred to, stored, and processed in a country where privacy laws may not be as protective as those in your jurisdiction.
          </p>
          <p>
            If we transfer personal information from the European Economic Area (EEA), United Kingdom, or Switzerland to a country that has not been deemed to provide an adequate level of protection, we use specific legal mechanisms to safeguard your rights, such as standard contractual clauses approved by the relevant authorities.
          </p>

          <h2>8. Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet or email transmission is ever fully secure or error-free, so you should take special care in deciding what information you send to us.
          </p>

          <h2>9. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by revising the "Last Updated" date at the top of this policy, and in some cases, we may provide additional notification (such as by adding a statement to our website or sending you a notification).
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about our information practices and your privacy choices.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>
            AskNexus Educational Technologies, Inc.<br />
            Email: <a href="mailto:privacy@asknexus.com">privacy@asknexus.com</a><br />
            Phone: (702) 786-7847
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
