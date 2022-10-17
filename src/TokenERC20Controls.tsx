import { AudioOutlined } from '@ant-design/icons';
import {AutoComplete, Button, Input, Space} from 'antd';
import React, {useState} from 'react';
import tokenERC20Provider from "./TokenErc20Provider";
import get_polygon_tokens, {TokenInfo} from "./TokenList";
import {To} from "react-router";

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);


function TokenERC20Controls() {
    const [optionsTokens, setOptionsTokens] = useState([]);
    const [optionsHolders, setOptionsHolders] = useState([]);
    const [token, setToken] = useState<TokenInfo>(() => {
        const token = localStorage.getItem("token");
        const initialValue = JSON.parse(token);
        return initialValue || "";
    });

    const [holder, setHolder] = useState(() => {
        const saved = localStorage.getItem("holder");
        const initialValue = JSON.parse(saved);
        return initialValue || "0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245";
    });

    const onSearchTokens = (searchText:any) => {
        let optionsLocal = [];
        for (let polygonToken of get_polygon_tokens().tokens) {
            let matches = false;
            if (polygonToken.name.toLowerCase().includes(searchText.toLowerCase())) {
                matches = true;
            }
            else if (polygonToken.symbol.toLowerCase().includes(searchText.toLowerCase())) {
                matches = true;
            }
            if (matches) {
                let option = {
                    value: `${polygonToken.symbol} - ${polygonToken.name} (${polygonToken.address})`,
                    ...polygonToken
                }
                optionsLocal.push(option);
            }
        }
        setOptionsTokens(
            optionsLocal
        );
    };
    const onSearchHolders = (searchText:any) => {
        setOptionsHolders(
            [{value:"0x0000000000000000000000000000000000000000"},
                {value:"0x000000000000000000000000000000000000dEaD"}]
        );
    };

    const onSelect = (data:any) => {
        console.log('onSelect', data);
    };

    function onPlot() {
        tokenERC20Provider.setHolderAndToken(holder, token);

    }

    function onChangeToken(data:any, option: any) {
        setToken(data);
    }

    function onSelectToken(data:any, option: any) {
        setToken(option);
        console.log('onSelectToken', data, option);
        localStorage.setItem("token", JSON.stringify(option));
    }

    function onSelectHolder(data:any) {
        setHolder(data);
        localStorage.setItem("holder", JSON.stringify(data));

    }


    return (
        <Space direction="vertical">
            <div>token: {token?token.address:""}</div>
            <div>holder: {holder}</div>

            <AutoComplete
                options={optionsTokens}
                value={token}
                style={{
                    width: 500,
                }}
                onSearch={onSearchTokens}
                onSelect={onSelectToken}
                onChange={onChangeToken}
                placeholder="input here"
            />
            <AutoComplete
                options={optionsHolders}
                value={holder}
                style={{
                    width: 500,
                }}
                onSearch={onSearchHolders}
                onSelect={onSelectHolder}
                onChange={onSelectHolder}
                placeholder="input here"
            />

            <Button type="primary">Zoom In</Button>
            <Button type="primary">Zoom Out</Button>
            <Button type="primary">Right</Button>
            <Button type="primary">Left</Button>
            <Button type="primary" onClick={onPlot}>Plot</Button>
        </Space>);
}

export default TokenERC20Controls;