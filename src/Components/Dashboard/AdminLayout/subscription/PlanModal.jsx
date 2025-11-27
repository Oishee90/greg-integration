/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const PlanModal = ({ isOpen, onClose, plan }) => {
  const isEdit = !!plan;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEdit
      ? {
          name: plan.name,
          description: plan.description,
          price: plan.price,
          billingCycle: plan.billingCycle,
        }
      : {
          name: "",
          description: "",
          price: "",
          billingCycle: "N/A (Free)",
        },
  });

  // Reset form when modal opens (for edit/create)
  React.useEffect(() => {
    if (isOpen) {
      reset(
        isEdit
          ? {
              name: plan.name,
              description: plan.description,
              price: plan.price,
              billingCycle: plan.billingCycle,
            }
          : {
              name: "",
              description: "",
              price: "",
              billingCycle: "N/A (Free)",
            }
      );
    }
  }, [isOpen, plan, reset, isEdit]);

  const onSubmit = (data) => {
  const { name, description, price, billingCycle } = data;

  // ✅ Validation check
  if (!name || !description || !price || !billingCycle) {
    toast.error("All fields are required!");
    return;
  }

  if (isEdit) {
    toast.success("Plan updated successfully!", {
      duration: 2000,
    });
  } else {
    toast.success("Plan created successfully!", {
      duration: 2000,
    });
  }

  // ✅ Modal will close after toast is shown
  setTimeout(() => {
    onClose(); 
  }, 1200);
};


  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
          <Toaster />
        {/* Header */}
        <div className="flex items-center justify-between gap-5 mb-6">
          <div className="flex items-center justify-between flex-1">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEdit ? plan.name : "Free Plan"}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Basic access with limited features
              </p>
            </div>
            <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              Default
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Plan Name
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
              placeholder="e.g. Free Plan"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-orange-600 focus:border-orange-600"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Billing Cycle
            </label>
            <select
              {...register("billingCycle")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-600 focus:border-orange-600"
            >
              <option value="N/A (Free)">N/A (Free)</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 font-medium text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 font-medium text-white transition bg-orange-600 rounded-md hover:bg-orange-700"
            >
              {isEdit ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PlanModal;
