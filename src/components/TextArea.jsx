/* eslint-disable react/prop-types */
const TextAreaField = ({ label, name, value, onChange, required = false }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <textarea
        name={name}
        rows="4"
        className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
      ></textarea>
    </div>
  );
  
  export default TextAreaField;  