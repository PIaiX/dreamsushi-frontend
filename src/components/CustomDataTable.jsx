import React from 'react'
import DataTable from 'react-data-table-component'

const CustomDataTable = (props) => {
    const {columns, data, pagination} = props

    return (
        <DataTable
            noHeader
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationTotalRows={pagination && pagination.totalRows ? pagination.totalRows : 0}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[100, 250, 500, 1000]}
            selectableRowsHighlight
            striped
            noDataComponent="Нет адресов"
            paginationComponentOptions={{rowsPerPageText: 'Показать на странице:'}}
        />
    )
}
export default CustomDataTable
