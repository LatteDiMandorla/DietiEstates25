import { useState } from "react"

const CheckBoxList = ({elements, setFilter}: {elements: string[], setFilter: (filter: string[]) => void}) => {
    const [selected, setSelected] = useState<boolean[]>(elements.map(() => false));

    const handleChange = (index: number) => {
        setSelected(selected.map((e, i) => (index == i ? !e : e) ));
        setFilter(elements.filter((_, i) => (index == i ? !selected[i] : selected[i])));
    }

    return (
        elements.map((_, index) => 
            <div className="flex space-x-2 font-semibold">
            <input type="checkbox" value={elements[index]} name={elements[index]} checked={selected[index]} onChange={() => handleChange(index)} />
            <p>{elements[index]}</p>
            </div>
        )
    )
}

export default CheckBoxList;