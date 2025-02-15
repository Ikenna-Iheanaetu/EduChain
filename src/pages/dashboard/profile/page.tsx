"use client";

import { useState, useTransition } from "react";
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
import First from "@/assets/avatars/first.png";
import Second from "@/assets/avatars/second.png";
import Third from "@/assets/avatars/third.png";
import Fourth from "@/assets/avatars/fourth.png";
import Fifth from "@/assets/avatars/fifth.png";
import Sixth from "@/assets/avatars/sixth.jpeg";
import { cn } from "@/lib/utils";
import { useProfile, useUpdateProfile } from "@/hooks/profile";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const [changeAvatar, setChangeAvatar] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(
    profile?.avatar_number ?? 1
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const avatars = [First, Second, Third, Fourth, Fifth, Sixth];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile?.email,
      firstName: profile?.firstname,
      lastName: profile?.lastname,
    },
  });

  const pickAnImage = (imageNumber: number) => {
    switch (imageNumber) {
      case 1:
        return First;

      case 2:
        return Second;

      case 3:
        return Third;

      case 4:
        return Fourth;

      case 5:
        return Fifth;

      case 6:
        return Sixth;

      default:
        break;
    }
  };

  interface UpdateCheckType {
    firstname: string | undefined;
    lastname: string | undefined;
    avatar_number: number | undefined;
  }

  type UpdateValues = {
    firstName?: string;
    lastName?: string;
    avatar_number?: number;
  };

  const keyMappings: Record<string, keyof UpdateCheckType> = {
    firstName: "firstname",
    lastName: "lastname",
    avatar_number: "avatar_number",
  };

  type NormalizedKey = keyof UpdateCheckType;

  const getUpdatedValues = (
    oldObj: Partial<UpdateCheckType>,
    newObj: UpdateValues
  ): Partial<UpdateCheckType> => {
    const updatedValues = {} as Partial<UpdateCheckType>;

    (Object.entries(newObj) as [keyof UpdateValues, string | number][]).forEach(
      ([key, value]) => {
        const normalizedKey = keyMappings[key] || (key as NormalizedKey);

        // Skip undefined values
        if (value === undefined) return;

        // Only add to updatedValues if the values are different
        if (oldObj[normalizedKey] !== value) {
          if (normalizedKey === "avatar_number") {
            updatedValues[normalizedKey] = value as number;
          } else {
            updatedValues[normalizedKey] = value as string;
          }
        }
      }
    );

    return updatedValues;
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const oldValues = {
      firstname: profile?.firstname,
      lastname: profile?.lastname,
      avatar_number: profile?.avatar_number,
    };
    const newValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      avatar_number: selectedAvatar,
    };

    const updatedValues = getUpdatedValues(oldValues, newValues);

    if (Object.keys(updatedValues).length === 0) {
      toast.warning("You did not change any of your profile data");
    }

    startTransition(() => {
      updateProfile.mutate({
        ...updatedValues,
      });
      setChangeAvatar(false);
      setSelectedAvatar(profile?.avatar_number ?? 1);
    });
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
                    src={
                      profile?.avatar_number
                        ? pickAnImage(profile.avatar_number)
                        : ""
                    }
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="text-[#0095FF]"
                    onClick={() => {
                      setChangeAvatar(!changeAvatar);
                      setSelectedAvatar(profile?.avatar_number ?? 1);
                    }}
                  >
                    {changeAvatar ? "Not Changing Avatar" : "Change Avatar"}
                  </Button>
                </div>
              </div>
            </div>

            {/* The avatar images to choose from */}

            {changeAvatar && (
              <div className="grid grid-cols-3 gap-4">
                {avatars.map((avatar, index) => (
                  <button
                    key={index}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      selectedAvatar === index && "border-primary"
                    )}
                    onClick={() => setSelectedAvatar(index)}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

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
                        <Input {...field} disabled />
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
                  disabled={updateProfile.status === "pending"}
                >
                  {updateProfile.status === "pending"
                    ? "Saving changes..."
                    : "Save changes"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
