import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/tos/")({
	component: RouteComponent,
	head: () => ({
		meta: seo({
			title: `Terms of Service | ${siteConfig.name}`,
			description: `Terms of service for ${siteConfig.name}. Read our terms and conditions for using the service.`,
			url: "https://www.madewithpocketbase.com/tos",
		}),
		links: [
			{
				rel: "canonical",
				href: "https://www.madewithpocketbase.com/tos",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-2 px-8 py-8 border">
			<h1 className="text-lg font-heading">
				Terms of service for {siteConfig.name}
			</h1>
			<p className="p-2">
				These Terms of Service ("Terms") govern your use of the{" "}
				{siteConfig.name}
				("the Service") provided by {siteConfig.name} ("we," "us," or "our"). By
				accessing or using the Service, you agree to be bound by these Terms. If
				you do not agree with any part of these Terms, you may not use the
				Service.
			</p>

			<p className="font-heading">Use of the Service</p>
			<p className="p-2">
				<span className="my-4 font-heading">1.1 Eligibility:</span>
				You must be at least 18 years old or have the legal authority to enter
				into these Terms on behalf of an entity. By accessing or using the
				Service, you represent and warrant that you meet the eligibility
				requirements.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">1.2 License:</span>
				Subject to your compliance with these Terms, we grant you a limited,
				non-exclusive, non-transferable, revocable license to use the Service
				for its intended purpose.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">1.3 User Account:</span>
				In order to use certain features of the Service, you may be required to
				create a user account. You are responsible for maintaining the
				confidentiality of your account credentials and for all activities that
				occur under your account. You agree to provide accurate and complete
				information when creating your account and to promptly update any
				changes.
			</p>

			<p className="font-heading">Intellectual Property</p>
			<p className="p-2">
				<span className="my-4 font-heading">2.1 Ownership:</span>
				The Service and its content, including but not limited to software,
				logos, trademarks, and any other materials provided by us, are protected
				by intellectual property rights. You acknowledge and agree that we
				retain all right, title, and interest in and to the Service and its
				content.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">2.2 Restrictions:</span>
				You may not copy, modify, distribute, sell, lease, sublicense, or
				reverse engineer any part of the Service without our prior written
				consent. You may not use any automated means or scrape the Service for
				any purpose without our express permission.
			</p>

			<p className="font-heading">User Content</p>
			<p className="p-2">
				<span className="my-4 font-heading">3.1 Responsibility:</span>
				You are solely responsible for any content you upload, transmit, or
				otherwise make available through the Service ("User Content"). You
				represent and warrant that you have all necessary rights to the User
				Content and that its use does not violate any laws or infringe any
				third-party rights.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">3.2 License:</span>
				By submitting User Content, you grant us a worldwide, non-exclusive,
				royalty-free, sublicensable, and transferable license to use, reproduce,
				distribute, prepare derivative works of, display, and perform the User
				Content in connection with the Service and our business operations.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">3.3 Monitoring and Removal:</span>
				We reserve the right to monitor, review, and remove any User Content
				that violates these Terms or is otherwise objectionable. However, we do
				not guarantee the monitoring or removal of all User Content and disclaim
				any responsibility for such content.
			</p>

			<p className="font-heading">Prohibited Conduct</p>
			<p className="p-2">
				When using the Service, you agree not to:{" "}
				<span className="my-4 font-heading">4.1</span>
				Violate any applicable laws, regulations, or third-party rights
				<span className="my-4 font-heading">4.2</span>
				Engage in any fraudulent, deceptive, or harmful activities;
				<span className="my-4 font-heading">4.3</span>
				Impersonate any person or entity or falsely state or misrepresent your
				affiliation
				<span className="my-4 font-heading">4.4</span>
				Introduce viruses, malware, or other harmful code;
				<span className="my-4 font-heading">4.5</span>
				Interfere with the operation of the Service or disrupt its functionality
				<span className="my-4 font-heading">4.6</span>
				Collect or harvest any information from other users without their
				consent
				<span className="my-4 font-heading">4.7</span>
				Use the Service for any illegal or unauthorized purpose.
			</p>

			<p className="font-heading">Termination</p>
			<p className="p-2">
				<span className="my-4 font-heading">5.1 Termination by You:</span>
				You may terminate your use of the Service at any time by discontinuing
				its use and closing your account, if applicable.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">5.2 Termination by Us:</span>
				We reserve the right, in our sole discretion, to terminate or suspend
				your access to the Service, without prior notice or liability, for any
				reason, including if you violate these Terms.
			</p>

			<p className="font-heading">Disclaimer of Warranties</p>
			<p className="p-2">
				THE SERVICE IS PROVIDED "AS IS" AND WITHOUT ANY WARRANTY, WHETHER
				EXPRESS, IMPLIED, OR STATUTORY. WE DISCLAIM ALL WARRANTIES OF
				MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND
				ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
			</p>

			<p className="font-heading">Limitation of Liability</p>
			<p className="p-2">
				TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE
				LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
				DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION,
				ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, WHETHER
				BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
				LEGAL THEORY.
			</p>

			<p className="font-heading">Indemnification</p>
			<p className="p-2">
				You agree to indemnify, defend, and hold harmless {siteConfig.name} and
				its officers, directors, employees, and agents from and against any
				claims, liabilities, damages, losses, and expenses, including reasonable
				attorneys' fees, arising out of or in any way connected with your use of
				the Service or your violation of these Terms.
			</p>

			<p className="font-heading">Governing Law and Dispute Resolution</p>
			<p className="p-2">
				These Terms shall be governed by and construed in accordance with the
				laws of Canada. Any dispute arising out of or relating to these Terms or
				the Service shall be exclusively submitted to the competent courts of
				Canada.
			</p>

			<p className="font-heading">Miscellaneous</p>
			<p className="p-2">
				<span className="my-4 font-heading">10.1 Entire Agreement:</span>
				These Terms constitute the entire agreement between you and{" "}
				{siteConfig.name} regarding the Service and supersede all prior
				agreements and understandings.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">10.2 Severability:</span>
				If any provision of these Terms is found to be invalid or unenforceable,
				the remaining provisions shall remain in full force and effect.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">10.3 Waiver:</span>
				The failure to enforce any right or provision of these Terms shall not
				be deemed a waiver of such right or provision.
			</p>

			<p className="p-2">
				<span className="my-4 font-heading">10.4 Assignment:</span>
				You may not assign or transfer any of your rights or obligations under
				these Terms without our prior written consent. We may freely assign or
				transfer these Terms without restriction. If you have any questions or
				concerns regarding these Terms, please contact us at {siteConfig.email}.
			</p>
		</div>
	);
}
