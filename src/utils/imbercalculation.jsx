export function imbercalculation(likes, comments, views, timePosted) {
    const imber = 0;
    const td = Date.now() - timePosted;
    const loc = parseInt(td.toLocaleString());
    const like_imber = likes * -2;
    const comments_imber = comments.length * -3;
    const views_imber = views * -1;

    const obj = { loc, like_imber, comments_imber, views_imber };
    console.table(obj);

    return (loc + like_imber + comments_imber + views_imber) * 2;
}
