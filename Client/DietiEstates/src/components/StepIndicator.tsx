interface StepIndicatorProps {
    steps: number,
    selected: number,
}

const StepIndicator = ({steps, selected} : StepIndicatorProps) => {
    return (
        <div className="flex items-center space-x-1">
           {Array.from({length: steps}).map((_, index) => (<StepPoint key={index} distance={Math.abs(selected - index)}/>))}
        </div>
    )
}

const StepPoint = ({distance} : {distance: number}) => {
    const width = 12 - distance*2;
    const height = 12 - distance*2;
    const selectedStyle = "rounded-full bg-blue-900";
    const notSelectedStyle = "rounded-full bg-gray-300";    
    return (
        <span className={distance == 0 ? selectedStyle : notSelectedStyle} style={{width: `${width}px`, height: `${height}px`}}></span>
    )
}

export default StepIndicator;