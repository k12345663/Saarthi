
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";

const appointmentSchema = z.object({
  bookingType: z.enum(["individual", "anonymous"]),
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  counsellor: z.string({ required_error: "Please select a counsellor." }),
  date: z.date({ required_error: "Please select a date." }),
  reason: z.string().max(200, { message: "Reason must be 200 characters or less." }).optional(),
}).refine(data => {
    if (data.bookingType === 'individual') {
        return z.string().min(2, { message: "Name must be at least 2 characters." }).safeParse(data.name).success;
    }
    return true;
}, {
    message: "Name must be at least 2 characters.",
    path: ["name"],
}).refine(data => {
    if (data.bookingType === 'individual') {
        return z.string().email({ message: "Please enter a valid email." }).safeParse(data.email).success;
    }
    return true;
},
{
    message: "Please enter a valid email.",
    path: ["email"],
});


type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const counsellors = [
  { id: "1", name: "Dr. Anjali Sharma" },
  { id: "2", name: "Mr. Rohan Gupta" },
  { id: "3", name: "Ms. Priya Singh" },
];

export default function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const isAnonymous = searchParams.get('anonymous') === 'true';

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      bookingType: isAnonymous ? "anonymous" : "individual",
      name: isAnonymous ? "Anonymous" : "",
      email: "",
    },
  });

  const bookingType = form.watch("bookingType");

  useEffect(() => {
    if (bookingType === 'anonymous') {
      form.setValue('name', 'Anonymous');
      form.setValue('email', '');
      form.clearErrors('name');
      form.clearErrors('email');
    } else {
       if (form.getValues('name') === 'Anonymous') {
            form.setValue('name', '');
       }
    }
  }, [bookingType, form]);


  function onSubmit(data: AppointmentFormValues) {
    const finalData = { ...data };
    if (finalData.bookingType === 'anonymous') {
        finalData.name = 'Anonymous';
        delete finalData.email;
    }

    toast({
      title: "Appointment Booked!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(finalData, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle>Book a Counselling Session</CardTitle>
          <CardDescription>Fill out the form below to schedule your appointment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                  control={form.control}
                  name="bookingType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How would you like to attend?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="individual" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              As an Individual (Your details will be used for reminders)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="anonymous" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Anonymously (Your details will not be shared)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input 
                            placeholder="Your Name" 
                            {...field} 
                            disabled={bookingType === 'anonymous'}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                                placeholder="Your Email" 
                                {...field} 
                                disabled={bookingType === 'anonymous'}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              
              <FormField
                control={form.control}
                name="counsellor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counsellor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a counsellor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {counsellors.map((c) => (
                          <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Appointment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Appointment (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe why you are seeking counselling."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Book Appointment</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
