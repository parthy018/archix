/* eslint-disable react/prop-types */
const SelectField = ({ label, name, value, onChange }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        name={name}
        className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>Select Project</option>
        <option value="Project 1">Project 1</option>
        <option value="Project 2">Project 2</option>
        <option value="Project 3">Project 3</option>
      </select>
    </div>
  );

  export default SelectField