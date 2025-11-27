// src/components/settings/TermsCondition.jsx
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Bold, Italic, Underline, List, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const TermsCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(`
    <h3 style="font-size: 1.125rem; font-weight: 600; color: #242424; margin: 1.5rem 0 0.5rem 0;">Clause 1</h3>
    <p style="color: #767676; line-height: 1.6; margin-bottom: 1.5rem;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum eget purus in. 
      Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper 
      suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.
    </p>

    <h3 style="font-size: 1.125rem; font-weight: 600; color: #242424; margin: 1.5rem 0 0.5rem 0;">Clause 2</h3>
    <p style="color: #767676; line-height: 1.6; margin-bottom: 1rem;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum eget purus in. 
      Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper 
      suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.
    </p>
    <p style="color: #767676; line-height: 1.6;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum eget purus in. 
      Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper 
      suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.
    </p>
  `);

  // Jodit config: only show B, I, U, List, Align Left
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
        justifyContent: "center",
      },
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Toolbar + Edit Button */}
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-2xl font-bold text-gray-900 inter">
          Terms & Conditions
        </h1> */}
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

export default TermsCondition;
