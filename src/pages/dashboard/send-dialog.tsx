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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  address: z.string().min(1, "Address is required"),
  price: z.string().min(1, "Price is required"),
});

export default function SendDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      price: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="text-blue-500">
          Send
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] p-4 md:p-6">
        <DialogHeader className="mb-4 md:mb-6">
          <DialogTitle className="text-lg md:text-xl">Send</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 md:h-10 text-base md:text-sm"
                      placeholder="address name...."
                      {...field}
                    />
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
                  <FormLabel className="text-sm md:text-base">Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $VC
                      </span>
                      <Input
                        className="pl-12 h-12 md:h-10 text-base md:text-sm"
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
                Send
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
