export function isChat(pathname: string): boolean {
  return pathname.includes("/messages") 
  && pathname.length > "/messages".length;
}