import { useEffect, useState } from "react";
import { getNews } from "@/api/api";
import { NewsT } from "@/types";
import moment from "moment";

const NewsList = () => {
  const [news, setNews] = useState<NewsT[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch(() => setIsError(true));
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isError ? (
        <p className="text-white py-2 px-4 text-[40px] font-semibold">Новин нема</p>
      ) : (
        <ul className="xl:w-5/6 w-full xl:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-1 disable-scrollbars">
          {news.map((data) => (
            <li
              key={data.newsDate}
              className="bg-white text-zinc-900 xl:border xl:rounded-xl py-2 px-4"
            >
              <h3 className="font-semibold capitalize">
                {moment(data.newsDate).format("LLLL")}
              </h3>
              <p>{data.newsText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsList;
