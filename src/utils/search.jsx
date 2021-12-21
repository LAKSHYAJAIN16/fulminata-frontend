export function search(query, options) {

    //Format Query
    const filter = query.toUpperCase();

    //Create Buffer
    const buffer = [];

    //Loop through each option and check what matches
    options.map((option) => {
        const title = option.title.toUpperCase();
        
        if (title.indexOf(filter) > -1) {
            buffer.push(option);
        }
    })

    return buffer;
}