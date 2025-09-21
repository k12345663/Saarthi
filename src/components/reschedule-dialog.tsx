
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';

interface RescheduleDialogProps {
  appointment: {
    counsellor: string;
    date: string;
  };
}

export function RescheduleDialog({ appointment }: RescheduleDialogProps) {
  const [reason, setReason] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleSubmit = () => {
    // Basic validation
    if (!newDate || !reason) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a new date and provide a reason.',
      });
      return;
    }

    // In a real app, you would call an API to reschedule the appointment
    console.log({
      originalAppointment: appointment,
      newDate,
      reason,
    });

    toast({
      title: 'Reschedule Request Sent',
      description: `Your request to reschedule with ${appointment.counsellor} has been submitted.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Reschedule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Request to reschedule your appointment with {appointment.counsellor}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="current-appointment" className="text-right col-span-4 text-sm font-normal text-muted-foreground">
              Current: {appointment.date}
            </Label>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="reason">Reason for rescheduling</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a brief reason for your request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
           <div className="grid w-full gap-1.5">
            <Label>Select a new date</Label>
            <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                disabled={(date) =>
                    date < new Date(new Date().setDate(new Date().getDate()))
                }
                className="rounded-md border self-center"
            />
           </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>Send Request</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
