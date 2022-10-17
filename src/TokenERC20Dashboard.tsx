import React, {useEffect, useState} from 'react';
import tokenERC20Provider from "./TokenErc20Provider";
import {GatewayInstance} from "./GatewayInstance";
import GatewayInstanceInfo from "./GatewayInstanceInfo";
import Plot from "react-plotly.js";
import {DateTime} from "luxon";
import tokenErc20Provider from "./TokenErc20Provider";
import {Space} from "antd";

function TokenErc20Dashboard() {
    const [history, setHistory] = useState({});

    const handleDataProviderChange = function () {
        setHistory(tokenErc20Provider.getHistory());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        tokenERC20Provider.registerListener(handleDataProviderChange);
        setHistory(tokenERC20Provider.getHistory());
        return () => {
            tokenERC20Provider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    const prepareChartData = function (history:any) {
        let x = [];
        let y = [];

        for (let block_no in history) {
            x.push(block_no);
            y.push(history[block_no]);
        }
        let plotlyData = [
            {
                x: x,
                y: y,
                type: 'line',
            }];
        return plotlyData;

    }



    const render = function () {
        if (!history) {
            return (
                <Space>
                    <div>Loading...</div>
                    <div>{tokenErc20Provider.getLastError()}</div>
                </Space>
        )
        };
        try {
            let plotlySuccess = prepareChartData(history);

            return (
                <div className="App">

                    <div>
                        <div className="top-header">

                        </div>

                        <div className="client-dashboard-plot">
                            <Plot
                                /*
                                // @ts-ignore */
                                  data={plotlySuccess}
                                  layout={ {
                                      title: '',
                                      yaxis: {title: ''},
                                      xaxis: {
                                          title: '',
                                      }
                                  } }
                            />
                        </div>




                    </div>
                </div>
            );
        } catch (ex) {
            return (
                <div>{`${ex}`}</div>
            )
        }


    };

    return render();

}

export default TokenErc20Dashboard