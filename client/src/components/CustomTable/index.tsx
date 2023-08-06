import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { JsxElement } from 'typescript';

type Props = {
    header: Array<any>,
    children: JSX.Element|JSX.Element[]
}

function CustomTable({header, children}: Props) {
  return (
    <TableContainer  component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            {header.map( (value) => <TableCell key={value} align = "center" sx={{fontWeight: "bold"}}>{value}</TableCell> )}
          </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable