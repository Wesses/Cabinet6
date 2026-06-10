// import { useEffect, useState } from "react";
// import { getNews } from "@/api/api";
// import { NewsT } from "@/types";
// import moment from "moment";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useTranslation } from "react-i18next";
//
// const NewsList = () => {
//   const [news, setNews] = useState<NewsT[]>([]);
//   const [isLoading, setIsloading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const { t } = useTranslation();
//
//   useEffect(() => {
//     setIsError(false);
//     setIsloading(true);
//
//     getNews()
//       .then(setNews)
//       .catch(() => {
//         setIsError(true);
//       })
//       .finally(() => {
//         setIsloading(false);
//       });
//   }, []);
//
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full">
//       {isError && (
//         <p className="lg:text-primary-foreground text-foreground py-2 px-4 text-[40px] font-semibold">
//           {t("toast_error_try_later")}
//         </p>
//       )}
//       {isLoading && (
//         <div className="lg:w-5/6 px-4 w-full lg:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-y-2 disable-scrollbars">
//           <div className="flex flex-col w-full gap-y-2">
//             <Skeleton className="w-2/3 h-6 lg:hidden lg:h-12" />
//             <Skeleton className="w-full lg:h-full h-[150px] lg:border lg:rounded-xl bg-muted lg:bg-primary-foreground/20" />
//           </div>
//
//           <div className="flex flex-col w-full gap-y-2">
//             <Skeleton className="w-2/3 h-6 lg:hidden lg:h-12" />
//             <Skeleton className="w-full lg:h-full h-[150px] lg:border lg:rounded-xl bg-muted lg:bg-primary-foreground/20" />
//           </div>
//
//           <div className="flex flex-col w-full gap-y-2">
//             <Skeleton className="w-2/3 h-6 lg:hidden lg:h-12" />
//             <Skeleton className="w-full lg:h-full h-[150px] lg:border lg:rounded-xl bg-muted lg:bg-primary-foreground/20" />
//           </div>
//         </div>
//       )}{" "}
//       {!isLoading && !isError && !news.length && (
//         <p className="lg:text-primary-foreground text-foreground py-2 px-4 text-[40px] font-semibold">
//           {t("no_news")}
//         </p>
//       )}
//       {!isLoading && !isError && !!news.length && (
//         <ul className="lg:w-5/6 w-full lg:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-1 lg:pr-2">
//           {news.map((data) => (
//             <li
//               key={data.newsDate}
//               className="w-full px-4 py-2 bg-background text-foreground lg:border lg:rounded-xl"
//             >
//               <h3 className="font-semibold capitalize">
//                 {moment(data.newsDate).format("L")}
//               </h3>
//               <p className="text-base">{data.newsText}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
//
// export default NewsList;
