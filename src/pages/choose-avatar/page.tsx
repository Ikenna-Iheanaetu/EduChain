"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth-layout";
import { useNavigate } from "react-router-dom";

const avatars = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
];

export default function ChooseAvatar() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

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
          onClick={() => navigate("/recover")}
        >
          Proceed
        </Button>
      </div>
    </AuthLayout>
  );
}
