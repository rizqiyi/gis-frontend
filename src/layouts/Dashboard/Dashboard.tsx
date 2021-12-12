import React from 'react'
import Table from '@components/Table'
import dataset from '@constant/dataset'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <Table
        head={[
          {
            title: 'Tanggal Dibuat',
            selector: 'created_at',
            style: {
              minWidth: '120px',
            },
          },
          { title: 'Kabupaten', selector: 'district' },
          { title: 'Kecamatan', selector: 'sub_district' },
          {
            title: 'Nama Ruas Jalan',
            selector: 'street_name',
          },
          {
            title: 'Lebar Jalan',
            selector: 'width',
          },
          { title: 'STA', selector: 'sta' },
          { title: 'Status', selector: 'is_published' },
        ]}
        expandable
        sortData={{
          created_at: 1,
          district: 2,
          sub_district: 3,
          street_name: 4,
          width: 5,
          sta: 6,
          is_published: 7,
        }}
        rows={dataset}
      />
    </>
  )
}

export default Dashboard
