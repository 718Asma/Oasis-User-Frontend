import {
    ArrowRight,
    BookOpen,
    ClipboardCheck,
    DollarSign,
    GraduationCap,
    Search,
    Trophy,
    Users,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

const Hero: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 lg:py-32">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center mb-8">
                    <GraduationCap className="h-20 w-20" />
                    {/* TODO: replace it with the logo */}
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                    Unlock Your Educational Future
                </h1>
                <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                    Discover and apply for scholarships that align with your
                    goals. Our platform connects you with opportunities to fund
                    your education and turn your dreams into reality.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-100"
                    >
                        Begin Your Search
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                variant="default"
                                className="bg-[#ebad7e] text-blue-600 hover:bg-[#ebad7e]/90"
                            >
                                How It Works
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] text-blue-600 ">
                            <DialogHeader>
                                <DialogTitle>
                                    How to Use Our Scholarship Platform
                                </DialogTitle>
                                <DialogDescription>
                                    Follow these steps to efficiently use our
                                    website and find the perfect scholarship for
                                    you.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <ol className="space-y-4">
                                    <li className="flex items-center space-x-3">
                                        <Search className="h-6 w-6 text-blue-500" />
                                        <span>
                                            Search for scholarships using
                                            keywords or filters
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <ClipboardCheck className="h-6 w-6 text-blue-500" />
                                        <span>
                                            Review scholarship details and
                                            requirements
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <BookOpen className="h-6 w-6 text-blue-500" />
                                        <span>
                                            Prepare your application materials
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <ArrowRight className="h-6 w-6 text-blue-500" />
                                        <span>
                                            Submit your applications in the
                                            official platform following the url
                                            we provide
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <Trophy className="h-6 w-6 text-blue-500" />
                                        <span>
                                            Track your application&apos;s
                                            deadlines and celebrate your
                                            success!
                                        </span>
                                    </li>
                                </ol>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mt-12 flex justify-center space-x-8">
                    <div className="text-center">
                        <DollarSign className="h-10 w-10 mx-auto mb-2" />
                        <h3 className="text-4xl font-bold">1000+</h3>
                        <p className="text-lg">Scholarships</p>
                    </div>
                    <div className="text-center">
                        <Users className="h-10 w-10 mx-auto mb-2" />
                        <h3 className="text-4xl font-bold">$5M+</h3>
                        <p className="text-lg">Awarded</p>
                    </div>
                    <div className="text-center">
                        <GraduationCap className="h-10 w-10 mx-auto mb-2" />
                        <h3 className="text-4xl font-bold">50k+</h3>
                        <p className="text-lg">Students Helped</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
