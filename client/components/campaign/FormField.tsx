import { ChangeEventHandler } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  isTextArea?: boolean;
  value: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const FormField = ({
  label,
  type,
  placeholder,
  isTextArea,
  value,
  handleChange,
}: FormFieldProps) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {label && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {label}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          placeholder={placeholder}
          rows={10}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] resize-none"
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          required
          type={type}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          value={value}
          onChange={handleChange}
        />
      )}
    </label>
  );
};

export default FormField;
