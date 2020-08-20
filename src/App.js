import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

  const App = () => {
    const [country, setInputCountry] = useState("wroldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [TableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
  
    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    }, []);
  
    useEffect(() => {
      const getCountriesData = async () => {
        fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));
            let sortedData = sortData(data);
            setCountries(countries);
            setMapCountries(data);
            setTableData(sortedData);
          });
      };
  
      getCountriesData();
    }, []);
  
    console.log(casesType);
  
    const onCountryChange = async (e) => {
      const countryCode = e.target.value;
  
      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInputCountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });
    };
  



  return (
    <div className="app">
      <div className="appLeft">
          {/* Header */}
          <div className="app_Header">
                <h1>covaid 19 Tracker</h1>
                    <FormControl  className= "app_dropdown">
                      <Select variant="outlined" onChange={onCountryChange} value={country}>
                    <MenuItem value="wroldwide"> wroldwide</MenuItem>
            {/* loop through all the countries */}

            {
              countries.map(
                (country)=>(
                <MenuItem value={country.value} key={country.value}> {country.name}</MenuItem>
                
              ) )
            }


            </Select>

                  </FormControl>

           </div> 

          <div className="app_status">
               <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>       
               <InfoBox title="Coronavirus Recovers"  cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>       
               <InfoBox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>       

          </div>
          <div>
          <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom} />
          </div>


      </div>

        <div className="app_right">
          <Card>
            <CardContent>
              <h3>Live Cases BY Country</h3>
              <Table countries={TableData}/>

              <h3>
                WroldWide New Cases


                <LineGraph/>
              </h3>
            </CardContent>

          </Card>
        </div>
         

    </div>
  );
}

export default App;
