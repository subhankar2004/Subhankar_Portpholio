"use client";
import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import LightRays from "@/blocks/Backgrounds/LightRays/LightRays";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";

interface FormData {
  name: string;
  email: string;
  rating: number;
  company: string;
  category: string;
  message: string;
  avatarURL: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rating: 0,
    company: "",
    category: "",
    message: "",
    avatarURL: "",
  });

  return (
    <div className="min-h-screen">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#0ea5e9", "#7c3aed", "#f472b6"]} // example website theme colors (cyan, violet, pink)
        speed={1.2}
        blend={0.6}
        amplitude={3.1}
      />

      
    </div>
  );
}

