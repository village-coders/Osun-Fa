import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Secretariat & Support",
    description: "Get in touch with the Osun State Football Association for general inquiries, club registrations, grassroots sponsorships, and press info.",
    openGraph: {
        title: "Contact Secretariat | Osun State FA",
        description: "Get in touch with the Osun State Football Association. Phone, email, and secretariat location details.",
        url: "https://osunstatefa.org.ng/contact",
    }
};

export default function ContactPage() {
    return (
        <div className="bg-surface-light min-h-screen pt-20 lg:pt-28">
            {/* Page Header */}
            <div className="bg-surface-dark py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    Get in <span className="text-accent">Touch</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Have questions regarding affiliations, registrations, or sponsorships? Reach out to us.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-text-main mb-6">Contact Information</h2>
                            <p className="text-text-muted mb-8 leading-relaxed">
                                The Osun State FA Secretariat is open from Monday to Friday, 9:00 AM to 5:00 PM. Feel free to contact us via the details below or use the form.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main text-lg">Our Location</h4>
                                    <p className="text-text-muted mt-1">OSFA Secretariat, <br />Osogbo City Stadium, <br />Osogbo, Osun State.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/20 flex flex-shrink-0 items-center justify-center text-secondary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main text-lg">Phone Number</h4>
                                    <p className="text-text-muted mt-1">+234 (0) 800 123 4567 <br /> +234 (0) 901 000 1111</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex flex-shrink-0 items-center justify-center text-primary-dark">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main text-lg">Email Address</h4>
                                    <p className="text-text-muted mt-1">info@osunstatefa.org.ng <br /> support@osunstatefa.org.ng</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-text-main mb-8">Send us a Message</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-600">
                                        <option>General Inquiry</option>
                                        <option>Club Registration</option>
                                        <option>Referee Training</option>
                                        <option>Sponsorship</option>
                                        <option>Media & Press</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-[0_5px_15px_rgba(2,89,40,0.3)] hover:shadow-[0_8px_20px_rgba(2,89,40,0.4)]"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
