import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

function Autocomplete<T extends FieldValues>({
  className,
  placeHolder,
  field,
  data,
}: {
  className?: string;
  placeHolder?: string;
  field: ControllerRenderProps<T>;
  data: string[];
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [filtredData, setFiltredData] = useState<string[]>(data);
  const { onChange, value, ref, onBlur } = field;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    onBlur();
    setIsFocused(false);
  };

  const showListRule = isFocused && filtredData.length > 0;

  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        setFiltredData(data.filter((element) => element.trim().includes(value.trim())));
        if (!showListRule) {
          setIsFocused(true);
        }
      }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    debouncedFilter(e.target.value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const onListClick = (val: string) => {
    setIsFocused(false);
    onChange(val);
  };

  useEffect(() => {
    setFiltredData(data);
    onChange("");
  }, [data]);

  return (
    <div className="flex flex-col gap-1 w-[150px] xl:w-[200px] ">
      <input
        className={cn(
          className,
          "flex rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 text-sm font-semibold h-8"
        )}
        value={value}
        type="text"
        onChange={handleInputChange}
        placeholder={placeHolder ?? "enter here"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      />
      {showListRule && (
        <ul
          className="rounded-md border-neutral-500 border max-h-[200px] overflow-auto shadow-lg transition duration-75"
          onMouseDown={handleMouseDown}
        >
          {filtredData.map((elem) => (
            <li
              className="px-3 py-1 cursor-pointer hover:bg-slate-400 rounded-full text-sm hover:transition-all duration-500"
              key={elem}
              value={elem}
              onClick={() => {
                onListClick(elem);
              }}
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
