
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, Phone, ArrowRight } from 'lucide-react';
import { Doctor } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface VideoConsultationProps {
  doctor: Doctor;
  onClose: () => void;
}

const VideoConsultation: React.FC<VideoConsultationProps> = ({ doctor, onClose }) => {
  const [step, setStep] = useState(1); // 1: Payment, 2: Waiting, 3: Call
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Simulate payment processing
  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: "Payment successful",
        description: "Connecting you with the doctor shortly.",
      });
      
      // Simulate doctor connecting after a delay
      setTimeout(() => {
        setStep(3);
      }, 5000);
    }, 2000);
  };

  // Handle end call
  const handleEndCall = () => {
    toast({
      title: "Call ended",
      description: "Your consultation has ended. A summary will be sent to your email.",
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[700px] ${step === 3 ? 'max-h-[90vh] h-[600px]' : ''}`}>
        <DialogHeader>
          <DialogTitle>Video Consultation with {doctor.name}</DialogTitle>
        </DialogHeader>

        {/* Step 1: Confirm and Pay */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden mr-4">
                <img
                  src={doctor.imageURL}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Doctor";
                  }}
                />
              </div>
              <div>
                <h4 className="font-semibold">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.role}</p>
                <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h5 className="font-medium mb-2">Consultation Details</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Consultation Fee</span>
                  <span>₹{doctor.price.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹100.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{(doctor.price * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{(doctor.price + 100 + doctor.price * 0.18).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handlePayment} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" /> 
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <>
                    Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Waiting Room */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-10 space-y-6">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
            <LoadingSpinner size="lg" />
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Connecting with {doctor.name}</h3>
              <p className="text-gray-600">
                Please wait while we connect you with the doctor.
                <br />
                Your video consultation will begin shortly.
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        )}

        {/* Step 3: Active Call */}
        {step === 3 && (
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gray-900 rounded-md overflow-hidden relative">
              {/* Remote video (doctor) - mocked as static image for this demo */}
              <div className="h-full w-full flex items-center justify-center">
                <img
                  src={doctor.imageURL}
                  alt={doctor.name}
                  className="max-h-full max-w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Doctor";
                  }}
                />
              </div>
              
              {/* Local video (patient) */}
              <div className="absolute bottom-4 right-4 h-32 w-48 border-2 border-white rounded overflow-hidden">
                {isVideoOff ? (
                  <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                ) : (
                  <Webcam
                    ref={webcamRef}
                    audio={true}
                    muted={true}
                    videoConstraints={{
                      width: 320,
                      height: 180,
                      facingMode: "user"
                    }}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              
              {/* Doctor name overlay */}
              <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
                {doctor.name}
              </div>
            </div>
            
            {/* Call controls */}
            <div className="py-4 flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
              >
                {isAudioMuted ? (
                  <MicOff className="h-5 w-5 text-red-500" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? (
                  <VideoOff className="h-5 w-5 text-red-500" />
                ) : (
                  <Video className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="destructive"
                size="icon"
                onClick={handleEndCall}
                className="h-12 w-12 rounded-full"
              >
                <Phone className="h-6 w-6 rotate-[135deg]" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoConsultation;
