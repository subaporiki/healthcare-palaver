
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const basicInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(50, { message: 'Name must be less than 50 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be less than 15 digits' }),
});

const detailsSchema = z.object({
  address: z.string().optional(),
  age: z
    .number()
    .min(1, { message: 'Age must be at least 1' })
    .max(120, { message: 'Age must be less than 120' })
    .optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  bloodGroup: z.string().optional(),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must include at least one number' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Forms for each step
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const detailsForm = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      address: '',
      age: undefined,
      gender: undefined,
      bloodGroup: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Form submission handlers
  const onBasicInfoSubmit = (values: z.infer<typeof basicInfoSchema>) => {
    setStep(2);
  };

  const onDetailsSubmit = (values: z.infer<typeof detailsSchema>) => {
    setStep(3);
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);
      
      const basicInfoValues = basicInfoForm.getValues();
      const detailsValues = detailsForm.getValues();
      
      await register(
        basicInfoValues.email,
        values.password,
        {
          fullName: basicInfoValues.fullName,
          phone: basicInfoValues.phone,
          address: detailsValues.address,
          age: detailsValues.age,
          gender: detailsValues.gender,
          bloodGroup: detailsValues.bloodGroup,
        }
      );
      
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideChatbot>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                {step === 1
                  ? 'Enter your basic information'
                  : step === 2
                  ? 'Tell us more about yourself'
                  : 'Create a secure password'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner message="Creating your account..." />
                </div>
              ) : (
                <>
                  {/* Step indicators */}
                  <div className="flex justify-between mb-6">
                    <div className={`h-2 w-1/3 ${step >= 1 ? 'bg-primary' : 'bg-gray-200'} rounded-l-full`}></div>
                    <div className={`h-2 w-1/3 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'} mx-1`}></div>
                    <div className={`h-2 w-1/3 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'} rounded-r-full`}></div>
                  </div>

                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <Form {...basicInfoForm}>
                      <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-4">
                        <FormField
                          control={basicInfoForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={basicInfoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="johndoe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={basicInfoForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="9876543210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Next <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </form>
                    </Form>
                  )}

                  {/* Step 2: Additional Details */}
                  {step === 2 && (
                    <Form {...detailsForm}>
                      <form onSubmit={detailsForm.handleSubmit(onDetailsSubmit)} className="space-y-4">
                        <FormField
                          control={detailsForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={detailsForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="30"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={detailsForm.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender (Optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={detailsForm.control}
                          name="bloodGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blood Group (Optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select blood group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A+">A+</SelectItem>
                                  <SelectItem value="A-">A-</SelectItem>
                                  <SelectItem value="B+">B+</SelectItem>
                                  <SelectItem value="B-">B-</SelectItem>
                                  <SelectItem value="AB+">AB+</SelectItem>
                                  <SelectItem value="AB-">AB-</SelectItem>
                                  <SelectItem value="O+">O+</SelectItem>
                                  <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex space-x-2">
                          <Button variant="outline" type="button" onClick={() => setStep(1)}>
                            <ChevronLeft size={16} className="mr-2" /> Back
                          </Button>
                          <Button type="submit" className="flex-1">
                            Next <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}

                  {/* Step 3: Password Creation */}
                  {step === 3 && (
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="text-xs text-gray-500">
                          Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" type="button" onClick={() => setStep(2)}>
                            <ChevronLeft size={16} className="mr-2" /> Back
                          </Button>
                          <Button type="submit" className="flex-1">
                            Create Account
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
