import { FC, ReactNode } from "react";

interface FeedCategoriesContainerProps {
  children: ReactNode;
}

export const FeedCategoriesContainer: FC<FeedCategoriesContainerProps> = ({
  children,
}) => <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>;
