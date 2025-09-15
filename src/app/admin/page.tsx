
'use client';

import { BarChart, LineChart, PieChart, Users, TrendingUp, Download, Search, AlertCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';

const summaryData = {
  totalStudents: 1250,
  assessmentsCompleted: 850,
  atRisk: 120,
};

const assessmentDistribution = [
  { name: 'None-Minimal', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Mild', value: 250, fill: 'hsl(var(--chart-2))' },
  { name: 'Moderate', value: 150, fill: 'hsl(var(--chart-3))' },
  { name: 'Moderately Severe', value: 30, fill: 'hsl(var(--chart-4))' },
  { name: 'Severe', value: 20, fill: 'hsl(var(--chart-5))' },
];

const chartConfig: ChartConfig = {
  count: {
    label: "Students",
  },
  'None-Minimal': {
    label: "None-Minimal",
    color: "hsl(var(--chart-1))",
  },
  Mild: {
    label: "Mild",
    color: "hsl(var(--chart-2))",
  },
  Moderate: {
    label: "Moderate",
    color: "hsl(var(--chart-3))",
  },
  'Moderately Severe': {
    label: "Moderately Severe",
    color: "hsl(var(--chart-4))",
  },
  Severe: {
    label: "Severe",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;


const trendsData = [
  { month: 'Jan', atRisk: 15 },
  { month: 'Feb', atRisk: 20 },
  { month: 'Mar', atRisk: 18 },
  { month: 'Apr', atRisk: 25 },
  { month: 'May', atRisk: 22 },
  { month: 'Jun', atRisk: 30 },
];

const studentData = [
  { id: 'STU-001', date: '2024-06-15', score: 21, level: 'Severe' },
  { id: 'STU-002', date: '2024-06-15', score: 8, level: 'Mild' },
  { id: 'STU-003', date: '2024-06-14', score: 14, level: 'Moderate' },
  { id: 'STU-004', date: '2024-06-14', score: 3, level: 'None-Minimal' },
  { id: 'STU-005', date: '2024-06-13', score: 18, level: 'Moderately Severe' },
  { id: 'STU-006', date: '2024-06-12', score: 5, level: 'Mild' },
];


const getBadgeVariant = (level: string) => {
  switch (level) {
    case 'Severe':
    case 'Moderately Severe':
      return 'destructive';
    case 'Moderate':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function AdminDashboardPage() {
  const handleReportGeneration = () => {
    // In a real app, this would trigger a CSV or PDF download.
    alert('Generating report...');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
         <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Admin Analytics Dashboard</h1>
         </div>
         <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReportGeneration}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
         </div>
      </header>
      <main className="flex-1 space-y-8 p-4 sm:px-6 sm:py-0">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.assessmentsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                {((summaryData.assessmentsCompleted / summaryData.totalStudents) * 100).toFixed(1)}% of total students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Students Needing Help</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.atRisk}</div>
              <p className="text-xs text-muted-foreground">
                Moderate, Moderately Severe, or Severe
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Assessment Score Distribution</CardTitle>
                    <CardDescription>Distribution of student wellness levels based on PHQ-9 scores.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <RechartsBarChart accessibilityLayer data={assessmentDistribution}>
                           <CartesianGrid vertical={false} />
                           <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                           <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                           <Bar dataKey="value" name="Students" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>At-Risk Trends</CardTitle>
                    <CardDescription>Number of students identified as at-risk over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{atRisk: { label: "At-Risk", color: "hsl(var(--destructive))"}}} className="min-h-[200px] w-full">
                       <RechartsLineChart accessibilityLayer data={trendsData}>
                           <CartesianGrid vertical={false} />
                           <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                           <Line type="monotone" dataKey="atRisk" stroke="hsl(var(--destructive))" strokeWidth={2} dot={true} />
                       </RechartsLineChart>
                   </ChartContainer>
                </CardContent>
            </Card>
        </div>

        {/* Student Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Assessment Data</CardTitle>
            <CardDescription>Anonymized list of recent student assessments.</CardDescription>
             <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by Student ID..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Assessment Date</TableHead>
                  <TableHead>Score (PHQ-9)</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.date}</TableCell>
                    <TableCell>{student.score}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(student.level)}>{student.level}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
