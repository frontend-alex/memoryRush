import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PolicyRoute = () => {

  const navigate = useNavigate();

  return (
    <div className="flex-col-5">
      <div className="flex-between">
        <div/>
        <button onClick={() =>navigate(-1)} className="flex items-center gap-1">
          <ChevronLeft size={15} className="text-stone-400"/>
          <p className="text-sm">Go back</p>
        </button>
      </div>
      <h1 className="font-black text-7xl">Privacy Policy for MemoryRush</h1>
      <span className="hidden z-[-1] sm:flex absolute bottom-0 top-36 xl:left-1/2 w-[600px] h-[600px] overflow-hidden bg-rose-600/30 dark:bg-rose-600/10 blur-3xl"></span>

      <p>
        <strong>Last updated:</strong> February 12, 2025
      </p>

      <p>
        This Privacy Policy describes Our policies and procedures on the
        collection, use, and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </p>

      <p>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>

      <h2 className="text-3xl font-bold">Interpretation and Definitions</h2>

      <h3 className="text-2xl font-bold">Interpretation</h3>
      <p>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        plural.
      </p>

      <h3 className="text-2xl font-bold">Definitions</h3>
      <p>For the purposes of this Privacy Policy:</p>
      <ul className="list-disc px-10 flex-col-3">
        <li>
          <strong>Account:</strong> A unique account created for You to access
          our Service or parts of our Service.
        </li>
        <li>
          <strong>Affiliate:</strong> An entity that controls, is controlled by,
          or is under common control with a party.
        </li>
        <li>
          <strong>Company:</strong> (referred to as "We", "Us", or "Our"):
          MemoryRush.
        </li>
        <li>
          <strong>Cookies:</strong> Small files that are placed on Your device,
          containing the details of Your browsing history.
        </li>
        <li>
          <strong>Country:</strong> Bulgaria.
        </li>
        <li>
          <strong>Device:</strong> Any device that can access the Service such
          as a computer, cellphone, or digital tablet.
        </li>
        <li>
          <strong>Personal Data:</strong> Any information that relates to an
          identifiable individual.
        </li>
        <li>
          <strong>Service:</strong> Refers to the Website.
        </li>
        <li>
          <strong>Service Provider:</strong> A third-party company or individual
          employed by the Company to facilitate the Service.
        </li>
        <li>
          <strong>Usage Data:</strong> Data collected automatically when using
          the Service, such as IP addresses, browser types, etc.
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href="https://flip-card-game-sigma.vercel.app/">MemoryRush</a>
        </li>
        <li>
          <strong>You:</strong> The individual accessing or using the Service,
          or the company, or other legal entity.
        </li>
      </ul>

      <h2 className="text-3xl font-bold">
        Collecting and Using Your Personal Data
      </h2>

      <h3 className="text-2xl font-bold">Types of Data Collected</h3>
      <p>
        <strong>Personal Data:</strong> We may ask You to provide Us with
        certain personally identifiable information.
      </p>
      <p>
        <strong>Usage Data:</strong> Collected automatically when using the
        Service, such as IP address, browser type, pages visited, etc.
      </p>

      <h3 className="text-2xl font-bold">Tracking Technologies and Cookies</h3>
      <p>
        We use Cookies and similar technologies to track activity on Our Service
        and store certain information. You can manage Cookies through your
        browser settings. We use both <strong>Session Cookies</strong> and{" "}
        <strong>Persistent Cookies</strong> to improve the user experience.
      </p>

      <h2 className="text-3xl font-bold">Use of Your Personal Data</h2>
      <p>We may use Your Personal Data for:</p>
      <ul>
        <li>Providing and maintaining our Service.</li>
        <li>
          Managing Your account and ensuring the performance of contracts.
        </li>
        <li>Sending updates, special offers, or newsletters.</li>
        <li>Business transfers (e.g., mergers or acquisitions).</li>
        <li>Legal obligations, security, and compliance.</li>
      </ul>

      <h2 className="text-3xl font-bold">Retention and Transfer of Data</h2>
      <p>
        Your Personal Data will be retained only for as long as necessary for
        the purposes set out in this Privacy Policy. We may transfer your data
        to locations outside your jurisdiction, ensuring adequate data
        protection measures are in place.
      </p>

      <h2 className="text-3xl font-bold">Security of Your Personal Data</h2>
      <p>
        We strive to use commercially acceptable means to protect Your Personal
        Data. However, no method of transmission over the Internet or electronic
        storage is completely secure.
      </p>

      <h2 className="text-3xl font-bold">User Rights (GDPR, CCPA, etc.)</h2>
      <p>
        Depending on your location, you may have the following rights regarding
        your personal data:
      </p>
      <ul className="list-disc px-10 flex-col-3">
        <li>
          <strong>Access:</strong> You can request to see the personal data we
          have on file.
        </li>
        <li>
          <strong>Rectification:</strong> You can request that we correct any
          information that is inaccurate or incomplete.
        </li>
        <li>
          <strong>Deletion:</strong> You have the right to request the deletion
          of your personal data under certain circumstances.
        </li>
        <li>
          <strong>Restriction of Processing:</strong> You can ask us to limit
          the way we process your personal data.
        </li>
        <li>
          <strong>Data Portability:</strong> You can request that we provide
          your personal data in a structured, commonly used format.
        </li>
        <li>
          <strong>Opt-Out:</strong> You can opt out of marketing communications
          at any time.
        </li>
      </ul>
      <p>
        If you are located in the European Union, these rights are granted to
        you under the General Data Protection Regulation (GDPR). Similarly, if
        you're in California, the California Consumer Privacy Act (CCPA) may
        provide you with additional rights.
      </p>

      <h2 className="text-3xl font-bold">Third-Party Services</h2>
      <p>
        Our Service may contain links to third-party websites or services. We
        are not responsible for the privacy practices or content of these
        third-party sites. Please review the Privacy Policy of any third-party
        site that you visit through our links.
      </p>
      <p>
        We may share your data with third-party Service Providers who assist in
        the operation of our Service. These providers are obligated to protect
        your data in accordance with this Privacy Policy.
      </p>

      <h2 className="text-3xl font-bold">International Data Transfers</h2>
      <p>
        Your Personal Data may be transferred to—and maintained on—computers
        located outside of Your jurisdiction, where data protection laws may
        differ. By submitting your data, you consent to these transfers and
        agree that we will take all necessary steps to ensure your data is
        handled securely.
      </p>

      <h2 className="text-3xl font-bold">Opt-Out Mechanisms</h2>
      <p>
        You can opt out of receiving marketing emails by clicking the
        "unsubscribe" link in any marketing communication we send you.
        Additionally, you can disable cookies via your browser settings. Note
        that some features of the Service may not function properly without
        cookies.
      </p>

      <h2 className="text-3xl font-bold">Children's Privacy</h2>
      <p>
        Our Service does not address anyone under the age of 13. If we discover
        that we have collected personal data from a child under the age of 13,
        we will take steps to remove that information from our servers.
      </p>

      <h2 className="text-3xl font-bold">Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with a new "Last Updated" date. We encourage you to
        review this page periodically for updates.
      </p>

      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, You can contact us:
      </p>
      <ul className="list-disc px-10 flex-col-3">
        <li>
          By visiting our{" "}
          <a href="https://flip-card-game-sigma.vercel.app/privacy-policy">
            Privacy Policy page
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

export default PolicyRoute;
