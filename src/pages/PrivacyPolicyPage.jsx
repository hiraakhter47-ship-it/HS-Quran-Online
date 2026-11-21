import { Link } from 'react-router'
import PageHero from '../components/ui/PageHero.jsx'
import { mailtoHref, site } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

// Update this date whenever the policy text changes.
const LAST_UPDATED = '22 November 2026'

function PrivacyPolicyPage() {
  usePageMeta('privacy')

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="text-highlight">Policy</span></>}
        description="What information we collect when you book a class, why we use it, and the choices you have."
        breadcrumb="Privacy Policy"
        compact
      />

      <section className="legal-section" aria-label="Privacy policy">
        <div className="container">
          <article className="legal">
            <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

            <h2>Who we are</h2>
            <p>
              {site.name} (“we”, “us”) provides one-to-one online Quran classes for children and adults.
              This policy explains what personal information we collect through this website, how we use it, and your choices.
            </p>
            <p>
              <strong>Questions about privacy?</strong> Email <a href={mailtoHref('Privacy question')}>{site.email}</a> or
              call <a href={site.phone.href}>{site.phone.display}</a>.
            </p>

            <h2>What we collect</h2>
            <p>When you book a free demo class, we ask for:</p>
            <ul>
              <li>the student’s full name and age</li>
              <li>the country where the student lives</li>
              <li>an email address</li>
              <li>a WhatsApp number</li>
              <li>the course the student is interested in</li>
            </ul>
            <p>
              We use only what you type into the form. We do not ask for payment details, passwords or identity documents on this website.
            </p>

            <h2>Why we use it</h2>
            <ul>
              <li>To contact you about the free demo class and arrange a time.</li>
              <li>To place the student with a suitable teacher and course.</li>
              <li>To answer your questions.</li>
            </ul>
            <p>We do not sell your information, and we do not use it for advertising.</p>

            <h2>Who we share it with</h2>
            <ul>
              <li><strong>Our team:</strong> only the people who need it to organise classes, such as the academy’s management and the assigned teacher.</li>
              <li><strong>Web3Forms</strong> (web3forms.com): the service that delivers the booking form to our email. It processes the details you submit.</li>
              <li><strong>Our email service provider:</strong> the email account that receives your booking.</li>
              <li><strong>WhatsApp (Meta):</strong> when you tap a WhatsApp button, or when we message you there, your conversation is handled by WhatsApp under its own privacy policy.</li>
            </ul>
            <p>We do not share your details with anyone else unless the law requires it.</p>

            <h2>Information from your browser</h2>
            <ul>
              <li><strong>Hosting:</strong> this website is hosted on Vercel, which, like most hosts, automatically records technical information such as your IP address and browser type to keep the site working and secure.</li>
              <li><strong>Google Fonts:</strong> the site’s fonts load from Google, which receives your IP address when you visit.</li>
              <li><strong>Quran reading pages:</strong> when you read a Surah or Sipara, your browser requests the Quran text from the AlQuran Cloud service, which can see your IP address.</li>
              <li><strong>Cookies and tracking:</strong> this website does not set cookies and uses no analytics, advertising or tracking tools. If this changes, we will update this policy first.</li>
            </ul>

            <h2>Children’s privacy</h2>
            <p>
              Our classes are for all ages, including young children. For students under 16, we ask that a parent or guardian
              completes the booking form. We collect a child’s details only to arrange their classes, and a parent or guardian can
              ask us at any time to see, correct or delete them. If you think a child has sent us information without a parent’s
              knowledge, contact us and we will delete it.
            </p>

            <h2>How long we keep it</h2>
            <ul>
              <li><strong>If the student does not enrol:</strong> we delete the booking details after 12 months.</li>
              <li><strong>If the student enrols:</strong> we keep them while the student is learning with us, and for 12 months afterwards, then delete them.</li>
            </ul>

            <h2>How we protect it</h2>
            <p>
              Bookings are sent over a secure (HTTPS) connection, and access is limited to the people who need it. No online
              system is perfectly secure, but we take reasonable steps to protect your information.
            </p>

            <h2>Your choices and rights</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>ask what information we hold about you or your child</li>
              <li>have it corrected or deleted</li>
              <li>withdraw your consent at any time</li>
              <li>object to how we use it</li>
            </ul>
            <p>
              To use any of these, email <a href={mailtoHref('Privacy request')}>{site.email}</a>. We will reply within 30 days.
              If you are in the European Economic Area or the UK, you can also complain to your local data protection authority.
            </p>

            <h2>Other websites</h2>
            <p>
              Our site links to services such as WhatsApp. We are not responsible for their privacy practices, so please read their policies.
            </p>

            <h2>International transfers</h2>
            <p>
              Our service providers, including Web3Forms and Vercel, may process data in other countries, such as the United States.
              By booking a class, you understand your details may be handled outside your own country.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The “Last updated” date at the top shows when it last changed.
            </p>

            <p className="legal-back"><Link to="/">← Back to the homepage</Link></p>
          </article>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
