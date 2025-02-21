import { useParams } from "react-router-dom";
import { useGetAllFeedContentsQuery } from "@/shared/api/feed-content-api";
import { UpdateCategory, DeleteCategory } from "@/features/categories";
import { Content } from "@/entities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const ContentsList = () => {
  const { feedId } = useParams<{ feedId: string }>(); // Get feedId from URL

  const { data, isLoading, error } = useGetAllFeedContentsQuery(
    { feedId: feedId! }, // Non-null assertion is safe due to skip
    { skip: !feedId } // Skip the query if feedId is undefined
  );
  const dataContents = data?.feedContents.contents;

  if (!feedId) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center rounded-xl bg-muted/50 p-4">
          No Feed ID provided. Please select a feed.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category ID</TableHead>
                <TableHead>Feed ID</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching contents for Feed ID: {feedId}. Please try again.
        </div>
      </div>
    );
  }

  if (!dataContents || dataContents.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center rounded-xl bg-muted/50 p-4">
          No contents available for Feed ID: {feedId}.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category ID</TableHead>
              <TableHead>Feed ID</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataContents?.map((content) => (
              <Content
                key={content.id}
                content={content}
                updateFeature={<UpdateCategory updateCategoryId={content.id} />}
                deleteFeature={<DeleteCategory deleteCategoryId={content.id} />}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
