import { ChangeEvent } from "react"

const CheckBoxList = ({elements, setSelected, selected}: {elements: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, selected: string[]}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setSelected(prev => {
            if(isChecked) {
                return [...prev, value];
            } else {
                return prev.filter((s) => (s != value));
            }
        });
    };

    return (
        elements.map((_, index) => 
            <div className="flex space-x-2 font-semibold">
            <input type="checkbox" value={elements[index]} name={elements[index]} checked={selected.includes(elements[index])} onChange={(e) => handleChange(e)} />
            <p>{elements[index]}</p>
            </div>
        )
    )
}

export default CheckBoxList;