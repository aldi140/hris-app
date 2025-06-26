import { useEffect } from "react";

export const usePageTitle = (title) => {
   useEffect(() => {
      document.title = `HRIS APP || ${title}`
   }, [title]);
};  