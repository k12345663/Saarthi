'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';


interface RescheduleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: {
        id: string;
        counsellor: string;
        datetime: string;
    }
}

export function RescheduleDialog({ isOpen, onClose, appointment }: RescheduleDialogProps) {
    const [newDate, setNewDate] = useState<Date | undefined>();
    const [reason, setReason] = useState('');
    const { toast } = useToast();

    const handleSubmit = () => {
        if (!newDate) {
            toast({
                title: "Error",
                description: "Please select a new date.",
                variant: "destructive"
            });
            return;
        }

        console.log({
            appointmentId: appointment.id,
            newDate,
            reason,
        });
        
        toast({
            title: "Reschedule Request Sent",
            description: `Your request to reschedule with ${appointment.counsellor} has been submitted.`
        })
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <DialogDescription>
                        Request to reschedule your appointment with {appointment.counsellor}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="new-date">New Appointment Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !newDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newDate ? format(newDate, "PPP") : <span>Pick a new date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={newDate}
                                    onSelect={setNewDate}
                                    disabled={(date) =>
                                        date < new Date(new Date().setDate(new Date().getDate()))
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., academic conflict, feeling unwell..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
