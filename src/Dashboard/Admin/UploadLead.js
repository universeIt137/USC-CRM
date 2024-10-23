import React, { useState } from 'react';
import MaterialTable from 'material-table'
// import XLSX from 'xlsx'
import * as XLSX from 'xlsx'

const UploadLead = () => {

    const [colDefs, setColDefs] = useState()
    const [data, setData] = useState()

    const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
            let rowData = {}
            row.forEach((element, index) => {
                rowData[headers[index]] = element
            })
            rows.push(rowData)

        });
        return rows
    }

    const importExcel = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = (event) => {
            // console.log('event');
            //parse data

            const bstr = event.target.result
            const workBook = XLSX.read(bstr, { type: "binary" })

            //get first sheet
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            //convert to array
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            // console.log(fileData)
            const headers = fileData[0]
            const heads = headers.map(head => ({ title: head, field: head }))
            setColDefs(heads)

            //removing header
            fileData.splice(0, 1)


            setData(convertToJson(headers, fileData))
        }

        reader.readAsBinaryString(file)
    }
    return (
        <div>
            <h4 align='center'>Import Data from Excel, CSV in Material Table</h4>
            <input type="file" onChange={importExcel} />
            <MaterialTable title="Olympic Data" data={data} columns={colDefs} />
        </div>
    );
};

export default UploadLead;