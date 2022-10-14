import React from "react";
import TokenERC20Controls from "./TokenERC20Controls";
import TokenERC20Dashboard from "./TokenERC20Dashboard";
import {Space} from "antd";

function TokenERC20Page() {


    return (
        <div>
            <Space direction="horizontal">
                <TokenERC20Controls></TokenERC20Controls>
                <TokenERC20Dashboard></TokenERC20Dashboard>
            </Space>
        </div>
    );


}

export default TokenERC20Page;