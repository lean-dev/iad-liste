import { backendUrl } from "../config";
import { useFetch } from "./fetch-hook";

type List = {
  id: string;
  email: string;
  title: string;
};

export function useList(listId: string | undefined) {
  const [list] = useFetch(`${backendUrl}/lists/${listId}`, {} as List);
  return list;
}
