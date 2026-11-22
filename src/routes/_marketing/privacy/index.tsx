import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/privacy/")({
	head: () => ({
		meta: seo({
			title: `Privacy Policy | ${siteConfig.name}`,
			description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
			url: "https://www.madewithpocketbase.com/privacy",
		}),
		links: [
			{
				rel: "canonical",
				href: "https://www.madewithpocketbase.com/privacy",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-2 px-8 py-8 border">
			<h1 className="text-lg font-heading">
				Privacy Policy for {siteConfig.name}
			</h1>
			<p className="p-2">
				This privacy policy describes how {siteConfig.name} ("we", "us", or
				"our") collects, uses, and discloses personal information when you use
				our SaaS Starter ${siteConfig.name} ("the Service"). We are committed to
				protecting your privacy and ensuring the security of your personal
				information. By using the Service, you consent to the practices
				described in this Privacy Policy.
			</p>
			<p className="font-heading">Information We Collect</p>
			<p className="p-2">
				<span className="my-4 font-heading">
					1.1 Personal Information When you use the Service:
				</span>
				we may collect personal information that you provide directly to us,
				such as your name, email address, and any other information you choose
				to provide.
			</p>
			<p className="p-2">
				1.2 Usage Information We may collect information about how you access
				and use the Service, including your IP address, device information,
				operating system, and browser type. We may also collect information
				about your activity on the Service, such as the features you use, the
				pages you visit, and the actions you take.
			</p>
			<p className="font-heading">Use of Information</p>
			<p className="p-2">
				<span className="my-4 font-heading">
					2.1 Provide and Improve the Service:
				</span>
				We use the collected information to provide and improve the Service,
				respond to your inquiries, and fulfill your requests. This includes
				processing your registration, providing customer support, and
				personalizing your experience.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">2.2 Communication:</span>
				We may use your email address to send you important updates,
				newsletters, and promotional materials. You can opt-out of receiving
				marketing communications at any time by following the instructions in
				the email or contacting us directly.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">2.3 Aggregated Data:</span>
				We may aggregate and anonymize the collected information to generate
				statistical and analytical data. This data does not identify any
				individual and may be used for research, marketing, or other lawful
				purposes.
			</p>

			<p className="font-heading">Information Sharing</p>
			<p className="p-2">
				<span className="my-4 font-heading">3.1 Service Providers:</span>
				We may engage third-party service providers to assist us in providing
				the Service or to perform certain functions on our behalf. These service
				providers may have access to your personal information but are only
				authorized to use it as necessary to provide the requested services.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">3.2 Legal Compliance:</span>
				We may disclose your personal information if required to do so by law or
				if we believe that such action is necessary to (a) comply with a legal
				obligation, (b) protect and defend our rights or property, (c) prevent
				or investigate possible wrongdoing in connection with the Service, or
				(d) protect the personal safety of users of the Service or the public.
			</p>

			<p className="font-heading">Data Security</p>
			<p className="p-2">
				We take reasonable measures to protect the security of your personal
				information and prevent unauthorized access, use, or disclosure.
				However, no method of transmission or storage is 100% secure, and we
				cannot guarantee the absolute security of your information.
			</p>

			<p className="font-heading">Data Retention</p>
			<p className="p-2">
				We retain personal information for as long as necessary to fulfill the
				purposes outlined in this Privacy Policy unless a longer retention
				period is required or permitted by law. When the information is no
				longer needed, we will securely dispose of it.
			</p>

			<p className="font-heading">Children's Privacy</p>
			<p className="p-2">
				The Service is not intended for individuals under the age of 16. We do
				not knowingly collect personal information from children. If you believe
				that we have inadvertently collected personal information from a child,
				please contact us immediately, and we will take appropriate steps to
				remove such information.
			</p>

			<p className="font-heading">Third-Party Links</p>
			<p className="p-2">
				The Service may contain links to third-party websites or services that
				are not controlled or operated by us. This Privacy Policy does not apply
				to such third-party websites or services, and we are not responsible for
				their privacy practices. We encourage you to review the privacy policies
				of those third parties.
			</p>

			<p className="font-heading">Changes to the Privacy Policy</p>
			<p className="p-2">
				We reserve the right to modify this Privacy Policy at any time. If we
				make material changes to this Privacy Policy, we will notify you by
				posting the updated version on the Service or through other means. Your
				continued use of the Service after the effective date of the revised
				Privacy Policy constitutes your acceptance of the changes.
			</p>

			<p className="font-heading">Contact Us</p>
			<p className="p-2">
				If you have any questions, concerns, or requests regarding this Privacy
				Policy or our privacy practices, please contact us at
				{siteConfig.email}.
			</p>

			<p className="font-heading">Third-Party Logins</p>
			<p className="p-2">
				If you choose to register or log in to our Services using a third-party
				account, we may have access to certain information about you. Our
				Services offers you the ability to register and login using your
				third-party account details (Google, Apple, etc.). Where you choose to
				do this, we will receive certain profile information about you from your
				third-party provider. The profile information we receive may vary
				depending on the provider concerned, but will often include your name,
				email address, friends list, profile picture as well as other
				information you choose to make public on such social media platform. We
				will use the information we receive only for the purposes that are
				described in this privacy notice or that are otherwise made clear to you
				on the relevant Services. Please note that we do not control, and are
				not responsible for, other uses of your personal information by your
				third-party provider. We recommend that you review their privacy notice
				to understand how they collect, use and share your personal information,
				and how you can set your privacy preferences on their sites and apps.
			</p>
		</div>
	);
}
