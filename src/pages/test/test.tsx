import { useGetFeedItemContentQuery } from "@/shared/api/feed-items-api";
import React from "react";

// Define TypeScript interfaces for the JSON structure
interface Node {
  tag: string;
  attributes?: Record<string, string>;
  children?: Node[];
  value?: string;
}

interface RenderNodeProps {
  node: Node;
}

const RenderNode: React.FC<RenderNodeProps> = ({ node }) => {
  if (node.tag === "text") {
    return <span>{node.value}</span>;
  }

  const Tag = node.tag as keyof React.JSX.IntrinsicElements;
  const attributes = node.attributes || {};

  // Convert attributes to React-compatible props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: Record<string, any> = {};
  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class") {
      props.className = value;
    } else if (key === "style") {
      // Convert style string to object for React
      const styleObj = value
        .split(";")
        .reduce<Record<string, string>>((acc, style) => {
          if (style.trim()) {
            const [prop, val] = style.split(":").map((s) => s.trim());
            const camelCaseProp = prop.replace(/-([a-z])/g, (g) =>
              g[1].toUpperCase()
            );
            acc[camelCaseProp] = val;
          }
          return acc;
        }, {});
      props.style = styleObj;
    } else {
      props[key] = value;
    }
  }

  // Add Tailwind classes based on tag for better styling
  if (Tag === "p") {
    props.className = `${
      props.className || ""
    } mb-4 text-gray-800 leading-relaxed`;
  } else if (Tag === "a") {
    props.className = `${
      props.className || ""
    } text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors`;
  } else if (Tag === "b") {
    props.className = `${props.className || ""} font-semibold`;
  } else if (Tag === "div" && props.className?.includes("alert alert-info")) {
    props.className = `${props.className} bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded-lg mb-4`;
  }

  // Recursively render children with spacing
  const children = node.children
    ? node.children.map((child, index) => (
        <React.Fragment key={index}>
          <RenderNode node={child} />
          {/* Add space between inline elements or text nodes */}
          {child.tag !== "p" &&
            index < node.children!.length - 1 &&
            node.children![index + 1].tag !== "p" &&
            " "}
        </React.Fragment>
      ))
    : null;

  return <Tag {...props}>{children}</Tag>;
};

export const TestPage: React.FC = () => {
  const { data, isLoading, error } = useGetFeedItemContentQuery({
    item_link: "https://uznews.uz/posts/81368/",
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-500 text-lg py-8">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg py-8">
        Oops... Unknown Error
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg mt-8">
      {data && <RenderNode node={data} />}
    </div>
  );
};
