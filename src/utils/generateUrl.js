import generateUrl from "generate-url";

export const GenerateUrl = (title) => {
    title = title
        .replaceAll(',', "")
        .replaceAll('.', "")
        .replaceAll('_', "")
        .replaceAll('(', '')
        .replaceAll(')', '');

    return title === 'Главная' ? '/' : generateUrl(title);
}