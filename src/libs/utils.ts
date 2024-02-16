export function isChat(pathname: string): boolean {
  return pathname.includes("/messages") 
  && pathname.length > "/messages".length;
}

export function setDateComment(date: Date) {
  const isoDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'numeric', year: '2-digit' };
  const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
  return formattedDate;
};