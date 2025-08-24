"use client";
import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Star } from "lucide-react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";


interface FormData {
  name: string;
  title: string;
  company: string;
  email: string;
  rating: number;
  message: string;
  category: string;
  avatarUrl: string;
  allowPublic: boolean;
}

interface FormErrors {
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  rating?: string;
  message?: string;
  category?: string;
}

export default  function TestimonialForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    company: "",
    email: "",
    rating: 0,
    message: "",
    category: "",
    avatarUrl: "",
    allowPublic: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const categories = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Consultation",
    "Technical Support",
    "Project Management",
    "Other"
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Testimonial message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Testimonial must be at least 20 characters long";
    }
    
    if (!formData.category.trim()) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    
    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Use a relative URL for the API call
      const response = await fetch("/api/contact/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Removed isApproved and isPublished for security
        body: JSON.stringify({
          name: formData.name.trim(),
          title: formData.title.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          rating: formData.rating,
          message: formData.message.trim(),
          category: formData.category.trim(),
          avatarUrl: formData.avatarUrl.trim() || null,
          allowPublic: formData.allowPublic,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          title: "",
          company: "",
          email: "",
          rating: 0,
          message: "",
          category: "",
          avatarUrl: "",
          allowPublic: true,
        });
      } else {
        setSubmitStatus("error");
        console.error("Error submitting testimonial:", data.message);
      }
    } catch (error) {
      console.error("Network error submitting testimonial:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className={`p-1 transition-all duration-200 hover:scale-110 ${
              star <= formData.rating
                ? "text-yellow-400"
                : "text-slate-600 hover:text-yellow-400"
            }`}
          >
            <Star
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${
                star <= formData.rating ? "fill-current" : ""
              }`}
            />
          </button>
        ))}
      </div>
    );
  };
  

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Aurora
          colorStops={["#0ea5e9", "#7c3aed", "#f472b6"]}
          speed={1.2}
          blend={0.6}
          amplitude={3.1}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-80"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 sm:top-20 left-6 sm:left-10 text-cyan-400/30 text-lg sm:text-2xl animate-pulse">✦</div>
          <div className="absolute top-32 sm:top-40 right-12 sm:right-20 text-purple-400/20 text-base sm:text-xl animate-pulse" style={{animationDelay: '1s'}}>✧</div>
          <div className="absolute bottom-32 sm:bottom-40 left-12 sm:left-20 text-pink-400/25 text-sm sm:text-lg animate-pulse" style={{animationDelay: '2s'}}>✦</div>
          <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 text-cyan-400/30 text-lg sm:text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>✧</div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-20 flex flex-col justify-center min-h-screen max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center pb-4 sm:pb-6 md:pb-8 lg:pb-12">
          <div 
            className="animate-fade-in-up w-full"
            style={{
              animation: 'fadeInUp 0.8s ease-out'
            }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-white max-w-4xl mx-auto px-2 leading-tight">
              {/* Mobile heading */}
              <div className="block sm:hidden">
                <BlurText 
                  text="Write a Testimonial" 
                  delay={0.1} 
                  className="text-xl font-bold text-white leading-tight" 
                />
              </div>
              {/* Tablet and Desktop heading */}
              <div className=" flex items-center justify-center">
                <BlurText 
                  text="Write a Testimonial" 
                  delay={0.1} 
                  className="text-xl font-bold text-white leading-tight" 
                />
              </div>
            </h1>
          </div>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>
        
        {/* Form Section */}
        <div className="flex justify-center items-start px-2 sm:px-0">
          <div className="w-full max-w-3xl">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 border border-slate-700/50 shadow-2xl shadow-purple-500/5">
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl backdrop-blur-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <p className="text-emerald-300 font-medium text-sm sm:text-base lg:text-lg">Testimonial submitted successfully!</p>
                      <p className="text-emerald-400/80 text-xs sm:text-sm mt-1">Thank you for your feedback. It will be reviewed before publishing.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl backdrop-blur-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <p className="text-red-300 font-medium text-sm sm:text-base lg:text-lg">Something went wrong</p>
                      <p className="text-red-400/80 text-xs sm:text-sm mt-1">Please try again or contact me directly.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Added form element wrapper */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Name and Title Row */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
                  {/* Name Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base ${
                        errors.name ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Title Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base ${
                        errors.title ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                      }`}
                      placeholder="e.g. CEO, Developer"
                    />
                    {errors.title && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
                  {/* Company Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                    >
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base ${
                        errors.company ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.company}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base ${
                        errors.email ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                      }`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating and Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
                  {/* Rating Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide">
                      Rating *
                    </label>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <StarRating />
                      {formData.rating > 0 && (
                        <p className="text-xs sm:text-sm text-slate-400">
                          {formData.rating} out of 5 stars
                        </p>
                      )}
                    </div>
                    {errors.rating && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                    >
                      Service Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base ${
                        errors.category ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900">
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Avatar URL Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="avatarUrl"
                    className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                  >
                    Profile Picture URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border border-slate-600/30 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-purple-300 tracking-wide"
                  >
                    Your Testimonial *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 bg-slate-900/70 border rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 resize-none text-sm sm:text-base ${
                      errors.message ? 'border-red-500/50 focus:ring-red-400/50' : 'border-slate-600/30'
                    }`}
                    placeholder="Share your experience working with me. What was the project about? How did it go? Would you recommend my services?"
                  />
                  {errors.message && (
                    <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    id="allowPublic"
                    name="allowPublic"
                    checked={formData.allowPublic}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 bg-slate-900/70 border-slate-600/30 rounded focus:ring-purple-400/50 focus:ring-2 mt-0.5 sm:mt-0"
                  />
                  <label htmlFor="allowPublic" className="text-xs sm:text-sm text-slate-300 leading-tight">
                    I allow this testimonial to be displayed publicly on the website
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-1 sm:pt-2 lg:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed group text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        Submit Testimonial
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Note */}
              <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Your testimonial will be reviewed before being published. Thank you for taking the time to share your experience!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
