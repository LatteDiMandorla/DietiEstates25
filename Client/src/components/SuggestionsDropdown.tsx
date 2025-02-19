const SuggestionsDrowdown = ({suggestions, className = "", title, onClick} : any) => {

    return (
        <div className={"z-20 relative hidden " + className}>
          <div className="absolute">
            <div className="flex flex-col items-center w-full bg-white rounded-b-md border-b border-x shadow-lg border-gray-300 font-semibold py-4">
              <p className="font-bold px-4 w-full">{title}</p>
              <div className="border border-black rounded-full w-11/12" />
                {suggestions?.map?.((s : any, index: number) => (<button type="button" className="text-left px-4 w-full" onClick={() => {onClick(s)}} key={index}>{s.text}</button>))}
            </div>
          </div>
        </div>
    )
}

export default SuggestionsDrowdown;