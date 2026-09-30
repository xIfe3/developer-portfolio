export type ProcessStep = { number: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "We start with a call about the problem, the people it's for and what success looks like. You get a written scope and estimate.",
  },
  {
    number: "02",
    title: "Design",
    body: "I map the architecture and the key screens before writing code, so surprises happen on paper, not in production.",
  },
  {
    number: "03",
    title: "Build",
    body: "Weekly demos on a live preview link. You see real progress, not status reports.",
  },
  {
    number: "04",
    title: "Launch & support",
    body: "Deployment, monitoring, handover docs and team training — and I stay reachable after launch.",
  },
];
