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

const mockVal = (str: any, repeat = 1) => ({
    value: "0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245",
});

function TokenERC20Controls() {
    const [options, setOptions] = useState([]);
    const [token, setToken] = useState("");
    const [holder, setHolder] = useState("");
    const onSearchTokens = (searchText:any) => {
        setOptions(
            [{value:"0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245"}]
        );
    };
    const onSearchHolders = (searchText:any) => {
        setOptions(
            [{value:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F"}]
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
                options={options}
                style={{
                    width: 200,
                }}
                onSearch={onSearchTokens}
                onSelect={onSelectToken}
                onChange={onSelectToken}
                placeholder="input here"
            />
            <AutoComplete
                options={options}
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