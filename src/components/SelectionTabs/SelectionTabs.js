import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

import './SelectionTabs.css';
import DataTable from '../DataTable/DataTable';
import Chart from '../Chart/Chart';
import CountryPicker from '../CountryPicker/CountryPicker';
import Cards from '../Cards/Cards';
import { fetchIndiaData, fetchIndiaGraphData, 
            fetchCntryData, fetchDailyData } from '../../api';

const SelectionTabs = () => {
    const [value, setValue] = useState(1);
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchIndiaData());
        }
        fetchData();
        const fetchGraphData = async () => {
            setGraphData(await fetchIndiaGraphData());
        }
        fetchGraphData();
    }, []);

    const handleChange = (event, newVal) => {
        setValue(newVal);
        setCountry('');
        if (newVal === 0) {
            //TODO
        } else if (newVal === 1) {
            const fetchData = async () => {
                setData(await fetchIndiaData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchIndiaGraphData());
            }
            fetchGraphData();
        } else if (newVal === 2) {
            const fetchData = async () => {
                setData(await fetchCntryData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchDailyData());
            }
            fetchGraphData();
        }
    };

    const handleCountryChange = async (country) => {
        const retrievedData = await fetchCntryData(country);
        setData(retrievedData);
        setGraphData(retrievedData);
        setCountry(country);
    }

    return (
        <div className="tab-container">
            <Paper square className="tab-style">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Bihar" />
                    <Tab label="India" />
                    <Tab label="World" />
                </Tabs>
            </Paper>
            <Chart value={value} index={0} graphData={graphData} />
            <Cards data={data} value={value} index={1} />
            <DataTable value={value} index={1} data={data} />
            <Chart value={value} index={1} graphData={graphData} />
            <CountryPicker handleCountryChange={handleCountryChange} value={value} index={2} />
            <Cards data={data} value={value} index={2} />
            <Chart value={value} index={2} graphData={graphData} country={country} />
        </div>
    );
}

export default SelectionTabs;