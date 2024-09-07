import React from "react";

// Component for localized input fields
const LocalizedInput = ({
    label,
    value,
    onChange,
    lang,
    placeholder,
    disabled,
}) => {
    const isArabic = lang === "ar";

    return (
        <div className="mb-4">
            <label className="block font-bold mb-2">{label}</label>
            <input
                type="text"
                className={`border rounded px-3 py-2 w-full ${
                    isArabic ? "text-right" : "text-left"
                }`}
                name={label.toLowerCase()}
                value={value}
                onChange={onChange}
                data-lang={lang}
                placeholder={placeholder}
                dir={isArabic ? "rtl" : "ltr"}
                disabled={disabled}
            />
        </div>
    );
};

export default LocalizedInput;
