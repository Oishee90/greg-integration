// src/components/SubscriptionPlans.jsx
import { useState } from "react";
import { Check, Edit, Plus } from "lucide-react";
import PlanModal from "./PlanModal";

const plans = [
  {
    id: 1,
    name: "Free Plan",
    description: "Basic access with limited features",
    price: 0,
    billingCycle: "N/A (Free)",
    isDefault: true,
    features: [
      {
        title: "1. App Store Optimization (ASO)",
        items: [
          "Monitor download numbers daily",
          "Respond to any initial reviews (positive/negative)",
          "Update screenshots based on early user feedback",
        ],
      },
      {
        title: "2. Initial User Support",
        items: [
          "Set up a simple support email (e.g., Gmail)",
          "Create a FAQ section in-app for common issues",
        ],
      },
      {
        title: "3. Basic Analytics",
        items: [
          "Track daily active users (Firebase Analytics)",
          "Monitor App usage (crash reports)",
          "Identify crash reports (Firebase Crashlytics)",
        ],
      },
    ],
    status: "active",
  },
  {
    id: 2,
    name: "Premium Monthly",
    description: "Full access with all premium features",
    price: 4.99,
    billingCycle: "monthly",
    isDefault: true,
    features: [
      {
        title: "1. Marketing Basics",
        items: [
          "Share on social media (Twitter, LinkedIn, Reddit, TikTok)",
          "Tell friends/family to download and review",
          "Submit to app review sites (Product Hunt, AppAdvice)",
        ],
      },
      {
        title: "2. Gather Feedback",
        items: [
          "Monitor user behavior patterns",
          'In-app feedback button ("How can we improve?")',
          "Identify most-used features",
        ],
      },
      {
        title: "3. Cost Management",
        items: [
          "Track daily active users (Firebase Analytics)",
          "Set budget alerts for OpenAI API ($10/20/month warning)",
          "Monitor Firebase usage to stay in free tier",
        ],
      },
    ],
    status: "deactivate",
  },
  {
    id: 3,
    name: "Free Plan",
    description: "Basic access with limited features",
    price: 0,
    billingCycle: "N/A (Free)",
    isDefault: true,
    features: [
      {
        title: "1. App Store Optimization (ASO)",
        items: [
          "Monitor download numbers daily",
          "Respond to any initial reviews (positive/negative)",
          "Update screenshots based on early user feedback",
        ],
      },
      {
        title: "2. Initial User Support",
        items: [
          "Set up a simple support email (e.g., Gmail)",
          "Create a FAQ section in-app for common issues",
        ],
      },
      {
        title: "3. Basic Analytics",
        items: [
          "Track daily active users (Firebase Analytics)",
          "Monitor App usage (crash reports)",
          "Identify crash reports (Firebase Crashlytics)",
        ],
      },
    ],
    status: "active",
  },
  {
    id: 4,
    name: "Premium Monthly",
    description: "Full access with all premium features",
    price: 4.99,
    billingCycle: "monthly",
    isDefault: true,
    features: [
      {
        title: "1. Marketing Basics",
        items: [
          "Share on social media (Twitter, LinkedIn, Reddit, TikTok)",
          "Tell friends/family to download and review",
          "Submit to app review sites (Product Hunt, AppAdvice)",
        ],
      },
      {
        title: "2. Gather Feedback",
        items: [
          "Monitor user behavior patterns",
          'In-app feedback button ("How can we improve?")',
          "Identify most-used features",
        ],
      },
      {
        title: "3. Cost Management",
        items: [
          "Track daily active users (Firebase Analytics)",
          "Set budget alerts for OpenAI API ($10/20/month warning)",
          "Monitor Firebase usage to stay in free tier",
        ],
      },
    ],
    status: "active",
  },
];

const SubscriptionPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // null = create, object = edit

  const openCreateModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white outfit">
      <div className="px-6 py-6 ">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 mb-8 lg:flex-row lg:items-center">
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 font-medium text-white transition bg-orange-600 rounded-md hover:bg-orange-700"
          >
            <Plus className="w-5 h-5" />
            Create New Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col h-full bg-white border border-gray-300 shadow-sm rounded-xl"
            >
              {/* Card Content - grows to fill space */}
              <div className="flex flex-col flex-1 ">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 px-6 pt-4  rounded-t-xl pb-6 border-b-2 border-gray-200 bg-[#FFFFFF]">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h2>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  {plan.isDefault && (
                    <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6 px-6">
                  <p className="text-lg font-bold text-gray-700">
                    User Acquisition & Retention
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                    {plan.price > 0 && (
                      <span className="text-sm font-normal text-gray-600">
                        /{plan.billingCycle}
                      </span>
                    )}
                  </p>
                </div>

                {/* Features - takes remaining space */}
                <div className="flex-1 space-y-5 px-6 pb-2">
                  {plan.features.map((feat, idx) => (
                    <div key={idx}>
                      <h3 className="flex items-center gap-2 font-medium text-gray-900">
                        {idx === 0 ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                            <Check className="w-4 h-4 text-orange-600" />
                          </div>
                        ) : (
                          <div className="w-4 h-4"></div>
                        )}
                        {feat.title}
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside ml-7">
                        {feat.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Border + Buttons - always at bottom */}
              <div className="px-6 pt-4 rounded-b-xl pb-6 border-t-2 border-gray-200 bg-[#FFFFFF]">
                <div className="flex items-center justify-between gap-3">
                  {plan.status === "active" ? (
                    <>
                      <button className="px-4 py-2 font-medium text-white transition bg-green-600 rounded-xl outfit hover:bg-green-700 text-sm ">
                        Activate
                      </button>
                      <button
                        onClick={() => openEditModal(plan)}
                        className="flex items-center gap-1 px-4 py-2 font-medium text-white transition bg-orange-600 rounded-xl hover:bg-orange-700 outfit"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-4 py-2 font-medium text-white  text-sm transition bg-red-600 rounded-xl outfit hover:bg-red-700">
                        Deactivate
                      </button>
                      <button
                        onClick={() => openEditModal(plan)}
                        className="flex items-center gap-1 px-4 py-2 font-medium text-white transition bg-[#DF951F] rounded-xl hover:bg-orange-700 outfit text-sm "
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <PlanModal
          isOpen={isModalOpen}
          onClose={closeModal}
          plan={selectedPlan}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
