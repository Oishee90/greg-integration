// src/components/settings/Privacy.jsx
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { GrUpdate } from "react-icons/gr";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Privacy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(`
    <h3 style="font-size: 1.125rem; font-weight: 600; color: #242424; margin: 1.5rem 0 0.5rem 0;">Privacy Policy</h3>
    <p style="color: #767676; line-height: 1.6; margin-bottom: 1.5rem;">
      Your privacy is important to us. It is Brainstorming's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
    </p>

    <p style="color: #767676; line-height: 1.6; margin-bottom: 1.5rem;">
      We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
    </p>
    <p style="color: #767676; line-height: 1.6;">
      We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
    </p>
  `);

  // Same Jodit config as TermsCondition
  const config = {
    readonly: false,
    toolbar: true,
    spellcheck: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: "bold,italic,underline,|,ul,|,align",
    buttonsMD: "bold,italic,underline,|,ul,|,align",
    buttonsSM: "bold,italic,underline,|,ul,|,align",
    buttonsXS: "bold,italic,underline,|,ul,|,align",
    removeButtons: [
      "strikethrough",
      "eraser",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "image",
      "video",
      "table",
      "link",
      "hr",
      "indent",
      "outdent",
      "superscript",
      "subscript",
      "copyformat",
      "fullsize",
      "preview",
      "print",
      "about",
    ],
    toolbarAdaptive: false,
    height: "auto",
    minHeight: 300,
    style: {
      font: "14px/1.6 'Helvetica Neue', Arial, sans-serif",
      color: "#767676",
    },
    placeholder: "",
  };

  const handleUpdate = () => {
    toast.success("Updated Successfully!", {
      duration: 2000,
      style: {
        borderRadius: "8px",
        background: "#fbfbfb",
        color: "#060505",
        display: "flex",
        justifyContent: "center",
      },
    });
  };
  return (
    <div className="p-6 bg-white rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header + Edit Button */}
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-[#16A8AD] hover:bg-[#139599] text-white text-sm font-medium rounded-lg transition"
        >
          Save
        </button>
      </div>

      {/* Jodit Editor */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          className="jodit-editor-custom"
        />
      </div>
    </div>
  );
};

export default Privacy;
