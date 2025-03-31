
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Doctor } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ doctor, onClose }) => {
  const [step, setStep] = useState(1); // 1: Select date/time, 2: Payment, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser, userDetails } = useAuth();
  
  // Available time slots
  const morningSlots = ['09:00', '10:00', '11:00'];
  const afternoonSlots = ['12:00', '14:00', '15:00'];
  const eveningSlots = ['16:00', '17:00', '18:00'];
  
  // Function to check if date and time are selected
  const isDateTimeSelected = selectedDate && selectedTime;
  
  // Handle proceed to payment step
  const handleProceedToPayment = () => {
    if (!isDateTimeSelected) {
      toast({
        title: "Please select date and time",
        description: "You need to choose an appointment date and time to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setStep(2);
  };
  
  // Handle payment process
  const handlePayment = async () => {
    if (!currentUser || !selectedDate || !selectedTime) return;
    
    setIsLoading(true);
    
    try {
      // Create appointment in Firestore
      const appointmentData = {
        doctorId: doctor.doctorId,
        doctorName: doctor.name,
        patientId: currentUser.uid,
        patientName: userDetails?.fullName || currentUser.displayName || 'Patient',
        date: selectedDate,
        time: selectedTime,
        status: 'confirmed',
        type: 'clinic',
        paid: true,
        amount: doctor.price,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, 'appointments'), appointmentData);
      
      // Show success toast
      toast({
        title: "Appointment booked successfully!",
        description: `Your appointment with ${doctor.name} on ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime} has been confirmed.`,
      });
      
      // Move to confirmation step
      setStep(3);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Failed to book appointment",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book Clinic Visit with {doctor.name}</DialogTitle>
        </DialogHeader>
        
        {/* Step 1: Select Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-start">
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
                <p className="text-sm text-gray-600">Consultation Fee: ₹{doctor.price.toFixed(0)}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Select Date</h4>
              <div className="border rounded-md overflow-hidden">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < new Date() || 
                    date > addDays(new Date(), 30) || 
                    date.getDay() === 0 // Disable Sundays
                  }
                  className="rounded-md border"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Select Time Slot</h4>
              <Tabs defaultValue="morning">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="morning">Morning</TabsTrigger>
                  <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
                  <TabsTrigger value="evening">Evening</TabsTrigger>
                </TabsList>
                
                <TabsContent value="morning" className="mt-3">
                  <div className="grid grid-cols-3 gap-2">
                    {morningSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "justify-start",
                          selectedTime === time && "border-primary-dark"
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="afternoon" className="mt-3">
                  <div className="grid grid-cols-3 gap-2">
                    {afternoonSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "justify-start",
                          selectedTime === time && "border-primary-dark"
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="evening" className="mt-3">
                  <div className="grid grid-cols-3 gap-2">
                    {eveningSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "justify-start",
                          selectedTime === time && "border-primary-dark"
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {selectedDate && selectedTime && (
              <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>
                    You've selected {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={handleProceedToPayment} 
                disabled={!isDateTimeSelected}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Payment */}
        {step === 2 && (
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
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h5 className="font-medium mb-2">Payment Details</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Consultation Fee</span>
                  <span>₹{doctor.price.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee</span>
                  <span>₹50.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{(doctor.price * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{(doctor.price + 50 + doctor.price * 0.18).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handlePayment} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" /> 
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-4">
                Your appointment with {doctor.name} has been scheduled for{' '}
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}.
              </p>
              <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                <h5 className="font-medium mb-2">Appointment Details</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span>{doctor.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Specialty:</span>
                    <span>{doctor.role}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span>{selectedTime}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBooking;
