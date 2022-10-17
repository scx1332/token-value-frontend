import tokenERC20Provider from "./TokenErc20Provider";
import {Alert, Space} from "antd";
import React, {useEffect, useState} from "react";
import tokenErc20Provider from "./TokenErc20Provider";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



function ErrorBox() {
    const [error, setError] = useState("test error");
    const [action, setAction] = useState("test action");

    const onChange = function () {
        setError(tokenErc20Provider.getLastError());
        setAction(tokenErc20Provider.getLastAction());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        tokenERC20Provider.registerListener(onChange);
        setError(tokenERC20Provider.getLastError());
        return () => {
            tokenERC20Provider.unregisterListener(onChange);
        }
    }, []);


    const inside = function () {
        if (error) {
            return (
                <Alert message={error} type="error" showIcon />);
        } else if (action == "Fetching data ...") {
            return (
                <Space direction="vertical">
                    <div>{action}</div>
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                </Space>)
        }
    }
    return (
      <Space>
          <div className="error-box">
             {inside()}
          </div>
      </Space>
    );
}

export default ErrorBox;