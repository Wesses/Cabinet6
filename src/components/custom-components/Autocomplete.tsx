import { useMemo, useState } from "react";
import debounce from "lodash/debounce";

const mockData = ["111", "222222222222222222222222222222222222", "333", "444", "555", "332"];

function Autocomplete() {
  const [input, setInput] = useState("");
  const [optionsData, setOptionsData] = useState(mockData);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  
  const showListRule = isFocused && optionsData.length > 0;
  
  const debouncedFilter = useMemo(() => 
    debounce((value: string) => {
      setOptionsData(
        mockData.filter((element) => element.trim().includes(value.trim()))
      );
    }, 500), []);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedFilter(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-[150px] xl:w-[200px] ">
      <input
        className="flex rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 xl:text-base text-sm font-semibold h-8"
        value={input}
        type="text"
        onChange={handleInputChange}
        placeholder="123..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showListRule && (
        <ul className="rounded-md border-neutral-500 border max-h-[200px] overflow-auto shadow-lg transition duration-75">
          {optionsData.map((elem) => (
            <li
              className="px-3 py-1 cursor-pointer hover:bg-slate-400 rounded-full xl:text-base text-sm hover:transition-all duration-500"
              key={elem} 
              value={elem} 
              onClick={() => setInput(elem)}
              tabIndex={1}
            >
              {elem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
