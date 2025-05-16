import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lead, Customer, Payment } from "@/lib/types";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [leadFilter, setLeadFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [timeframe, setTimeframe] = useState("all");

  // Fetch leads data
  const { data: leads = [], isLoading: isLoadingLeads } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  // Fetch customers data
  const { data: customers = [], isLoading: isLoadingCustomers } = useQuery<Customer[]>({
    queryKey: ['/api/customers'],
  });

  // Fetch payments data
  const { data: payments = [], isLoading: isLoadingPayments } = useQuery<Payment[]>({
    queryKey: ['/api/payments'],
  });

  // Filter leads based on search input
  const filteredLeads = leads.filter(lead => 
    lead.businessName.toLowerCase().includes(leadFilter.toLowerCase()) ||
    lead.email.toLowerCase().includes(leadFilter.toLowerCase())
  );

  // Filter customers based on search input
  const filteredCustomers = customers.filter(customer => 
    customer.businessName.toLowerCase().includes(customerFilter.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerFilter.toLowerCase())
  );

  // Filter payments based on timeframe
  const filteredPayments = payments.filter(payment => {
    if (timeframe === "all") return true;
    
    const paymentDate = new Date(payment.createdAt);
    const now = new Date();
    
    switch (timeframe) {
      case "today":
        return paymentDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return paymentDate >= weekAgo;
      case "month":
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return paymentDate >= monthAgo;
      default:
        return true;
    }
  });

  // Calculate total revenue
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  // Calculate conversion rate (customers / leads)
  const conversionRate = leads.length > 0 
    ? ((customers.length / leads.length) * 100).toFixed(1) 
    : "0";

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - GrowthPro</title>
        <meta name="description" content="Admin dashboard for managing leads, customers, and payments" />
      </Helmet>

      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Leads</CardTitle>
              <CardDescription>All time lead acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{leads.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customers</CardTitle>
              <CardDescription>Paying customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{customers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Lead to customer conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{conversionRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Total from {filteredPayments.length} payments
            </p>
          </CardContent>
        </Card>

        {/* Data Tabs */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Search leads..."
                value={leadFilter}
                onChange={(e) => setLeadFilter(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline">Export</Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableCaption>
                  {isLoadingLeads ? "Loading leads..." : `A list of ${filteredLeads.length} leads`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Date Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingLeads ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No leads found</TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.businessName}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.website || "—"}</TableCell>
                        <TableCell>{format(new Date(lead.createdAt), "MMM d, yyyy")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Search customers..."
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline">Export</Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableCaption>
                  {isLoadingCustomers ? "Loading customers..." : `A list of ${filteredCustomers.length} customers`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingCustomers ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No customers found</TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.businessName}</TableCell>
                        <TableCell>{customer.contactName}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell className="capitalize">{customer.plan}</TableCell>
                        <TableCell>{format(new Date(customer.createdAt), "MMM d, yyyy")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <div className="border rounded-md">
              <Table>
                <TableCaption>
                  {isLoadingPayments ? "Loading payments..." : `A list of ${filteredPayments.length} payments`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingPayments ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No payments found</TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.customerId}</TableCell>
                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                        <TableCell className="uppercase">{payment.currency}</TableCell>
                        <TableCell className="capitalize">{payment.status}</TableCell>
                        <TableCell>{format(new Date(payment.createdAt), "MMM d, yyyy")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;