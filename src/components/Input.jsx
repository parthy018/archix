/* eslint-disable react/prop-types */

const InputField = ({ label, type, name, value, onChange, required = false, error }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type ? type : "text"}
        name={name}
        className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
      />
      {
        error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )
      }
    </div>
  );

  export default InputField;