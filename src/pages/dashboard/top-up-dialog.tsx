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
import { useTopUp } from "@/hooks/topup";
import { useTransition } from "react";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
});

export default function TopUpDialog() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const topUp = useTopUp();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      topUp.mutate(
        { amount: Number(values.amount) },
        {
          onSuccess: () => {
            form.reset();
          },
          onError: () => {
            form.setError("amount", {
              type: "manual",
              message: "Failed to top up. Please try again.",
            });
          },
        }
      );
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 h-10 px-4 py-2">
          Top Up
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] p-4 md:p-6">
        <DialogHeader className="mb-4 md:mb-6">
          <DialogTitle className="text-lg md:text-xl">Top Up</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Amount</FormLabel>
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
            <Button
              type="submit"
              className="w-full h-12 md:h-10 text-base md:text-sm bg-blue-500 hover:bg-blue-600"
              disabled={topUp.status === "pending"}
            >
              {topUp.status === "pending" ? "Topping up..." : "Top Up"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
