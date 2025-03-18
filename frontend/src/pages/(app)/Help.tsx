import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageSquare, BookOpen, Terminal } from "lucide-react";

const Help = () => {
  const faqItems = [
    {
      question: "How do I create my first campaign?",
      answer:
        "Navigate to the Campaigns page and click 'New Campaign'. Follow the step-by-step wizard to set up your campaign parameters and AI preferences.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards and cryptocurrency payments through our secure payment gateway.",
    },
    {
      question: "How does the AI content generation work?",
      answer:
        "Our AI analyzes your brand guidelines and target audience to create optimized content using advanced natural language processing models.",
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base hover:bg-gray-800/50 text-gray-200 px-4 rounded-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-300 text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {/* Quick Help Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gray-900/50 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-colors">
            <div className="space-y-4">
              <div className="p-3 bg-purple-500/20 w-fit rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Documentation
              </h3>
              <p className="text-gray-400">
                Explore our comprehensive guides and API documentation
              </p>
              <Button variant="outline" className="w-full">
                View Documentation
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-colors">
            <div className="space-y-4">
              <div className="p-3 bg-pink-500/20 w-fit rounded-lg">
                <Terminal className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">API Support</h3>
              <p className="text-gray-400">
                Integration guides and developer resources
              </p>
              <Button variant="outline" className="w-full">
                Developer Portal
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-colors">
            <div className="space-y-4">
              <div className="p-3 bg-pink-500/20 w-fit rounded-lg">
                <Terminal className="h-6 w-6 text-pink-400" />
              </div>

              <h3 className="text-xl font-semibold text-white">Community</h3>
              <p className="text-gray-400">
                Join our Discord community for peer support
              </p>
              <Button variant="outline" className="w-full">
                Join Community
              </Button>
            </div>
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="bg-gray-900/50 backdrop-blur-lg border-white/10 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Still need help?
              </h2>
              <p className="text-gray-400">
                Our support team is available 24/7
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 flex-1">
                <MessageSquare className="h-4 w-4" />
                Live Chat
              </Button>
              <Button variant="outline" className="gap-2 flex-1">
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
