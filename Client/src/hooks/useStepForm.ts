import { useContext } from "react";
import { StepContext } from "../contexts/StepFormProvider";

export function useStepForm() {
    const context = useContext(StepContext);
    if (!context) {
      throw new Error('useStepContext deve essere usato all’interno di StepProvider');
    }
    return context;
  }