
export interface TokenInfo {
    chaidID: number;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    logoURI: string;
    tags: string[];
    extensions: any;
}

export interface TokenList {
    tokens: TokenInfo[];
}

let polygon_tokens :any = {}

fetch("https://api-polygon-tokens.polygon.technology/tokenlists/allTokens.tokenlist.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        polygon_tokens=json
        console.log("Loaded polygon tokens");
    });

function get_polygon_tokens():TokenList {
    return polygon_tokens;
}

export default get_polygon_tokens;