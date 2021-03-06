import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

const Tokens = ({columns, tokens}) => {
  const [datatable] = React.useState({
    columns: columns,
    rows: tokens,
  })

  return (
    <MDBDataTableV5 
      scrollX
      hover
      entriesOptions={[5, 10, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      pagingTop
      searchTop
      fullPagination
      searchBottom={false}
      exportToCSV
      autoWidth
      order={['id', 'asc' ]}
    />
  )
}

export default Tokens