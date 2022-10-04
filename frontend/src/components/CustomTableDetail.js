function CustomTableDetail({ data, columns }) {
  return <>
    <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column.name}>{column.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => <tr style={ele.rowStyle}>{columns.map(column => <td>{ele[column.name]}</td>)}</tr>)}
        </tbody>
      </table>
  </>
}

export default CustomTableDetail