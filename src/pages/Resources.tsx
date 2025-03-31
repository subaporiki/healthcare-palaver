
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Link2, Video } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Health Guidelines",
      resources: [
        {
          title: "COVID-19 Prevention Guidelines",
          type: "pdf",
          description: "Latest guidelines for preventing COVID-19 infection and maintaining safety.",
          link: "#"
        },
        {
          title: "Diabetes Management Handbook",
          type: "pdf",
          description: "Comprehensive guide for managing diabetes, diet plans, and glucose monitoring.",
          link: "#"
        },
        {
          title: "Heart Health Recommendations",
          type: "pdf",
          description: "Recommendations for maintaining cardiovascular health and preventing heart disease.",
          link: "#"
        }
      ]
    },
    {
      title: "Video Resources",
      resources: [
        {
          title: "Understanding Blood Pressure",
          type: "video",
          description: "Educational video explaining blood pressure readings and their importance.",
          link: "#"
        },
        {
          title: "Home Exercises for Seniors",
          type: "video",
          description: "Safe and effective exercises for elderly individuals to maintain mobility.",
          link: "#"
        },
        {
          title: "Healthy Cooking Techniques",
          type: "video",
          description: "Demonstrations of healthy cooking methods to retain nutrients and reduce fat.",
          link: "#"
        }
      ]
    },
    {
      title: "Mental Health Resources",
      resources: [
        {
          title: "Stress Management Techniques",
          type: "article",
          description: "Effective techniques for managing stress and anxiety in daily life.",
          link: "#"
        },
        {
          title: "Sleep Hygiene Guide",
          type: "pdf",
          description: "Guidelines for improving sleep quality and establishing healthy sleep patterns.",
          link: "#"
        },
        {
          title: "Mindfulness Meditation Guide",
          type: "audio",
          description: "Audio guides for practicing mindfulness meditation for mental well-being.",
          link: "#"
        }
      ]
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': 
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': 
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'article': 
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'audio': 
        return <FileText className="h-5 w-5 text-purple-500" />;
      default: 
        return <Link2 className="h-5 w-5 text-gray-500" />;
    }
  };

  const faqs = [
    {
      question: "How do I book a doctor appointment?",
      answer: "You can book a doctor appointment by navigating to the Doctor Consultation section, selecting a doctor, and clicking either 'Video Consultation' or 'Book Clinic Visit' button. Follow the prompts to select a date, time, and complete payment."
    },
    {
      question: "How can I find blood donors in an emergency?",
      answer: "Go to the Emergency Blood Seeking section, enter the required blood type and your location, and the system will show you available blood banks with the requested blood type. You can view their contact details and location on the map."
    },
    {
      question: "Are my medical records secure?",
      answer: "Yes, we take data security very seriously. All medical records are encrypted and stored securely. We comply with relevant data protection laws and only authorized healthcare providers can access your information with your consent."
    },
    {
      question: "How do I prepare for a video consultation?",
      answer: "Ensure you have a stable internet connection, a quiet environment, good lighting, and a working camera and microphone. Have your medical history, current medications, and any relevant medical reports ready. Log in to your account 5-10 minutes before your scheduled appointment."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule appointments through the 'My Appointments' section in your profile. Please note that cancellations made less than 24 hours before the appointment may incur a cancellation fee as per our policy."
    },
    {
      question: "How do I book lab tests?",
      answer: "Visit the Lab Centers section, browse through available centers or search for specific tests. Select a lab center, choose the required tests, select a convenient time slot, and complete the payment to book your test."
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Resources</h1>
        <p className="text-gray-600 mb-8">
          Educational materials, guides, and resources to help you manage your health effectively
        </p>

        {/* Resources sections */}
        {resourceCategories.map((category, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download {resource.type.toUpperCase()}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Health Tools Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Health Assessment Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>Calculate your Body Mass Index to assess weight relative to height</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src="https://img.freepik.com/free-vector/bmi-infographic-with-people-silhouettes_23-2148627914.jpg?size=626&ext=jpg"
                  alt="BMI Scale"
                  className="h-32 mx-auto object-contain"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Heart Disease Risk Assessment</CardTitle>
                <CardDescription>Evaluate your risk factors for heart disease</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src="https://img.freepik.com/free-vector/heart-rate-graph-concept_23-2148521121.jpg?size=626&ext=jpg"
                  alt="Heart Rate Graph"
                  className="h-32 mx-auto object-contain"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Take Assessment</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diabetes Risk Calculator</CardTitle>
                <CardDescription>Check your risk of developing type 2 diabetes</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src="https://img.freepik.com/free-vector/diabetes-mellitus-concept-illustration_114360-1963.jpg?size=626&ext=jpg"
                  alt="Diabetes Illustration"
                  className="h-32 mx-auto object-contain"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Calculate Risk</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Emergency Information</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-medium text-red-800 mb-2">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-1">National Emergency Number</h4>
                <p className="text-lg font-bold">112</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Ambulance</h4>
                <p className="text-lg font-bold">108</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Hospital Helpline</h4>
                <p className="text-lg font-bold">1800-123-4567</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Poison Control</h4>
                <p className="text-lg font-bold">1800-222-1222</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Basic First Aid Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>For minor burns, cool the area with cold running water for at least 10 minutes.</li>
                <li>For cuts, apply pressure with clean cloth or bandage to stop bleeding, then clean and cover.</li>
                <li>For choking, use the Heimlich maneuver if the person cannot speak, cough or breathe.</li>
                <li>For heart attack symptoms (chest pain, shortness of breath), call emergency services immediately.</li>
                <li>For stroke symptoms (face drooping, arm weakness, speech difficulty), remember FAST and seek immediate medical help.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
