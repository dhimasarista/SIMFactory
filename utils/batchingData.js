const batchingData = async ({queryAsync, query, batchSize}) => {
    let offset = 0;
    let batchNumber = 1;
    let dataSet = [];

    while(true){
        const dataBatch = await queryAsync(query + ` LIMIT ${batchSize} OFFSET ${offset}`);

        if(dataBatch.length === 0){
            break;
        }

        // console.log(`Batch ${batchNumber}: Fetched ${dataBatch.length} employees`);
        dataSet = dataSet.concat(dataBatch);

        offset += batchSize;
        batchNumber++;
    }

    return dataSet;
}

module.exports = batchingData;