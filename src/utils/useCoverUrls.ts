import {Manga, Relationship} from "../types/types"
//
// export const getCoverUrls = (manga: Manga) =>{
//
//     const typesToFind = ['cover_art', 'author', 'artist'];
//     const indexes = typesToFind.map((type) =>
//         manga.relationships.findIndex(
//             (relationship: Relationship) => relationship.type === type
//         )
//     );
//     const [coverArtIndex, authorIndex, artistIndex] = indexes;
//
//     const cover = manga.relationships?.[coverArtIndex]?.attributes;
//     const fileName = cover?.fileName;
//
//     const [coverUrl, backgroundUrl ] = fileName
//         ? [
//             `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`,
//             `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
//         ] : [null, null];
// }

