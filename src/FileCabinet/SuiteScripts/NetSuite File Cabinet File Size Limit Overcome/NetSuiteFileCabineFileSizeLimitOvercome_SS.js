/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['./lib/papaparse.min', 'N/file', 'N/log'],

    (papa, file, log) => {

        const csvFolderId = 146872;
        const csvFileName = 'TestCSVFile.csv';
        const numberOfLines = 10000000;

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            const fileObj = file.create({
                name: csvFileName,
                fileType: file.Type.CSV,
                contents: '',
                folder: csvFolderId
            });

            const dummyData = generateDummyData();

            dummyData.split("\r\n").forEach(function (line) {
                fileObj.appendLine({
                    value: line
                });
            })

            fileObj.save();
        }

        const generateDummyData = () => {
            const data = [];

            for(let a = 0; a < numberOfLines; a++) {
                data.push({
                    firstName: 'Dummy First Name' + a,
                    lastName: 'Dummy Last Name ' + a,
                    address: 'Dummy Address ' + a,
                    amount: a
                })
            }

            const papaConfig = {
                quotes: false, //or array of booleans
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ",",
                header: true,
                newline: "\r\n",
                skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
                columns: null //or array of strings
            }
            return papa.unparse(data, papaConfig);
        }

        return {execute}

    });
