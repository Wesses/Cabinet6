import { useEffect, useState } from "react";
import { getNews } from "@/api/api";
import { NewsT } from "@/types";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const NewsList = () => {
  const [news, setNews] = useState<NewsT[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    getNews()
      .then(setNews)
      .catch(() => setIsError(true))
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {isError ? (
        <p className="text-white py-2 px-4 text-[40px] font-semibold">
          Новин нема
        </p>
      ) : (
        <>
          {!news.length ? (
            <div className="xl:w-5/6 px-4 w-full xl:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-y-2 disable-scrollbars">
              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton className="xl:hidden w-2/3 h-6 xl:h-12 bg-slate-300"/>
                <Skeleton className="w-full xl:h-full h-[150px] xl:border xl:rounded-xl bg-slate-300" />
              </div>

              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton className="xl:hidden w-2/3 h-6 xl:h-12 bg-slate-300"/>
                <Skeleton className="w-full xl:h-full h-[150px] xl:border xl:rounded-xl bg-slate-300" />
              </div>

              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton className="xl:hidden w-2/3 h-6 xl:h-12 bg-slate-300"/>
                <Skeleton className="w-full xl:h-full h-[150px] xl:border xl:rounded-xl bg-slate-300" />
              </div>
            </div>
          ) : (
            <ul className="xl:w-5/6 w-full xl:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-1 xl:pr-2">
              {news.map((data) => (
                <li
                  key={data.newsDate}
                  className="w-full bg-white text-zinc-900 xl:border xl:rounded-xl py-2 px-4"
                >
                  <h3 className="font-semibold capitalize">
                    {moment(data.newsDate).format("L")}
                  </h3>
                  <p>{data.newsText}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default NewsList;
