import React, { useState } from "react";
import {
    MapPin,
    Mail,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    CheckCircle,
    Book,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";

export default function AboutContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-center text-white dark:text-gray-200">
                <div className="absolute inset-0 bg-[#2563eb] dark:bg-gray-800 z-10"></div>
                <div className="relative z-20 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-200 text-center text-white">
                        Scholarships Oasis - Your Pathway to Opportunities
                    </h1>
                    <p className="text-xl mb-8">
                        Discover, Save, and Apply for Top Scholarships Worldwide
                    </p>
                    <Button size="lg" className="bg-blue-900" asChild>
                        <a href="/home" className="dark:text-white">
                            Browse Scholarships
                        </a>
                    </Button>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 px-4 dark:bg-gray-900 dark:text-gray-300">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        About Scholarships Oasis
                    </h2>
                    <p className="mb-6 text-lg">
                        At Scholarships Oasis, our mission is to simplify the
                        scholarship search process and offer only verified,
                        high-quality opportunities to students worldwide. We
                        believe that financial barriers should never hinder
                        one&apos;s educational aspirations.
                    </p>
                    <p className="mb-6 text-lg">
                        Founded by a group of passionate educators and
                        technologists, Scholarships Oasis was born from a shared
                        vision to make educational funding accessible for
                        everyone. We understand the challenges students face in
                        finding and applying for scholarships, and we&apos;re
                        here to make that journey easier.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2">
                                Quality Curation
                            </h3>
                            <p>
                                We carefully vet each scholarship for quality
                                and legitimacy.
                            </p>
                        </div>
                        <div className="text-center">
                            <Book className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2">
                                Diverse Categories
                            </h3>
                            <p>
                                From merit-based to sports and arts, we cover a
                                wide range of scholarships.
                            </p>
                        </div>
                        <div className="text-center">
                            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2">
                                Personalized Experience
                            </h3>
                            <p>
                                Save favorites and get notified about deadlines
                                and eligibility updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center dark:text-gray-300">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
                            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2 text-center dark:text-gray-200">
                                Integrity
                            </h3>
                            <p className="text-center dark:text-gray-300">
                                We are a trusted source for scholarship
                                information.
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
                            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2 text-center dark:text-gray-200">
                                Empowerment
                            </h3>
                            <p className="text-center dark:text-gray-300">
                                We enable students to pursue their dreams
                                through education.
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
                            <Book className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold mb-2 text-center dark:text-gray-200">
                                Diversity
                            </h3>
                            <p className="text-center dark:text-gray-300">
                                We offer scholarships for various backgrounds
                                and disciplines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 px-4 bg-blue-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center dark:text-blue-200">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team Member 1"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-semibold dark:text-gray-200">
                                Sarah Johnson
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Co-Founder & CEO
                            </p>
                        </div>
                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team Member 2"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-semibold dark:text-gray-200">
                                Michael Lee
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Co-Founder & CTO
                            </p>
                        </div>
                        <div className="text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team Member 3"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-semibold dark:text-gray-200">
                                Emily Chen
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Head of Partnerships
                            </p>
                        </div>
                        <div className="text-center md:col-start-2">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team Member 4"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-semibold dark:text-gray-200">
                                David Rodriguez
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Lead Developer
                            </p>
                        </div>
                        <div className="text-center md:col-start-3">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team Member 5"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4"
                            />
                            <h3 className="font-semibold dark:text-gray-200">
                                Olivia Taylor
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                UX Designer
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-16 px-4 dark:bg-gray-800 dark:text-gray-300">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Get in Touch
                    </h2>
                    <form onSubmit={handleSubmit} className="mb-12">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <Input type="text" placeholder="Name" required />
                            <Input type="email" placeholder="Email" required />
                        </div>
                        <div className="mb-6">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bug">
                                        Bug Report
                                    </SelectItem>
                                    <SelectItem value="suggestion">
                                        Suggestion
                                    </SelectItem>
                                    <SelectItem value="info">
                                        Information Request
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Textarea
                            placeholder="Message"
                            className="mb-6"
                            required
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full dark:text-white bg-blue-900 hover:bg-blue-800"
                        >
                            Send Message
                        </Button>
                    </form>
                    {isSubmitted && (
                        <div className="text-center text-green-600 mb-6">
                            Thank you for your message. We&apos;ll get back to
                            you soon!
                        </div>
                    )}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Mail className="w-5 h-5 mr-2" />
                            <a
                                href="mailto:contact@scholarshipsoasis.com"
                                className="text-blue-600 hover:underline"
                            >
                                contact@scholarshipsoasis.com
                            </a>
                        </div>
                        <div className="flex items-center justify-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>Global Headquarters</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="text-2xl font-bold mb-4 md:mb-0">
                            Scholarships Oasis
                        </div>
                        <nav className="flex space-x-6 ">
                            <a
                                href="/terms"
                                className="text-white hover:text-blue-300 transition-colors"
                            >
                                Terms
                            </a>
                            <a
                                href="/privacy"
                                className="text-white hover:text-blue-300 transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="/faq"
                                className="text-white hover:text-blue-300 transition-colors"
                            >
                                FAQs
                            </a>
                        </nav>
                    </div>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a
                            href="#"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            <Facebook />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            <Twitter />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            <Linkedin />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            <Instagram />
                        </a>
                    </div>
                    <div className="text-center text-sm text-blue-200">
                        © {new Date().getFullYear()} Scholarships Oasis. All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
