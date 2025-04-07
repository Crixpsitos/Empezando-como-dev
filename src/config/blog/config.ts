export interface BlogConfig {
    blogName: string;
    blogDescription: string;
    blogAuthor: string;
    blogUrl: string;
    blogLang: string;
    blogLocale: string;
    blogLogo: string;
    blogFavicon: string;
    blogCover: string;
}

export const config: BlogConfig = {
    blogName: "Empezando como dev",
    blogDescription: "Un lugar pensado para quienes están comenzando su camino como desarrolladores.",
    blogAuthor: "Crixpsitos",
    blogUrl: "https://empezandocomodev.com",
    blogLang: "es",
    blogLocale: "es_ES",
    blogLogo: "/logo.png",
    blogFavicon: "/favicon.png",
    blogCover: "/cover.png",
};


export const navigations = [
    { name: "Inicio", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: "Sobre mi", path: "/about-me/" },
]
