import config from "./config.json";
import {uuidv4} from "./Utils";

let DEBUG = true;
if (config.DEBUG === false) {
    DEBUG = false;
}

class TokenERC20Provider {
    private listeners: Set<any>;
    private last_error: string | null;
    private instances: any;
    private callbackCount: number;
    private id: string;

    private history: any;

    constructor() {
        this.id = uuidv4();
        this.listeners = new Set();
        this.instances = null;
        this.last_error = null;
    }

    public getHistory() : any {
        return this.history;
    }

    registerListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Registering component ${this.id}`);
        }
        this.listeners.add(eventHandler);
    }

    unregisterListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Unregistering component ${this.id}`)
        }
        this.listeners.delete(eventHandler);
    }

    getLastEror() {
        return this.last_error;
    }
    /*
    getPlotData() {
        try {
            if (this.events === null) {
                return {};
            }
            let plotData = plotFromErigonLogEvents(this.events, this.sizes);
            return plotData;
        } catch (ex) {
            console.log(ex);
        }
        return {};
    }*/

    getProviderProperties() {
        return {
            numberOfListeners: this.listeners.size,
            callbackCount: this.callbackCount
        };
    }

    async fetchData() {
        const response = await fetch(`${config.BACKEND_URL}history/30000000/30010000`);
        const history = await response.json();

        this.history = history;
    }

    async updateDataLoop() {
        console.log("Waiting for listeners");
        while (true) {
            while (this.listeners.size === 0) {
                this.instances = null;
                this.last_error = "Waiting for data";
                await new Promise(r => setTimeout(r, 500));
            }
            try {
                if (DEBUG) {
                    console.log("Fetch gateway information...");
                }
                await this.fetchData();
            } catch (ex) {
                this.instances = null;
                console.log(ex);
                this.last_error = ex.message;
            } finally {
                for (let callback of Array.from(this.listeners.values())) {
                    this.callbackCount += 1;
                    callback();
                }
                await new Promise(r => setTimeout(r, 3000));
            }
        }
    }
}

let tokenERC20Provider = new TokenERC20Provider();
tokenERC20Provider.updateDataLoop().then(() => {})

export default tokenERC20Provider;
