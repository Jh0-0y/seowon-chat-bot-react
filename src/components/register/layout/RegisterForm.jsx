import { useState } from "react";
import RegisterStep from "./RegisterStep";
import StepTerms from "../section/StepTerms";
import StepEmail from "../section/StepEmail";
import StepInfo from "../section/StepInfo";
import StepComplete from "../section/StepComplete";

const RegisterForm = () => {
  const [step, setStep] = useState(0); // 0 ~ 3

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepTerms onNext={() => setStep(1)} />;
      case 1:
        return <StepEmail onNext={() => setStep(2)} onPrev={() => setStep(0)} />;
      case 2:
        return <StepInfo onNext={() => setStep(3)} onPrev={() => setStep(1)} />;
      case 3:
        return <StepComplete />;
      default:
        return null;
    }

  };
  return (
  <>
    <RegisterStep currentStep={step} />
    {renderStep()}
  </>
);
};

export default RegisterForm;
