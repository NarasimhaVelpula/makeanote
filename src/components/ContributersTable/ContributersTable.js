import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AccessGroup from './AccessGroup';
import copy from "copy-to-clipboard"; 
import {Button} from '@material-ui/core';
import axios from '../../axios';


function createData(name, calories, fat, carbs, protein,link) {
  return { name, calories, fat, carbs, protein,link };
}


let rows = [
  createData('Cupcake', 'User', 3.7, <AccessGroup value={"read"}/>, ),
  createData('Donut', 'Link', 25.0, <AccessGroup value={"readnwrite"}/>, ),
  createData('Eclair', 'Link', 16.0, <AccessGroup value={"readnwrite"}/>, 6.0),
  createData('Frozen yoghurt', 'Link', 6.0, <AccessGroup value={"readnwrite"}/>, 4.0),
  createData('Gingerbread', 'User', 16.0, <AccessGroup value={"read"}/>, 3.9),
  createData('Honeycomb', 'Link', 3.2, <AccessGroup value={"read"}/>, 6.5),
  createData('Ice cream sandwich', 'User', 9.0, <AccessGroup value={"readnwrite"}/>, 4.3),
  createData('Jelly Bean', 'User', 0.0, <AccessGroup value={"readnwrite"}/>, 0.0),
  createData('KitKat', 'User', 26.0, <AccessGroup value={"read"}/>, 7.0),
  createData('Lollipop', 'User', 0.2, <AccessGroup value={"readnwrite"}/>, 0.0),
  createData('Marshmallow', 'User', 0, <AccessGroup value={"readnwrite"}/>, 2.0),
  createData('Nougat', 'User', 19.0, <AccessGroup value={"read"}/>, 37.0),
  createData('Oreo', 'User', 18.0, <AccessGroup value={"readnwrite"}/>, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Last Edit' },
  { id: 'carbs', numeric: false, disablePadding: false, label: 'Access Type' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Disable in'},
  { id: 'link', numeric: true, disablePadding: false, label: 'Copy Link'},
 
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleDelete } = props;
  

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
   
  const noteId=props.noteId
  const [loading,setLoading]=React.useState(true)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(()=>{
   
      const cont=props.contributionData
      const links=props.linkData
      console.log(props.contributionData)
      console.log(props.linkData)
      let contRows=cont.map((d,ind)=>{
        return createData(d.email,d.type,d.lastEdit,<AccessGroup value={d.access} noteId={noteId} user={d.email} type="user" />,"","")
      })
      let linkRows=links.map((l,ind)=>{
        console.log(l)
        return createData(l.name,l.type,l.lastEdit,<AccessGroup value={l.access} noteId={noteId} user={l.name} type="link" />,l.expiresTime,l.link)
      })
      rows=contRows.concat(linkRows)
      console.log(rows)
      let newLoading=!loading
      setLoading(newLoading)

  },[props.contributionData,props.linkData])


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete=()=>{
    rows=rows.filter(r=>{
      if(selected.includes(r.name)){
        return null
      }
      else{
        return r
      }
    })
    let newLoading=!loading
    setLoading(newLoading)

    axios.post('contribution/deleteContributers',{
      users:selected,
      id:noteId,
      authToken:localStorage.getItem('auth-token')
    })
    .then(res=>{
      setSelected([])
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const calculateDate=(d)=>{
    try{
    let cd=new Date()
    let newdate=new Date(d)
    if(newdate==="Invalid Date" || d===null){
      return null
    }
    let seconds=(cd.getTime()-newdate.getTime())/1000
    console.log(seconds)
    var days = Math.floor(seconds / (3600*24));
    var hours = Math.floor(seconds % (3600*24) / 3600);
    var minutes = Math.floor(seconds % 3600 / 60);
    var sec = Math.floor(seconds % 60);
    let result=""
    if(minutes===0){
        result=sec+"s "+"ago"
    }
    else if(days===0){
      result=hours+"h "+minutes+"m "+"ago"
    }
    else{
      result=days+"d "+hours+"h "+"ago"
    }
    return result
  }
  catch{
    return null
  }
  }

  const calculateExpirity=(d)=>{
    try{
    let cd=new Date()
    let newdate=new Date(d)
    if(newdate=="Invalid Date" || d===null){
      return null
    }
    let seconds=(newdate.getTime()-cd.getTime())/1000
    console.log(seconds)
    var days = Math. floor(seconds / (3600*24));
    var hours = Math. floor(seconds % (3600*24) / 3600);
    var minutes = Math. floor(seconds % 3600 / 60);
    var sec = Math. floor(seconds % 60);
    let result=""
    if(minutes<0 || seconds<0){
      return "expired"
    }
    if(minutes===0){
        result=sec+"s"
    }
    else if(days==0){
      result=hours+"h "+minutes+"m"
    }
    else{
      result=days+"d "+hours+"h"
    }
    return result
  }
  catch{
    return "expired"
  }
  }



 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {console.log(rows)}
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                     
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                         onClick={(event) => handleClick(event, row.name)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{calculateDate(row.fat)}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{calculateExpirity(row.protein)}</TableCell>
                      <TableCell align="right">{row.link &&<Button variant="contained" color="primary" onClick={()=>{
                    let url="https://makeanote.vercel.app/notesbylink/"+row.link
                    copy(url)
                    alert("copied")
                    }} >
                Copy Link
                </Button>}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 7, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
