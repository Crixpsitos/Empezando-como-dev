export type ArticleStatus = "learning" | "guide" | "project";
export type ArticleFormat = "article" | "video" | "mixed";

const statusLabels: Record<ArticleStatus, string> = {
  learning: "Aprendiendo",
  guide: "Guia",
  project: "Proyecto",
};

export const getStatusLabel = (status: ArticleStatus) => statusLabels[status];

export const getPublishedDate = (date: Date) =>
  date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const getRelativeTime = (date: Date) => {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 1000),
  );

  if (elapsedSeconds < 60) return "hace un momento";
  if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }
  if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }
  if (elapsedSeconds < 604800) {
    const days = Math.floor(elapsedSeconds / 86400);
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  }
  if (elapsedSeconds < 2592000) {
    const weeks = Math.floor(elapsedSeconds / 604800);
    return `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }
  if (elapsedSeconds < 31536000) {
    const months = Math.floor(elapsedSeconds / 2592000);
    return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  }

  const years = Math.floor(elapsedSeconds / 31536000);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
};