import React, {useEffect, useState} from 'react';
import tokenERC20Provider from "./TokenErc20Provider";
import {GatewayInstance} from "./GatewayInstance";
import GatewayInstanceInfo from "./GatewayInstanceInfo";
import Plot from "react-plotly.js";
import {DateTime} from "luxon";
import tokenErc20Provider from "./TokenErc20Provider";
import {Space, Table} from "antd";
import {TokenInfo} from "./TokenList";

function TokenErc20Dashboard() {
    const [history, setHistory] = useState({});
    const [token, setToken] = useState<TokenInfo|null>(null);

    const handleDataProviderChange = function () {
        setHistory(tokenErc20Provider.getHistory());
        setToken(tokenErc20Provider.getToken());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        tokenERC20Provider.registerListener(handleDataProviderChange);
        setHistory(tokenERC20Provider.getHistory());
        setToken(tokenERC20Provider.getToken());
        return () => {
            tokenERC20Provider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    const prepareChartData = function (history:any) {
        let x = [];
        let y = [];

        for (let block_no in history) {
            x.push(block_no);
            y.push(history[block_no] / Math.pow(10, token.decimals));
        }
        console.log(token.decimals);
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
                    <Space direction="vertical">
                        <div className="token-info">
                            <h1>{token.name}</h1>
                            <h2>{token.symbol}</h2>
                            <h3>{token.address}</h3>
                        </div>
                    </Space>

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