import React from 'react'
import {useEffect} from 'react'
import CustomDataTable from '../../../components/CustomDataTable'
import submitAlert from '../../../helpers/alert'
import {getAddresses} from '../../../services/account'

// export const addressColumn = [
//     {
//         name: 'ФИО',
//         center: true,
//         cell: (row) =>
//             `${row.user.firstName}${row.user.lastName && '.' + row.user.lastName[0].toUpperCase()}${
//                 row.user.lastName && '.' + row.user.lastName[0].toUpperCase()
//             }`,
//     },
//     {
//         name: 'Должность',
//         selector: 'job',
//         center: true,
//         cell: (row) => row.user.job,
//     },
//     {
//         name: 'Завершение',
//         selector: 'dateEnd',
//         sortable: true,
//         center: true,
//         cell: (row) => (row.dateEnd ? moment(row.dateEnd).format('DD.MM.YYYY kk:mm') : 'Нет'),
//     },
//     {
//         name: 'Управлять',
//         selector: 'action',
//         center: true,
//         cell: (row) => (
//             <Link to={`/test/${row.testId}/user/${row.id}`}>
//                 <Edit size={20} />
//             </Link>
//         ),
//     },
// ]

const Address = () => {
    useEffect(() => {
        // submitAlert('DEFAULT', '124124124')
        // getAddresses(data)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             console.log(data)
        //         }
        //     })
        //     .catch((error) => {
        //         Alert('DEFAULT', '124124124')
        //     })
    }, [])

    return <section className="addresses">{/* <CustomDataTable column={addressColumn} /> */}</section>
}

export default Address
