import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, makeStyles, Typography } from '@material-ui/core';
import CountUp from 'react-countup';

import './DataTable.css';
import { getComparator, stableSort } from '../../utils';
import Delta from '../Delta/Delta';

const useStyles = makeStyles((theme) => ({
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

const DataTable = ({ data, value, index }) => {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState('confirmed');
    const [order, setOrder] = useState('desc');
    let firstLabel = 'District', lastUpdate ='';

    if (value !== index) return null;

    if (index === 1) {
        firstLabel = 'State/UT';
        lastUpdate = '';
        data = data && data.stateData ? data.stateData : [];
    } else if (index === 2) {
        firstLabel = 'Country';
        lastUpdate = '';
    }

    const headCells = [
        { id: 'stateName', numeric: false, disablePadding: false, label: firstLabel },
        { id: 'confirmed', numeric: true, disablePadding: false, label: 'Confirmed' },
        { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
        { id: 'recovered', numeric: true, disablePadding: false, label: 'Recovered' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deceased' }
    ];

    const tableData = data && !data.length ? (
        <TableRow>
            <TableCell align="center" colSpan={5}>
                <Typography variant="button" display="block" align='center'>
                    Loading...
                </Typography>
            </TableCell>
        </TableRow>) :
        stableSort(data, getComparator(order, orderBy))
            .map(({ stateName, confirmed, active, recovered, deaths, lastUpdated, 
                    deltaconfirmed, deltadeaths, deltarecovered }) => {
                if (!lastUpdate) lastUpdate = lastUpdated;
                return (
                    <TableRow key={stateName} hover className="tab">
                        <TableCell component="th" scope="row" className="table-cell">
                            {stateName}
                        </TableCell>
                        <TableCell align="right" className="table-cell">
                            {deltaconfirmed > 0 ? <Delta inpCnt={deltaconfirmed} color='red' size='small'/> : null}
                            <CountUp start={0} end={confirmed ? confirmed : 0} duration={2.5} separator="," />
                        </TableCell>
                        <TableCell align="right" className="table-cell">
                            <CountUp start={0} end={active ? active : 0} duration={2.5} separator="," />
                        </TableCell>
                        <TableCell align="right" className="table-cell">
                            {deltarecovered > 0 ? <Delta inpCnt={deltarecovered} color='green' size='small'/> : null}
                            <CountUp start={0} end={recovered ? recovered : 0} duration={2.5} separator="," />
                        </TableCell>
                        <TableCell align="right" className="table-cell">
                            {deltadeaths > 0 ? <Delta inpCnt={deltadeaths} color='grey' size='small'/> : null}
                            <CountUp start={0} end={deaths ? deaths : 0} duration={2.5} separator="," />
                        </TableCell>
                    </TableRow>
                )
            });

    const lastUpdatedSec = lastUpdate ? (<Typography variant="caption" display="block" align='center'>
        Last Updated at {lastUpdate} IST
    </Typography>) : null;

    const handleSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return (
        <div className="datatable-container">
            <Paper className="paper" elevation={3}>
                {lastUpdatedSec}
                <TableContainer>
                    <Table size='small' stickyHeader >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        className="table-cell">
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={handleSort(headCell.id)}
                                            className="t-head"
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
                        <TableBody>
                            {tableData}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default DataTable;