export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formater = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formater.format(date);
};

export const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  // Jika total halaman kurang dari atau sama dengan 7, tampilkan semua halaman
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Jika halaman saat ini berada di awal (kurang dari atau sama dengan 3)
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Jika halaman saat ini berada di akhir (mendekati total halaman)
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Jika halaman saat ini berada di tengah
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
