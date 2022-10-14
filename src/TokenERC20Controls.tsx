import { AudioOutlined } from '@ant-design/icons';
import {AutoComplete, Button, Input, Space} from 'antd';
import React, {useState} from 'react';
import tokenERC20Provider from "./TokenErc20Provider";

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);


const POLYGON_TOKENS = [{
      value: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    name: "USDT"
},
    {
        value: "0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf",
        name: "GLM"
    }
]

function TokenERC20Controls() {
    const [optionsTokens, setOptionsTokens] = useState([]);
    const [optionsHolders, setOptionsHolders] = useState([]);
    const [token, setToken] = useState("");
    const [holder, setHolder] = useState("");
    const onSearchTokens = (searchText:any) => {
        let optionsLocal = [];
        for (let polygonToken of POLYGON_TOKENS) {
            if (polygonToken.name.toLowerCase().includes(searchText.toLowerCase())) {
                optionsLocal.push(polygonToken);
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
        tokenERC20Provider.setHolderAndToken(token, holder);

    }

    function onSelectToken(data:any) {
        setToken(data)
    }

    function onSelectHolder(data:any) {
        setHolder(data)
    }


    return (
        <Space direction="vertical">
            <div>token: {token}</div>
            <div>holder: {holder}</div>

            <AutoComplete
                options={optionsTokens}
                style={{
                    width: 200,
                }}
                onSearch={onSearchTokens}
                onSelect={onSelectToken}
                onChange={onSelectToken}
                placeholder="input here"
            />
            <AutoComplete
                options={optionsHolders}
                style={{
                    width: 200,
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