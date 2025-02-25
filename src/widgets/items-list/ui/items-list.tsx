import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedItemsQuery } from "@/shared/api/feed-items";
import { AppPagination } from "@/features";
import { UpdateFeed, DeleteFeed } from "@/features/feeds";
import { FeedItem } from "@/entities";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const ItemsList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  // const [itemsLimit, setItemsLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetAllFeedItemsQuery({
    limit: 10,
    page: currentPage,
    lang: selectedLanguage,
  });
  const totalItems = data?.total_items ?? 0;
  const totalPages = totalItems / 10;
  const items = data?.items;
  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(items);
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Max Items</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Lang</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={5}>
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
          ❌ Error fetching feeds. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Feed ID</TableHead>
              <TableHead className="text-center">Category ID</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Lang</TableHead>
              <TableHead className="text-center">Thumbnail</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item) => (
              <FeedItem
                key={item.id}
                feedItem={item}
                updateFeature={<UpdateFeed updateFeedId={item.id} />}
                deleteFeature={<DeleteFeed deleteFeedId={item.id} />}
              />
            ))}
          </TableBody>
          {totalPages > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8}>
                  <AppPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};
