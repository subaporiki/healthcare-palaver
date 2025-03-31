
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// Custom theme for the chatbot
const theme = {
  background: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headerBgColor: '#1977cc',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#F3F4F6',
  botFontColor: '#374151',
  userBubbleColor: '#1977cc',
  userFontColor: '#fff',
};

// Steps for the chatbot
const steps = [
  {
    id: '1',
    message: 'Hello! I am your AI healthcare assistant. How can I help you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'symptoms', label: 'I have symptoms to discuss', trigger: 'askSymptoms' },
      { value: 'appointment', label: 'How do I book an appointment?', trigger: 'appointmentInfo' },
      { value: 'covid', label: 'COVID-19 information', trigger: 'covidInfo' },
      { value: 'general', label: 'General health question', trigger: 'askHealthQuestion' },
    ],
  },
  {
    id: 'askSymptoms',
    message: 'Please describe your symptoms briefly:',
    trigger: 'userSymptoms',
  },
  {
    id: 'userSymptoms',
    user: true,
    trigger: 'symptomsResponse',
  },
  {
    id: 'symptomsResponse',
    message: "Based on what you've described, it might be helpful to consult with a doctor. Would you like me to help you find a specialist?",
    trigger: 'findDoctor',
  },
  {
    id: 'findDoctor',
    options: [
      { value: 'yes', label: 'Yes, find a doctor', trigger: 'doctorTypeOptions' },
      { value: 'no', label: 'No, thank you', trigger: 'endChat' },
    ],
  },
  {
    id: 'doctorTypeOptions',
    message: 'What type of specialist would you like to consult?',
    trigger: 'specialistOptions',
  },
  {
    id: 'specialistOptions',
    options: [
      { value: 'general', label: 'General Practitioner', trigger: 'doctorLinkGeneral' },
      { value: 'cardio', label: 'Cardiologist', trigger: 'doctorLinkCardio' },
      { value: 'neuro', label: 'Neurologist', trigger: 'doctorLinkNeuro' },
      { value: 'ent', label: 'ENT Specialist', trigger: 'doctorLinkEnt' },
      { value: 'other', label: 'Other Specialist', trigger: 'doctorLinkOther' },
    ],
  },
  {
    id: 'doctorLinkGeneral',
    component: (
      <div>
        <p>Great! You can find available general practitioners here:</p>
        <a href="/doctor-consultation?specialty=General%20Practitioner" className="text-primary underline">View General Practitioners</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'doctorLinkCardio',
    component: (
      <div>
        <p>Great! You can find available cardiologists here:</p>
        <a href="/doctor-consultation?specialty=Cardiologist" className="text-primary underline">View Cardiologists</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'doctorLinkNeuro',
    component: (
      <div>
        <p>Great! You can find available neurologists here:</p>
        <a href="/doctor-consultation?specialty=Neurologist" className="text-primary underline">View Neurologists</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'doctorLinkEnt',
    component: (
      <div>
        <p>Great! You can find available ENT specialists here:</p>
        <a href="/doctor-consultation?specialty=ENT%20Specialist" className="text-primary underline">View ENT Specialists</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'doctorLinkOther',
    component: (
      <div>
        <p>You can view all our specialists and filter by specialty here:</p>
        <a href="/doctor-consultation" className="text-primary underline">View All Specialists</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'appointmentInfo',
    message: 'You can book an appointment in two ways: either through video consultation or by booking a clinic visit. Would you like me to show you how?',
    trigger: 'appointmentOptions',
  },
  {
    id: 'appointmentOptions',
    options: [
      { value: 'video', label: 'Video Consultation', trigger: 'videoInfo' },
      { value: 'clinic', label: 'Clinic Visit', trigger: 'clinicInfo' },
      { value: 'no', label: 'No, thanks', trigger: 'askMoreHelp' },
    ],
  },
  {
    id: 'videoInfo',
    component: (
      <div>
        <p>For video consultation:</p>
        <ol className="list-decimal pl-5">
          <li>Browse and select a doctor</li>
          <li>Click on "Video Consultation"</li>
          <li>Select a time slot</li>
          <li>Complete payment</li>
          <li>You'll receive a link to join the video call</li>
        </ol>
        <a href="/doctor-consultation" className="text-primary underline">Find a doctor now</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'clinicInfo',
    component: (
      <div>
        <p>For clinic visits:</p>
        <ol className="list-decimal pl-5">
          <li>Browse and select a doctor</li>
          <li>Click on "Book Clinic Visit"</li>
          <li>Select a date and time slot</li>
          <li>Complete payment</li>
          <li>You'll receive an appointment confirmation</li>
        </ol>
        <a href="/doctor-consultation" className="text-primary underline">Find a doctor now</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'covidInfo',
    component: (
      <div>
        <p>Here's important COVID-19 information:</p>
        <ul className="list-disc pl-5">
          <li>Wear masks in crowded places</li>
          <li>Maintain social distancing</li>
          <li>Wash hands frequently</li>
          <li>Get vaccinated and boosted</li>
          <li>Test if you have symptoms</li>
        </ul>
        <p className="mt-2">Common symptoms include fever, cough, fatigue, loss of taste/smell, and difficulty breathing.</p>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'askHealthQuestion',
    message: 'What health topic would you like to know more about?',
    trigger: 'userHealthQuestion',
  },
  {
    id: 'userHealthQuestion',
    user: true,
    trigger: 'healthAnswer',
  },
  {
    id: 'healthAnswer',
    message: "Thank you for your question. While I can provide general information, it's always best to consult with a healthcare professional for personalized advice. Would you like to speak with one of our doctors?",
    trigger: 'connectDoctorOptions',
  },
  {
    id: 'connectDoctorOptions',
    options: [
      { value: 'yes', label: 'Yes, connect me with a doctor', trigger: 'connectDoctor' },
      { value: 'no', label: 'No, thanks', trigger: 'askMoreHelp' },
    ],
  },
  {
    id: 'connectDoctor',
    component: (
      <div>
        <p>You can browse our specialists and connect with them here:</p>
        <a href="/doctor-consultation" className="text-primary underline">Find a doctor</a>
      </div>
    ),
    trigger: 'askMoreHelp',
  },
  {
    id: 'askMoreHelp',
    message: 'Is there anything else I can help you with?',
    trigger: 'moreHelpOptions',
  },
  {
    id: 'moreHelpOptions',
    options: [
      { value: 'yes', label: 'Yes, I have more questions', trigger: 'options' },
      { value: 'no', label: 'No, thank you', trigger: 'endChat' },
    ],
  },
  {
    id: 'endChat',
    message: 'Thank you for chatting with me. If you have more questions later, feel free to come back!',
    end: true,
  },
];

const HealthChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-80 md:w-96">
          <div className="flex justify-between items-center bg-primary p-4">
            <h3 className="text-white font-medium">AI Health Assistant</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-primary-dark">
              <X size={20} />
            </Button>
          </div>
          <div className="h-96">
            <ThemeProvider theme={theme}>
              <ChatBot
                steps={steps}
                hideHeader={true}
                hideBotAvatar={true}
                hideUserAvatar={true}
                width="100%"
                height="100%"
                style={{
                  borderRadius: '0',
                }}
              />
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="bg-primary hover:bg-primary-dark rounded-full p-3 shadow-lg"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default HealthChatbot;
