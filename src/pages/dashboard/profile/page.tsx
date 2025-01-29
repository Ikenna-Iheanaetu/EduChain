"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import DashboardHeader from "@/pages/dashboard/dashboard-header";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "sam@gmail.com",
      firstName: "Essam",
      lastName: "Essam",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Handle form submission
    console.log(values);
    setIsLoading(false);
  }

  return (
    <DashboardLayout>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-auto bg-white">
        {/* Header */}
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-6 max-w-2xl">
          <h1 className="text-xl font-semibold mb-6">Account details</h1>

          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-gray-500">Avatar</h2>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* The change avatar should be an input for an image file */}
                  <Button variant="outline" className="text-[#0095FF]">
                    Change Avatar
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove avatar</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-500">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-500">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-500">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#0095FF] hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving changes..." : "Save changes"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
