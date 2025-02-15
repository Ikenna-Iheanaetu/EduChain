"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth-layout";
import { useLocation, useNavigate } from "react-router-dom";

export default function Recover() {
  const navigate = useNavigate();
  const location = useLocation()
  const [confirmed, setConfirmed] = useState(false);

  const phraseData: string = location.state

  if(phraseData === null){
    return(
      <AuthLayout>
        <div className="grid place-content-center">
          <h4 className="font-bold text-2xl">No phrases available</h4>
        </div>
      </AuthLayout>
    )
  }
  
  const recoveryPhrase = phraseData.split(" ");

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            Save this 12-word recovery phrase securely.
          </h1>
          <p className="text-muted-foreground">
            EduChain cannot recover it for you.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {recoveryPhrase.map((word, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-md bg-muted p-2 text-sm"
            >
              {`${index + 1}. ${word}`}
            </div>
          ))}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked as boolean)}
          />
          <label
            htmlFor="confirm"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have securely saved my recovery phrase and understand its
            importance.
          </label>
        </div>

        <Button
          className="w-full"
          disabled={!confirmed}
          onClick={() => navigate("/dashboard")}
        >
          Proceed to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
}
