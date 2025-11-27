import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateTermsMutation } from "../../../../Redux/feature/authapi";

const TermsCondition = ({ TermsPrivacy, refetch }) => {
  const editor = useRef(null);

  const [content, setContent] = useState("");
  const [updateTerms, { isLoading }] = useUpdateTermsMutation();

  // Load dynamic content: id = 1
  useEffect(() => {
    if (TermsPrivacy && TermsPrivacy.length > 0) {
      const item = TermsPrivacy.find((t) => t.id === 1);
      if (item) {
        setContent(item.content);
      }
    }
  }, [TermsPrivacy]);

  const config = {
    readonly: false,
    toolbar: true,
    minHeight: 300,
    buttons: "bold,italic,underline,|,ul,|,align",
  };

  const handleUpdate = async () => {
    try {
      const id = 1;

      await updateTerms({ id, content }).unwrap();
      refetch();
      toast.success("Updated Successfully!", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#fbfbfb",
          color: "#060505",
        },
      });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update Failed!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-6">
        <div></div>
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="px-4 py-2 bg-[#16A8AD] hover:bg-[#139599] text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
};

export default TermsCondition;
