import { ChartConfig } from "@/shared/ui/chart";

const chartConfig = {
  visitors: {
    label: "Popularity i",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-1))",
  },
  politics: {
    label: "Politics",
    color: "hsl(var(--chart-2))",
  },
  health: {
    label: "Health",
    color: "hsl(var(--chart-3))",
  },
  sciense: {
    label: "Sciense",
    color: "hsl(var(--chart-4))",
  },
  tech: {
    label: "Tech",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export { chartConfig };
