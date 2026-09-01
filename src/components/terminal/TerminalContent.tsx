import { useEffect, useRef, useState } from "react";

type SkillStatus = "DONE" | "IN_PROGRESS" | "PENDING";

interface ProgressItem {
  label: string;
  status: SkillStatus;
}

interface Step {
  contentText: string;
  typewriter?: boolean;
  isCommand?: boolean;
  afterAction?: (onData: (data: ProgressItem[]) => void, setLoading: (v: boolean) => void) => void;
  renderOutput?: (data: ProgressItem[]) => React.ReactNode;
}

interface CompletedStep {
  step: Step;
  output?: ProgressItem[];
}

interface LoadingDataStep {
  contentText: string;
}

const STEPS: Step[] = [
  {
    contentText: "whoami",
    typewriter: true,
    isCommand: true,
  },
  {
    contentText: "crixpsitos@dev",
    typewriter: false,
    isCommand: false,
  },
  {
    contentText: "uname -r",
    typewriter: true,
    isCommand: true,
  },
  {
    contentText: "dev-in-progress-v2026.9",
    typewriter: false,
    isCommand: false,
  },
  {
    contentText: "cat progress.txt",
    typewriter: true,
    isCommand: true,
    afterAction: (onData, setLoading) => {
      setLoading(true);
      setTimeout(() => {
        onData([
          { label: "javascript", status: "DONE" },
          { label: "typescript", status: "IN_PROGRESS" },
          { label: "astro", status: "PENDING" },
        ]);
      }, 2000);
    },
  },
  {
    contentText: "ls projects/",
    typewriter: true,
    isCommand: true,
    afterAction: (onData, setLoading) => {
      setLoading(true);
      setTimeout(() => {
        onData([
          { label: "empezando-como-dev", status: "IN_PROGRESS" },
          { label: "api-rest-express", status: "IN_PROGRESS" },
          { label: "app-gastos-cli", status: "DONE" },
          { label: "mobile-tracker", status: "PENDING" },
        ]);
      }, 1200);
    },
    // directorio: muestra nombres sin columna de status
    renderOutput: (data) => (
      <div className="pl-2 flex flex-wrap gap-x-6 gap-y-0.5 mt-1">
        {data.map((item, i) => (
          <span key={i} className="text-primary/80">{item.label}/</span>
        ))}
      </div>
    ),
  },
];

const TerminalLine = ({ text, isCommand }: { text: string, isCommand?: boolean }) => (
  <div className="flex items-center gap-2">
    {isCommand ? <span className="text-primary">$</span> : <span className="text-outline">→</span>}
    <span>{text}</span>
  </div>
);

const SPINNER = ["|" , "/", "-", "\\"];

const LoadingBar = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % SPINNER.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-on-surface-variant/50 font-mono text-xs">
      {SPINNER[frame]} fetching...
    </span>
  );
};

const TerminalList = ({ items }: { items: ProgressItem[] }) => (
  <div className="text-custom-text mt-1 space-y-1">
    {items.map((item, i) => (
      <div key={i} className="flex gap-4">
        <span className="text-outline w-4">{(i + 1).toString().padStart(2, "0")}</span>
        <span className="flex-1">{item.label}</span>
        <span
          className={
            item.status === "DONE"
              ? "text-primary"
              : item.status === "IN_PROGRESS"
                ? "text-yellow-400"
                : "text-on-surface-variant/40"
          }
        >
          [{item.status}]
        </span>
      </div>
    ))}
  </div>
);

export const TerminalContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);
  const [loadingStepIndex, setLoadingStepIndex] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const step = STEPS[currentStep];

    if (!step) return;

    if (!step.typewriter) {
      setDisplayedText(step.contentText);
      const timer = setTimeout(() => {
        const stepIndex = currentStep;
        setCompletedSteps((prev) => [...prev, { step }]);
        setDisplayedText("");
        if (step.afterAction) {
          const stepIndex = currentStep;
          step.afterAction(
            (output) => {
              setLoadingStepIndex(null);
              setCompletedSteps((prev) =>
                prev.map((s, i) => (i === stepIndex ? { ...s, output } : s)),
              );
              setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
            },
            (v) => setLoadingStepIndex(v ? stepIndex : null),
          );
        } else {
          setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }
      }, 600);
      return () => clearTimeout(timer);
    }

    setDisplayedText("");
    let charIndex = 0;

    intervalRef.current = setInterval(() => {
      charIndex++;
      setDisplayedText(step.contentText.slice(0, charIndex));

      if (charIndex >= step.contentText.length) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          const stepIndex = currentStep;

          setCompletedSteps((prev) => [...prev, { step }]);
          setDisplayedText("");
          if (step.afterAction) {
            const stepIdx = stepIndex;
            step.afterAction(
              (output) => {
                setLoadingStepIndex(null);
                setCompletedSteps((prev) =>
                  prev.map((s, i) => (i === stepIdx ? { ...s, output } : s)),
                );
                setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
              },
              (v) => setLoadingStepIndex(v ? stepIdx : null),
            );
          } else {
            setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
          }
        }, 800);
      }
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentStep]);

  return (
    <div className="p-6 h-80 overflow-y-auto terminal-scroll text-sm text-on-surface-variant flex flex-col gap-4">
      {completedSteps.map(({ step, output }, i) => (
        <div key={i} className="flex flex-col gap-1">
          <TerminalLine text={step.contentText} isCommand={step.isCommand} />
          {i === loadingStepIndex && <LoadingBar />}
          {step.isCommand && output && output.length > 0 && (
            step.renderOutput ? step.renderOutput(output) : <TerminalList items={output} />
          )}
        </div>
      ))}
      {STEPS[currentStep] && displayedText.length > 0 && (
        <TerminalLine text={displayedText} isCommand={STEPS[currentStep].isCommand} />
      )}
    </div>
  );
};
