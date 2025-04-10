import Select from "react-select";

const Dropdown = ({ onSelect ,closeDropdown }) => {
  const options = [
    { value: "filterByAssignedDate", label: "Sort by recent" },
    { value: "sortByAscDesc", label: "sort by Asc" },
  ];

  return (
    <div className="absolute z-50 bg-white shadow-lg rounded-md">

    <Select
      className="mt-2 w-32"
      options={options}
      onChange={(selectedOption) => {
        onSelect(selectedOption.value);
        closeDropdown();
      }}
      placeholder="Order"
    />
    </div>
  );
};

export default Dropdown;