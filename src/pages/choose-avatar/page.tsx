"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth-layout";
import { useLocation } from "react-router-dom";
import { useRegister } from "@/hooks/auth";

const avatars = [
  "/src/assets/avatars/first.png",
  "/src/assets/avatars/second.png",
  "/src/assets/avatars/third.png",
  "/src/assets/avatars/fourth.png",
  "/src/assets/avatars/fifth.png",
  "/src/assets/avatars/sixth.jpeg",
];

export default function ChooseAvatar() {
  const location = useLocation();
  const register = useRegister();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const registrationData = location.state;

  const handleConfirmAvatar = () => {
    if (selectedAvatar === null) {
      return;
    }

    register.mutate({
      ...registrationData,
      avatar_number: selectedAvatar + 1,
    });
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Choose Avatar</h1>
        </div>

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
                src={avatar || "/placeholder.svg"}
                alt={`Avatar option ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          disabled={selectedAvatar === null}
          onClick={() => handleConfirmAvatar()}
        >
          {register.status === "pending" ? (
            <>
              <span>Creating Account...</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            "Confirm Avatar"
          )}
        </Button>
        {register.error && (
          <p className="text-sm font-medium text-red-500 text-center">
            {register.error.response?.data?.error}
          </p>
        )}
      </div>
    </AuthLayout>
  );
}
