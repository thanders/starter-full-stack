import { useInfiniteQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User[];
  nextCursor: number | null;
}

const fetchUserPage = async ({ pageParam }: { pageParam: number | null }): Promise<ApiResponse> => {
  const url = `/api/users/feed?limit=10${pageParam ? `&cursor=${pageParam}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export function UserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users", "feed"],
    queryFn: fetchUserPage,
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading data.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Directory</h2>
      
      <div className="space-y-2 mb-4">
        {data.pages.map((page) =>
          page.data.map((user: User) => (
            <div key={user.id} className="p-3 border rounded bg-white shadow-sm">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))
        )}
      </div>

      {hasNextPage && (
        <button
        type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full py-2 bg-slate-800 text-white rounded font-medium disabled:bg-slate-400 transition-colors"
        >
          {isFetchingNextPage ? "Fetching more..." : "Load More"}
        </button>
      )}

      {!hasNextPage && (
        <p className="text-center text-sm text-gray-400 py-4 border-t mt-4">
          All users loaded
        </p>
      )}
    </div>
  );
}