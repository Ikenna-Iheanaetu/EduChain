"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCreateCourse } from "@/hooks/course";
import { useTransition } from "react";

const formSchema = z.object({
  colorCard: z.string().min(1, "Please select a color"),
  courseName: z.string().min(1, "Course name is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  maxRequests: z.string().min(1, "Max Requests is required"),
});

export default function CreateCourseDialog() {
  const createCourse = useCreateCourse();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransaction] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colorCard: "",
      courseName: "",
      duration: "",
      price: "",
      maxRequests: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransaction(() => {
      createCourse.mutate({
        course_name: values.courseName,
        price: Number(values.price),
        duration: Number(values.duration),
        color:
          values.colorCard === "blue"
            ? "#F0F7FF"
            : values.colorCard === "beige"
            ? "#F0FFF4"
            : "#FFFAF0",
        max_requests: Number(values.maxRequests),
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="text-blue-500">
          Create your course
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] p-4 md:p-6">
        <DialogHeader className="mb-4 md:mb-6">
          <DialogTitle className="text-lg md:text-xl">
            Create Course
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="colorCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    Color card
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 md:h-10">
                        <SelectValue placeholder="Blue" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="beige">Beige</SelectItem>
                      <SelectItem value="mint">Mint</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    Course Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 md:h-10 text-base md:text-sm"
                      placeholder="Enter course name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    duration
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-12 md:h-10 text-base md:text-sm"
                        placeholder="enter duration"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        className="pl-6 h-12 md:h-10 text-base md:text-sm"
                        placeholder="0.899"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    Max Requests
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pl-6 h-12 md:h-10 text-base md:text-sm"
                        placeholder="0.899"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="h-12 sm:h-10 text-base sm:text-sm w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancel
                </Button>
              </DialogTrigger>
              <Button
                type="submit"
                className="h-12 sm:h-10 text-base sm:text-sm w-full sm:w-auto order-1 sm:order-2 bg-blue-500 hover:bg-blue-600"
              >
                {createCourse.status === "pending"
                  ? "Creating course...."
                  : "Create"}
              </Button>
            </div>
            {createCourse.error && (
              <p className="text-sm font-medium text-red-500 text-center">
                {createCourse.error.response?.data?.error}
              </p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
