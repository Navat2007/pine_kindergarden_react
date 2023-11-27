import generateUrl from "generate-url";

export const GenerateUrl = (title) => {
    if(!title) return "";

    title = title
        .replaceAll(',', "")
        .replaceAll('.', "")
        .replaceAll('_', "")
        .replaceAll('(', '')
        .replaceAll(')', '');

    return title === 'Главная' ? '/' : generateUrl(title);
}