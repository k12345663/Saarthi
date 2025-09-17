
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const totalStudents = 1250;
const assessmentsCompleted = 850;
const studentsNeedingSupport = 210;

const assessmentData = [
  { name: 'Jan', count: 65 },
  { name: 'Feb', count: 59 },
  { name: 'Mar', count: 80 },
  { name: 'Apr', count: 81 },
  { name: 'May', count: 56 },
  { name: 'Jun', count: 55 },
  { name: 'Jul', count: 40 },
];

const severityData = [
  { name: 'None-Minimal', value: 450, fill: 'var(--color-success)' },
  { name: 'Mild', value: 250, fill: 'var(--color-warning)' },
  { name: 'Moderate', value: 100, fill: 'var(--color-moderate)' },
  { name: 'Moderately Severe', value: 35, fill: 'var(--color-severe)' },
  { name: 'Severe', value: 15, fill: 'var(--color-critical)' },
];

const studentDataTable = [
  { id: 'STU-001', score: 22, risk: 'Severe', date: '2023-10-28' },
  { id: 'STU-002', score: 8, risk: 'Mild', date: '2023-10-28' },
  { id: 'STU-003', score: 15, risk: 'Moderately Severe', date: '2023-10-27' },
  { id: 'STU-004', score: 2, risk: 'None-minimal', date: '2023-10-27' },
  { id: 'STU-005', score: 12, risk: 'Moderate', date: '2023-10-26' },
];

const problemData = [
  { problem: 'Feeling down/hopeless', count: 320 },
  { problem: 'Anxiety/worry', count: 280 },
  { problem: 'Sleep issues', count: 250 },
  { problem: 'Little interest/pleasure', count: 210 },
  { problem: 'Trouble concentrating', count: 180 },
  { problem: 'Feeling tired', count: 150 },
];


export default function IQACDashboardPage() {
    return (
    <div className="flex flex-col bg-muted/40 min-h-screen">
       <header className="bg-background border-b p-4">
            <h1 className="text-2xl font-bold">IQAC Analytics Dashboard</h1>
       </header>
       <main className="flex-1 p-4 md:p-6 space-y-6">
            {/* At a glance metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalStudents}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Assessments Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{assessmentsCompleted}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Students Needing Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{studentsNeedingSupport}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Assessments Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={assessmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" name="Assessments" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Assessment Result Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={severityData} layout="vertical" margin={{ left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="value" name="Number of Students" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            {/* Commonly Reported Problems */}
            <Card>
                <CardHeader>
                    <CardTitle>Commonly Reported Problems</CardTitle>
                    <CardDescription>Based on PHQ-9 & GAD-7 assessment data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={problemData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="problem" angle={-45} textAnchor="end" height={80} interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="hsl(var(--primary))" name="Student Reports" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>


            {/* Student Data Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Student Assessment Data</CardTitle>
                        <CardDescription>Anonymized list of recent assessments.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Assessment Score</TableHead>
                                <TableHead>Risk Level</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentDataTable.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.score}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            student.risk === 'Severe' || student.risk === 'Moderately Severe' ? 'destructive' :
                                            student.risk === 'Moderate' ? 'secondary' : 'default'
                                        }>{student.risk}</Badge>
                                    </TableCell>
                                    <TableCell>{student.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
       </main>
    </div>
    )
}
