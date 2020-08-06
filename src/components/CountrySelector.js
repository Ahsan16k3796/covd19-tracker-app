import React, { useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({

    formControl: {
        "margin": theme.spacing(1),
        "width": '100%',
    },
    mainGrid: {
        margin: '20px auto 0 auto'
    },
    inputLabel: {
        color: 'white',
        fontSize: 'larger',
    },
    select: {
        fontWeight: 'bold',
        fontSize: 'large'
    }

}))

async function fetch_api(countries, setCountries) {
    let url = 'https://api.thevirustracker.com/free-api?countryTotals=ALL';
    const response = await fetch(url);
    const { countryitems } = await response.json();
    const countries_object = {};
    // console.log(countryitems[0]);
    for (const key in countryitems[0]) {
        const { title, code, ourid } = countryitems[0][key];
        countries_object[title] = { "title": title, "code": code, "id": ourid };
    };

    setCountries({ ...countries, ...countries_object });
}

export default function CountrySelector ({ handleChangeCountry }) {

    const classes = useStyle();
    const [countries, setCountries] = React.useState({ "Global": { "title": "Global", "code": "global", "id": 0 } });
    const [country, setCountry] = React.useState(countries.Global.title);

    useEffect(() => {
        fetch_api(countries, setCountries);
    }, [countries]);

    return (
        <Grid xs={12} sm={6} container item className={classes.mainGrid}>
            <FormControl className={classes.formControl}>
                <InputLabel id="select-country-label" className={classes.inputLabel}>Select Country</InputLabel>
                <Select
                    className={classes.select}
                    labelId="select-country-label"
                    id="select-country"
                    value={country}
                    defaultValue={countries[0]}
                    onChange={(event) => {
                        const selectVal = event.target.value;
                        setCountry(selectVal);
                        handleChangeCountry(countries[event.target.value].code)
                    }}
                >
                    {Object.values(countries).map(cntry => <MenuItem key={Number(cntry.id).toString()} value={cntry.title}>{cntry.title}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
    );
}